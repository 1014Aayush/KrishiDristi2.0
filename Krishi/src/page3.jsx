import { useState, useEffect } from "react";
import "./Page3.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardContent } from "@mui/material";
import plant from "./assets/images/plant.png";

function Page3() {
  const [cropRecommend, setCropRecommend] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonPress = () => {
    setIsLoading(true);
    setCropRecommend(null);

    setTimeout(() => {
      const computedRecommendation = getCropRecommendation();
      setCropRecommend(computedRecommendation);
      setIsLoading(false);
    }, 2000);
  };

  const getCropRecommendation = () => {
    return "🌾 Recommended Crop: Wheat! 🌱 It's perfect for this season.";
  };

  const recommendedCrop = {
    name: "Rice",
    season: "Kharif",
    soilType: "Clay Loam",
    waterRequirement: "High",
  };

  const yieldData = {
    expectedYield: "4.5 tons/hectare",
    previousYield: "4.2 tons/hectare",
    growthPeriod: "120 days",
    marketValue: "$500/ton",
  };
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setResult({
        recommendedCrop: "Rice",
        expectedYield: "4.5 tonnes/hectare",
        confidence: "92%",
      });
      setLoading(false);
    }, 1500);
  };

  // Initial mock sensor data
  const [sensorData, setSensorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const paginatedData = sensorData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * pageSize < sensorData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  //
  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://krishi-drishti-default-rtdb.firebaseio.com/sensors.json"
        );
        const data = await response.json();

        if (data) {
          const formattedData = Object.values(data)
            .map((item) => ({
              timestamp: item.timestamp || "Unknown",
              valueT: item.temperature || 0, // Use temperature as the main value
              valueH: item.humidity || 0, // Use temperature as the main value
            }))
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setSensorData(formattedData);

          const latestSoilData = Object.values(data).sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )[0];

          setSoilData({
            nitrogen: latestSoilData.nitrogen || 0,
            phosphorus: latestSoilData.phosphorus || 0,
            potassium: latestSoilData.potassium || 0,
            soil_moisture: latestSoilData.soil_moisture || 0,
            ph: latestSoilData.ph || 0,
          });
        } else {
          console.error("No data available in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchData();
  }, []);

  // Helper function to format timestamps
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleTimeString();
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const [soilData, setSoilData] = useState({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    moisture: 0,
    pH: 0,
  });

  const getNPKColor = (value) => {
    if (value < 30) return "status-red";
    if (value < 50) return "status-yellow";
    return "status-green";
  };

  const getMoistureColor = (value) => {
    if (value < 40) return "status-red";
    if (value < 70) return "status-green";
    return "status-blue";
  };

  const getPHColor = (value) => {
    if (value < 6.0 || value > 7.5) return "status-red";
    if (value < 6.5 || value > 7.0) return "status-yellow";
    return "status-green";
  };
  // Team members data
  const teamMembersLeft = [
    {
      name: "Aayush Pokhrel",
      image: plant,
      bio: " Hey, I am Aayush and I am a developer and researcher of Krishi Dristi.",
    },
    {
      name: "Mahir Manandhar",
      image: plant,
      bio: " Hey, I am Maheer and I am a developer and researcher of Krishi Dristi.",
    },
  ];

  const teamMembersRight = [
    {
      name: "Anusha Rajlawat",
      image: plant,
      bio: " Hey, I am Anusha and I am a developer and researcher of Krishi Dristi.",
    },
    {
      name: "Supriya Adhikari",
      image: plant,
      bio: " Hey, I am Supriya and I am a developer and researcher of Krishi Dristi.",
    },
  ];

  return (
    <div id="Page3" className="page-container">
      {/* Team Section */}
      <div className="box-container">
        <h1 className="p3-title">Meet The Team</h1>
        <div className="team">
          <div className="team-container">
            {teamMembersLeft.map((member, index) => (
              <div key={index} className="team-member">
                <div className="team-member-details-left">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-bio">{member.bio}</p>
                </div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-member-image"
                />
              </div>
            ))}
          </div>
          <div className="vertical-line"></div>
          <div className="team-container">
            {teamMembersRight.map((member, index) => (
              <div key={index} className="team-member">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-member-image"
                />
                <div className="team-member-details-right">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space"></div>

        {/* Sensor Data Graph */}
        <h1 className="p3-title1">Humidity Level</h1>
        <div className="temperature-graph-container">
          <div className="graph-card">
            <div className="graph-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={paginatedData} className="line-chart">
                  <CartesianGrid strokeDasharray="3 3" className="grid-line" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={formatTime}
                    label={{
                      position: "insideBottom",
                      offset: -5,
                    }}
                    className="x-axis"
                    stroke="white"
                    tick={{ fill: "white", dy: 10 }}
                  />
                  <YAxis
                    label={{
                      value: "Humidity ",
                      angle: -90,
                      position: "insideLeft",
                      fill: "white",
                    }}
                    className="y-axis"
                    stroke="white"
                    tick={{ fill: "white", dx: -10 }}
                  />
                  <Tooltip
                    labelFormatter={formatDateTime}
                    formatter={(valueH) => [`${valueH}`, "Humidity"]}
                    className="custom-tooltip"
                    contentStyle={{
                      backgroundColor: "#333333",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="valueH"
                    stroke="#ffffff"
                    strokeWidth={4}
                    dot={{ r: 3, fill: "#1e4230" }}
                    name="Time"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="pagination-controls">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className={`pagination-button ${
                  currentPage === 0 ? "disabled" : ""
                }`}
              >
                &#8592; Previous
              </button>

              <span className="page-indicator">
                Page {currentPage + 1} of{" "}
                {Math.ceil(sensorData.length / pageSize)}
              </span>

              <button
                onClick={handleNextPage}
                disabled={(currentPage + 1) * pageSize >= sensorData.length}
                className={`pagination-button ${
                  (currentPage + 1) * pageSize >= sensorData.length
                    ? "disabled"
                    : ""
                }`}
              >
                Next &#8594;
              </button>
            </div>
          </div>
        </div>

        <h1 className="p3-title1">Temperature Level</h1>
        <div className="temperature-graph-container">
          <div className="graph-card">
            <div className="graph-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={paginatedData} className="line-chart">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="grid-line"
                    stroke="white"
                  />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={formatTime}
                    label={{
                      position: "insideBottom",
                      offset: 5,
                    }}
                    className="x-axis"
                    stroke="white" // Sets the X-axis line color to whit
                    tick={{ fill: "white", dy: 10 }}
                  />
                  <YAxis
                    label={{
                      value: "Temperature (°C)",
                      angle: -90,
                      position: "insideLeft",
                      fill: "white",
                    }}
                    className="y-axis"
                    stroke="white"
                    tick={{ fill: "white", dx: -10 }}
                  />
                  <Tooltip
                    labelFormatter={formatDateTime}
                    formatter={(valueT) => [`${valueT}°C`, "Temperature"]}
                    className="custom-tooltip"
                    contentStyle={{
                      backgroundColor: "#333333",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="valueT"
                    stroke="#ffffff"
                    strokeWidth={4}
                    dot={{ r: 3, fill: "#1e4230" }}
                    name="Time"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="pagination-controls">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className={`pagination-button ${
                  currentPage === 0 ? "disabled" : ""
                }`}
              >
                &#8592; Previous
              </button>

              <span className="page-indicator">
                Page {currentPage + 1} of{" "}
                {Math.ceil(sensorData.length / pageSize)}
              </span>

              <button
                onClick={handleNextPage}
                disabled={(currentPage + 1) * pageSize >= sensorData.length}
                className={`pagination-button ${
                  (currentPage + 1) * pageSize >= sensorData.length
                    ? "disabled"
                    : ""
                }`}
              >
                Next &#8594;
              </button>
            </div>
          </div>
        </div>
        <div className="dashboard-container">
          <h1 className="p3-title1">Soil Analysis Dashboard</h1>
          <div className="CR-card">
            <div className="soil-cards-grid">
              {/* NPK Card */}
              <div className="soil-card">
                <div className="soil-card-header">
                  <h3 className="soil-card-title">NPK Levels</h3>
                </div>
                <div className="soil-card-content">
                  <div className="npk-list">
                    <div className="npk-item">
                      <span>Nitrogen (N)</span>
                      <span className={getNPKColor(soilData.nitrogrn)}>
                        {soilData.nitrogen}
                      </span>
                    </div>
                    <div className="npk-item">
                      <span>Phosphorus (P)</span>
                      <span className={getNPKColor(soilData.phosphorus)}>
                        {soilData.phosphorus}
                      </span>
                    </div>
                    <div className="npk-item">
                      <span>Potassium (K)</span>
                      <span className={getNPKColor(soilData.potassium)}>
                        {soilData.potassium}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Moisture Card */}
              <div className="soil-card">
                <div className="soil-card-header">
                  <h3 className="soil-card-title">Soil Moisture</h3>
                </div>
                <div className="soil-card-content">
                  <div className="value-display">
                    <span
                      className={`large-value ${getMoistureColor(
                        soilData.soil_moisture
                      )}`}
                    >
                      {soilData.soil_moisture}%
                    </span>
                    <span className="value-label">Relative Humidity</span>
                  </div>
                </div>
              </div>

              {/* pH Card */}
              <div className="soil-card">
                <div className="soil-card-header">
                  <h3 className="soil-card-title">pH Level</h3>
                </div>
                <div className="soil-card-content">
                  <div className="value-display">
                    <span className={`large-value ${getPHColor(soilData.ph)}`}>
                      {soilData.ph}
                    </span>
                    <span className="value-label">pH Scale</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              className={`CR-button ${isLoading ? "disabled" : ""}`}
              onClick={handleButtonPress}
              disabled={isLoading}
            >
              {isLoading ? "Fetching..." : "Get Recommendation"}
            </button>

            {/* Loading Spinner */}
            {isLoading && <div className="loader"></div>}

            {/* Crop Recommendation */}
            {cropRecommend && (
              <p className="CR-recommendation">{cropRecommend}</p>
            )}
          </div>
        </div>
        <h1 className="p3-title1">Yield Prediction</h1>
        <div className="cropR-container">
          <div className="cropR-wrapper">
            <div className="cropR-card">
              <div className="cropR-card-header">
                <p className="cropR-description">
                  Enter your soil and environmental parameters to get
                  personalized yield predection.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="cropR-form">
                <div className="cropR-input-grid">
                  <div className="cropR-input-group">
                    <label htmlFor="potassium" className="cropR-label">
                      Crop
                    </label>
                    <input
                      id="potassium"
                      name="potassium"
                      type="number"
                      placeholder="Enter which crop"
                      value={formData.potassium}
                      onChange={handleInputChange}
                      className="cropR-input"
                      required
                    />
                  </div>

                  <div className="cropR-input-group">
                    <label htmlFor="temperature" className="cropR-label">
                      Temperature (°C)
                    </label>
                    <input
                      id="temperature"
                      name="temperature"
                      type="number"
                      placeholder="Enter temperature"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      className="cropR-input"
                      required
                    />
                  </div>

                  <div className="cropR-input-group">
                    <label htmlFor="humidity" className="cropR-label">
                      Year
                    </label>
                    <input
                      id="humidity"
                      name="humidity"
                      type="number"
                      placeholder="Enter Year"
                      value={formData.humidity}
                      onChange={handleInputChange}
                      className="cropR-input"
                      required
                    />
                  </div>

                  <div className="cropR-input-group">
                    <label htmlFor="ph" className="cropR-label">
                      Area
                    </label>
                    <input
                      id="ph"
                      name="ph"
                      type="number"
                      step="0.1"
                      placeholder="Enter Area"
                      value={formData.ph}
                      onChange={handleInputChange}
                      className="cropR-input"
                      required
                    />
                  </div>

                  <div className="cropR-input-group">
                    <label htmlFor="rainfall" className="cropR-label">
                      Rainfall (mm)
                    </label>
                    <input
                      id="rainfall"
                      name="rainfall"
                      type="number"
                      placeholder="Enter rainfall"
                      value={formData.rainfall}
                      onChange={handleInputChange}
                      className="cropR-input"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="cropR-submit-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="cropR-spinner">⭮</span>
                      Analyzing...
                    </>
                  ) : (
                    <>📊 Get Predection</>
                  )}
                </button>
              </form>

              {result && (
                <div className="cropR-results">
                  <h3 className="cropR-results-title">Analysis Results</h3>
                  <div className="cropR-results-grid">
                    <div className="cropR-result-card">
                      <p className="cropR-result-label">Recommended Crop</p>
                      <p className="cropR-result-value">
                        {result.recommendedCrop}
                      </p>
                    </div>
                    <div className="cropR-result-card">
                      <p className="cropR-result-label">Expected Yield</p>
                      <p className="cropR-result-value">
                        {result.expectedYield}
                      </p>
                    </div>
                    <div className="cropR-result-card">
                      <p className="cropR-result-label">Confidence</p>
                      <p className="cropR-result-value">{result.confidence}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page3;
