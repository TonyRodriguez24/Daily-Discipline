import { useEffect, useState, useRef } from "react";
import { getLogs, getAIInsights } from "../api/dailyDisciplineApi";

export default function Stats() {
  const [logs, setLogs] = useState([]);
  const [insights, setInsights] = useState("Loading AI insights...");
  const hasFetchedInsights = useRef(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getLogs(token);

        const sorted = res.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLogs(sorted);

        const last5Logs = sorted.slice(0, 5);

        const savedInsight = localStorage.getItem("aiInsights");
        if (savedInsight) {
          setInsights(savedInsight);
          hasFetchedInsights.current = true;
        } else if (!hasFetchedInsights.current) {
          const aiText = await getAIInsights(last5Logs);
          setInsights(aiText);
          localStorage.setItem("aiInsights", aiText);
          hasFetchedInsights.current = true;
        }
      } catch (err) {
        console.error(err);
        setInsights("Failed to fetch AI insights.");
      }
    };

    fetchData();
  }, []);

  const last5Logs = logs.slice(0, 5);

  const stats = last5Logs.reduce(
    (acc, log) => {
      acc.sleep += log.sleep_hours;
      acc.github += log.github_commits;
      acc.screenTime += log.screen_time;
      acc.workouts += log.did_workout ? 1 : 0;
      acc.weightSum += parseFloat(log.weight) || 0;
      return acc;
    },
    { sleep: 0, github: 0, screenTime: 0, workouts: 0, weightSum: 0 }
  );

  const entryCount = last5Logs.length;
  const averages = {
    sleep: entryCount ? (stats.sleep / entryCount).toFixed(1) : 0,
    github: entryCount ? (stats.github / entryCount).toFixed(1) : 0,
    screenTime: entryCount ? (stats.screenTime / entryCount).toFixed(1) : 0,
    workouts: stats.workouts,
    weight: entryCount ? (stats.weightSum / entryCount).toFixed(1) : 0,
  };

  // Parse AI insights into sections
  const renderInsights = () => {
    const lines = insights.split("\n");
    const elements = [];

    lines.forEach((line, i) => {
      line = line.trim();
      if (!line) return; // skip empty lines

      if (line.startsWith("**") && line.endsWith("**")) {
        // Convert "**Sleep**" to <h4>Sleep</h4>
        const header = line.slice(2, -2);
        elements.push(
          <h4 key={i} className="mt-4 text-lg font-semibold">
            {header}
          </h4>
        );
      } else if (line.startsWith("-")) {
        // Convert "- point" to a list item
        elements.push(
          <li key={i} className="ml-4 list-disc">
            {line.slice(1).trim()}
          </li>
        );
      } else if (line.startsWith("#")) {
        elements.push(
          <li key={i} className="ml-4 list-disc">
            {line.slice(3).trim()}
          </li>
        );
      } else {
        // Regular paragraph
        elements.push(
          <p key={i} className="ml-2">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="flex bg-zinc-200">
      <div className="flex flex-col w-1/3 border-r-2 border-zinc-500">
        <div className="flex flex-col w-full p-4 bg-zinc-200 border-b-2 border-zinc-500 justify-center items-center">
          <ul className="flex flex-col items-start p-5 bg-zinc-100 border-2 border-zinc-400 text-sm rounded-md shadow-xl">
            <h2 className="text-2xl font-bold w-full mb-2 p-2 ">Last 5 Entries Stats</h2>
            <li>
              <strong>Average Sleep Hours:</strong> {averages.sleep}
            </li>
            <li>
              <strong>Total Workouts:</strong> {averages.workouts} /{" "}
              {entryCount}
            </li>
            <li>
              <strong>Average GitHub Commits:</strong> {averages.github}
            </li>
            <li>
              <strong>Average Screen Time:</strong> {averages.screenTime} hrs
            </li>
            <li>
              <strong>Average Weight:</strong> {averages.weight} lbs
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-full bg-zinc-200">
          <h3 className="text-2xl font-semibold mt-4 mb-2">Recent Logs</h3>
          <ul className="flex flex-wrap gap-2 justify-center list-inside p-4 text-sm rounded-md">
            {last5Logs.map((log) => (
              <li key={log.id} className="flex flex-col bg-zinc-100 p-3 w-2/5 rounded-md border-2 border-zinc-400 ">
                <strong>{new Date(log.date).toLocaleDateString()}</strong>
                <div className="mt-1 space-y-1">
                  <p>Worked Out: {log.did_workout ? "Yes" : "No"}</p>
                  <p>Commits: {log.github_commits}</p>
                  <p>Screen Time: {log.screen_time} hrs</p>
                  <p>Sleep Hours: {log.sleep_hours} hrs</p>
                  <p>Weight: {log.weight} lbs</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col w-2/3 p-2 shadow-md text-sm">
        <h3 className="text-2xl md:text-xl font-bold mb-4">AI Insights</h3>
        <div className="flex flex-col rounded-md shadow-inner text-start p-2 ">
          {insights.split("\n\n").map((section, idx) => {
            const lines = section
              .split("\n")
              .filter((line) => line.trim() !== "");
            if (lines.length === 0) return null;
            let title = lines[0].replace(/\*\*/g, ""); // remove **
            title = title.replace(/^#+\s*/, ""); // remove leading # and optional space
            const items = lines.slice(1).map((line) => line.replace(/^- /, "")); // remove leading dash if exists
            return (
              <div
                key={idx}
                className="mb-4 bg-zinc-100 border-1 border-zinc-100 px-4 py-2 rounded-sm">
                <h4 className="text-lg font-semibold mb-2">{title}</h4>
                <ul className="list-inside space-y-1 text-left">
                  {items.map((item, i) => (
                    <li key={i} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
