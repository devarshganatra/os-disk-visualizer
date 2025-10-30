// src/components/InputController.jsx
import React, { useState } from 'react';
import styles from './InputController.module.css'; // Import the CSS module

export default function InputController({ onVisualize }) {
  const [head, setHead] = useState('53');
  const [queue, setQueue] = useState('98, 183, 37, 122, 14, 124, 65, 67');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedHead = parseInt(head, 10);
    const parsedQueue = queue
      .split(',')
      .map(track => parseInt(track.trim(), 10))
      .filter(track => !isNaN(track));

    if (isNaN(parsedHead) || parsedQueue.length === 0) {
      alert('Please enter a valid head position and at least one track request.');
      return;
    }
    onVisualize({ head: parsedHead, queue: parsedQueue });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.grid}>
        <div className={styles.inputGroup}>
          <label htmlFor="head">Initial Head Position</label>
          <input
            type="number"
            id="head"
            value={head}
            onChange={(e) => setHead(e.target.value)}
            className={styles.input}
            placeholder="e.g., 53"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="queue">Request Queue (comma-separated)</label>
          <input
            type="text"
            id="queue"
            value={queue}
            onChange={(e) => setQueue(e.target.value)}
            className={styles.input}
            placeholder="e.g., 98, 183, 37, 122"
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.button}>
          Visualize
        </button>
      </div>
    </form>
  );
}