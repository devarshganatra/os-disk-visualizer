// src/App.jsx
import React, { useState } from 'react';
import InputController from './components/InputController';
import AlgorithmComparator from './components/AlgorithmComparator';
import SeekTimeChart from './components/SeekTimeChart';
import ComparisonLineChart from './components/ComparisonLineChart';
import './App.css'; 

import * as algos from './utils/algorithms';

function App() {
  const [vizData, setVizData] = useState(null);

  const handleVisualize = ({ head, queue }) => {
    setVizData({ head, queue });
  };

  return (
    <div className="appContainer">
      <header className="header">
        <h1 className="title">
          Disk Scheduling <span className="titleSpan">Visualizer</span>
        </h1>
      </header>

      <main className="mainContent">
        <InputController onVisualize={handleVisualize} />

        {vizData && (
          <div className="vizGrid">
            
            {/* --- Separate Graphs (All 10 Variants) --- */}
            <SeekTimeChart
              head={vizData.head}
              queue={vizData.queue}
              algorithmName="FCFS (First-Come, First-Serve)"
              logicFunction={algos.calculateFCFS}
            />
            <SeekTimeChart
              head={vizData.head}
              queue={vizData.queue}
              algorithmName="SSTF (Shortest Seek Time First)"
              logicFunction={algos.calculateSSTF}
            />
            <SeekTimeChart
              head={vizData.head}
              queue={vizData.queue}
              algorithmName="SCAN (Moving Up)"
              logicFunction={algos.calculateSCAN}
              direction="up"
            />
            <SeekTimeChart
              head={vizData.head}
              queue={vizData.queue}
              algorithmName="SCAN (Moving Down)"
              logicFunction={algos.calculateSCAN}
              direction="down"
            />
            <SeekTimeChart
              head={vizData.head}
              queue={vizData.queue}
              algorithmName="C-SCAN (Moving Up)"
              logicFunction={algos.calculateCSCAN}
              direction="up"
            />
            <SeekTimeChart
              head={vizData.head}
              queue={vizData.queue}
              algorithmName="C-SCAN (Moving Down)"
              logicFunction={algos.calculateCSCAN}
              direction="down"
            />
            <SeekTimeChart
              head={vizData.head}
              queue={vizData.queue}
              algorithmName="LOOK (Moving Up)"
              logicFunction={algos.calculateLOOK}
              direction="up"
            />
            <SeekTimeChart
              head={vizData.head}
              queue={vizData.queue}
              algorithmName="LOOK (Moving Down)"
              logicFunction={algos.calculateLOOK}
              direction="down"
            />
            <SeekTimeChart
              head={vizData.head}
              queue={vizData.queue}
              algorithmName="C-LOOK (Moving Up)"
              logicFunction={algos.calculateCLOOK}
              direction="up"
            />
            <SeekTimeChart
              head={vizData.head}
              queue={vizData.queue}
              algorithmName="C-LOOK (Moving Down)"
              logicFunction={algos.calculateCLOOK}
              direction="down"
            />

            {/* --- Final Stats Bar Chart (MOVED HERE) --- */}
            <div className="comparator"> {/* Spans 2 columns */}
              <AlgorithmComparator
                head={vizData.head}
                queue={vizData.queue}
              />
            </div>

            {/* --- All-in-One Comparison Line Chart (STAYS LAST) --- */}
            <div className="comparator"> {/* Spans 2 columns */}
              <ComparisonLineChart
                head={vizData.head}
                queue={vizData.queue}
              />
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

export default App;