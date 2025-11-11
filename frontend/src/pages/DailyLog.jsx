import { useState } from "react";
import { createLog } from "../api/dailyDisciplineApi";
import Counter from "../components/layout/Counter";
import { useNavigate } from "react-router-dom";

export default function DailyLog() {
  const INITIAL_STATE = {
    didWorkout: false,
    sleepHours: 7,
    githubCommits: 0,
    screenTime: 5,
    weight: "",
    date: new Date().toISOString().split("T")[0],
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // <-- New state for errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLoading(true);
    setError(null); // reset previous errors

    try {
      const res = await createLog(formData, token);
      console.log(res);
      setIsSubmitted(true);

      setTimeout(() => {
        navigate("/history");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to submit log. Please try again."); // <-- set error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isSubmitted && !isLoading ? (
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
            Your daily log has been successfully submitted.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          {/* Error message */}
          {error && (
            <div className="w-2/3 my-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center lg:w-1/3 text-black my-7 mx-auto gap-2 p-6 rounded-lg shadow-md border-4 border-gray-700 bg-zinc-200">
            {/* Did Workout */}
            <div className="w-full p-1 rounded-lg flex flex-col items-center gap-3">
              <p className="text-2xl font-bold">Did You Work Out?</p>
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
                <div className="w-19 h-8 bg-black rounded-full peer peer-checked:bg-green-600 transition-all"></div>
                <div className="absolute left-0.5 top-0.5 w-9 h-7 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-full"></div>
              </label>
            </div>

            {/* Sleep Hours */}
            <div className="flex flex-col items-center gap-3 text-sm w-full p-3 rounded">
              <p className="text-2xl font-bold">Sleep Hours</p>
              <Counter
                formData={formData}
                setFormData={setFormData}
                field={"sleepHours"}
                step={0.5}
              />
            </div>

            {/* Github Commits */}
            <div className="flex flex-col items-center gap-4 text-sm w-full p-3 rounded">
              <p className="text-2xl font-bold">Github Commits</p>
              <Counter
                formData={formData}
                setFormData={setFormData}
                field={"githubCommits"}
                step={1}
              />
            </div>

            {/* Screen Time */}
            <div className="flex flex-col items-center gap-4 text-sm w-full p-3 rounded">
              <p className="text-2xl font-bold">Screen Time</p>
              <Counter
                formData={formData}
                setFormData={setFormData}
                field={"screenTime"}
                step={0.5}
              />
            </div>

            {/* Weight */}
            <div className="flex flex-col justify-center items-center w-full p-3 rounded">
              <label htmlFor="weight" className="text-2xl mb-1 font-medium">
                Weight:
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="border-2 border-black rounded px-2 py-1 w-1/5 text-2xl bg-white"
              />
            </div>

            {/* Date */}
            <div className="flex flex-col justify-center items-center w-full p-3 rounded">
              <label htmlFor="date" className="text-2xl mb-1 font-medium">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border-2 border-black rounded px-2 py-1 w-1/2 text-2xl flex items-center justify-evenly bg-white"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 rounded mt-4">
              Submit Log
            </button>
          </form>
        </div>
      )}
    </>
  );
}
