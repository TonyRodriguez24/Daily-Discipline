import { useEffect, useState } from "react";
import { getLogs } from "../api/dailyDisciplineApi";

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
        <div key={log.id} className="bg-amber-300 w-1/2 mx-auto">
          <p>{log.date}</p>
          <p>{log.did_workout ? "Yes" : "No"}</p>
          <p>Amount of Sleep: {log.sleep_hours} hours</p>
          <p>Github Commits: {log.github_commits}</p>
          <p>Screen Time: {log.screen_time} hours</p>
          {log.weight && <p>Weight: {log.weight}</p>}
        </div>
      ))}
    </>
  );
}
