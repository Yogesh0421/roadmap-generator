import React from "react";
import { useNavigate } from "react-router-dom";
import "../home/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleCreateRoadmap = () => {
    navigate("/generate");
  };

  const handleChatWithAI = () => {
    navigate("/chat");
  };

  return (
    <main className="home">
      <section className="home-hero">
        <p className="home-eyebrow">AI-Powered Learning</p>

        <h1 className="home-title">Build Your Learning Roadmap</h1>

        <h3 className="home-description">
          Create a structured, personalized learning roadmap for any technology
          or skill with AI.
        </h3>

        <div className="buttons">
          <button onClick={handleCreateRoadmap} className="home-cta">
            Create Roadmap
          </button>

          <button onClick={handleChatWithAI} className="home-cta">
            Chat with AI
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
