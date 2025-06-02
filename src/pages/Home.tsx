import { useState } from 'react';
import Header from '../components/header/header';
import { Accordion, AccordionDetails, AccordionSummary, Divider, MenuItem, Select } from '@mui/material';
import { ArrowDownward, ArrowDropDown, ExpandMore } from '@mui/icons-material';
import Results2, { Results } from './Results2';
import { useAuth } from '../context/AuthContext';
import { fetchResults } from '../services/api';

const Home = () => {
  const {user,setUser}=useAuth()
  const [academicYear, setAcademicYear] = useState('2024/2025');
  const [semester, setSemester] = useState('first');
  const [isLoading, setIsLoading] = useState(false);
  const [resultsPublished, setResultsPublished] = useState(true);
  const [results,setResults]=useState<Results[]>(user?.results && [user?.results] || [])
  const handleGetResults = async() => {
    setIsLoading(true);
    try {
      const res=await fetchResults(user?.studentId,semester==='first'?'1':'2')
      console.log(res)
      setResults([{...res.data.results,name:user?.name,matricule:user?.studentId}])
      user && setUser({...user,results:{...res.data.results,name:user?.name,matricule:user?.studentId}})
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="sm:max-w-[90%] max-w-[95%] mx-auto p-10 bg-white rounded-lg shadow-md mt-12">
        <p className="text-lg font-medium text-gray-800 mb-6 bg-blue-100 p-5 rounded-md">
         {user?.name} Select academic year and semester to get results
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
              Academic Year
            </label>
            <Select
              id="academicYear"
              className='w-full'
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              disabled={true}
            >
              <MenuItem value={"2022/2023"} >2022/2023</MenuItem>
              <MenuItem value={"2023/2024"}  >2023/2024</MenuItem>
              <MenuItem value={"2024/2025"}  >2024/2025</MenuItem>
            </Select>
          </div>

          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
              Semester
            </label>
            <Select
              id="semester"
              className='w-full'
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <MenuItem value={"first"} >First Semester</MenuItem>
              <MenuItem value={"second"}  >Second Semester</MenuItem>
              <MenuItem value={"firstResit"} disabled={true}  >First Semester Resit</MenuItem>
              <MenuItem value={"secondResit"} disabled={true}  >Second Semester Resit</MenuItem>
            </Select>
          </div>
        </div>

        <button
          onClick={handleGetResults}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-blue-400' : 'bg-[#1b7dd0] hover:bg-blue-700'} transition-colors`}
        >
          {isLoading ? 'Loading...' : 'Get Result'}
        </button>

        {!isLoading && !resultsPublished && (
          <p className="mt-4 text-center text-gray-800 bg-yellow-200 p-5 rounded-md">
            Results are not published for this semester
          </p>
        )
        }
        {/* {(<p className="mt-4 font-medium text-gray-800 bg-green-50 p-5 rounded-md">
          Resently published results
        </p>)
        } */}
        {!isLoading && resultsPublished &&
          <div className="space-y-4 mt-4">
            <p className=" font-medium text-gray-800 bg-green-50 p-5 rounded-md">
              Resently published results
            </p>
            <Results2 results={results[0]} />
            {/* <Accordion className='my-4 py-2' expanded={true} >
              <AccordionSummary expandIcon={<ExpandMore />} > <p className=" font-medium text-gray-800">Results for {semester}</p> </AccordionSummary>
              <AccordionDetails>
                  <Divider />
                  <Results2 />
              </AccordionDetails>
            </Accordion> */}
          </div>
        }
      </div>
    </div>
  );
};

export default Home;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/header/header';

// const Home: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-accent-light to-white">
//       <Header />
      
//       <main className="container mx-auto px-4 py-12">
//         <div className="max-w-4xl mx-auto text-center mb-16">
//           <h2 className="text-4xl font-heading font-bold text-dark mb-6 leading-tight">
//             Access Your Academic Results Securely
//           </h2>
//           <p className="text-xl text-dark-light leading-relaxed">
//             View your semester results instantly after verifying your student account
//             and completing the platform access payment.
//           </p>
//         </div>
        
//         <div className="grid md:grid-cols-3 gap-8 mb-16">
//           <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary transform transition hover:-translate-y-2">
//             <div className="bg-primary-light bg-opacity-10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//               <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.77.79-1.3 2.04-1.3 1.48 0 2.06.61 2.13 1.8h2.07c-.07-1.5-.76-2.89-2.23-3.51V7h-3v1.48c-1.47.61-2.19 1.84-2.19 3.21 0 2.34 1.83 3.03 3.66 3.54 1.87.52 2.35 1.17 2.35 1.87 0 .69-.62 1.3-1.87 1.3-1.59 0-2.23-.65-2.31-1.8H8.04c.08 1.96 1.51 3.19 3.29 3.71V19h3v-1.47c1.78-.52 2.8-1.83 2.8-3.36 0-2.72-2.28-3.4-4.53-3.93z"/>
//               </svg>
//             </div>
//             <h3 className="text-xl font-heading font-semibold text-dark mb-2">Secure Payments</h3>
//             <p className="text-dark-light">Verified payment gateway with SSL encryption</p>
//           </div>
          
//           <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary transform transition hover:-translate-y-2">
//             <div className="bg-secondary-light bg-opacity-10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//               <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
//               </svg>
//             </div>
//             <h3 className="text-xl font-heading font-semibold text-dark mb-2">Instant Access</h3>
//             <p className="text-dark-light">Immediate results access after payment verification</p>
//           </div>
          
//           <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-purple-500 transform transition hover:-translate-y-2">
//             <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//               <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
//               </svg>
//             </div>
//             <h3 className="text-xl font-heading font-semibold text-dark mb-2">Official Records</h3>
//             <p className="text-dark-light">Digitally signed and verified academic documents</p>
//           </div>
//         </div>
        
//         <div className="text-center">
//           <button
//             onClick={() => navigate('/login')}
//             className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-heading font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//           >
//             Check Your Results
//             <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </button>
//           <p className="mt-4 text-sm text-dark-light">
//             Platform access fee: $5 per semester result (payable after login)
//           </p>
//         </div>
//       </main>
      
//       <footer className="bg-white border-t border-accent py-6 mt-12">
//         <div className="container mx-auto px-4 text-center text-dark-light text-sm">
//           <p>© {new Date().getFullYear()} Academic Results Portal. Certified partner of educational institutions.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;