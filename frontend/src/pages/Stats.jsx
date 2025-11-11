import { useEffect, useState } from "react";
import { getLogs } from "../api/dailyDisciplineApi";

export default function Stats() {
  const [logs, setLogs] = useState([]);

  console.log(logs);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getLogs(token);
        setLogs(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogs();
  }, []);

  const formattedDate = logs.map((log) => {
    const d = new Date(log.date);
    return {
      date: d.toISOString().slice(0, 10),
      month: String(d.getMonth() + 1).padStart(2, "0"),
      day: String(d.getDate()).padStart(2, "0"),
      year: String(d.getFullYear()),
    };
  });

  

  console.log(formattedDate);

  date: "2025-06-03T04:00:00.000Z";
  did_workout: true;
  github_commits: 1;
  id: 3;
  screen_time: 5.5;
  sleep_hours: 7.5;
  weight: "250";

  return (
    <div>
      {logs.map((log) => (
        <li>{log.date}</li>
      ))}
    </div>
  );
}
