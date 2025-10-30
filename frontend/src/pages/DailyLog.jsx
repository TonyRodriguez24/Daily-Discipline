import { useEffect } from "react";
import { useState } from "react";
import { getLogs } from "../api/dailyDisciplineApi";
import Counter from "../components/layout/Counter";
import axios from "axios";
import { createLog } from "../api/dailyDisciplineApi";

export default function DailyLog() {
  const INITIAL_STATE = {
    didWorkout: false,
    sleepHours: 7,
    githubCommits: 0,
    screenTime: 5,
    weight: "",
  };

  
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false)
 
 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    if (!token) return;

    // const today = new Date().toISOString().split("T")[0]; 
    const today = "2025-9-05";
    const formDataWithDate = {
      ...formData,
      date: today,
    };

    try {
      const res = await createLog(formDataWithDate, token);
      console.log(res)
      setIsSubmitted(true)
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <>
      {isSubmitted ? (
        <div>successfully submitted form</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-full max-w-md text-black my-4 mx-auto bg-white gap-4 p-6 rounded-lg shadow-md">
          {/* Did Workout */}
          <div className="w-full p-5 rounded-lg flex flex-col items-center gap-3">
            <p className="text-3xl font-bold">
              Did You Work Out?
            </p>
            <label
              htmlFor="didWorkout"
              className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="didWorkout"
                name="didWorkout"
                checked={formData.didWorkout}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-20 h-10 bg-gray-400 rounded-full peer peer-checked:bg-green-600 transition-all"></div>
              <div className="absolute left-0.5 top-0.5 w-9 h-9 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-full"></div>
            </label>
          </div>

          {/* Sleep Hours */}
          <div className="flex flex-col items-center gap-3 text-sm w-full p-3 rounded">
            <p className="text-3xl font-bold">Sleep Hours</p>
            <Counter
              formData={formData}
              setFormData={setFormData}
              field={"sleepHours"}
              step={0.5}
            />
          </div>

          <div className="flex flex-col items-center gap-4 text-sm w-full p-3 rounded">
            <p className="text-3xl font-bold">Github Commits</p>
            <Counter
              formData={formData}
              setFormData={setFormData}
              field={"githubCommits"}
              step={1}
            />
          </div>

          <div className="flex flex-col items-center gap-4 text-sm w-full p-3 rounded">
            <p className="text-3xl font-bold">Screen Time</p>
            <Counter
              formData={formData}
              setFormData={setFormData}
              field={"screenTime"}
              step={0.5}
            />
          </div>

          {/* Weight */}
          <div className="flex flex-col justify-center items-center w-full p-3 rounded">
            <label htmlFor="weight" className="text-3xl mb-1 font-medium">
              Weight:
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="border border-black rounded px-2 py-1 w-1/3 text-2xl"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 rounded mt-4">
            Submit Log
          </button>
        </form>
      )}
    </>
  );
}
