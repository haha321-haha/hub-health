# PeriodHub - 专业女性健康管理平台 🌸

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/haha321-haha/v2-clean-fixed)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Performance](https://img.shields.io/badge/Core_Web_Vitals-Optimized-green?logo=lighthouse)](https://web.dev/vitals/)
[![PWA](https://img.shields.io/badge/PWA-Ready-purple?logo=pwa)](https://web.dev/progressive-web-apps/)
[![Mobile](https://img.shields.io/badge/Mobile-Optimized-blue?logo=mobile)](https://developers.google.com/web/fundamentals/design-and-ux/responsive/)

> 🚀 **最新更新**: Core Web Vitals 全面优化，性能提升 30%+，修复 Vercel 部署问题

## 🎯 项目简介

**PeriodHub** 是一个现代化的女性月经健康管理平台，结合中西医理论，为全球女性提供专业、温暖、实用的经期健康指导和管理工具。

### ✨ 核心亮点

🔬 **专业可靠** - 基于医学研究，36篇权威文章  
💝 **中西医结合** - 独特的东方医学整合  
🌍 **国际化** - 完整中英文双语支持  
📱 **移动优先** - Core Web Vitals 优化，性能卓越  
🎨 **现代化UI** - 紫粉渐变主题，优雅体验  
🔒 **隐私保护** - 本地存储，数据安全

## 🎯 项目概述 | Project Overview

Period Hub Platform 是一个现代化的女性月经健康管理平台，致力于为女性提供专业、温暖、实用的经期健康指导和管理工具。

Period Hub Platform is a modern women's menstrual health management platform dedicated to providing professional, warm, and practical menstrual health guidance and management tools for women.

### 🌟 项目特色 | Key Features

- **🔬 专业可靠** - 基于医学研究的专业内容
- **💝 温暖贴心** - 以用户为中心的人性化设计  
- **🌍 国际化** - 完整的中英文双语支持
- **📱 移动优先** - 响应式设计，完美适配各种设备
- **🎨 现代化UI** - 紫色主题，优雅的视觉体验

## ✨ 核心功能 | Core Features

### 🔧 智能工具 | Interactive Tools
- **🩺 痛经评估工具** - 12项专业评估，个性化建议
- **📊 周期追踪器** - 智能周期记录和预测
- **📝 症状记录器** - 详细症状追踪和分析
- **🎯 疼痛追踪器** - 疼痛强度和模式记录
- **🧘 体质测试** - 中医体质评估和调理建议

### 📚 内容模块 | Content Modules
- **📖 健康指南** - 36篇专业文章，涵盖经期健康各个方面
- **📋 PDF资源** - 13个实用PDF下载，疼痛追踪、营养计划等
- **🎭 场景解决方案** - 6种常见场景的应对策略
- **👩‍🎓 青少年专区** - 专为青少年设计的健康教育
- **🔍 智能搜索** - 双语关键词搜索，支持疼痛、缓解、营养、运动、医学、沟通等关键词

### 🌐 技术特性 | Technical Features
- **🌍 多语言支持** - 中文/English 完整双语界面
- **📱 响应式设计** - 移动端优先，完美适配所有设备
- **💾 本地存储** - 数据持久化，保护用户隐私
- **⚡ 高性能** - Next.js 14 + TypeScript，极速加载

## 🚀 快速开始 | Quick Start

### 📋 环境要求 | Prerequisites
```bash
Node.js 20.15.0+
npm 或 yarn
Git
```

### 🛠️ 安装步骤
```bash
# 克隆仓库
git clone https://github.com/haha321-haha/v2-clean-fixed.git
cd v2-clean-fixed

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 🚀 性能优化工具
npm run performance:full      # 完整性能优化
npm run performance:quick     # 快速性能检查
npm run optimize:images       # 图片优化
npm run check:mobile         # 移动端检查
npm run fix:icons           # 图标修复
```

### 🌐 访问应用 | Access Application
- **开发环境**: http://localhost:3000
- **生产环境**: https://periodhub.health

## 📁 项目结构 | Project Structure
```
periodhub-v2-clean-fixed/
├── app/                    # Next.js 13+ App Router
│   ├── [locale]/          # 国际化路由
│   │   ├── articles/      # 文章页面
│   │   ├── health-guide/  # 健康指南
│   │   ├── interactive-tools/ # 互动工具
│   │   └── scenario-solutions/ # 场景解决方案
│   └── globals.css        # 全局样式
├── components/            # 可复用组件
│   ├── ui/               # 基础UI组件
│   ├── layout/           # 布局组件
│   └── tools/            # 工具组件
├── lib/                   # 工具库和配置
├── messages/              # 国际化翻译文件
│   ├── zh.json           # 中文翻译
│   └── en.json           # 英文翻译
├── public/                # 静态资源
├── config/                # 配置文件
├── types/                 # TypeScript 类型定义
└── hooks/                 # 自定义 React Hooks
```

## 🎨 设计系统 | Design System

### 颜色主题 | Color Theme
- **主色调**: Pink/Purple 渐变 (#9333ea → #ec4899)
- **辅助色**: Blue, Green, Gray - 用于次要元素和背景
- **语义色**:
  - Success (成功): 绿色 - 表示操作成功、健康状态良好
  - Warning (警告): 黄色/橙色 - 表示需要注意的信息、轻度症状
  - Error (错误): 红色 - 表示错误信息、严重症状或紧急情况

### 响应式设计 | Responsive Design
- **移动优先设计** - Mobile-first approach
- **支持设备**: 桌面、平板、手机
- **流畅交互** - 优化的触摸体验

## 📊 项目统计

| 统计项目 | 数量 | 说明 |
|----------|------|------|
| 📄 静态页面 | 242个 | 完整的SEO优化 |
| 📚 专业文章 | 36篇 | 权威健康内容 |
| 📋 PDF资源 | 13个 | 实用下载资源 |
| 🌍 语言支持 | 2种 | 中英文双语 |
| 📱 响应式设计 | 100% | 移动端优化 |
| 🔍 搜索关键词 | 6类 | 疼痛、缓解、营养、运动、医学、沟通 |
| ⚡ 性能优化 | Core Web Vitals | FCP/LCP/CLS 全面优化 |
| 🖼️ 图片优化 | WebP/AVIF | 节省19%空间 |

## 🚀 性能优化亮点

### ⚡ Core Web Vitals 优化
- **FCP (首次内容绘制)**: 提升 20-30%
- **LCP (最大内容绘制)**: 提升 25-35%  
- **CLS (累积布局偏移)**: 降低 50-70%
- **图片加载速度**: 提升 19%

### 🛠️ 性能工具
- Core Web Vitals 优化器
- 图片自动优化脚本 (WebP转换)
- 移动端响应式检查器
- 性能测试工具
- 图标修复工具

### 📱 移动端优化
- 触摸目标大小优化 (44px+)
- 防布局偏移措施
- DNS预解析和预连接
- 静态资源缓存策略

## 🌍 国际化 | Internationalization

支持中文（zh）和英文（en）两种语言：
- **自动语言检测** - 基于浏览器语言偏好
- **URL路径语言切换** - /zh/* 和 /en/*
- **完整翻译覆盖** - 所有界面元素和内容

## 🛠️ 技术栈 | Tech Stack

### 前端框架 | Frontend Framework
- **Next.js 14.2.5** - React 全栈框架
- **React 18** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript

### 样式和UI | Styling & UI
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Lucide React** - 现代图标库
- **响应式设计** - 移动端优先

### 国际化 | Internationalization
- **next-intl** - Next.js 国际化解决方案
- **中英文双语** - 完整的双语支持

### 状态管理 | State Management
- **Zustand** - 轻量级状态管理
- **React Hooks** - 本地状态管理

### 开发工具 | Development Tools
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Jest** - 单元测试框架

## 🔧 配置说明 | Configuration

### 环境变量 | Environment Variables
创建 `.env.local` 文件：
```bash
# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=zh

# 分析工具（可选）
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
```

### 部署配置 | Deployment Configuration
项目已配置用于 Vercel 部署：
- `vercel.json` - Vercel 部署配置
- `next.config.js` - Next.js 优化配置
- 自动静态优化和图片优化

## 📱 功能模块 | Feature Modules

### 🔍 互动工具 | Interactive Tools
- **症状评估工具** - 12个专业问题的疼痛评估
- **疼痛追踪器** - 日常疼痛记录和分析
- **中医体质测试** - 传统中医体质评估

### 📚 内容模块 | Content Modules
- **健康指南** - 36篇专业月经健康知识文章
- **PDF资源** - 13个实用PDF下载资源
- **场景解决方案** - 不同场景下的应对方案
- **青少年专区** - 针对青少年的健康指导

### 🌐 多语言支持 | Multi-language Support
- **中文** - 简体中文界面
- **English** - 完整英文界面
- **自动检测** - 基于浏览器语言自动切换

## 🚀 部署指南 | Deployment Guide

### Vercel 部署 | Vercel Deployment
1. Fork 此仓库到您的 GitHub 账户
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 点击部署

### 自定义域名 | Custom Domain
在 Vercel 项目设置中添加自定义域名：`periodhub.health`

## 🤝 贡献指南 | Contributing

我们欢迎社区贡献！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证 | License

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👥 团队 | Team

| 角色 | 信息 |
|------|------|
| **开发者** | [@haha321-haha](https://github.com/haha321-haha) |
| **项目地址** | https://github.com/haha321-haha/v2-clean-fixed.git |
| **邮箱** | tiyibaofu@outlook.com |

## 📞 联系我们 | Contact

如有问题或建议，请通过以下方式联系：

| 联系方式 | 链接/地址 | 用途 |
|----------|-----------|------|
| 🐛 **GitHub Issues** | [提交问题](https://github.com/haha321-haha/v2-clean-fixed/issues) | Bug报告、功能建议 |
| 👨‍💻 **GitHub Profile** | [@haha321-haha](https://github.com/haha321-haha) | 查看更多项目 |
| 📧 **邮箱联系** | tiyibaofu@outlook.com | 商务合作、技术咨询 |
| 🌐 **项目主页** | https://periodhub.health | 在线体验平台 |

---

**Period Hub Platform** - 为女性健康而生 💜
