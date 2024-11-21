import { useState } from "react";

/**
 * @param {{ onLogin?: (v: { username: string, password: string }) => void }} props
 */
function Login({ onLogin }) {
  const [state, setState] = useState({ username: "", password: "" });

  const onChange = (e) => {
    setState(old => ({ ...old, [e.target.name]: e.target.value }));
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    if (onLogin) onLogin(state);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mt-16">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Sign In</h1>
        <form id="signInForm" onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
            <input type="text" id="username" name="username" value={state.username} onChange={onChange}
              className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input type="password" id="password" name="password" value={state.password} onChange={onChange}
              className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
