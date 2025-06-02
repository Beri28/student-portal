import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { loginAPI } from '../services/api';
import { Results } from '../pages/Results2';

export type User = {
  id: string;
  name: string;
  email: string;
  studentId: string;
  results?:Results;
  paymentStatus: 'pending' | 'completed';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser:React.Dispatch<React.SetStateAction<User | null>>;
  login: (studentId: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    studentId: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  checkPayment: () => Promise<boolean>;
  processPayment: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check initial auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('student_portal');
        if (token) {
          // Verify token with backend
          const mockUser: User = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            studentId: 'STD2023001',
            paymentStatus: 'pending'
          };
          console.log(JSON.parse(token).user)
          setUser(JSON.parse(token).user);
        }
      } catch (err) {
        localStorage.removeItem('student_portal');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (studentId: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulated API call
      const res=await loginAPI(studentId,password)
      const response = await new Promise<{ user: User; token: string }>((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              studentId,
              paymentStatus: 'pending'
            },
            token: 'fake-jwt-token'
          });
        }, 1000);
      });
      console.log(res)
      localStorage.setItem('student_portal', JSON.stringify({token:res.token,user:res.user}));
      setUser(res.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    studentId: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: '2',
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        studentId: userData.studentId,
        paymentStatus: 'pending'
      };

      localStorage.setItem('student_portal', 'fake-jwt-token');
      setUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('student_portal');
    setUser(null);
  };

  const checkPayment = async () => {
    // Simulate payment check
    return user?.paymentStatus === 'completed';
  };

  const processPayment = async () => {
    try {
      setIsLoading(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(prev => prev ? {
        ...prev,
        paymentStatus: 'completed'
      } : null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        setUser,
        login,
        register,
        logout,
        checkPayment,
        processPayment
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider
