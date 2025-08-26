import React, { useState } from 'react';
import { Link } from "react-router-dom"; 
import Logo from "../assets/qliqueLogo.png";
import EyeIcon from "../assets/hide.png";

const SignupForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

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
            <a href="/login" className="poppins text-black undeline hover:underline">
              Log in
            </a>
          </p>

          <form className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="poppins block text-sm font-medium text-[#666666]">
                What should we call you?
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your profile name"
                className="poppins mt-1 w-full text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="poppins block text-sm font-medium text-[#666666]">
                What’s your email?
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="poppins text-sm mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
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
                    className="flex items-center text-xs text-gray-600 hover:text-gray-800">
                <img src={EyeIcon} alt="Toggle password visibility" className="h-5 w-5" />
                <span className="poppins ml-1">{passwordVisible ? "Hide" : "Show"}</span>
                </button>
            </div>
            <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                className="poppins text-sm w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />

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
              className="poppins w-full bg-[#024E44] text-white py-2 px-4 rounded-full hover:bg-green-900 transition"
            >
              Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
