# Period Hub health v2 Clean 🌸

> 全新的、干净的经期健康平台 - 重新设计的架构，避免技术债务

## 🎯 项目目标

Period Hub v2 是一个专注于经期健康的综合性平台，旨在为年轻女性提供：

- 🔬 **科学的健康评估工具** - 基于医学研究的交互式评估
- 📚 **专业的健康教育内容** - 可信赖的经期健康知识
- 🎨 **个性化的健康建议** - 根据用户情况定制的建议
- 🌐 **多语言支持** - 中英文双语服务

## 🏗️ 技术架构

### 核心技术栈
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: next-intl
- **部署**: Vercel + GitHub Pages

### 设计原则
- **移动优先** - 70%+用户使用移动设备
- **可访问性** - 符合WCAG 2.1 AA标准
- **性能优化** - 快速加载和流畅交互
- **SEO友好** - 搜索引擎优化

## 🎨 设计系统

### 色彩方案
- **主色调**: #9333ea (深紫色)
- **辅助色**: #ec4899 (亮粉色)
- **渐变**: 135度对角渐变
- **效果**: 毛玻璃效果、阴影和变换

### 组件规范
- **触摸目标**: 最小44px (WCAG标准)
- **间距系统**: 基于8px网格
- **字体**: Inter字体系列
- **圆角**: 统一的圆角设计

## 📁 项目结构

```
periodhub-v2-clean/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 国际化路由
│   │   ├── page.tsx       # 首页
│   │   ├── interactive-tools/  # 交互工具
│   │   └── articles/      # 文章页面
│   ├── globals.css        # 全局样式
│   └── layout.tsx         # 根布局
├── components/            # React组件
│   ├── ui/               # 基础UI组件
│   ├── layout/           # 布局组件
│   └── tools/            # 工具组件
├── lib/                  # 工具函数
│   ├── utils.ts          # 通用工具
│   ├── translations.ts   # 翻译工具
│   └── types.ts          # 类型定义
├── messages/             # 国际化文件
│   ├── zh.json           # 中文翻译
│   └── en.json           # 英文翻译
├── public/               # 静态资源
│   ├── images/           # 图片资源
│   └── icons/            # 图标文件
└── styles/               # 样式文件
```

## 🚀 开发指南

### 环境要求
- Node.js >= 18.0.0
- npm >= 8.0.0

### 快速开始
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 类型检查
npm run type-check

# 代码检查
npm run lint
```

### 开发规范
1. **组件命名**: PascalCase
2. **文件命名**: kebab-case
3. **类型定义**: 所有组件必须有TypeScript类型
4. **国际化**: 所有文本必须使用翻译系统
5. **可访问性**: 遵循WCAG 2.1 AA标准

## 🎯 核心功能

### 1. 交互式健康工具
- 痛经评估工具
- 症状追踪器
- 个性化建议生成器

### 2. 健康教育内容
- 专业医学文章
- PDF下载资源
- 多媒体内容

### 3. 用户体验优化
- 响应式设计
- 快速加载
- 直观导航

## 📱 移动端优化

- **触摸友好**: 所有交互元素≥44px
- **性能优化**: 代码分割和懒加载
- **网络适配**: 适应不同网络条件
- **安全区域**: 支持刘海屏和安全区域

## 🌐 国际化支持

- **语言**: 中文(zh) / 英文(en)
- **路由**: /zh/* 和 /en/*
- **内容**: 完整的双语内容体系
- **SEO**: 多语言SEO优化

## 🔧 部署配置

### Vercel部署
- 自动部署和预览
- 自定义域名: periodhub.health
- 全球CDN加速

### GitHub Pages备份
- 静态站点生成
- 备用部署方案
- 版本控制集成

## 📊 质量保证

- **TypeScript**: 类型安全
- **ESLint**: 代码质量检查
- **Jest**: 单元测试
- **Lighthouse**: 性能监控

⚠️ 版权声明
Copyright © 2025 [haha321-haha]. All Rights Reserved.

本项目仅供学习和个人使用。未经作者明确书面许可，不得：

将代码用于商业用途
修改或分发本项目
基于本项目创建衍生作品
如需使用，请联系：[tiyibaofu@outlook.com]



## 👥 团队 | Team

| 角色 | 信息 |
|------|------|
| **开发者** | [@haha321-haha](https://github.com/haha321-haha) |
| **项目地址** | (https://github.com/haha321-haha/hub-health.git)|
| **邮箱** | tiyibaofu@outlook.com |

## 📞 联系我们 | Contact

如有问题或建议，请通过以下方式联系：

| 联系方式 | 链接/地址 | 用途 |
|----------|-----------|------|
| 🐛 **GitHub Issues** | [提交问题](https://github.com/haha321-haha/hub-health issues) | Bug报告、功能建议 |
| 👨‍💻 **GitHub Profile** | [@haha321-haha](https://github.com/haha321-haha) | 查看更多项目 |
| 📧 **邮箱联系** | tiyibaofu@outlook.com | 商务合作、技术咨询 |
| 🌐 **项目主页** | https://periodhub.health | 在线体验平台 |

---

**Period Hub Platform** - 为女性健康而生 💜
