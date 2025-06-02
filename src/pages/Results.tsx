// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchResults } from '../services/api';
// import ResultCard from '../components/ResultsCard';
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';
// import { StudentResult } from '../types/types';

// const Results: React.FC = () => {
//   const [results, setResults] = useState<StudentResult[]>([]);
//   const [semester, setSemester] = useState('1');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Mock student ID - in a real app, this would come from auth context
//   const studentId = 'STD2023001';

//   useEffect(() => {
//     const loadResults = async () => {
//       setIsLoading(true);
//       setError('');
//       try {
//         const result = await fetchResults(studentId, semester);
//         setResults([result]);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to load results. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadResults();
//   }, [semester, studentId]);

//   const handleLogout = () => {
//     // In a real app, you would clear auth tokens
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-accent-light to-white">
//       <header className="bg-gradient-to-r from-primary-dark to-primary shadow-lg">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="bg-white p-2 rounded-lg shadow-md">
//                 <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
//                 </svg>
//               </div>
//               <h1 className="text-xl font-heading font-bold text-white">My Academic Dashboard</h1>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
//             >
//               <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                 <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
//               </svg>
//               <span className="text-white font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Semester Selector */}
//           <div className="bg-white p-6 rounded-xl shadow-md mb-8">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//               <div className="mb-4 md:mb-0">
//                 <h2 className="text-xl font-heading font-semibold text-dark">Academic Results</h2>
//                 <p className="text-dark-light">View your performance for selected semester</p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <label htmlFor="semester" className="text-sm font-medium text-dark">
//                   Select Semester:
//                 </label>
//                 <select
//                   id="semester"
//                   value={semester}
//                   onChange={(e) => setSemester(e.target.value)}
//                   className="bg-accent-light border border-accent text-dark text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
//                 >
//                   <option value="1">Semester 1</option>
//                   <option value="2">Semester 2</option>
//                   <option value="3">Semester 3</option>
//                   <option value="4">Semester 4</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Results Content */}
//           {error && <ErrorMessage message={error} onRetry={() => window.location.reload()} />}

//           {isLoading ? (
//             <LoadingSpinner />
//           ) : (
//             <div className="space-y-6">
//               {results.length > 0 ? (
//                 results.map((result) => (
//                   <ResultCard key={`${result.studentId}-${result.semester}`} result={result} />
//                 ))
//               ) : (
//                 !error && (
//                   <div className="bg-white p-8 rounded-xl shadow-md text-center">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <h3 className="mt-2 text-lg font-medium text-dark">No results available</h3>
//                     <p className="mt-1 text-dark-light">There are no results for the selected semester.</p>
//                   </div>
//                 )
//               )}
//             </div>
//           )}
//         </div>
//       </main>

//       <footer className="bg-white border-t border-accent py-6 mt-12">
//         <div className="container mx-auto px-4 text-center text-dark-light text-sm">
//           <p>© {new Date().getFullYear()} Academy Results Portal • Student ID: {studentId}</p>
//           <p className="mt-1">For any discrepancies, please contact the administration office within 7 days of result publication.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Results;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchResults } from '../services/api';
import ResultCard from '../components/ResultsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PaymentModal from '../components/PaymentModal';
import { StudentResult } from '../types/types';

const Results: React.FC = () => {
  const [results, setResults] = useState<StudentResult[]>([
    {
      id:'qw',
      studentId:'qwerty',
      name:'beri',
      semester:'first',
      subjects:[
        {
          name:'Boolean Algenra',
          score:80,
          grade:'C'
        }
      ],
      total:78,
      average:75,
      position:12,
      remarks:"average"
    }
  ]);
  const [semester, setSemester] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('completed'); //pending
  const navigate = useNavigate();

  // Mock student data
  const student = {
    id: 'STD2023001',
    name: 'Sarah Johnson',
    balance: 5.00
  };

  useEffect(() => {
    const loadResults = async () => {
      if (paymentStatus !== 'completed') return;
      
      setIsLoading(true);
      setError('');
      try {
        const result = await fetchResults(student.id, semester);
        setResults([result]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results');
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [semester, paymentStatus]);

  const handlePaymentSuccess = () => {
    setPaymentStatus('completed');
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-light to-white">
      <header className="bg-gradient-to-r from-primary-dark to-primary shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.77.79-1.3 2.04-1.3 1.48 0 2.06.61 2.13 1.8h2.07c-.07-1.5-.76-2.89-2.23-3.51V7h-3v1.48c-1.47.61-2.19 1.84-2.19 3.21 0 2.34 1.83 3.03 3.66 3.54 1.87.52 2.35 1.17 2.35 1.87 0 .69-.62 1.3-1.87 1.3-1.59 0-2.23-.65-2.31-1.8H8.04c.08 1.96 1.51 3.19 3.29 3.71V19h3v-1.47c1.78-.52 2.8-1.83 2.8-3.36 0-2.72-2.28-3.4-4.53-3.93z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-white">{student.name}</h1>
                <p className="text-primary-lighter text-sm">ID: {student.id}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {paymentStatus !== 'completed' ? (
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-yellow-100 p-4 rounded-xl mb-6">
                <h3 className="text-xl font-heading font-semibold text-dark mb-2">
                  Payment Required
                </h3>
                <p className="text-dark-light">
                  Please complete the platform access payment to view your results
                </p>
                <p className="text-lg font-bold text-primary mt-2">Amount Due: ${student.balance}</p>
              </div>
              
              <button
                onClick={() => setShowPayment(true)}
                className="w-full py-3 px-6 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-medium hover:shadow-lg transition"
              >
                Proceed to Payment
              </button>
              
              <p className="mt-4 text-sm text-dark-light">
                Secure payment processing powered by Stripe®
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-heading font-semibold text-dark">Academic Results</h2>
                    <p className="text-dark-light">Showing results for selected semester</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label htmlFor="semester" className="text-sm font-medium text-dark">
                      Select Semester:
                    </label>
                    <select
                      id="semester"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="bg-accent-light border border-accent text-dark text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    >
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                      <option value="3">Semester 3</option>
                    </select>
                  </div>
                </div>
              </div>

              {error && <ErrorMessage message={error} onRetry={() => window.location.reload()} />}

              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <div className="space-y-6">
                  {results.map((result) => (
                    <ResultCard key={`${result.studentId}-${result.semester}`} result={result} />
                  ))}
                </div>
              )}
              <div className="space-y-6">
                {results.map((result) => (
                  <ResultCard key={`${result.studentId}-${result.semester}`} result={result} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
        amount={student.balance}
      />

      <footer className="bg-white border-t border-accent py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-dark-light text-sm">
          <p>Official academic records • Payment receipt available in student portal</p>
        </div>
      </footer>
    </div>
  );
};

export default Results;