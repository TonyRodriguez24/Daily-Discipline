import { useContext, useState } from "react";
import { login } from '../api/dailyDisciplineApi';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login({setToken}) {
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData); // no token expected
      navigate("/login"); // send user to login page
      setFormData(INITIAL_STATE);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

     const styles =
       "p-3 bg-stone-200 border-2 border-indigo-200 focus:outline-indigo-500 rounded-md";


  return (
    <div className="p-3 flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl p-10 pb-5 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col lg:w-1/6 gap-6">
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
    </div>
  );
}
