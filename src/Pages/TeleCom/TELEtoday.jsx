import React, { useEffect, useState } from 'react';

const STORAGE_DATA_KEY = 'uploadedExcelData';
const STORAGE_ASSIGN_KEY = 'assignedOperators';
const STORAGE_SALES_ASSIGN_KEY = 'salesOperatorAssignments';

const telecomOperators = ["Operator A", "Operator B", "Operator C", "Operator D"];
const salesOperators = ["Sales Rep 1", "Sales Rep 2", "Sales Rep 3", "Sales Rep 4"];

const TELEtoday = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [salesAssignments, setSalesAssignments] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [autoDistribution, setAutoDistribution] = useState({});
  const [detailPopupRow, setDetailPopupRow] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_DATA_KEY);
    const savedAssigned = localStorage.getItem(STORAGE_ASSIGN_KEY);
    const savedSalesAssign = localStorage.getItem(STORAGE_SALES_ASSIGN_KEY);

    if (savedData && savedAssigned) {
      try {
        const data = JSON.parse(savedData);
        const assignedOperators = JSON.parse(savedAssigned);
        const salesAssignParsed = savedSalesAssign ? JSON.parse(savedSalesAssign) : {};

        const operatorAData = data.filter((_, idx) => assignedOperators[idx] === 'Operator A');
        setFilteredData(operatorAData);
        setSalesAssignments(salesAssignParsed);
      } catch (error) {
        console.error("Failed to parse localStorage data", error);
        setFilteredData([]);
        setSalesAssignments({});
      }
    } else {
      setFilteredData([]);
      setSalesAssignments({});
    }
  }, []);

  useEffect(() => {
    if (Object.keys(salesAssignments).length > 0) {
      localStorage.setItem(STORAGE_SALES_ASSIGN_KEY, JSON.stringify(salesAssignments));
    } else {
      localStorage.removeItem(STORAGE_SALES_ASSIGN_KEY);
    }
  }, [salesAssignments]);

  const handleSalesAssignChange = (rowIdx, salesOperator) => {
    setSalesAssignments(prev => ({
      ...prev,
      [rowIdx]: salesOperator
    }));
  };

  const handleAutoDistributeClick = () => {
    const totalRows = filteredData.length;
    const opsCount = salesOperators.length;
    const baseCount = Math.floor(totalRows / opsCount);
    const remainder = totalRows % opsCount;

    const distribution = {};
    let currentIndex = 0;

    salesOperators.forEach((op, i) => {
      let count = baseCount + (i < remainder ? 1 : 0);
      for (let j = 0; j < count; j++) {
        distribution[currentIndex] = op;
        currentIndex++;
      }
    });

    setAutoDistribution(distribution);
    setShowPopup(true);
  };

  const handleConfirmDistribution = () => {
    setSalesAssignments(autoDistribution);
    setShowPopup(false);
  };

  const handleCancelDistribution = () => {
    setShowPopup(false);
  };

  const handleCellClick = (row) => setDetailPopupRow(row);
  const closeDetailPopup = () => setDetailPopupRow(null);

  if (filteredData.length === 0) {
    return (
      <div className="text-center text-gray-500 font-semibold mt-20 select-none">
        No data assigned to <span className="font-bold">Operator A</span>.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
      
      <div className='flex justify-between items-center mb-1'>


      <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8 select-none">
        📞 Operator A - Assigned Leads
      </h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleAutoDistributeClick}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition duration-200"
        >
          Auto-Distribute Sales Operators
        </button>
      </div>
      </div>

      <div className="overflow-x-auto shadow ring-1 ring-indigo-300 rounded-xl">
        <table className="min-w-full bg-white text-sm text-left text-gray-700">
          <thead className="bg-indigo-600 text-white sticky top-0 z-10">
            <tr>
              {Object.keys(filteredData[0]).map((key) => (
                <th key={key} className="px-4 py-3 font-semibold border-b border-indigo-300">
                  {key}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold border-b border-indigo-300">Assign Sales Operator</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                {Object.values(row).map((val, i) => (
                  <td
                    key={i}
                    onClick={() => handleCellClick(row)}
                    className="px-4 py-3 cursor-pointer hover:bg-indigo-50 transition duration-200 border-b"
                    title={val?.toString()}
                  >
                    {val}
                  </td>
                ))}
                <td className="px-4 py-3 border-b">
                  <select
                    value={salesAssignments[idx] || ""}
                    onChange={(e) => handleSalesAssignChange(idx, e.target.value)}
                    className="w-full rounded-md border border-indigo-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="" disabled>Select</option>
                    {salesOperators.map((salesOp) => (
                      <option key={salesOp} value={salesOp}>{salesOp}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Auto-distribution confirmation popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-indigo-700">Confirm Auto Distribution</h3>
            <div className="overflow-y-auto max-h-80 border border-indigo-300 rounded-lg mb-6 shadow-inner">
              <table className="min-w-full text-sm text-gray-800">
                <thead className="bg-indigo-100">
                  <tr>
                    {Object.keys(filteredData[0]).map((key) => (
                      <th key={key} className="px-4 py-2 border">{key}</th>
                    ))}
                    <th className="px-4 py-2 border">Sales Operator</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-4 py-2 border">{val}</td>
                      ))}
                      <td className="px-4 py-2 border font-semibold text-green-700">{autoDistribution[idx]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleConfirmDistribution}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDistribution}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail view modal */}
      {detailPopupRow && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
          onClick={closeDetailPopup}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative"
          >
            <h3 className="text-2xl font-bold mb-4 text-indigo-700">Row Details</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {Object.entries(detailPopupRow).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-gray-200 py-2">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className="text-gray-900 break-words max-w-[60%] text-right">{value?.toString()}</span>
                </div>
              ))}
            </div>
            <button
              onClick={closeDetailPopup}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-semibold block mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TELEtoday;
