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
import aayush from "./assets/images/aayush.jpg";


function Page3() {
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
      name: "Alice Johnson",
      image: aayush,
      bio: "Alice is a seasoned professional with over 10 years of experience in team management and project execution.",
    },
    {
      name: "Bob Smith",
      image: aayush,
      bio: "Bob is a full-stack developer with expertise in React, Node.js, and cloud computing.",
    },
  ];

  const teamMembersRight = [
    {
      name: "Catherine",
      image: aayush,
      bio: "Catherine is a creative graphic designer specializing in UI/UX and branding.",
    },
    {
      name: "Catherine Lee",
      image: aayush,
      bio: "Catherine is a creative graphic designer specializing in UI/UX and branding.",
    },
  ];

  return (
    <div className="page-container">
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
        <Card className="p3-card">
        <CardHeader title="ESP32 Temperature Data - Real-time Graph" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorData}>
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
        </CardContent>
      </Card>

      {/* Sensor Data Table */}
      <Card className="p3-card">
        <CardHeader title="ESP32 Temperature Data - Table View" />
        <CardContent>
          <table className="p3-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.map((reading, index) => (
                <tr key={index}>
                  <td>{formatTime(reading.timestamp)}</td>
                  <td>{reading.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      </div>

    </div>
  );
}

export default Page3;

