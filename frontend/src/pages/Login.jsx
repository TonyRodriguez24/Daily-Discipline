import { useState } from "react";
import { login } from "../api/dailyDisciplineApi";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess(false);

    try {
      const { token } = await login(formData);
      localStorage.setItem("token", token);
      setToken(token);
      setSuccess(true);
      setFormData(INITIAL_STATE);

      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      const message =
        error.response.data.error.message  || "Something went wrong.";

      setErrorMsg(message);
    }



  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const styles =
    "p-3 bg-stone-200 border-2 border-indigo-200 focus:outline-indigo-500 rounded-md";

  return (
    <div className="p-3 flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl p-10 pb-5 text-center">Login</h1>

      {success ? (
        <div className="flex flex-col items-center justify-center w-2/3 mt-20 mx-auto p-6 bg-green-100 border border-green-400 rounded-lg shadow-md">
          <svg
            className="w-12 h-12 text-green-600 mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"></path>
          </svg>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Success!</h2>
          <p className="text-green-700 text-center">
            You have successfully logged in.
          </p>
        </div>
      ) : (
        <>
          {errorMsg && (
            <p className="text-red-600 text-center">
              {typeof errorMsg === "string" ? errorMsg : errorMsg.message}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:w-1/6 gap-6">
            <input
              type="text"
              id="username"
              onChange={handleChange}
              value={formData.username}
              name="username"
              placeholder="Enter username"
              className={styles}
            />
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              placeholder="Enter password"
              className={styles}
            />
            <button className="py-3 px-4 rounded-md bg-blue-700 text-white cursor-pointer">
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
}
