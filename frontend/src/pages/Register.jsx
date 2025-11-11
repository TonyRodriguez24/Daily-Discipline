import { register } from "../api/dailyDisciplineApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Register() { 
  
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const {token} = await register(formData)
        localStorage.setItem("token", token)
        setToken(token)
        navigate('/')
        setFormData(INITIAL_STATE);
      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


   const styles = "p-3 bg-stone-200 border-2 border-indigo-200 focus:outline-indigo-500 rounded-md";


  return (
    <>
      <div className="p-3 flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl p-10 pb-5 text-center">Get Started on Building Healthier Habits!</h1>
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
            Register
          </button>
        </form>
      </div>
    </>
  );
}
