import React, { useState, useEffect } from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';

// Animation speed (ms)
const ANIMATION_SPEED_MS = 1;

// Number of bars
const NUMBER_OF_ARRAY_BARS = 310;

// Colors
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);

  // Runs once when component loads
  useEffect(() => {
    resetArray();
  }, []);

  // Generate new random array
  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5, 730));
    }
    setArray(newArray);
  };

  // Merge Sort animation
  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      //i%3 = 0 => compare means red color, if 1 normal blue color, and for 2 height is changed due to sorting
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  return (
    <div className="array-container">
      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`,
          }}
        />
      ))}

      <button onClick={resetArray}>Generate New Array</button>
      <button onClick={mergeSort}>Merge Sort</button>
      <button disabled>Quick Sort</button>
      <button disabled>Heap Sort</button>
      <button disabled>Bubble Sort</button>
    </div>
  );
};

export default SortingVisualizer;

// Helper function
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
