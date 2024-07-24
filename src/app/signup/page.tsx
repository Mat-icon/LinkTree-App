"use client";

import {
  LockClosedIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import React, { useState } from "react";
import { signUp } from "@/authService";
import { useRouter } from "next/navigation";
import { useToast } from "../(components)/ToastContext";

const SignUp: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const { addToast } = useToast();
  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!email) {
      newErrors.email = "Can't be empty";
    }
    if (!password) {
      newErrors.password = "Please check again";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please check again";
    } else if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await signUp(email, password);
      router.push("/");
      addToast("User signed up: ", 'success');
    } catch (error) {
      addToast('Error try again', 'error' );
    }
  };

  return (
    <div className="flex flex-col md:items-center justify-center lg:h-screen md:h-auto h-auto bg-white md:bg-gray-50 lg:p-0 md:p-6 p-6  instrument-sans space-y-8">
      <Image
        src="/images/Group 252.png"
        alt="logo"
        width={150}
        height={37}
        className="pl-4 md:pl-0"
      />

      <div className="w-full max-w-md  md:p-6 space-y-4 bg-white rounded-xl">
        <h2 className="mt-4 text-2xl font-extrabold text-gray-900">
          Create account
        </h2>
        <p className="mb-4 text-base md:text-sm text-gray-600">
          Let&apos;s get you started sharing your links!
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="rounded-md shadow-sm">
            <div className="relative space-y-1">
              <label
                htmlFor="email-address"
                className={`text-xs ${
                  errors.email ? "text-red-500" : "text-gray-800"
                }`}
              >
                Email address
              </label>
              <div className="absolute z-10 left-0 bottom-3 flex items-center pl-3 pointer-events-none">
                <EnvelopeIcon className="w-4 h-4 text-gray-600" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`login-focus relative block text-sm md:text-base w-full px-10 py-2 border rounded-md appearance-none focus:outline-none sm:text-sm ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. alex@email.com"
              />
              {errors.email && (
                <p className="absolute right-0 top-0 mt-1 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="relative space-y-1 mt-4">
              <label
                htmlFor="password"
                className={`text-xs ${
                  errors.password ? "text-red-500" : "text-gray-800"
                }`}
              >
                Password
              </label>
              <div className="absolute z-10 left-0 bottom-3 flex items-center pl-3 pointer-events-none">
                <LockClosedIcon className="w-4 h-4 text-gray-600" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`login-focus relative block text-sm md:text-base w-full px-10 py-2 border rounded-md appearance-none focus:outline-none sm:text-sm ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="At least 8 characters"
              />
              <div className="absolute bottom-3 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="absolute right-0 top-0 mt-1 text-xs text-red-500">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="relative space-y-1 mt-4">
              <label
                htmlFor="confirm-password"
                className={`text-xs ${
                  errors.confirmPassword ? "text-red-500" : "text-gray-800"
                }`}
              >
                Confirm Password
              </label>
              <div className="absolute z-10 left-0 bottom-3 flex items-center pl-3 pointer-events-none">
                <LockClosedIcon className="w-4 h-4 text-gray-600" />
              </div>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`login-focus relative block w-full text-sm md:text-base px-10 py-2 border rounded-md appearance-none focus:outline-none sm:text-sm ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="At least 8 characters"
              />
              <div className="absolute  bottom-3 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="absolute right-0 top-0 mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn flex justify-center w-full px-4 py-3 text-sm font-medium text-white border border-transparent rounded-md group focus:outline-none"
            >
              create an account
            </button>
          </div>
          <div className="text-center">
            <p className="text-base md:text-sm text-gray-600 ">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Create new account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
