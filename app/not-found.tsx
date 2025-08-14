export default function NotFound() {
  return (
    <html>
      <body>
        <main style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
        }}>
          <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>页面未找到</h1>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>The page you are looking for does not exist.</p>
          <a href="/zh" style={{
            background: '#7c3aed', color: '#fff', padding: '10px 16px', borderRadius: '8px', textDecoration: 'none'
          }}>返回首页</a>
        </main>
      </body>
    </html>
  );
}


