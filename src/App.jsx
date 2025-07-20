import React, { useState } from 'react';
import HomePage from './HomePage'; // Import the new HomePage component
import News from './new';
import Forum from './forum';
import Feedback from './feedback';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home'); // Set initial active tab to 'home'

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'news':
        return <News />;
      case 'forum':
        return <Forum />;
      case 'feedback':
        return <Feedback />;
      default:
        return <HomePage />; // Default to HomePage
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GDG Connect</h1>
        <nav>
          <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'active' : ''}>Home</button>
          <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? 'active' : ''}>News</button>
          <button onClick={() => setActiveTab('forum')} className={activeTab === 'forum' ? 'active' : ''}>Forum</button>
          <button onClick={() => setActiveTab('feedback')} className={activeTab === 'feedback' ? 'active' : ''}>Feedback</button>
        </nav>
      </header>
      <main className="App-main">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
