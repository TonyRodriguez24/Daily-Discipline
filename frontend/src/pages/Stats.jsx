import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getLogs } from "../api/dailyDisciplineApi";

export default function Stats() {
  const [logs, setLogs] = useState([]);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const sleepData = logs
    .map((log) => {
      const dateObj = new Date(log.date);
      const dayIndex = dateObj.getDay(); // 0 (Sun) to 6 (Sat)

      return {
        name: weekdays[dayIndex], // Will be "Mon", "Tue", etc.
        hours: log.sleep_hours,
      };
    })
    .filter((d) => ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(d.name));

  const screenTime = logs.map((log) => ({
    value: log.screen_time,
  }));

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getLogs(token);
        console.log(response);
        setLogs(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <>
      <h1>Stats</h1>
      <div className="flex flex-col w-full gap-10">
        <div className="bg-white text-black flex">
          <h1>Worked out</h1>
        </div>
        <div className="w-1/2 bg-white text-black">
          <h1>Sleep Hours</h1>
          <h2 className=" font-semibold mb-2">Last 7 Entries</h2>
          <ResponsiveContainer height={500}>
            <BarChart
              data={sleepData}
              margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="5 4" />
              <XAxis dataKey="name" /> {/* Shows "Mon" through "Fri" */}
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="hours"
                fill="#4ade80"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white text-black flex">
          <h1>Commits</h1>
        </div>
        <div className=" w-full max-w-xs bg-white text-black">
          <h1>Screen Time</h1>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={screenTime}>
              <Tooltip />
              <Bar dataKey="value" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white text-black flex">
          <h1>Weight</h1>
          <ResponsiveContainer height={500}>
            <BarChart
              data={sleepData}
              margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="5 4" />
              <XAxis dataKey="name" /> {/* Shows "Mon" through "Fri" */}
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="hours"
                fill="#4ade80"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
