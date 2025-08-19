# PeriodHub Health 修复日志（交互工具 & i18n）

更新时间：{自动生成于当前修复周期}

## 一、问题背景

目标：将“症状评估工具”“疼痛追踪系统”从“功能开发中”占位状态恢复为可交互工具，并修复中文/英文页面出现“翻译键直显”“水合/运行时错误”等问题。

主要症状：
- 访问 `/zh/interactive-tools/symptom-assessment` 与 `/zh/interactive-tools/pain-tracker` 时，页面显示 `interactiveTools.xxx` 等键名，而非实际文案。
- 控制台多次出现 `IntlError: MISSING_MESSAGE`、`TypeError: Cannot read properties of undefined (reading 'call')`、SSR/CSR 水合不一致、HMR/Hydration 报警等。
- 偶发 500/502（服务未就绪/端口占用）、以及浏览器扩展导致的 403 提示与 AudioContext 警告（非阻断）。

## 二、原因分析

1) i18n 注入链路不一致（根因）
- 项目仅在 `app/[locale]/layout.tsx` 里手动 `import ../../messages/${locale}.json`，未使用 next-intl 官方链路（`i18n.ts` + `middleware.ts` + `withNextIntl('./i18n.ts')` + `getMessages()`）。
- 在 SSR/CSR/HMR 的不同阶段，Provider 注入的 `messages` 与组件端 `useTranslations()` 所需命名空间并不总能一致，导致 `MISSING_MESSAGE` 与键名直显。

2) 命名空间与键路径不一致
- 组件端曾使用 `useTranslations('interactiveTools.symptomAssessment')`/`useTranslations('interactiveTools.painTracker')`，而消息文件结构与实际调用路径不完全匹配。
- 痛点在于“点号命名空间”与“树形子键”的混用易导致定位失败。

3) 消息文件键缺失
- `messages/zh.json` 初期缺少诸多交互页面必需键（选项枚举、按钮、占位符等），导致多处 `MISSING_MESSAGE`。

4) 其它非阻断噪音
- 浏览器扩展导致的 403 日志；AudioContext 必须由用户手势触发（浏览器策略），与功能无关。

## 三、修复方案与具体改动

整体策略：采用“E（修复 next-intl 官方链路）+ C（Context 兜底的备用）”。本次已完成 E 方案，未启用 C。

1) 打通 next-intl 官方链路（关键）
- 新增 `i18n.ts`
  - `export const locales = ['zh','en']`
  - `export const defaultLocale = 'zh'`
  - `export const localePrefix = 'as-needed'`
  - `export default getRequestConfig(async ({locale}) => ({ locale, messages: (await import(`./messages/${locale}.json`)).default }))`
- 新增 `middleware.ts`
  - `createMiddleware({locales, defaultLocale, localePrefix})`
  - `matcher` 排除 `/_next|api|favicon.ico|robots.txt|sitemap.xml|.*\..*`
- 修改 `next.config.js`
  - 由 `require('next-intl/plugin')()` 改为 `require('next-intl/plugin')('./i18n.ts')`
- 调整 `app/[locale]/layout.tsx`
  - 保留 `setRequestLocale(locale)`；
  - 改为 `const messages = await getMessages()` 注入 `NextIntlClientProvider`；
  - 移除手动 `import ../../messages/${locale}.json` 的 `try/catch`。

2) 页面层修复（交互恢复 + 取词统一）
- 将页面改为客户端组件：`'use client'` + `useTranslations('interactiveTools')`。
- 症状评估页：统一取词 `t('symptomAssessment.title/description/...')`。
- 疼痛追踪页：统一取词 `t('painTracker.title/description/...')`；表单枚举项与按钮等均走 `painTracker.*` 子键。
- 成功弹窗改为映射翻译标签：由存储值 `lower_back`/`other` 映射至 `locations/painTypes` 列表的 `label`，避免硬编码英文。

3) 消息文件补齐
- `messages/zh.json`：
  - 新增 `interactiveTools.symptomAssessment.*` 与 `interactiveTools.painTracker.*` 全量键（标题、描述、表单标签、占位提示、枚举项、按钮、加载提示等），含 `lowerAbdomen/lowerBack/thighs/other`、`cramping/dullPain/sharpPain` 等。
- `messages/en.json`：现有结构已完整，保留与中文键路径一致，后续若新增键请遵循相同路径。

4) 运行时稳定性
- 端口占用（EADDRINUSE）时统一释放 3001 后再启动。
- 构建缓存异常时清理 `.next` 后重新启动。

## 四、验证结果

- 访问 `/zh|/en/interactive-tools/symptom-assessment` 与 `/zh|/en/interactive-tools/pain-tracker`：
  - 页面返回 200；
  - 所有文案正确渲染，不再显示键名；
  - 交互流程可用（选择/滑块/按钮/弹窗）；
  - Console 无 `IntlError: MISSING_MESSAGE`；
  - AudioContext 与第三方扩展 403 属浏览器/插件级提示，可忽略。

## 五、是否彻底解决？未来是否会复发？

结论：本次变更从根源（官方链路）解决了 i18n 注入不一致的问题，并补齐必要键位。正常开发流程下不会复发。

仍需注意的场景（可控）：
1) 新页面/组件新增取词，但未在 `messages/*.json` 中补齐对应键 → 会出现 `MISSING_MESSAGE`。
  - 预防：新增文案前先定义键路径；提交前运行一次“键路径自检”（可后续脚本化）。
2) 误改动 `i18n.ts` 加载路径或 `middleware.ts` 的 matcher 导致未注入 locale/messages。
  - 预防：保持 `./messages/${locale}.json` 路径不变，勿拦截 `/_next` 与静态资源。

## 六、若下次遇到相同问题，如何快速处理？

1) 快速自检清单
- `next.config.js` 是否为 `withNextIntl('./i18n.ts')`；
- 是否存在 `i18n.ts` 且返回 `{locale, messages}`；
- 是否存在 `middleware.ts` 且 matcher 未误伤静态/内部路径；
- `layout.tsx` 是否使用 `getMessages()` 注入 Provider；
- 组件内 `useTranslations('interactiveTools')` 与消息路径 `interactiveTools.xxx` 是否一致；
- `messages/zh.json`、`messages/en.json` 是否存在对应键。

2) 故障恢复操作
- 清理缓存并重启：`rm -rf .next && npm run dev`；
- 释放端口：`lsof -i :3001 | xargs kill -9`；
- 回滚最近变更：仅涉及 `i18n.ts`、`middleware.ts`、`next.config.js`、`app/[locale]/layout.tsx` 四处，恢复既定版本可立刻回到稳定态。

## 七、开发规范建议（避免再次出现）

- 统一在 `interactiveTools` 命名空间下新增子键，避免多层根命名空间混用；
- 新文案先在 `messages/*.json` 补齐，再在组件中取词；
- 不在组件外调用 `t()`；
- 变更 i18n 相关配置时，优先走官方链路，不再手动动态 import；
- 功能测试覆盖：
  - `/zh|/en/interactive-tools/symptom-assessment`
  - `/zh|/en/interactive-tools/pain-tracker`

## 八、变更明细（文件级）

- 新增：
  - `i18n.ts`
  - `middleware.ts`
- 修改：
  - `next.config.js` → 使用 `withNextIntl('./i18n.ts')`
  - `app/[locale]/layout.tsx` → 使用 `getMessages()` 注入 Provider
  - `app/[locale]/interactive-tools/symptom-assessment/page.tsx` → 客户端组件 + 统一取词路径
  - `app/[locale]/interactive-tools/pain-tracker/page.tsx` → 客户端组件 + 统一取词路径 + 弹窗映射翻译标签
  - `messages/zh.json` → 补齐 `interactiveTools.symptomAssessment.*`、`interactiveTools.painTracker.*` 等缺失键

---

如需进一步自动化：可加一个“翻译键自检脚本”，在 CI 或本地 pre-commit 扫描组件中的 `t('...')` 并校验 `messages/*.json` 是否存在对应键，提前阻断 `MISSING_MESSAGE`。


