import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from '../context/AuthContext';
import Logo from "../assets/qliqueLogo.png";
import EyeIcon from "../assets/hide.png";

const SignInForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/'); // Redirect to home after successful login
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between items-center bg-white px-4 py-4">
      <Link to="/" className="flex items-center space-x-1">
        <img src={Logo} alt="Qlique Logo" className="h-12 w-auto" />
        <span className="gilroy text-2xl md:text-3xl font-bold text-green-900">Qlique</span>
      </Link>

      {/* Middle: Card + Divider + Create Account */}
      <div className="flex flex-col items-center flex-1 justify-center w-full max-w-md">
        <div className="w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="poppins text-2xl font-semibold text-center mb-6">Sign in</h2>

          {authError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="poppins block text-sm text-[#666666] mb-1">
                Email or mobile phone number
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="poppins block text-sm text-gray-700">
                  Your password
                </label>
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="poppins flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  <img src={EyeIcon} alt="Toggle password visibility" className="h-5 w-5" />
                  <span>{passwordVisible ? "Hide" : "Show"}</span>
                </button>
              </div>

              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="poppins w-full bg-[#024E44] text-white py-2 px-4 rounded-full hover:bg-green-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Log in'}
            </button>

            {/* Terms */}
            <p className="poppins text-xs text-center text-black">
              By continuing, you agree to the{" "}
              <a href="/terms" className="text-black underline hover:underline">Terms of use</a> and{" "}
              <a href="/privacy" className="text-black underline hover:underline">Privacy Policy</a>.
            </p>

            {/* Extra links */}
            <div className="flex justify-between text-xs text-black">
              <a href="/help" className="poppins underline hover:underline">Other issue with sign in</a>
              <a href="/forgot-password" className="poppins underline hover:underline">Forgot your password</a>
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center w-full my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="poppins mx-4 text-sm text-gray-500">New to our community</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Create account */}
        <Link to="/signup" className="poppins w-full border border-gray-400 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-100 transition text-center">
          Create an account
        </Link>
      </div>

      {/* Footer */}
      <footer className="w-full pt-4 border-t border-gray-300 text-xs text-gray-600 text-center">
        <div className="poppins flex justify-center flex-wrap gap-4">
          <a href="/help" className="hover:underline">Help Center</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/credits" className="hover:underline">©2025 Qlique</a>
        </div>
      </footer>
    </div>
  );
};

export default SignInForm;
