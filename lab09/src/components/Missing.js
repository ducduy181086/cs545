import { Link } from 'react-router-dom';

function Missing() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mb-8">Page Not Found</p>
      <p className="text-lg text-gray-600 mb-4">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/posts" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Go to Dashboard</Link>
    </main>
  );
}

export default Missing;
