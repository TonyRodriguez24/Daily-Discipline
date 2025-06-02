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

  return (
    <>
      <h1>History</h1>
      {logs.map((log) => (
        <div
          key={log.id}
          className="bg-amber-50 text-black w-1/5 mx-auto flex flex-col gap-2 p-3 text-start">
          <p>
            {format(new Date(log.date), "MMMM d, yyyy")}
          </p>
          <p>Did you workout? {log.did_workout ? "Yes" : "No"}</p>
          <p>Amount of Sleep: {log.sleep_hours} hours</p>
          <p>Github Commits: {log.github_commits}</p>
          <p>Screen Time: {log.screen_time} hours</p>
          {log.weight && <p>Weight: {log.weight}</p>}
        </div>
      ))}
    </>
  );
}
