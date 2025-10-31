// src/components/SeekTimeChart.jsx
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './SeekTimeChart.module.css';

// This is our new custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={styles.tooltip}>
        <p>{`Step: ${label}`}</p>
        <p>{`Track: ${data.track}`}</p>
        {/* Only show seek time if it's not the starting point (step 0) */}
        {data.seek > 0 && <p>{`Seek Time: ${data.seek}`}</p>}
      </div>
    );
  }
  return null;
};

export default function SeekTimeChart({ head, queue, algorithmName, logicFunction, direction }) {
  
  const { data, totalSeek } = useMemo(() => {
    const { steps, totalSeek } = logicFunction(head, [...queue], direction);
    
    // Transform data for recharts
    // Start with the initial head position at step 0
    let chartData = [{ step: 0, track: head, seek: 0 }]; // Add seek: 0
    
    // Add all the subsequent steps
    steps.forEach((step, i) => {
      chartData.push({ 
        step: i + 1, 
        track: step.to,
        seek: step.seek // Add the seek value for this step
      });
    });
    
    return { data: chartData, totalSeek };
  }, [head, queue, logicFunction, direction]);

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>{algorithmName}</h3>
      <p className={styles.totalSeek}>Total Seek Time: <span>{totalSeek}</span></p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="step" 
            label={{ value: 'Time (Steps)', position: 'insideBottom', dy: 10 }}
            stroke="#9ca3af"
          />
          <YAxis 
            domain={[0, 199]} 
            label={{ value: 'Track Number', angle: -90, position: 'insideLeft', dx: -10 }} 
            stroke="#9ca3af" 
          />
          
          {/* Use the new CustomTooltip component */}
          <Tooltip content={<CustomTooltip />} />

          <Legend verticalAlign="top" height={36} />
          <Line 
            type="monotone" 
            dataKey="track" 
            stroke="#2dd4bf" // Teal color
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}