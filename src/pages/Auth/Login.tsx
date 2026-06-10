import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-xl p-10 font-sans">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-[#333333]">pilates</span>
            <span className="text-[#FFB1D1]">glo</span>
          </h1>

          <p className="text-[#717171] mt-2 text-lg">
            Admin Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-[#333333] font-semibold mb-2 ml-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="w-full px-5 py-4 bg-[#F9F9F9] border border-[#EEEEEE] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFB1D1] transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#333333] font-semibold mb-2 ml-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-[#F9F9F9] border border-[#EEEEEE] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFB1D1] transition-all text-xl"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-[#FFB1D1] focus:ring-[#FFB1D1] cursor-pointer"
              />

              <span className="text-[#717171] font-medium">
                Remember me
              </span>
            </label>

            <Link to="/forgot-password"
              className="text-[#FFB1D1] font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFB1D1] hover:bg-[#ff9dc5] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-3xl transition-colors text-xl shadow-sm"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-6 bg-[#FFF1F1] border border-[#FFD9D9] rounded-3xl p-4 text-center">
              <p className="text-[#E53E3E] font-medium">
                {error}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}