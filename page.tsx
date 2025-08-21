import { redirect } from 'next/navigation';

export default function RootPage() {
  // 根页面直接重定向到中文首页
  // 使用 Next.js 的 redirect 函数，这是最安全的方式
  redirect('/zh');
}

