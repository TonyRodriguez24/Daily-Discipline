import { useEffect, useState } from "react";
import { getQuote } from "../api/dailyDisciplineApi";
import { Link } from "react-router-dom";

export default function Home() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedQuote = localStorage.getItem("quote");
    if (storedQuote) {
      setQuote(JSON.parse(storedQuote));
      setLoading(false);
    } else {
      const fetchQuote = async () => {
        try {
          const response = await getQuote();
          const firstQuote = response[0];
          setQuote(firstQuote);
          localStorage.setItem("quote", JSON.stringify(firstQuote));
        } catch (err) {
          console.error("Failed to fetch quote:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchQuote();
    }
  }, []);


  return (
    <>
      <div className="w-full h-[calc(100vh-72px)] flex flex-col justify-center items-center ">
        {loading ? (
          <p>Loading quote...</p>
        ) : quote ? (
          <p className="text-6xl w-2/3 p-10">
            {quote.q}
          </p>
        ) : (
          <p>Failed to load quote.</p>
        )}

        <Link className="bg-emerald-500 border-3 border-green-900 p-3 m-3" to="/daily-log">
          Get Started on Tracking Your Progress
        </Link>
      </div>
    </>
  );
}
