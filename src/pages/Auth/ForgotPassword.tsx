
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react'; // Using lucide-react for icons

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('admin@pilatesglo.com');
  const [isSent, setIsSent] = useState(true); // Set to true for demonstration

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending reset link to:", email);
    setIsSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-xl p-10 font-sans relative">
        
        {/* Back to Login Link */}
        <button 
          className="flex items-center text-[#717171] hover:text-[#333333] transition-colors mb-10 text-lg font-medium"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Login
        </button>

        {/* Title & Description */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#333333] mb-3">
            Forgot Password?
          </h2>
          <p className="text-[#717171] leading-relaxed">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-[#333333] font-semibold mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-[#F9F9F9] border border-[#EEEEEE] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFB1D1] transition-all"
            />
          </div>
          {/* Send Reset Link Button */}
          <button
            type="submit"
            className="w-full bg-[#FFB1D1] hover:bg-[#ff9dc5] text-white font-bold py-4 rounded-3xl transition-colors text-xl shadow-sm"
          >
            Send Reset Link
          </button>

          {/* Success Message Box */}
          {isSent && (
            <div className="mt-8 bg-[#EFFFF9] border border-[#D4F8ED] rounded-2xl p-4 flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
              <p className="text-[#333333] font-medium">
                Reset link sent! Check your inbox.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;