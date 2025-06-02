import { Avatar } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  CA:number;
  exam:number;
  finalMark:number;
  status: 'C' | 'E';
  instructor: string;
  type: 'major' | 'elective';
};
export type Results ={
  name:string;
  matricule:string;
  department:string;
  semester:string;
  gpa:number
  courses:{
    id: number;
    courseCode: string;
    courseName: string;
    credits: number;
    ca:number;
    exam:number;
    final:number;
    grade:string;
  }[]
}

interface componentProps {
  results?:Results
}

  const ResultsView=({results}:{results:Results})=>{
    console.log(results)
    return (
      <div className="max-w-5xl mx-auto p-6 bg-white font-sans">
        {/* Header Section */}
        <div className="mb-4 flex items-center gap-x-4 w-full overflow-auto">
          <div className="space-y-2 mb-4 flex-1">
            <p><span className="font-bold">Name:</span> {results.name}</p>
            <p><span className="font-bold">Matriculation N°:</span> {results.matricule}</p>
            <p><span className="font-bold">Major:</span></p>
            <p><span className="font-bold">Minor:</span></p>
          </div>
          <Avatar sx={{width:100,height:100}} />
          <div className="space-y-2 mb-4 flex-1 justify-end text-end">
            <p><span className="font-bold">DEPARTMENT:</span>{results.department}</p>
            <p><span className="font-bold">Semester:</span> {results.semester}</p>
            <p><span className="font-bold">Academic Year:</span> 2024/2025</p>
            <p><span className="font-bold">Printed Date:</span> {new Date(Date.now()).toLocaleDateString()}</p>
          </div>
        </div>
        <p className="text-xl font-bold text-center my-4 uppercase">Results</p>
        <div className="border-t border-black my-1"></div>
        <div className="border-t border-black my-1"></div>
        <div className="overflow-x-auto text-sm mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-1 border border-black text-left">S/N</th>
                <th className="p-1 border border-black text-left">Course Code</th>
                <th className="p-1 border border-black text-left">Course Title</th>
                <th className="p-1 border border-black text-left">Credit Value</th>
                <th className="p-1 border border-black text-left">CA Mark</th>
                <th className="p-1 border border-black text-left">Exam Mark</th>
                <th className="p-1 border border-black text-left">Final Mark</th>
                <th className="p-1 border border-black text-left"></th>
              </tr>
            </thead>
            <tbody>
              {results.courses.map((course,index) => (
                <tr key={index}>
                  <td className="p-1 border border-black">{index}</td>
                  <td className="p-1 border border-black">{course.courseCode}</td>
                  <td className="p-1 border border-black">{course.courseName}</td>
                  <td className="p-1 border border-black">{course.credits}</td>
                  <td className="p-1 border border-black">{course.ca}</td>
                  <td className="p-1 border border-black">{course.exam}</td>
                  <td className="p-1 border border-black">{course.final}</td>
                  <td className="p-1 border border-black">{course.final>49?<span className="text-green-700">Passed</span>:<span className="text-red-400">Failed</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='pt-1 w-full flex justify-end'>
            <span className="p-1 border border-black w-1/2 font-bold text-center">Semester GPA</span>
            <span className="p-1 border border-black w-1/2 font-bold text-center">{results.gpa}/4.0</span>
          </div>
        </div>
      </div>
    )
  }

const Results2 = ({results}:componentProps) => {
  const [printedDate] = useState(new Date(Date.now()).toLocaleDateString()); 
  const { user, logout, processPayment } = useAuth();
  // const [results2,setResults]=useState<Results[]>(results|| [])
  const courses: Course[] = [
    { id: 1, code: 'CEF479', title: 'COMPUTER NETWORK LABORATORY', credits: 3,CA:13,exam:40,finalMark:53, status: 'C', instructor: 'Elie FUTE T.', type: 'major' },
    { id: 3, code: 'EEF463', title: 'OPTICAL NETWORK COMMUNICATION', credits: 3,CA:13,exam:40,finalMark:53, status: 'C', instructor: 'Dr Sitantze Younbi Bertrand', type: 'major' },
    { id: 5, code: 'EEF467', title: 'FEEDBACK SYSTEMS', credits: 3,CA:13,exam:40,finalMark:53, status: 'C', instructor: 'Wimkar Basil Nsanyuy', type: 'major' },
    { id: 9, code: 'CEF453', title: 'NETWORK DESIGN AND SIMULATION',CA:13,exam:40,finalMark:53, credits: 3, status: 'C', instructor: 'Elie FUTE T.', type: 'major' },
    { id: 2, code: 'EEF461', title: 'RADIO AND TELEVISION', credits: 3,CA:13,exam:40,finalMark:53, status: 'E', instructor: 'Dr Fozin Fonzin Theophile', type: 'elective' },
    { id: 4, code: 'EEF465', title: 'TRANSMISSIONS SYSTEMS', credits: 3,CA:13,exam:40,finalMark:53, status: 'E', instructor: 'Mr. FUMTCHUM Achilles', type: 'elective' },
    { id: 6, code: 'EEF469', title: 'MICROELECTRONICS', credits: 3,CA:13,exam:40,finalMark:53, status: 'E', instructor: 'Dr. Tsafack Pierre', type: 'elective' },
    { id: 7, code: 'EEF471', title: 'BASIC TELECOMMUNICATION LABORATORY', credits: 4,CA:13,exam:40,finalMark:53, status: 'E', instructor: 'Dr Fozin Fonzin Theophile', type: 'elective' },
    { id: 8, code: 'EEF445', title: 'SENSOR NETWORKS', credits: 3,CA:3,exam:40,finalMark:43, status: 'E', instructor: 'Mr. FUMTCHUM Achilles', type: 'elective' },
  ];
  return (
    <>
    {/* <div className="max-w-5xl mx-auto p-6 bg-white font-sans">
      <div className="mb-4 flex items-center gap-x-4 w-full overflow-auto">
        <div className="space-y-2 mb-4 flex-1">
          <p><span className="font-bold">Name:</span> TAH THIERRY<br />TAHLAH</p>
          <p><span className="font-bold">Matriculation N°:</span> 000153</p>
          <p><span className="font-bold">Major:</span> B.Tech Computer Engineering</p>
          <p><span className="font-bold">Minor:</span> none</p>
        </div>
        <Avatar sx={{width:100,height:100}} />
        <div className="space-y-2 mb-4 flex-1 justify-end text-end">
          <p><span className="font-bold">DEPARTMENT:</span> COMPUTER ENGINEERING(COLTECH)</p>
          <p><span className="font-bold">Semester:</span> First Semester</p>
          <p><span className="font-bold">Academic Year:</span> 2024/2026</p>
          <p><span className="font-bold">Printed Date:</span> {printedDate}</p>
        </div>
      </div>
      <p className="text-xl font-bold text-center my-4 uppercase">Results</p>
      <div className="border-t border-black my-1"></div>
      <div className="border-t border-black my-1"></div>
      <div className="overflow-x-auto text-sm mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-1 border border-black text-left">S/N</th>
              <th className="p-1 border border-black text-left">Course Code</th>
              <th className="p-1 border border-black text-left">Course Title</th>
              <th className="p-1 border border-black text-left">Credit Value</th>
              <th className="p-1 border border-black text-left">CA Mark</th>
              <th className="p-1 border border-black text-left">Exam Mark</th>
              <th className="p-1 border border-black text-left">Final Mark</th>
              <th className="p-1 border border-black text-left"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="p-1 border border-black">{course.id}</td>
                <td className="p-1 border border-black">{course.code}</td>
                <td className="p-1 border border-black">{course.title}</td>
                <td className="p-1 border border-black">{course.credits}</td>
                <td className="p-1 border border-black">{course.CA}</td>
                <td className="p-1 border border-black">{course.exam}</td>
                <td className="p-1 border border-black">{course.finalMark}</td>
                <td className="p-1 border border-black">{course.finalMark>49?<span className="text-green-700">Passed</span>:<span className="text-red-400">Failed</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> */}
    {results &&
    <ResultsView results={results} />
    }
    </>
  );
};

export default Results2;