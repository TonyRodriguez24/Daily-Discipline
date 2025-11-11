import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteLog, getLogs } from "../api/dailyDisciplineApi";

export default function History() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getLogs(token);

        // Sort by date descending (newest first)
        const sortedLogs = response.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setLogs(sortedLogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogs();
  }, []);

  // Group logs by month
  const logsByMonth = logs.reduce((acc, log) => {
    const month = format(new Date(log.date), "MMMM yyyy");
    if (!acc[month]) acc[month] = [];
    acc[month].push(log);
    return acc;
  }, {});

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
            }}></div>
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

  return (
    <>
      <h1 className="text-4xl w-full flex justify-center text-white font-bold text-start py-5 bg-gray-800">
        History
      </h1>

      {Object.entries(logsByMonth).map(([month, monthLogs]) => (
        <div
          key={month}
          className="p-5 w-full bg-gray-400 border-b-2 border-gray-700">
          {/* Month Header */}
          <div className="bg-stone-800 flex items-center text-white text-2xl font-bold px-4 py-2 rounded-lg ml-4 mb-4 shadow-md w-fit gap-4">
            {month}
            <Link className="bg-green-300 px-3 py-1 text-sm font-bold text-black" to={'/daily-log'}>+</Link>
          </div>

          {/* Logs for this month */}
          <div className="flex flex-wrap w-full gap-4 bg-gray-400 p-4">
            {monthLogs.map((log) => (
              <div
                key={log.id}
                className="bg-stone-200 border-3 text-black lg:w-1/5 mx-auto relative lg:mx-0 p-6 rounded-lg shadow-md border border-stone-700">
                <Link
                  to={`/daily-log/edit/${log.id}`}
                  className="bg-blue-400 absolute top-0 right-10 rounded-sm text-sm p-1 px-3 m-1">
                  Edit
                </Link>
                <button
                  to={`/daily-log/${log.id}`}
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token");
                      await deleteLog(log.id, token);
                      setLogs((prev) => prev.filter((l) => l.id !== log.id));
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  className="bg-red-400 absolute top-0 right-0 rounded-sm text-sm p-1 px-3 m-1 cursor-pointer">
                  X
                </button>
                <div className="flex flex-col gap-2 mb-4">
                  <h2 className="text-3xl text-start font-bold text-gray-800">
                    {format(new Date(log.date), "MMM. d")}
                  </h2>
                  <hr className="w-full border-2 border-stone-500"></hr>
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
                      Weight{" "}
                      <span className="bg-indigo-900 w-fit p-1 px-2 font-bold rounded-md text-sm">
                        {log.weight} lbs
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
