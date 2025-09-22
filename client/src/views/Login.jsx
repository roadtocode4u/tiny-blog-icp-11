import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginUser = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      user
    );
    if (response?.data?.success) {
      localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));

      window.location.href = "/";
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl my-4">Login</h1>

      <div className="max-w-[400px] mx-auto border-1 border-gray-500 py-10 px-14 rounded-md">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-4"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-4"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className="bg-gray-700 text-white px-6 py-2 rounded-md"
          onClick={loginUser}
          type="button"
        >
          Login
        </button>

        <p className="mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
