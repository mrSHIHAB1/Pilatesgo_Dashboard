
import React, { useState } from 'react';

const SetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password321');
  const [error, setError] = useState('Passwords do not match');

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      console.log("Password reset successful");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500 p-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-xl p-10 font-sans">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#333333] mb-3">
            Reset Password
          </h2>
          <p className="text-[#717171] text-lg">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          {/* New Password Field */}
          <div>
            <label className="block text-[#333333] font-semibold mb-2 ml-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-[#F9F9F9] border border-[#EEEEEE] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFB1D1] transition-all text-lg"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block text-[#333333] font-semibold mb-2 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-5 py-4 bg-[#F9F9F9] border rounded-2xl focus:outline-none focus:ring-2 transition-all text-lg ${
                error ? 'border-red-300 focus:ring-red-200' : 'border-[#EEEEEE] focus:ring-[#FFB1D1]'
              }`}
            />
            {/* Error Message - Placed exactly as in image */}
            {error && (
              <p className="text-[#E53E3E] text-sm mt-3 ml-1">
                {error}
              </p>
            )}
          </div>

          {/* Reset Password Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#FFB1D1] hover:bg-[#ff9dc5] text-white font-bold py-4 rounded-[30px] transition-colors text-xl shadow-sm"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;