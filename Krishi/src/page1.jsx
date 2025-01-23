import React, { useState, useEffect, useRef } from "react";
import "./Page1.css";

function Page1() {
  const [offset, setOffset] = useState(0);
  const isFirstLoad = useRef(true); // This will track if it's the first load

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    // After first load, we disable animation for the image
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const threshold = 1200;

  return (
    <div id="Page1" className="main">
      <div className="page-container1">
        <div className="first-page">
          <h1 className="header">
            {"Reigniti".split("").map((char, index) => (
              <span key={`Reigniti-${index}`} className="animated-char">
                {char}
              </span>
            ))}
            <span className="header-opacity">
              {"ng".split("").map((char, index) => (
                <span key={`ng-${index}`} className="animated-char">
                  {char}
                </span>
              ))}
            </span>{" "}
            <span className="header-opacity">
              {"Agri".split("").map((char, index) => (
                <span key={`Agr-${index}`} className="animated-char">
                  {char}
                </span>
              ))}
            </span>
            <span>
              {"culture".split("").map((char, index) => (
                <span key={`iculture-${index}`} className="animated-char">
                  {char}
                </span>
              ))}
            </span>
            <br />
            <span>
              {"With".split("").map((char, index) => (
                <span key={`With-${index}`} className="animated-char">
                  {char}
                </span>
              ))}
            </span>{" "}
            <span className="header-opacity">
              {"Smart".split("").map((char, index) => (
                <span key={`smart-${index}`} className="animated-char">
                  {char}
                </span>
              ))}
            </span>{" "}
            <span className="header-opacity">
              {"Far".split("").map((char, index) => (
                <span key={`far-${index}`} className="animated-char">
                  {char}
                </span>
              ))}
            </span>
            <span>
              {"ming".split("").map((char, index) => (
                <span key={`ming-${index}`} className="animated-char">
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Conditionally render and animate the image only on the first load */}
        {offset < threshold && (
          <img
            src="src/assets/images/treetree.png"
            className={`background-image ${
              isFirstLoad.current ? "tree-animate" : ""
            }`}
            style={{
              transform: `translateY(${offset * 0.11}rem)`, // Remove scale here
              opacity: 1 - offset * 0.0009,
              top: "-0.5%",
            }}
            alt="Soil background"
          />
        )}
      </div>
    </div>
  );
}

export default Page1;
