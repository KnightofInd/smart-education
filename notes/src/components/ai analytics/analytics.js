import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

const StudentMarksAnalysis = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const rows = text.split('\n');
          const headers = rows[0].split(',').map(header => header.trim());
          
          const parsedData = rows.slice(1)
            .filter(row => row.trim()) // Skip empty rows
            .map(row => {
              const values = row.split(',').map(value => value.trim());
              const rowData = { name: values[0] };
              
              headers.slice(1).forEach((header, index) => {
                rowData[header] = Number(values[index + 1]);
              });
              
              return rowData;
            });

          setData(parsedData);
          setError('');
        } catch (err) {
          setError('Error parsing CSV file. Please ensure it matches the expected format.');
          console.error('Error parsing CSV:', err);
        }
      };

      reader.onerror = () => {
        setError('Error reading the file');
      };

      reader.readAsText(file);
    }
  };

  // Calculate subject averages when data is available
  const subjectAverages = data.length ? 
    Object.keys(data[0])
      .filter(key => key !== 'name')
      .map(subject => ({
        subject,
        average: Number((data.reduce((acc, student) => acc + student[subject], 0) / data.length).toFixed(2))
      })) : [];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Student Performance Analysis Dashboard</h1>
        
        {/* File Upload Section */}
        <div className="mb-8">
          <div className="space-y-2">
            <label htmlFor="csvFile" className="block text-sm font-medium text-gray-700">
              Upload CSV File (Format: Name, Subject1, Subject2, ...)
            </label>
            <input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full text-sm border border-gray-300 rounded-md p-2"
            />
          </div>
          {error && (
            <div className="mt-2 text-red-500 text-sm">{error}</div>
          )}
        </div>

        {data.length > 0 ? (
          <div className="space-y-8">
            {/* Subject-wise Performance Distribution */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Subject-wise Performance Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    {Object.keys(data[0])
                      .filter(key => key !== 'name')
                      .map((subject, index) => (
                        <Bar
                          key={subject}
                          dataKey={subject}
                          fill={`hsl(${index * 45}, 70%, 60%)`}
                        />
                      ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subject Averages */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Subject Averages</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={subjectAverages}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="average" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Student Performance Radar */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Individual Student Performance Radar</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    {Object.keys(data[0])
                      .filter(key => key !== 'name')
                      .map((subject, index) => (
                        <Radar
                          key={subject}
                          name={subject}
                          dataKey={subject}
                          stroke={`hsl(${index * 45}, 70%, 60%)`}
                          fill={`hsl(${index * 45}, 70%, 60%)`}
                          fillOpacity={0.6}
                        />
                      ))}
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Upload a CSV file to view the analysis
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMarksAnalysis;