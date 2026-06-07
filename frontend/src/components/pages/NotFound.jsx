function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600">Page not found</p>
        <p className="text-sm text-gray-500">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
      </div>
    </div>
  );
}

export default NotFound;


