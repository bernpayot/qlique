import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from '../context/AuthContext';
import Logo from "../assets/qliqueLogo.png";
import EyeIcon from "../assets/hide.png";

const SignupForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  
  const { register, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setFieldErrors({});
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await register(formData);
      if (result.success) {
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        // Handle registration failure
        if (result.error) {
          setError(result.error);
        }
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white px-4 pt-16">
      <Link to="/" className="absolute top-6 left-6 flex items-center space-x-2">
        <img src={Logo} alt="Qlique Logo" className="h-10 w-auto" />
        <span className="gilroy text-2xl font-bold text-[#024E44]">Qlique</span>
      </Link>

      {/* Centered form */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md space-y-4">
          <h2 className="poppins text-2xl font-semibold text-center text-black">Create an account</h2>
          <p className="poppins text-center mb-8 text-sm text-black">
            Already have an account?{' '}
            <Link to="/signin" className="poppins text-black underline hover:underline">
              Log in
            </Link>
          </p>

          {/* Error Message */}
          {(error || authError) && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error || authError}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="poppins block text-sm font-medium text-[#666666]">
                What should we call you?
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your profile name"
                className="poppins mt-1 w-full text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              {fieldErrors.name?.[0] && (
                <p className="poppins text-xs text-red-600 mt-1">{fieldErrors.name[0]}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="poppins block text-sm font-medium text-[#666666]">
                What's your email?
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="poppins text-sm mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              {fieldErrors.email?.[0] && (
                <p className="poppins text-xs text-red-600 mt-1">{fieldErrors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="poppins block text-sm font-medium text-[#666666]">
                  Create a password
                </label>
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="flex items-center text-xs text-gray-600 hover:text-gray-800"
                >
                  <img src={EyeIcon} alt="Toggle password visibility" className="h-5 w-5" />
                  <span className="poppins ml-1">{passwordVisible ? "Hide" : "Show"}</span>
                </button>
              </div>
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="poppins text-sm w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              {fieldErrors.password?.[0] && (
                <p className="poppins text-xs text-red-600 mt-1">{fieldErrors.password[0]}</p>
              )}
              <p className="poppins text-xs text-gray-500 mt-1">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </p>
            </div>

            {/* Terms */}
            <p className="poppins text-xs text-black">
              By creating an account, you agree to the{' '}
              <a href="/terms" className="text-black underline hover:underline">Terms of use</a> and{' '}
              <a href="/privacy" className="text-black underline hover:underline">Privacy Policy</a>.
            </p>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="poppins w-full bg-[#024E44] text-white py-2 px-4 rounded-full hover:bg-green-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create an account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
