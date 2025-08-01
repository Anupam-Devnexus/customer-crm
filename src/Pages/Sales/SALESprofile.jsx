import React from "react";
import Data from "../../DataStore/Sales/SalesProfile.json";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaChartLine } from "react-icons/fa";

const SALESprofile = () => {
  const {
    name,
    email,
    phone,
    region,
    joined_date,
    designation,
    profile_image,
    performance_metrics,
    leads_assigned,
    sales_history,
    communication_log,
    reviews,
    current_status
  } = Data;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6 mb-8">
        <img
          src={profile_image}
          alt={name}
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">{designation}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
            <FaEnvelope /> {email}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FaPhone /> {phone}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FaMapMarkerAlt /> {region}
          </div>
          <p className="text-xs text-gray-500 mt-1">Joined on: {joined_date}</p>
        </div>
        <div className="ml-auto text-right text-sm font-medium text-green-600">
          <FaCheckCircle className="inline mr-1" /> {current_status}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Monthly Target", value: `₹${performance_metrics.monthly_target}` },
          { label: "Achieved", value: `₹${performance_metrics.achieved}` },
          { label: "Target %", value: `${performance_metrics.target_achievement_percentage}%` },
          { label: "Leads Converted", value: performance_metrics.leads_converted },
          { label: "Calls Made", value: performance_metrics.calls_made },
          { label: "Emails Sent", value: performance_metrics.emails_sent }
        ].map((metric, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4">
            <h4 className="text-sm text-gray-500">{metric.label}</h4>
            <p className="text-xl font-semibold text-blue-700">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Leads Assigned */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Leads Assigned</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2">Lead</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Value</th>
                <th className="text-left px-4 py-2">Contact</th>
                <th className="text-left px-4 py-2">Next Follow-up</th>
              </tr>
            </thead>
            <tbody>
              {leads_assigned.map((lead, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{lead.lead_name}</td>
                  <td className="px-4 py-2">{lead.status}</td>
                  <td className="px-4 py-2">₹{lead.value}</td>
                  <td className="px-4 py-2">{lead.contact_person} ({lead.contact_number})</td>
                  <td className="px-4 py-2">{lead.next_followup || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sales History */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Sales History</h3>
        <ul className="divide-y divide-gray-200">
          {sales_history.map((sale, index) => (
            <li key={index} className="py-2">
              <div className="flex justify-between">
                <span>{sale.client}</span>
                <span className="text-sm text-gray-600">{sale.date}</span>
              </div>
              <div className="text-sm">
                ₹{sale.amount} - <span className={`font-semibold ${sale.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>{sale.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Communication Log */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Communication Log</h3>
        <ul className="divide-y divide-gray-200">
          {communication_log.map((log, index) => (
            <li key={index} className="py-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span className="capitalize font-medium">{log.type}</span>
                <span>{new Date(log.timestamp).toLocaleString()}</span>
              </div>
              <p className="text-gray-700 mt-1">{log.summary}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Performance Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{review.review_by}</span>
              <span>{review.date}</span>
            </div>
            <div className="text-yellow-500">⭐ {review.rating} / 5</div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SALESprofile;
