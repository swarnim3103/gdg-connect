import React, { useState } from 'react';
import { db } from './firebase';
import { addDoc, collection } from 'firebase/firestore';

function FeedbackForm() {
  const [text, setText] = useState('');

  const submitFeedback = async () => {
    if (text.trim()) {
      await addDoc(collection(db, 'feedbacks'), { text });
      alert('Feedback submitted!');
      setText('');
    }
  };

  return (
    <div className="feedback-container"> {/* Added a class for potential specific styling if needed */}
      <h2 style={{ marginBottom: "2rem", color: "#1a73e8", textAlign: "center" }}>📝 Feedback & Suggestions</h2>
      <textarea
        placeholder="Your feedback or suggestions..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "8px",
          border: "1px solid #dadce0", /* Google Grey border */
          fontSize: "1rem",
          fontFamily: 'Roboto, sans-serif',
        }}
      />
      <button 
        onClick={submitFeedback}
        style={{
          display: "block",
          width: "fit-content",
          margin: "0 auto",
          padding: "0.8rem 2rem",
          backgroundColor: "#1a73e8", /* Google Blue */
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          fontSize: "1rem",
          fontWeight: "bold",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0b48a0")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1a73e8")}
      >
        Submit
      </button>
    </div>
  );
}

export default FeedbackForm;
