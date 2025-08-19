import { redirect } from 'next/navigation';

export default function RootPage() {
  // 避免与 next-intl 的 as-needed 前缀策略产生循环重定向
  // 将根路径导向交互工具首页（默认语言为中文时，无需显式 /zh 前缀）
  redirect('/interactive-tools');
}

