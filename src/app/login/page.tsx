"use client";

import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "@/authService";
import { useRouter } from "next/navigation";
import { useToast } from "../(components)/ToastContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();
  const [error, setError] = useState<string | null>("");
 const {addToast} = useToast();
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await signIn(email, password);
      addToast("User signed in: ", 'success');
      router.push('/');
    } catch (error) {
      addToast('Failed to login', 'error');
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Can't be empty";
    }
    if (!password) {
      newErrors.password = "Please check again";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", { email, password });
    }
  };

  return (
    <div className="flex flex-col md:items-center justify-center lg:h-screen md:h-auto h-auto bg-white md:bg-gray-50 lg:p-0 md:p-6 p-6  instrument-sans space-y-8">
      <Image src="/images/Group 252.png" alt="logo" width={150} height={37} />

      <div className="w-full max-w-md  md:p-6 space-y-4 bg-white rounded-xl">
        <h2 className="mt-4 text-2xl font-extrabold text-gray-900">Login</h2>
        <p className="mb-4 text-base md:text-sm text-gray-600">
          Add your details below to get back into the app
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
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
                className={`login-focus text-sm md:text-base relative block w-full px-10 py-2 border rounded-md appearance-none focus:outline-none sm:text-sm ${
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
                  errors.email ? "text-red-500" : "text-gray-800"
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
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`login-focus relative text-sm md:text-base block w-full px-10 py-2 border rounded-md appearance-none focus:outline-none sm:text-sm ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="absolute right-0 top-0 mt-1 text-xs text-red-500">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn flex justify-center w-full px-4 py-3 text-sm font-medium text-white border border-transparent rounded-md group focus:outline-none"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <p className="text-base md:text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Create account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
