import React from 'react';
import Data from '../../DataStore/Sales/SalesProfile.json';

const SALEdash = () => {
  const {
    name,
    region,
    designation,
    performance_metrics,
    leads_assigned,
    sales_history
  } = Data;

  return (
    <div className=" bg-gray-50 min-h-screen">
      {/* Salesperson Info */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">{designation} - {region}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Monthly Target</p>
          <h3 className="text-xl font-bold text-blue-800">₹{performance_metrics.monthly_target}</h3>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Achieved</p>
          <h3 className="text-xl font-bold text-green-800">₹{performance_metrics.achieved}</h3>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Conversion %</p>
          <h3 className="text-xl font-bold text-yellow-800">{performance_metrics.target_achievement_percentage}%</h3>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Leads</h3>
        <ul className="divide-y text-sm text-gray-700">
          {leads_assigned.slice(0, 3).map((lead, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span>{lead.lead_name} ({lead.status})</span>
              <span className="text-gray-500">{lead.contact_person}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Sales */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Sales</h3>
        <ul className="divide-y text-sm text-gray-700">
          {sales_history.slice(0, 3).map((sale, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span>{sale.client}</span>
              <span className="text-gray-500">₹{sale.amount} on {sale.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SALEdash;
