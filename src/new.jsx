import React, { useState, useEffect } from "react";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy tech news articles
  useEffect(() => {
    setArticles([
      "Google launches Gemini 1.5 with 1M-token context window.",
      "Firebase Studio now supports real-time database tracing.",
      "Vertex AI enhances support for fine-tuning custom models.",
    ]);
  }, []);

  // Fetch summaries using Gemini API
  const fetchSummaries = async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        articles.map(async (headline) => {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAOR_g47fKALmUCjJlyn5qXO92eGltYAmE`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: `Summarize this tech headline in 1-2 sentences: "${headline}"`,
                      },
                    ],
                  },
                ],
              }),
            }
          );

          const data = await response.json();
          return (
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No summary available."
          );
        })
      );
      setSummaries(results);
    } catch (err) {
      console.error("Error fetching summaries:", err);
      setSummaries(articles.map(() => "Error summarizing."));
    }
    setLoading(false);
  };

  return (
    <div className="content-container news-container">
      <h2 style={{ marginBottom: "2rem", color: "#1a73e8", textAlign: "center" }}>📡 Tech News Feed</h2>
      {articles.map((headline, i) => (
        <div
          key={i}
          style={{
            background: "#ffffff",
            padding: "1.5rem",
            marginBottom: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderLeft: "5px solid #4285F4", // Google Blue accent
          }}
        >
          <strong style={{ color: "#333", display: "block", marginBottom: "0.5rem" }}>{headline}</strong>
          <p style={{ marginTop: "0.5rem", color: "#555" }}>
            {summaries[i]
              ? summaries[i]
              : loading
              ? "Loading summary..."
              : "Click below to generate summary."}
          </p>
        </div>
      ))}
      <button
        onClick={fetchSummaries}
        disabled={loading}
        style={{
          display: "block",
          width: "fit-content",
          margin: "2rem auto",
          padding: "0.8rem 2rem",
          backgroundColor: "#4285F4", // Google Blue
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background-color 0.3s ease",
          fontSize: "1rem",
          fontWeight: "bold",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357ae8")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4285F4")}
      >
        {loading ? "Summarizing..." : "Generate Summaries"}
      </button>
    </div>
  );
};

export default News;
