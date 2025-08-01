import React, { useEffect, useState } from 'react';

const STORAGE_DATA_KEY = 'uploadedExcelData';
const STORAGE_ASSIGN_KEY = 'assignedOperators';
const STORAGE_SALES_ASSIGN_KEY = 'salesOperatorAssignments';
const STORAGE_REMARKS_KEY = 'salesRemarks'; // Stores actual sales remarks

const TLALLdata = () => {
  const [data, setData] = useState([]);
  const [assignedOperators, setAssignedOperators] = useState({});
  const [salesAssignments, setSalesAssignments] = useState({});
  const [salesRemarks, setSalesRemarks] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_DATA_KEY);
    const telecomAssignments = localStorage.getItem(STORAGE_ASSIGN_KEY);
    const salesAssignmentsData = localStorage.getItem(STORAGE_SALES_ASSIGN_KEY);
    const storedSalesRemarks = localStorage.getItem(STORAGE_REMARKS_KEY);

    if (storedData) {
      setData(JSON.parse(storedData));
    }

    if (telecomAssignments) {
      setAssignedOperators(JSON.parse(telecomAssignments));
    }

    if (salesAssignmentsData) {
      setSalesAssignments(JSON.parse(salesAssignmentsData));
    }

    if (storedSalesRemarks) {
      setSalesRemarks(JSON.parse(storedSalesRemarks));
    }
  }, []);

  return (
    <div className="max-w-[95%] mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold py-4 text-center bg-indigo-600 text-white">
        Excel Uploaded Data Overview
      </h2>

      <div className="overflow-auto max-h-[600px] rounded-b-lg">
        <table className="min-w-full text-sm text-gray-800 border-collapse">
          <thead className="top-0 z-10 bg-indigo-600 text-white">
            <tr>
              {data[0] &&
                Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-5 py-3 border border-indigo-500 text-left">
                    {key}
                  </th>
                ))}
              <th className="px-5 py-3 border border-indigo-500 text-left">Telecom Remark</th>
              <th className="px-5 py-3 border border-indigo-500 text-left">Sales Employee</th>
              <th className="px-5 py-3 border border-indigo-500 text-left">Sales Remark</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="even:bg-indigo-50 odd:bg-white hover:bg-indigo-100 transition"
              >
                {Object.values(row).map((val, i) => (
                  <td key={i} className="px-5 py-2 border border-gray-300 truncate max-w-xs">
                    {val}
                  </td>
                ))}
                <td className="px-5 py-2 border border-gray-300">
                  {assignedOperators[idx] || <span className="italic text-gray-400">Not assigned</span>}
                </td>
                <td className="px-5 py-2 border border-gray-300">
                  {salesAssignments[idx] || <span className="italic text-gray-400">Not assigned</span>}
                </td>
                <td className="px-5 py-2 border border-gray-300">
                  {salesRemarks[idx] || <span className="italic text-gray-400">Not remarked</span>}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="100%" className="text-center py-10 text-gray-500">
                  No data found in localStorage.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TLALLdata;
