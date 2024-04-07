'use client';

import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rng');
        const data = await response.json();
        console.log(data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>Result: {result}</div>;
}