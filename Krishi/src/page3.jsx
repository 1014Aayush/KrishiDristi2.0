import React, { useState } from "react";
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
  const [sensorData, setSensorData] = useState([
    { timestamp: "2024-01-09 10:00:00", value: 24.5 },
    { timestamp: "2024-01-09 10:01:00", value: 25.2 },
    { timestamp: "2024-01-09 10:02:00", value: 25.8 },
    { timestamp: "2024-01-09 10:03:00", value: 24.9 },
    { timestamp: "2024-01-09 10:04:00", value: 24.3 },
  ]);

  // Helper function to format timestamps
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
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
        <CardHeader title="ESP32 Sensor Data - Real-time Graph" />
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
        <CardHeader title="ESP32 Sensor Data - Table View" />
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
