import axios from 'axios';

// Mock data as per requirements
const MOCK_COMPONENTS = [
  { id: 1, name: "Human", x: 100, y: 100 },
  { id: 2, name: "Vehicle", x: 250, y: 150 },
  { id: 3, name: "Road", x: 400, y: 200 },
  { id: 4, name: "Door", x: 550, y: 250 }
];

export const getComponents = async () => {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_COMPONENTS);
    }, 500);
  });
};
