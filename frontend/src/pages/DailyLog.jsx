import { useEffect } from "react";
import { useState } from "react";
import { getLogs } from "../api/dailyDisciplineApi";

export default function DailyLog() {
  const [formData, setFormData] = useState({
    didWorkout: false,
    sleepHours: "",
    githubCommits: "",
    screenTime: "",
    weight: "",
  });

 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-full max-w-md text-black mx-auto bg-amber-50 gap-4 p-6 rounded-lg shadow-md">
      {/* Did Workout */}
      <div className="flex justify-between items-center w-full bg-green-300 p-3 rounded">
        <label htmlFor="didWorkout" className="mr-4 font-medium">
          Did Workout:
        </label>
        <input
          type="checkbox"
          name="didWorkout"
          checked={formData.didWorkout}
          onChange={handleChange}
        />
      </div>

      {/* Sleep Hours */}
      <div className="flex justify-between items-center w-full bg-green-300 p-3 rounded">
        <label htmlFor="sleepHours" className="mr-4 font-medium">
          Sleep Hours:
        </label>
        <input
          type="number"
          name="sleepHours"
          value={formData.sleepHours}
          onChange={handleChange}
          className="border border-black rounded px-2 py-1 w-1/2"
        />
      </div>

      {/* GitHub Commits */}
      <div className="flex justify-between items-center w-full bg-green-300 p-3 rounded">
        <label htmlFor="githubCommits" className="mr-4 font-medium">
          GitHub Commits:
        </label>
        <input
          type="number"
          name="githubCommits"
          value={formData.githubCommits}
          onChange={handleChange}
          className="border border-black rounded px-2 py-1 w-1/2"
        />
      </div>

      {/* Screen Time */}
      <div className="flex justify-between items-center w-full bg-green-300 p-3 rounded">
        <label htmlFor="screenTime" className="mr-4 font-medium">
          Screen Time (hrs):
        </label>
        <input
          type="number"
          name="screenTime"
          value={formData.screenTime}
          onChange={handleChange}
          className="border border-black rounded px-2 py-1 w-1/2"
        />
      </div>

      {/* Weight */}
      <div className="flex justify-between items-center w-full bg-green-300 p-3 rounded">
        <label htmlFor="weight" className="mr-4 font-medium">
          Weight:
        </label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="border border-black rounded px-2 py-1 w-1/2"
        />
      </div>

      <button
        type="submit"
        className="cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 rounded mt-4">
        Submit Log
      </button>
    </form>
  );
}
