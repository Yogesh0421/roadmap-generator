import { useState } from "react";
import { useContext } from "react";
import { RoadMapContext } from "../../context/RoadMapContext.jsx";
import { useNavigate } from "react-router-dom";
import "../generate/Generate.css";

function Generate() {
  const navigate = useNavigate();

  const { roadmap, loading, error, generateRoadmap } =
    useContext(RoadMapContext);

  const [formData, setFormData] = useState({
    goal: "",
    level: "Beginner",
    preference: "Balanced",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/roadmap");
    const success = await generateRoadmap(formData);
  };

  return (
    <main className="generate">
      <div className="generate-container">
        <header className="generate-header">
          <h1 className="generate-title">Generate Your Roadmap</h1>

          <p className="generate-description">
            Tell us what you want to learn and let AI build a structured
            learning path for you.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="generate-form">
          <div className="form-group">
            <label htmlFor="goal" className="form-label">
              What do you want to learn?
            </label>

            <input
              type="text"
              id="goal"
              value={formData.goal}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  goal: e.target.value,
                })
              }
              className="form-input"
              placeholder="e.g. React, Python, Machine Learning"
            />
          </div>

          <div className="form-group">
            <label htmlFor="level" className="form-label">
              Experience Level
            </label>

            <select
              id="level"
              className="form-select"
              value={formData.level}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  level: e.target.value,
                })
              }
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="preference" className="form-label">
              Learning Preference
            </label>

            <select
              id="preference"
              className="form-select"
              value={formData.preference}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preference: e.target.value,
                })
              }
            >
              <option value="Theory">Theory</option>
              <option value="Practical">Practical</option>
              <option value="Balanced">Balanced</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="generate-button">
            {loading ? "Generating..." : "Generate Roadmap"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Generate;
