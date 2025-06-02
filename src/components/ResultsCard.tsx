import React from 'react';
import { StudentResult } from '../types/types';

interface ResultCardProps {
  result: StudentResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden transition-transform hover:scale-[1.01] hover:shadow-card-hover">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-heading font-bold text-white">{result.name}</h2>
            <p className="text-primary-lighter text-sm">ID: {result.studentId}</p>
          </div>
          <span className="bg-white text-primary-dark px-3 py-1 rounded-full text-sm font-semibold">
            Semester {result.semester}
          </span>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        {/* Subjects Table */}
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-dark mb-3 pb-2 border-b border-accent">
            Subject Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-accent">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-dark uppercase tracking-wider">Score</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-dark uppercase tracking-wider">Grade</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-accent">
                {result.subjects.map((subject, index) => (
                  <tr key={subject.name} className={index % 2 === 0 ? 'bg-accent-light' : ''}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-dark">{subject.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-dark text-right">{subject.score}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {subject.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="text-sm font-medium text-green-800">Total Score</div>
            <div className="text-2xl font-heading font-bold text-green-900">{result.total}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="text-sm font-medium text-blue-800">Average</div>
            <div className="text-2xl font-heading font-bold text-blue-900">{result.average.toFixed(2)}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="text-sm font-medium text-purple-800">Class Position</div>
            <div className="text-2xl font-heading font-bold text-purple-900">
              {result.position ? `${result.position}${getOrdinalSuffix(result.position)}` : 'N/A'}
            </div>
          </div>
        </div>
        
        {/* Remarks */}
        <div className="bg-accent-light p-4 rounded-lg border border-accent">
          <h4 className="text-sm font-medium text-dark mb-1">Teacher's Remarks</h4>
          <p className="text-dark font-medium">"{result.remarks}"</p>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="bg-accent px-6 py-3 text-right">
        <span className="text-xs text-dark-light">
          Generated on {new Date().toLocaleDateString()} • Official Academic Record
        </span>
      </div>
    </div>
  );
};

function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}

export default ResultCard;