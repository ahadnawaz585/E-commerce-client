"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import AuthService from '@/authentication/auth.service';
import { User } from '@/core/Types/user';

const Login: React.FC = () => {
  const authService: AuthService = new AuthService();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const credentials = { username, email, password, rememberMe };
    try {
      const response = await authService.login(credentials);
      console.log(response);
      setSuccessMessage('Login successful!');
      setError('');
    } catch (error) {
      console.error(error);
      setSuccessMessage('');
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-md">
        <h1 className="text-3xl mb-4 text-center font-bold">Sign in</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm">Remember me</label>
          </div>
          <p className="mt-2 text-center">
            Don't have an account?{' '}
            <Link href="/signUp" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white rounded-md py-2 mt-4 hover:bg-blue-600 transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
