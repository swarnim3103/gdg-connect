import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <h2 className="homepage-title">Welcome to GDG Connect</h2>
      <p className="homepage-description">CampusConnect is your central hub for everything happening on campus. Stay updated with the latest tech news, engage in discussions on the student forum, and share your valuable feedback to help us improve your experience.</p>
      <p className="homepage-description">Explore the <span className="homepage-highlight">News</span> section for breaking headlines, connect with fellow students in the <span className="homepage-highlight">Forum</span>, and let us know your thoughts in the <span className="homepage-highlight">Feedback</span> section. We're here to keep you connected and informed!</p>
    </div>
  );
}

export default HomePage;
