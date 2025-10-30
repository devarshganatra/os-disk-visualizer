// src/utils/algorithms.js

const MAX_TRACKS = 200; // Tracks are 0-199

// 1. First-Come, First-Serve
export function calculateFCFS(head, queue, direction) {
  let steps = [];
  let currentHead = head;
  let totalSeek = 0;

  queue.forEach(track => {
    const seek = Math.abs(track - currentHead);
    steps.push({ from: currentHead, to: track, seek: seek });
    totalSeek += seek;
    currentHead = track;
  });

  return { steps, totalSeek };
}

// 2. Shortest Seek Time First
export function calculateSSTF(head, queue, direction) {
  let steps = [];
  let currentHead = head;
  let totalSeek = 0;
  let remaining = [...queue];

  while (remaining.length > 0) {
    let closestTrackIndex = 0;
    let minSeek = Infinity;

    remaining.forEach((track, index) => {
      const seek = Math.abs(track - currentHead);
      if (seek < minSeek) {
        minSeek = seek;
        closestTrackIndex = index;
      }
    });

    const nextTrack = remaining[closestTrackIndex];
    steps.push({ from: currentHead, to: nextTrack, seek: minSeek });
    totalSeek += minSeek;
    currentHead = nextTrack;
    remaining.splice(closestTrackIndex, 1);
  }

  return { steps, totalSeek };
}

// 3. SCAN (Elevator)
export function calculateSCAN(head, queue, direction = 'up') {
  let steps = [];
  let currentHead = head;
  let totalSeek = 0;
  const sortedQueue = [...queue].sort((a, b) => a - b);

  const go = (requests) => {
    requests.forEach(track => {
      const seek = Math.abs(track - currentHead);
      steps.push({ from: currentHead, to: track, seek });
      totalSeek += seek;
      currentHead = track;
    });
  };

  if (direction === 'up') {
    const upRequests = sortedQueue.filter(track => track >= currentHead);
    const downRequests = sortedQueue.filter(track => track < currentHead).sort((a, b) => b - a);

    go(upRequests); // Service all requests "up"

    // As requested, go to the end (199)
    if (currentHead < MAX_TRACKS - 1) {
      const seek = (MAX_TRACKS - 1) - currentHead;
      steps.push({ from: currentHead, to: MAX_TRACKS - 1, seek });
      totalSeek += seek;
      currentHead = MAX_TRACKS - 1;
    }

    go(downRequests); // Service all requests "down"
  } else { // direction === 'down'
    const downRequests = sortedQueue.filter(track => track <= currentHead).sort((a, b) => b - a);
    const upRequests = sortedQueue.filter(track => track > currentHead);

    go(downRequests); // Service all requests "down"

    // Go to the beginning (0)
    if (currentHead > 0) {
      const seek = currentHead - 0;
      steps.push({ from: currentHead, to: 0, seek });
      totalSeek += seek;
      currentHead = 0;
    }

    go(upRequests); // Service all requests "up"
  }

  return { steps, totalSeek };
}

// 4. C-SCAN (Circular SCAN)
export function calculateCSCAN(head, queue, direction = 'up') {
  let steps = [];
  let currentHead = head;
  let totalSeek = 0;
  const sortedQueue = [...queue].sort((a, b) => a - b);

  const go = (requests) => {
    requests.forEach(track => {
      const seek = Math.abs(track - currentHead);
      steps.push({ from: currentHead, to: track, seek });
      totalSeek += seek;
      currentHead = track;
    });
  };

  if (direction === 'up') {
    const upRequests = sortedQueue.filter(track => track >= currentHead);
    const otherRequests = sortedQueue.filter(track => track < currentHead); // Don't sort descending

    go(upRequests); // Service all requests "up"

    // Go to the end (199)
    if (currentHead < MAX_TRACKS - 1) {
      const seek = (MAX_TRACKS - 1) - currentHead;
      steps.push({ from: currentHead, to: MAX_TRACKS - 1, seek });
      totalSeek += seek;
      currentHead = MAX_TRACKS - 1;
    }

    // Jump to the beginning (0)
    const seek = currentHead - 0;
    steps.push({ from: currentHead, to: 0, seek });
    totalSeek += seek; // Per textbook, this seek counts
    currentHead = 0;

    go(otherRequests); // Service remaining requests
  } else { // direction === 'down'
    const downRequests = sortedQueue.filter(track => track <= currentHead).sort((a, b) => b - a);
    const otherRequests = sortedQueue.filter(track => track > currentHead).sort((a, b) => b - a);

    go(downRequests);

    // Go to the beginning (0)
    if (currentHead > 0) {
      const seek = currentHead - 0;
      steps.push({ from: currentHead, to: 0, seek });
      totalSeek += seek;
      currentHead = 0;
    }

    // Jump to the end (199)
    const seek = (MAX_TRACKS - 1) - currentHead;
    steps.push({ from: currentHead, to: MAX_TRACKS - 1, seek });
    totalSeek += seek;
    currentHead = MAX_TRACKS - 1;

    go(otherRequests);
  }

  return { steps, totalSeek };
}

// 5. LOOK
export function calculateLOOK(head, queue, direction = 'up') {
  let steps = [];
  let currentHead = head;
  let totalSeek = 0;
  const sortedQueue = [...queue].sort((a, b) => a - b);

  const go = (requests) => {
    requests.forEach(track => {
      const seek = Math.abs(track - currentHead);
      steps.push({ from: currentHead, to: track, seek });
      totalSeek += seek;
      currentHead = track;
    });
  };

  if (direction === 'up') {
    const upRequests = sortedQueue.filter(track => track >= currentHead);
    const downRequests = sortedQueue.filter(track => track < currentHead).sort((a, b) => b - a);

    go(upRequests); // Service all requests "up"
    // NO jump to the end
    go(downRequests); // Service all requests "down"
  } else { // direction === 'down'
    const downRequests = sortedQueue.filter(track => track <= currentHead).sort((a, b) => b - a);
    const upRequests = sortedQueue.filter(track => track > currentHead);

    go(downRequests); // Service all requests "down"
    // NO jump to the beginning
    go(upRequests); // Service all requests "up"
  }

  return { steps, totalSeek };
}

// 6. C-LOOK (Circular LOOK)
export function calculateCLOOK(head, queue, direction = 'up') {
  let steps = [];
  let currentHead = head;
  let totalSeek = 0;
  const sortedQueue = [...queue].sort((a, b) => a - b);

  const go = (requests) => {
    requests.forEach(track => {
      const seek = Math.abs(track - currentHead);
      steps.push({ from: currentHead, to: track, seek });
      totalSeek += seek;
      currentHead = track;
    });
  };

  if (direction === 'up') {
    const upRequests = sortedQueue.filter(track => track >= currentHead);
    const otherRequests = sortedQueue.filter(track => track < currentHead); // Don't sort descending

    go(upRequests); // Service all requests "up"

    // Jump to the *first* request in the "other" direction
    if (otherRequests.length > 0) {
      const seek = currentHead - otherRequests[0];
      steps.push({ from: currentHead, to: otherRequests[0], seek });
      totalSeek += seek; // This seek counts
      currentHead = otherRequests[0];

      // Service the rest of the "other" requests
      go(otherRequests.slice(1));
    }
  } else { // direction === 'down'
    const downRequests = sortedQueue.filter(track => track <= currentHead).sort((a, b) => b - a);
    const otherRequests = sortedQueue.filter(track => track > currentHead).sort((a, b) => b - a);

    go(downRequests);

    // Jump to the *first* request (highest) in the "other" direction
    if (otherRequests.length > 0) {
      const seek = otherRequests[0] - currentHead;
      steps.push({ from: currentHead, to: otherRequests[0], seek });
      totalSeek += seek;
      currentHead = otherRequests[0];

      go(otherRequests.slice(1));
    }
  }

  return { steps, totalSeek };
}