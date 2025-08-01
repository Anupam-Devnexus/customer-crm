import React from 'react';
import data from '../../DataStore/Telecom/teleprofile.json';
import { FaUserTie, FaPhone, FaEnvelope, FaBuilding, FaTasks, FaChartLine } from 'react-icons/fa';

const TELEProfile = () => {
  const employee = data.telecom_employee;

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={employee.profile_image}
            alt={employee.name}
            className="w-32 h-32 rounded-full shadow-lg object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
              <FaUserTie className="text-blue-500" />
              {employee.name}
            </h1>
            <p className="text-gray-600">{employee.designation}</p>
            <p className="text-sm text-gray-500">Employee ID: {employee.employee_id}</p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Contact Info</h2>
            <ul className="space-y-1 text-gray-700">
              <li><strong>Email:</strong> {employee.email}</li>
              <li><strong>Phone:</strong> {employee.phone}</li>
              <li><strong>Gender:</strong> {employee.gender}</li>
              <li><strong>DOB:</strong> {employee.dob}</li>
              <li><strong>Address:</strong> {employee.address}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Work Details</h2>
            <ul className="space-y-1 text-gray-700">
              <li><strong>Operator:</strong> {employee.assigned_operator}</li>
              <li><strong>Status:</strong> <span className="text-green-600 font-medium">{employee.current_status}</span></li>
              <li><strong>Experience:</strong> {employee.experience_years} yrs</li>
              <li><strong>Joining Date:</strong> {employee.joining_date}</li>
              <li><strong>Shift:</strong> {employee.shift}</li>
            </ul>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartLine className="text-yellow-500" /> Performance Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-blue-100 p-4 rounded-lg shadow">
              <p className="text-2xl font-bold">{employee.calls_handled_today}</p>
              <p className="text-sm">Calls Today</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow">
              <p className="text-2xl font-bold">{employee.total_calls_handled}</p>
              <p className="text-sm">Total Calls</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow">
              <p className="text-2xl font-bold">{employee.performance.positive_feedback_percentage}%</p>
              <p className="text-sm">Positive Feedback</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow">
              <p className="text-2xl font-bold">{employee.performance.escalation_rate}%</p>
              <p className="text-sm">Escalation Rate</p>
            </div>
          </div>
        </div>

        {/* Future Schedule */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 Future Call Schedule</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            {employee.future_schedule.map((item, idx) => (
              <li key={idx}>
                <strong>{item.date}</strong>: {item.expected_calls} expected calls
              </li>
            ))}
          </ul>
        </div>

        {/* Work History */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaBuilding className="text-purple-600" /> Work History
          </h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            {employee.work_history.map((job, idx) => (
              <li key={idx}>
                <strong>{job.company}</strong> - {job.role} ({job.duration_years} yrs)
              </li>
            ))}
          </ul>
        </div>

        {/* Supervisor */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FaTasks className="text-indigo-600" /> Supervisor Details
          </h2>
          <p className="text-gray-700"><strong>Name:</strong> {employee.supervisor.name}</p>
          <p className="text-gray-700"><strong>Email:</strong> {employee.supervisor.email}</p>
          <p className="text-gray-700"><strong>Phone:</strong> {employee.supervisor.phone}</p>
        </div>

        {/* Remarks */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
          <h3 className="font-semibold mb-2 text-gray-800">🔖 Remarks</h3>
          <p className="text-gray-700">{employee.remarks}</p>
        </div>
      </div>
    </div>
  );
};

export default TELEProfile;
