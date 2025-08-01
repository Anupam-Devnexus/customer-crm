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

  // Prepare auto distribution preview and show popup
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

  // Confirm popup changes: apply auto distribution to state and localStorage
  const handleConfirmDistribution = () => {
    setSalesAssignments(autoDistribution);
    setShowPopup(false);
  };

  const handleCancelDistribution = () => {
    setShowPopup(false);
  };

  // Open detail popup for clicked row
  const handleCellClick = (row) => {
    setDetailPopupRow(row);
  };

  // Close detail popup
  const closeDetailPopup = () => {
    setDetailPopupRow(null);
  };

  if (filteredData.length === 0) {
    return (
      <div className="text-center text-gray-500 font-semibold select-none mt-20">
        No data assigned to <span className="font-bold">Operator A</span> found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-3 bg-white rounded shadow ">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700 select-none">
        Rows Assigned to Operator A
      </h2>

      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={handleAutoDistributeClick}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold shadow-md transition"
          title="Auto distribute sales operators equally"
        >
          Auto-Distribute Sales Operators
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-indigo-600 text-white sticky top-0">
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
                Assign Sales Operator
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-indigo-50" : "bg-white hover:bg-indigo-100 transition-colors"}
              >
                {Object.values(row).map((val, i) => (
                  <td
                    key={i}
                    className="px-6 py-4 border border-indigo-300 whitespace-nowrap font-medium cursor-pointer"
                    title={val?.toString()}
                    onClick={() => handleCellClick(row)}
                  >
                    {val}
                  </td>
                ))}
                <td className="px-6 py-4 border border-indigo-300 whitespace-nowrap">
                  <select
                    value={salesAssignments[idx] || ""}
                    onChange={(e) => handleSalesAssignChange(idx, e.target.value)}
                    className="w-full rounded-md border border-indigo-400 px-3 py-1 text-sm text-indigo-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={(e) => e.stopPropagation()} // prevent triggering detail popup
                  >
                    <option value="" disabled>
                      Select Sales Operator
                    </option>
                    {salesOperators.map((salesOp) => (
                      <option key={salesOp} value={salesOp}>
                        {salesOp}
                      </option>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-indigo-700 select-none">
              Confirm Auto Distribution
            </h3>

            <div className="overflow-y-auto max-h-72 border border-indigo-300 rounded-lg mb-6 shadow-inner">
              <table className="min-w-full text-gray-900 text-sm">
                <thead className="bg-indigo-100 select-none">
                  <tr>
                    {Object.keys(filteredData[0]).map((key) => (
                      <th
                        key={key}
                        className="px-4 py-2 border border-indigo-400 font-semibold"
                      >
                        {key}
                      </th>
                    ))}
                    <th className="px-4 py-2 border border-indigo-400 font-semibold">
                      Sales Operator
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-indigo-50" : "bg-white"}
                    >
                      {Object.values(row).map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 border border-indigo-300 whitespace-nowrap"
                          title={val?.toString()}
                        >
                          {val}
                        </td>
                      ))}
                      <td className="px-4 py-2 border border-indigo-300 font-semibold text-green-700 whitespace-nowrap">
                        {autoDistribution[idx]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center gap-8">
              <button
                onClick={handleConfirmDistribution}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition select-none"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDistribution}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition select-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail popup modal */}
      {detailPopupRow && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
          onClick={closeDetailPopup}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 text-indigo-700 select-none">
              Row Details
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {Object.entries(detailPopupRow).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-gray-300 py-2">
                  <span className="font-semibold text-gray-700">{key}:</span>
                  <span className="text-gray-900 break-words max-w-[60%]">{value?.toString()}</span>
                </div>
              ))}
            </div>
            <button
              onClick={closeDetailPopup}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-semibold block mx-auto select-none"
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
