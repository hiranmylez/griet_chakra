// src/components/HealthGraph.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const HealthGraph = ({ data, metric }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => {
              const date = new Date(str);
              return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            }}
            padding={{ left: 40, right: 20 }}   // ✅ shifts dates inward
            interval="preserveStartEnd"         // ✅ prevents overlap at edges
          />
          <YAxis />
          <Tooltip
            labelFormatter={(str) => {
              const date = new Date(str);
              return `📅 ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthGraph;
