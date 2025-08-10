'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-2xl text-gray-700 mb-6">服务器错误</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          抱歉，服务器遇到了一些问题。我们已经记录了这个错误。
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            重试
          </button>
          <Link 
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all duration-300"
          >
            返回首页
          </Link>
        </div>
        {error.digest && (
          <div className="mt-4 text-sm text-gray-500">
            错误ID: {error.digest}
          </div>
        )}
      </div>
    </div>
  );
}