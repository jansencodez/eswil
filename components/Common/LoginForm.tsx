import React, { FormEvent, Dispatch, SetStateAction } from "react";

interface LoginFormProps {
  title: string;
  error: string;
  onSubmit: (event: FormEvent) => void;
  email?: string;
  setEmail?: Dispatch<SetStateAction<string>>;
  password?: string;
  setPassword?: Dispatch<SetStateAction<string>>;
  additionalFields?: React.ReactNode;
  // Allows passing additional fields
}

const LoginForm: React.FC<LoginFormProps> = ({
  title,
  error,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  additionalFields,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-navy-blue">
          {title}
        </h2>
        <form onSubmit={onSubmit}>
          {additionalFields}
          {setEmail && (
            <div className="mb-4">
              <label
                className="block text-slate-gray font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                required
                className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          )}
          {setPassword && (
            <div className="mb-4">
              <label
                className="block text-slate-gray font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                required
                className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition duration-300"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
