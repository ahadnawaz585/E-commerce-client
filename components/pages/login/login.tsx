"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthService from '@/authentication/auth.service';
import { User } from '@/core/Types/user';
import { useRouter } from 'next/navigation';
const Login: React.FC = () => {
  const authService: AuthService = new AuthService();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [otpRequired, setOtpRequired] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendTimeout, setResendTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (resendTimeout) {
        clearTimeout(resendTimeout);
      }
    };
  }, [resendTimeout]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const credentials = { username, email, password, rememberMe };
    login(credentials);
  };

  const login = async (credentials: User) => {
    try {
      const response = await authService.login(credentials);
      setSuccessMessage('Login successful!\n' + response);
      setError('');
      setOtpRequired(!!password);
      if (resendTimeout) {
        clearTimeout(resendTimeout);
      }
      setResendTimeout(setTimeout(() => {
        resendOTP();
      }, 30000));
    } catch (error) {
      console.error(error);
      setSuccessMessage('');
      setOtpRequired(false);
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    const credentials = { username, email, password, rememberMe };
    login(credentials);
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (/^\d{4}$/.test(otp)) {
        const otpVerified = await authService.verifyOTP({
          username,
          password,
          email,
          rememberMe,
          otp: Number(otp),
        });
        if (otpVerified) {
          setSuccessMessage('OTP verified successfully. Logging in...');
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        } else {
          setError('Invalid OTP. Please try again.');
        }
      } else {
        setError('Please enter a 4-digit OTP.');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to verify OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setRememberMe(false);
    setLoading(false);
    setError('');
    setSuccessMessage('');
    setOtpRequired(false);
    setOtp('');
    if (resendTimeout) {
      clearTimeout(resendTimeout);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-md">
        <h1 className="text-3xl mb-4 text-center font-bold">Sign in</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        {!otpRequired ? (
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
              className={`w-full bg-blue-500 text-white rounded-md py-2 mt-4 hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        ) : password && (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const inputOTP = e.target.value.replace(/\D/g, '');
                  if (inputOTP.length <= 4) {
                    setOtp(inputOTP);
                  }
                }}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
              {otp.length === 4 && !/^\d{4}$/.test(otp) && (
                <div className="text-red-500 text-sm mt-1">Please enter a 4-digit OTP.</div>
              )}
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white rounded-md py-2 mt-4 hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading || otp.length !== 4}
            >
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-red-500 text-white rounded-md py-2 mt-4 hover:bg-red-600 transition duration-300"
            >
              Reset and show login form
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Login;
