// SignUp.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { User } from '@/core/Types/user';
import AuthService from '@/authentication/auth.service';

const SignUp: React.FC = () => {
  const router = useRouter();
  const authService: AuthService = new AuthService();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const credentials = { username, email, password, role: 'customer' };

    try {
      await authService.signUp(credentials);
      setSuccessMessage('Sign-up successful!');
      reset();
      setTimeout(() => {
        router.push("/")
      }, 4000);
      // Reset error message
    } catch (error) {
      setError('Failed to sign up'); // Set error message
    }
  };
  const reset = () => {
    setError('');
    // Reset form fields after successful sign-up
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Display success message */}
          </div>
          <button
            type="submit"
            className="block w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <div className="text-sm text-center">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
