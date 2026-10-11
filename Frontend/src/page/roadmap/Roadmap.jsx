import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoadMapContext } from "../../context/RoadMapContext";
import "../roadmap/Roadmap.css";
import "../roadmap/Roadmap2.css";

function Roadmap() {
  const navigate = useNavigate();
  const phaseRefs = useRef([]);
  const [openPhase, setOpenPhase] = useState(0);
  const { roadmap, loading, error } = useContext(RoadMapContext);

  const [completedTopics, setCompletedTopics] = useState(() => {
    const savedProgress = localStorage.getItem(
      `roadmap-progress-${roadmap?.title}`,
    );

    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  useEffect(() => {
    if (!roadmap?.title) return;

    localStorage.setItem(
      `roadmap-progress-${roadmap.title}`,
      JSON.stringify(completedTopics),
    );
  }, [completedTopics, roadmap?.title]);

  const totalTopics = roadmap
    ? roadmap.phases.reduce((total, phase) => total + phase.topics.length, 0)
    : 0;

  const completedCount = Object.values(completedTopics).filter(Boolean).length;

  const progressPercentage =
    totalTopics === 0 ? 0 : Math.round((completedCount / totalTopics) * 100);

  const toggleTopicComplete = (phaseIndex, topicIndex) => {
    const topicKey = `${phaseIndex}-${topicIndex}`;

    setCompletedTopics((prev) => ({
      ...prev,
      [topicKey]: !prev[topicKey],
    }));
  };

  if (loading) {
    return (
      <main className="roadmap-state">
        <h1>Generating your roadmap...</h1>
        <p>AI is building your personalized learning path.</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="roadmap-state">
        <h1>Something went wrong</h1>
        <p>{error}</p>

        <button onClick={() => navigate("/generate")}>Go Back</button>
      </main>
    );
  }

  if (!roadmap) {
    return (
      <main className="roadmap-state">
        <h1>No roadmap available</h1>

        <button onClick={() => navigate("/generate")}>Generate Roadmap</button>
      </main>
    );
  }

  return (
    <main className="roadmap">
      <div className="roadmap-container">
        <div className="roadmap-hero">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              AI GENERATED ROADMAP
            </div>

            <h1 className="roadmap-title">{roadmap.title}</h1>

            <p className="roadmap-summary">{roadmap.summary}</p>

            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="meta-label">LEVEL</span>
                <span className="meta-value">{roadmap.level}</span>
              </div>

              <div className="hero-meta-divider"></div>

              <div className="hero-meta-item">
                <span className="meta-label">PHASES</span>
                <span className="meta-value">{roadmap.phases.length}</span>
              </div>
            </div>
          </div>

          <div className="hero-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="roadmap-stats">
          <div className="roadmap-stat">
            <span className="stat-label">LEVEL</span>
            <span className="stat-value">{roadmap.level}</span>
          </div>

          <div className="roadmap-stat">
            <span className="stat-label">PHASES</span>
            <span className="stat-value">{roadmap.phases.length}</span>
          </div>

          <div className="roadmap-stat">
            <span className="stat-label">TOPICS</span>
            <span className="stat-value">
              {roadmap.phases.reduce(
                (total, phase) => total + phase.topics.length,
                0,
              )}
            </span>
          </div>

          <div className="roadmap-stat">
            <span className="stat-label">PRACTICE</span>
            <span className="stat-value">
              {roadmap.phases.reduce(
                (total, phase) =>
                  total +
                  phase.topics.reduce(
                    (topicTotal, topic) => topicTotal + topic.practice.length,
                    0,
                  ),
                0,
              )}
            </span>
          </div>
        </div>

        <div className="progress-card">
          <div className="progress-header">
            <div>
              <span className="progress-label">YOUR PROGRESS</span>
              <p className="progress-text">
                <strong>{completedCount}</strong> of {totalTopics} topics
                completed
              </p>
            </div>

            <span className="progress-percentage">{progressPercentage}%</span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <nav className="phase-nav">
          <span className="phase-nav-title">ROADMAP</span>

          <div className="phase-nav-list">
            {roadmap.phases.map((phase, index) => (
              <button
                key={index}
                className={`phase-nav-item ${
                  openPhase === index ? "active" : ""
                }`}
                onClick={() => {
                  setOpenPhase(index);

                  phaseRefs.current[index]?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>

                {phase.title}
              </button>
            ))}
          </div>
        </nav>

        <div className="roadmap-phases">
          {roadmap.phases.map((phase, index) => (
            <section
              className="roadmap-phase"
              key={index}
              ref={(element) => {
                phaseRefs.current[index] = element;
              }}
            >
              <button
                className="phase-header"
                onClick={() => setOpenPhase(openPhase === index ? null : index)}
              >
                <div className="phase-heading">
                  <span className="phase-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <span className="phase-label">
                      PHASE {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="phase-title">{phase.title}</h2>
                  </div>
                </div>

                <div className="phase-header-right">
                  <span className="phase-duration">{phase.duration}</span>

                  <span className="phase-toggle">
                    {openPhase === index ? "−" : "+"}
                  </span>
                </div>
              </button>

              {openPhase === index && (
                <div className="phase-topics">
                  {phase.topics.map((topic, topicIndex) => {
                    const topicKey = `${index}-${topicIndex}`;

                    return (
                      <div
                        className={`topic-card ${
                          completedTopics[topicKey] ? "completed" : ""
                        }`}
                        key={topicIndex}
                      >
                        <div className="topic-card-top">
                          <span className="topic-number">
                            {String(topicIndex + 1).padStart(2, "0")}
                          </span>

                          <span className="topic-arrow">↗</span>
                        </div>

                        <h3 className="topic-title">{topic.title}</h3>

                        <div className="topic-subtopics">
                          <h4 className="section-title">What you'll learn</h4>

                          <ul>
                            {topic.subtopics.map((subtopic, subtopicIndex) => (
                              <li key={subtopicIndex}>{subtopic}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="topic-practice">
                          <h4 className="section-title">Practice</h4>

                          <ul>
                            {topic.practice.map((exercise, exerciseIndex) => (
                              <li className="practice-item" key={exerciseIndex}>
                                {exercise}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button
                          className={`topic-complete-btn ${
                            completedTopics[topicKey] ? "completed" : ""
                          }`}
                          onClick={() => toggleTopicComplete(index, topicIndex)}
                        >
                          <span>{completedTopics[topicKey] ? "✓" : "○"}</span>

                          {completedTopics[topicKey]
                            ? "Completed"
                            : "Mark as complete"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          ))}
        </div>
        <div className="roadmap-note">
          <h2>Note</h2>
          <p>{roadmap.note}</p>
        </div>
      </div>
    </main>
  );
}

export default Roadmap;
