import { StudentResult, User } from '../types/types';


// const API_BASE_URL = 'http://localhost:5000/api/v1'; // This will be proxied to your backend
// const BASE_URL = 'http://localhost:5000/api/v1'; // This will be proxied to your backend

// const API_BASE_URL = 'http://localhost:80/api/v1'; // This will be proxied to your backend
// const BACKEND_BASE_URL = 'http://localhost:5000/api/v1'; // This will be proxied to your backend

const API_BASE_URL = 'https://student-portal-backend-vcfj.onrender.com/api/v1'; // This will be proxied to your backend

export const fetchResults = async (studentId?: string, semester?: string): Promise<any> => {
  console.log(studentId,semester)
  const response = await fetch(`${API_BASE_URL}/results?studentId=${studentId}&semester=${semester}`,
  // const response = await fetch(`${API_BASE_URL}/results/${studentId}/${semester}`,
    {
      headers:{
        'x-api-key':'school_secret_2023'
      }
    }
  );
  console.log(response)
  // const response = await fetch(`${API_BASE_URL}/results?studentId=${studentId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch results');
  }
  return response.json();
};

export const loginAPI = async (studentId: string, password: string): Promise<{ user: User, token: string }> => {
  // const response = await fetch(`${BACKEND_BASE_URL}/auth/login`, {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key':'school_secret_2023'
    },
    body: JSON.stringify({ studentId, password }),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};