import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div
        className="w-1/2 relative bg-cover bg-center text-white flex flex-col justify-center items-center px-10 py-16"
        style={{
          backgroundImage: `url('Motivational Reminder - Mobile Wallpaper.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
        <div className="relative z-10 text-center max-w-md">
          <h1 className="text-6xl font-thin font-Quicksand mb-4">Welcome Back</h1>
          <p className="text-sm">
            Discover, share, and build amazing web components and full-stack projects with our AI-powered platform.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-white text-black flex justify-center items-center px-10 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-sm text-black font-Quicksand hover:text-gray-400"
        >
          ← Back
        </button>

        <div className="w-full max-w-sm">
          <h1 className="text-4xl font-light font-Quicksand w-[300px] text-gray-900 mb-2">Welcome Back To TheSearchifi</h1>
          <p className="text-sm text-gray-600 mb-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Create a new account now
            </a>
            , it’s FREE! Takes less than a minute.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
            >
              Login Now
            </button>

            <button
              type="button"
              className="w-full border border-gray-500 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
              Login with Google
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </form>

          <div className="text-sm text-center mt-4">
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Click here
            </a>{" "}
            to reset password
          </div>
        </div>
      </div>
    </div>
  );
}
