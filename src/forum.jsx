import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';

function Forum() {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);
  const [replyText, setReplyText] = useState({}); // State to manage reply text for each post

  const postMessage = async () => {
    if (text.trim()) {
      await addDoc(collection(db, 'posts'), { 
        text,
        createdAt: new Date()
      });
      setText('');
      fetchPosts();
    }
  };

  const postReply = async (postId) => {
    if (replyText[postId] && replyText[postId].trim()) {
      const postRef = doc(db, 'posts', postId);
      await addDoc(collection(postRef, 'replies'), { 
        text: replyText[postId],
        createdAt: new Date()
      });
      setReplyText(prev => ({ ...prev, [postId]: '' }));
      fetchPosts();
    }
  };

  const fetchPosts = async () => {
    const postsSnap = await getDocs(collection(db, 'posts'));
    const postsData = await Promise.all(postsSnap.docs.map(async doc => {
      const repliesSnap = await getDocs(collection(doc.ref, 'replies'));
      const repliesData = repliesSnap.docs.map(replyDoc => replyDoc.data());
      return { id: doc.id, ...doc.data(), replies: repliesData };
    }));
    setPosts(postsData.sort((a, b) => b.createdAt - a.createdAt));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="content-container forum-container"> {/* Added content-container class */}
      <h2 style={{ marginBottom: "2rem", color: "#1a73e8", textAlign: "center" }}>💬 Student Forum</h2>
      <textarea
        placeholder="Share your thoughts or questions..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "8px",
          border: "1px solid #dadce0",
          fontSize: "1rem",
          fontFamily: 'Roboto, sans-serif',
        }}
      />
      <button 
        onClick={postMessage}
        style={{
          display: "block",
          width: "fit-content",
          margin: "0 auto 2rem auto",
          padding: "0.8rem 2rem",
          backgroundColor: "#1a73e8",
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
        Post
      </button>
      <ul style={{ listStyle: "none", padding: 0, width: "100%" }}>
        {posts.map(post => (
          <li 
            key={post.id}
            style={{
              background: "#ffffff",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              borderLeft: "5px solid #fbbc05",
              color: "#333",
              wordBreak: "break-word",
            }}
          >
            <p style={{ marginBottom: "1rem" }}>{post.text}</p>
            
            {/* Reply section */}
            <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>
              <h4 style={{ marginBottom: "0.5rem", color: "#5f6368" }}>Replies:</h4>
              {post.replies.length > 0 ? (
                post.replies.map((reply, idx) => (
                  <div key={idx} style={{
                    background: "#e8f0fe",
                    padding: "0.8rem",
                    marginBottom: "0.5rem",
                    borderRadius: "6px",
                    borderLeft: "3px solid #4285F4",
                    color: "#555",
                  }}>
                    {reply.text}
                  </div>
                ))
              ) : (
                <p style={{ color: "#777" }}>No replies yet.</p>
              )}
              
              <textarea
                placeholder="Add a reply..."
                value={replyText[post.id] || ''}
                onChange={(e) => setReplyText(prev => ({ ...prev, [post.id]: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #dadce0",
                  fontSize: "0.9rem",
                  fontFamily: 'Roboto, sans-serif',
                }}
              />
              <button 
                onClick={() => postReply(post.id)}
                style={{
                  display: "block",
                  width: "fit-content",
                  marginLeft: "auto",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#4285F4",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357ae8")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4285F4")}
              >
                Reply
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forum;
