// src/components/AlgorithmComparator.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './AlgorithmComparator.module.css';
import * as algos from '../utils/algorithms';

// Define all algorithm variants we want to compare
const ALGO_VARIANTS = [
  { name: 'FCFS', func: algos.calculateFCFS },
  { name: 'SSTF', func: algos.calculateSSTF },
  { name: 'SCAN (Up)', func: algos.calculateSCAN, direction: 'up' },
  { name: 'SCAN (Down)', func: algos.calculateSCAN, direction: 'down' },
  { name: 'C-SCAN (Up)', func: algos.calculateCSCAN, direction: 'up' },
  { name: 'C-SCAN (Down)', func: algos.calculateCSCAN, direction: 'down' },
  { name: 'LOOK (Up)', func: algos.calculateLOOK, direction: 'up' },
  { name: 'LOOK (Down)', func: algos.calculateLOOK, direction: 'down' },
  { name: 'C-LOOK (Up)', func: algos.calculateCLOOK, direction: 'up' },
  { name: 'C-LOOK (Down)', func: algos.calculateCLOOK, direction: 'down' },
];

export default function AlgorithmComparator({ head, queue }) {
  
  const results = useMemo(() => {
    return ALGO_VARIANTS
      .map(algo => ({
        name: algo.name,
        totalSeek: algo.func(head, [...queue], algo.direction).totalSeek,
      }))
      .sort((a, b) => a.totalSeek - b.totalSeek); // Sort by best
  }, [head, queue]);

  const maxSeek = results.length > 0 ? results[results.length - 1].totalSeek : 0;

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Algorithm Comparison (Total Seek Time)</h3>
      <div className={styles.barChart}>
        {results.map((res, index) => (
          <div key={res.name} className={styles.barRow} title={`${res.name}: ${res.totalSeek}`}>
            <span className={styles.barLabel} style={{width: '8rem'}}> {/* Give more space for name */}
              {res.name}
            </span>
            <div className={styles.barWrapper}>
              <motion.div
                className={`${styles.bar} ${index === 0 ? styles.barBest : ''}`}
                initial={{ width: 0 }}
                animate={{ width: maxSeek > 0 ? `${(res.totalSeek / maxSeek) * 100}%` : '0%' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20
                }}
              />
            </div>
            <span className={styles.barValue}>{res.totalSeek}</span>
          </div>
        ))}
      </div>
    </div>
  );
}