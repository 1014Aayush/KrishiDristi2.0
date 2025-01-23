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
  const soilData = {
    nitrogen: 45,
    phosphorus: 32,
    potassium: 28,
    moisture: 65,
    pH: 6.8,
  };

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
  // Initial mock sensor data
  const [sensorData, setSensorData] = useState([]);

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
          const formattedData = Object.values(data).map((item) => ({
            timestamp: item.timestamp || "Unknown",
            value: item.temperature || 0, // Use temperature as the main value
          }));

          setSensorData(formattedData);
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

        {/* Sensor Data Graph */}
        <h1 className="p3-title1">Humidity Level</h1>
        <Card className="p3-card" style={{ backgroundColor: "transparent"}}>
          <CardContent 
          style={{ backgroundColor: "transparent" }}>
            <div className="graph-container">
              <ResponsiveContainer width="100%" height={300} style={{ backgroundColor: "transparent" }}>
                <LineChart
                  data={sensorData}
                  style={{ backgroundColor: "transparent", color: "white" }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tickFormatter={formatTime} />
                  <YAxis />
                  <Tooltip
                    labelFormatter={formatTime}
                    formatter={(value) => [`${value}`, "Sensor Value"]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={4}
                    dot={{ fill: "#2563eb" }}
                    name="Sensor Reading"
                    color="white"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>


        <h1 className="p3-title1">Temperature(°C)</h1>
        <Card className="p3-card">
          <CardContent>
            <div className="graph-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={sensorData}
                  
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tickFormatter={formatTime} />
                  <YAxis />
                  <Tooltip
                    labelFormatter={formatTime}
                    formatter={(value) => [`${value}`, "Sensor Value"]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: "#2563eb" }}
                    name="Sensor Reading"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <div className="dashboard-container">
          <h1 className="p3-title1">Soil Analysis Dashboard</h1>

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
                    <span className={getNPKColor(soilData.nitrogen)}>
                      {soilData.nitrogen}%
                    </span>
                  </div>
                  <div className="npk-item">
                    <span>Phosphorus (P)</span>
                    <span className={getNPKColor(soilData.phosphorus)}>
                      {soilData.phosphorus}%
                    </span>
                  </div>
                  <div className="npk-item">
                    <span>Potassium (K)</span>
                    <span className={getNPKColor(soilData.potassium)}>
                      {soilData.potassium}%
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
                      soilData.moisture
                    )}`}
                  >
                    {soilData.moisture}%
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
                  <span className={`large-value ${getPHColor(soilData.pH)}`}>
                    {soilData.pH}
                  </span>
                  <span className="value-label">pH Scale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="CRP">
          <h1 className="p3-title1">Recommended Crop</h1>
          <div className="CRP-grid-container">
            <div className="CRP-grid-item">
              <p className="CRP-label">Crop Name:</p>
              <p className="CRP-label">{recommendedCrop.name}</p>
            </div>
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
        <div className="CRP-card CRP-yield-card">
          <h2 className="p3-title1">Yield Production Details</h2>
          <div className="CRP-grid-container">
            <div className="CRP-grid-item">
              <p className="CRP-label">Expected Yield:</p>
              <p className="CRP-label">{yieldData.expectedYield}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page3;

