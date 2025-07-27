import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<"Weak" | "Medium" | "Strong" | "Too Short" | "">("");

  const evaluatePasswordStrength = (pwd: string): typeof passwordStrength => {
    if (!pwd) return "";
    if (pwd.length < 6) return "Too Short";

    let strength = 0;
    if (/[a-z]/.test(pwd)) strength++; // lowercase
    if (/[A-Z]/.test(pwd)) strength++; // uppercase
    if (/\d/.test(pwd)) strength++;    // number
    if (/[\W_]/.test(pwd)) strength++; // special character

    if (strength <= 1) return "Weak";
    if (strength === 2 || strength === 3) return "Medium";
    if (strength === 4) return "Strong";
    return "";
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await register(name, email, password);
      setSuccess("✅ Registered successfully. Redirecting to login...");
      setName("");
      setEmail("");
      setPassword("");
      setPasswordStrength("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Welcome Panel */}
      <div
        className="w-1/2 relative bg-cover bg-center text-white hidden lg:flex flex-col justify-center items-center px-10 py-16"
        style={{
          backgroundImage: `url('/Motivational Reminder - Mobile Wallpaper.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
        <div className="relative z-10 text-center max-w-md">
          <h1 className="text-5xl font-light font-Quicksand mb-4">
            Welcome to <span className="font-semibold">TheSearchifi</span>
          </h1>
          <p className="text-sm mt-2">
            Discover, share, and build amazing web components and full-stack projects with our AI-powered platform.
          </p>
        </div>
      </div>

      {/* Right Side - Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col relative bg-gray-50">
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-sm text-black font-Quicksand hover:text-gray-500"
        >
          ← Back
        </button>

        <div className="flex flex-1 items-center justify-center px-8 py-10 text-gray-900">
          <div className="w-full max-w-md p-8">
            <h2 className="text-4xl text-center font-Quicksand font-light mb-6">Create Your Account</h2>
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  value={password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPassword(val);
                    setPasswordStrength(evaluatePasswordStrength(val));
                  }}
                  required
                />
                {passwordStrength && (
                  <p
                    className={`text-sm mt-1 ${
                      passwordStrength === "Strong"
                        ? "text-green-600"
                        : passwordStrength === "Medium"
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    Password Strength: {passwordStrength}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-200"
              >
                Register
              </button>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {success && <p className="text-green-600 text-sm text-center">{success}</p>}
            </form>

            <div className="mt-6">
              <button
                type="button"
                className="w-full flex items-center text-black justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                onClick={() => alert("Not implemented yet. Work in progress.")}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
            </div>

            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
