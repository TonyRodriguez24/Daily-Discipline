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
      className="flex flex-col justify-center items-center w-1/2 mx-auto">
      <div className="flex gap-2 p-3 bg-amber-300">
        <label htmlFor="didWorkout" />
        Did Workout:
        <input
          type="checkbox"
          name="didWorkout"
          checked={formData.didWorkout}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          Sleep Hours:
          <input
            type="number"
            name="sleepHours"
            value={formData.sleepHours}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          GitHub Commits:
          <input
            type="number"
            name="githubCommits"
            value={formData.githubCommits}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Screen Time (hrs):
          <input
            type="number"
            name="screenTime"
            value={formData.screenTime}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit">Submit Log</button>
    </form>
  );
}
