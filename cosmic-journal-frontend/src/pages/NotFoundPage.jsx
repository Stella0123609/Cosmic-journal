const NotFoundPage = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="text-center text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Go Home
      </a>
    </div>
  </div>
);

export default NotFoundPage;