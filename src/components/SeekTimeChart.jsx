// src/components/SeekTimeChart.jsx
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './SeekTimeChart.module.css';

export default function SeekTimeChart({ head, queue, algorithmName, logicFunction, direction }) {

  const { data, totalSeek } = useMemo(() => {
    // Get the steps from our logic function
    const { steps, totalSeek } = logicFunction(head, [...queue], direction);

    // Transform data for recharts
    // Start with the initial head position at step 0
    let chartData = [{ step: 0, track: head }];

    // Add all the subsequent steps
    steps.forEach((step, i) => {
      chartData.push({ step: i + 1, track: step.to });
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
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
            labelStyle={{ color: '#ffffff' }}
          />
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