export interface StudentResult {
  id: string;
  studentId: string;
  name: string;
  semester: string;
  subjects: {
    name: string;
    score: number;
    grade: string;
  }[];
  total: number;
  average: number;
  position?: number;
  remarks: string;
}

export interface User {
  // id: string;
  // username: string;
  // role: 'student' | 'admin';
  id: string;
  name: string;
  email: string;
  studentId: string;
  paymentStatus: 'pending' | 'completed';
}