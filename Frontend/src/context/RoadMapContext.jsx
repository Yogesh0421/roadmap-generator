import { createContext, useState, useEffect } from "react";

export const RoadMapContext = createContext(null);

export const RoadMapProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const savedRoadmap = localStorage.getItem("roadmap");

    if (savedRoadmap) {
      setRoadmap(JSON.parse(savedRoadmap));
    }
  }, []);

  const generateRoadmap = async (formData) => {
    setLoading(true);
    setError("");
    setRoadmap(null);
    localStorage.removeItem("roadmap");

    try {
      const response = await fetch(`${API_URL}/api/roadmap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate roadmap");
      }

      const data = await response.json();

      setRoadmap(data.roadmap);
      localStorage.setItem("roadmap", JSON.stringify(data.roadmap));
    } catch (error) {
      l;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoadMapContext.Provider
      value={{
        roadmap,
        setRoadmap,
        loading,
        setLoading,
        error,
        setError,
        generateRoadmap,
      }}
    >
      {children}
    </RoadMapContext.Provider>
  );
};
