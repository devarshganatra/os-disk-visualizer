// src/components/ComparisonLineChart.jsx
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './SeekTimeChart.module.css'; // We can reuse the same CSS
import * as algos from '../utils/algorithms';

const ALGORITHMS = [
  { name: 'FCFS', func: algos.calculateFCFS, stroke: '#f87171' },
  { name: 'SSTF', func: algos.calculateSSTF, stroke: '#facc15' },
  { name: 'SCAN (Up)', func: algos.calculateSCAN, direction: 'up', stroke: '#34d399' },
  { name: 'C-SCAN (Up)', func: algos.calculateCSCAN, direction: 'up', stroke: '#a78bfa' },
  { name: 'LOOK (Up)', func: algos.calculateLOOK, direction: 'up', stroke: '#fb923c' },
  { name: 'C-LOOK (Up)', func: algos.calculateCLOOK, direction: 'up', stroke: '#60a5fa' },
];

export default function ComparisonLineChart({ head, queue }) {

  const chartData = useMemo(() => {
    let allResults = {};
    let maxSteps = 0;

    // Run all algorithms and store their step-by-step track data
    ALGORITHMS.forEach(algo => {
      const { steps } = algo.func(head, [...queue], algo.direction);
      let trackData = [head]; // Start at head
      steps.forEach(step => trackData.push(step.to));
      allResults[algo.name] = trackData;
      if (trackData.length > maxSteps) {
        maxSteps = trackData.length;
      }
    });

    // Build the combined data array for recharts
    let combinedData = [];
    for (let i = 0; i < maxSteps; i++) {
      let stepData = { step: i };
      ALGORITHMS.forEach(algo => {
        // Use last known position if algo finished early
        const track = allResults[algo.name][i] ?? allResults[algo.name][allResults[algo.name].length - 1];
        stepData[algo.name] = track;
      });
      combinedData.push(stepData);
    }
    return combinedData;

  }, [head, queue]);

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Algorithm Movement Comparison</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="step" 
            label={{ value: 'Time (Steps)', position: 'insideBottom', dy: 10 }}
            stroke="#9ca3af"
            allowDuplicatedCategory={false}
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

          {ALGORITHMS.map(algo => (
            <Line 
              key={algo.name}
              type="monotone" 
              dataKey={algo.name} 
              stroke={algo.stroke}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6 }} 
            />
          ))}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}