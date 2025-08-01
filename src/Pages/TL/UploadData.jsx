import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FaUpload, FaCheckCircle } from 'react-icons/fa';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

const STORAGE_DATA_KEY = 'uploadedExcelData';
const STORAGE_ASSIGN_KEY = 'assignedOperators';

const telecomOperators = ["Operator A", "Operator B", "Operator C", "Operator D"];

const UploadData = () => {
  const [data, setData] = useState([]);
  const [assignedOperators, setAssignedOperators] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_DATA_KEY);
    const savedAssigned = localStorage.getItem(STORAGE_ASSIGN_KEY);

    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (err) {
        console.warn("Invalid Excel data in localStorage", err);
      }
    }

    if (savedAssigned) {
      try {
        setAssignedOperators(JSON.parse(savedAssigned));
      } catch (err) {
        console.warn("Invalid assigned operators in localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    data.length > 0
      ? localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data))
      : localStorage.removeItem(STORAGE_DATA_KEY);
  }, [data]);

  useEffect(() => {
    Object.keys(assignedOperators).length > 0
      ? localStorage.setItem(STORAGE_ASSIGN_KEY, JSON.stringify(assignedOperators))
      : localStorage.removeItem(STORAGE_ASSIGN_KEY);
  }, [assignedOperators]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);
      setAssignedOperators({});
      setShowPopup(false);
      setIsLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const handleOperatorChange = (rowIndex, operator) => {
    setAssignedOperators(prev => ({ ...prev, [rowIndex]: operator }));
  };

  const handleSubmit = () => {
    const allAssigned = data.every((_, idx) => assignedOperators[idx]);
    if (!allAssigned) return alert("Please assign telecom operators for all rows.");
    setShowPopup(true);
  };

  const handleConfirm = () => {
    setShowPopup(false);
    alert("Data submitted successfully!");
    // Further API processing can be done here
  };

  const handleCancel = () => setShowPopup(false);

  const handleAutoAssign = () => {
    const total = data.length;
    const perOperator = Math.floor(total / telecomOperators.length);
    const remainder = total % telecomOperators.length;
    const assignments = {};
    let idx = 0;

    telecomOperators.forEach((operator, i) => {
      const assignCount = perOperator + (i < remainder ? 1 : 0);
      for (let j = 0; j < assignCount; j++) {
        assignments[idx++] = operator;
      }
    });

    setAssignedOperators(assignments);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-100 to-purple-100 px-4 py-2">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl px-6 py-10 border border-indigo-100">
        <h1 className="text-5xl font-bold text-center text-indigo-800 mb-10 drop-shadow-sm">
          📁 Upload Excel & Assign Operators
        </h1>

        <div className="flex justify-center mb-10">
          <label className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">
            <FaUpload size={20} />
            <span>Upload Excel File</span>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {isLoading && (
          <p className="text-center text-indigo-600 font-semibold mb-6 animate-pulse">
            Reading file, please wait...
          </p>
        )}

        {data.length > 0 && !isLoading ? (
          <>
            <div className="overflow-auto max-h-[500px] border rounded-xl shadow-inner mb-6">
              <table className="min-w-full text-gray-900 text-sm">
                <thead className="bg-indigo-600  top-0 z-10 text-white select-none">
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key} className="px-5 py-3 text-left border border-indigo-500 bg-indigo-600">
                        {key}
                      </th>
                    ))}
                    <th className="px-2 py-3 text-left border border-indigo-500 bg-indigo-600">
                      Assign Operator
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, idx) => (
                    <tr key={idx} className="even:bg-indigo-50 hover:bg-indigo-100 transition-colors">
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-5 py-2 border border-indigo-300 truncate max-w-xs">
                          {val}
                        </td>
                      ))}
                      <td className="px-5 py-2 border border-indigo-300">
                        <div className="flex items-center gap-2">
                          <select
                            value={assignedOperators[idx] || ""}
                            onChange={(e) => handleOperatorChange(idx, e.target.value)}
                            className="w-full rounded-md border border-indigo-400 px-3 py-1 text-sm text-indigo-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="" disabled>Select Operator</option>
                            {telecomOperators.map((operator) => (
                              <option key={operator} value={operator}>
                                {operator}
                              </option>
                            ))}
                          </select>
                          {assignedOperators[idx] && (
                            <FaCheckCircle className="text-green-500" title="Assigned" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <div className="flex justify-center gap-6 flex-wrap">
              <button
                onClick={handleAutoAssign}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg transition"
              >
                <MdCheckCircle size={20} />
                Auto Assign
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          !isLoading && (
            <p className="text-center text-indigo-500 font-medium mt-20">
              No data uploaded yet.
            </p>
          )
        )}

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-10 border border-indigo-200">
              <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">🔒 Confirm Assignments</h2>
              <div className="overflow-y-auto max-h-[340px] border border-indigo-300 rounded-lg mb-8 shadow-inner">
                <table className="min-w-full text-gray-900 text-sm">
                  <thead className="bg-indigo-100">
                    <tr>
                      {Object.keys(data[0]).map((key) => (
                        <th key={key} className="px-4 py-2 border border-indigo-400 font-semibold">
                          {key}
                        </th>
                      ))}
                      <th className="px-4 py-2 border border-indigo-400 font-semibold">
                        Assigned Operator
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, idx) => (
                      <tr key={idx} className="even:bg-indigo-50 odd:bg-white">
                        {Object.values(row).map((val, i) => (
                          <td key={i} className="px-4 py-2 border border-indigo-300 truncate max-w-xs">
                            {val}
                          </td>
                        ))}
                        <td className="px-4 py-2 border border-indigo-300 font-semibold text-green-700">
                          {assignedOperators[idx]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center gap-6">
                <button
                  onClick={handleConfirm}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
                >
                  <MdCheckCircle size={20} />
                  Confirm
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
                >
                  <MdCancel size={20} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadData;
