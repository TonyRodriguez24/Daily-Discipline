import { useEffect, useState } from "react";
import { getLogs } from "../api/dailyDisciplineApi";
import { format } from "date-fns";

const formatted = format(new Date("2025-05-29T04:00:00.000Z"), "MMMM d, yyyy");
// → "May 29, 2025"


export default function History() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getLogs(token);
        console.log(response)
        setLogs(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogs();
  }, []);

  function CommitBoxes({ log }) {
    return (
      <div style={{ display: "flex", gap: "8px" }}>
        {Array.from({ length: log.github_commits }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "lightgreen",
              display: "flex",

            }}>
          </div>
        ))}
      </div>
    );
  }
function HoursVisual({ value, bgColor }) {
  const fullHours = Math.floor(value);
  const partialHour = value - fullHours;

  return (
    <div className="flex gap-1">
      {/* Full hour boxes */}
      {Array.from({ length: fullHours }).map((_, i) => (
        <div
          key={i}
          className={`w-8 h-6 ${bgColor} text-sm flex font-bold justify-center items-center`}>
          {i + 1}
        </div>
      ))}

      {/* Partial hour box */}
      {partialHour > 0 && (
        <div
          className={`h-6 ${bgColor}`}
          style={{ width: `${32 * partialHour}px` }} 
        />
      )}
    </div>
  );
}


 // Example usage:


 




  return (
    <>
      <h1 className="text-4xl font-bold text-start py-3 text-white mb-5">History</h1>
      <div className="flex flex-wrap w-full gap-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-white text-black  w-1/5 p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-col gap-2 mb-4">
              <h2 className="text-3xl text-start font-bold text-gray-800">
                {format(new Date(log.date), "MMMM d, yyyy")}
              </h2>
              <hr className="w-11/12"></hr>
            </div>
            <ul className="text-2xl text-white text-start flex flex-col gap-2">
              <li className="bg-pink-800 p-2 rounded-xl">
                <span className="text-2xl">
                  {log.did_workout ? "💪💪💪" : "❌❌❌"}
                </span>
              </li>
              <li className="bg-blue-500 flex flex-col gap-2 text-white rounded-xl p-2">
                Sleep
                <HoursVisual
                  value={log.sleep_hours}
                  bgColor={"bg-indigo-600"}
                />
              </li>
              <li className="bg-emerald-600 flex flex-col gap-2 text-white rounded-xl p-2">
                Commits
                <CommitBoxes log={log} />
              </li>

              <li className="bg-orange-400 flex flex-col gap-2 text-white rounded-xl p-2">
                Screen time
                <HoursVisual
                  value={log.screen_time}
                  bgColor={"bg-red-500"}
                />
              </li>

              {log.weight && (
                <li className="flex flex-col gap-2 p-2 bg-indigo-500 text-white">
                  Weight <span className="bg-indigo-900 w-fit p-1 px-2 font-bold  rounded-md text-sm">{log.weight} lbs</span>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
