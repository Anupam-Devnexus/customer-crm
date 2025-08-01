import React, { useEffect, useState } from 'react';

const STORAGE_DATA_KEY = 'uploadedExcelData';
const STORAGE_SALES_ASSIGN_KEY = 'salesOperatorAssignments';
const STORAGE_REMARKS_KEY = 'salesRemarks';

const SALEStoday = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [remarks, setRemarks] = useState({}); // key: rowIndex, value: remark text

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_DATA_KEY);
    const savedSalesAssign = localStorage.getItem(STORAGE_SALES_ASSIGN_KEY);
    const savedRemarks = localStorage.getItem(STORAGE_REMARKS_KEY);

    if (savedData && savedSalesAssign) {
      try {
        const data = JSON.parse(savedData);
        const salesAssignments = JSON.parse(savedSalesAssign);
        const remarksParsed = savedRemarks ? JSON.parse(savedRemarks) : {};

        // Filter data for sales rep 1
        const salesRep1Data = data.filter((_, idx) => salesAssignments[idx] === 'Sales Rep 1');
        setFilteredData(salesRep1Data);
        setRemarks(remarksParsed);
      } catch (error) {
        console.error("Failed to parse localStorage data", error);
        setFilteredData([]);
        setRemarks({});
      }
    } else {
      setFilteredData([]);
      setRemarks({});
    }
  }, []);

  // We keep remarks in state and save explicitly on button click
  const handleRemarkChange = (rowIdx, value) => {
    setRemarks(prev => ({
      ...prev,
      [rowIdx]: value,
    }));
  };

  const handleSaveRemarks = () => {
    localStorage.setItem(STORAGE_REMARKS_KEY, JSON.stringify(remarks));
    alert("Remarks saved successfully!");
  };

  if (filteredData.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500 font-semibold select-none">
        No data assigned to <span className="font-bold">Sales Rep 1</span> found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700 select-none">
        Rows Assigned to Sales Rep 1
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-indigo-600 text-white top-0">
            <tr>
              {Object.keys(filteredData[0]).map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-sm font-semibold border border-indigo-500"
                >
                  {key}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-semibold border border-indigo-500">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? 'bg-indigo-50' : 'bg-white hover:bg-indigo-100 transition-colors'}
              >
                {Object.values(row).map((val, i) => (
                  <td
                    key={i}
                    className="px-6 py-4 border border-indigo-300 whitespace-nowrap font-medium"
                    title={val?.toString()}
                  >
                    {val}
                  </td>
                ))}
                <td className="px-6 py-4 border border-indigo-300 whitespace-normal">
                  <textarea
                    rows={2}
                    value={remarks[idx] || ''}
                    onChange={(e) => handleRemarkChange(idx, e.target.value)}
                    placeholder="Enter remarks..."
                    className="w-full p-2 border rounded-md resize-none focus:outline-indigo-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleSaveRemarks}
          className="px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md transition"
        >
          Save Remarks
        </button>
      </div>
    </div>
  );
};

export default SALEStoday;
