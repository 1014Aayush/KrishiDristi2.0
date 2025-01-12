import React, { useState, useEffect } from "react";
import "./try.css";

const BloomingTree = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="tree-wrapper">
      <svg viewBox="0 0 400 500" className="tree-svg">
        {/* Ground */}
        <path
          d="M 0,480 C 100,460 300,460 400,480 L 400,500 L 0,500 Z"
          className="ground"
        />

        {/* Tree Trunk */}
        <path
          d="M 190,480 Q 200,280 200,200"
          className={`trunk ${isVisible ? "visible" : ""}`}
        />

        {/* Left Branches */}
        {isVisible && (
          <>
            <path d="M 200,300 Q 160,280 140,290" className="branch branch-1" />
            <path d="M 200,250 Q 150,230 120,250" className="branch branch-2" />
            <path d="M 200,200 Q 140,180 100,210" className="branch branch-3" />
          </>
        )}

        {/* Right Branches */}
        {isVisible && (
          <>
            <path d="M 200,300 Q 240,280 260,290" className="branch branch-1" />
            <path d="M 200,250 Q 250,230 280,250" className="branch branch-2" />
            <path d="M 200,200 Q 260,180 300,210" className="branch branch-3" />
          </>
        )}

        {/* Flowers */}
        {isVisible && (
          <>
            {[...Array(30)].map((_, i) => {
              const x = 120 + Math.random() * 160;
              const y = 180 + Math.random() * 120;
              const delay = 2 + Math.random() * 1.5;
              const size = 6 + Math.random() * 4;

              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={size}
                  className="flower"
                  style={{ animationDelay: `${delay}s` }}
                />
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
};

export default BloomingTree;
