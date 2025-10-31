# Disk Scheduling Algorithm Visualizer

An interactive web application built with React and Vite that visualizes and compares six major disk scheduling algorithms. This tool provides a clear, side-by-side comparison of algorithm performance using animated charts and detailed statistics.



---

## Features

* **Six Algorithms Visualized:** Includes separate, detailed line charts for:
    * First-Come, First-Serve (FCFS)
    * Shortest Seek Time First (SSTF)
    * SCAN (Elevator)
    * C-SCAN (Circular SCAN)
    * LOOK
    * C-LOOK
* **Directional Variants:** Includes separate visualizations for "Up" (moving towards 199) and "Down" (moving towards 0) for SCAN, C-SCAN, LOOK, and C-LOOK.
* **Combined Comparison Graph:** A single, color-coded line chart that plots the "head movement over time" for all algorithms on one graph, making it easy to compare their paths.
* **Statistical Bar Chart:** A clean, sorted bar chart that shows the total seek time for all 10 algorithm variants, highlighting the most efficient one for the given queue.

---

## Tech Stack

* **Frontend:** React 18
* **Build Tool:** Vite
* **Charting:** Recharts
* **Animation:** Framer Motion
* **Styling:** CSS Modules (No Tailwind/UI libraries)

---

## How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/en) (which includes `npm`) installed on your machine.

### Installation & Startup

1.  **Clone the repo**
    ```sh
    git clone https://github.com/devarshganatra/os-disk-visualizer.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd os-disk-visualizer
    ```
3.  **Install NPM packages**
    This will install React, Recharts, and all other dependencies listed in `package.json`.
    ```sh
    npm install
    ```
4.  **Run the development server**
    ```sh
    npm run dev
    ```
5.  Open `http://localhost:5173` (or the URL shown in your terminal) in your browser.
