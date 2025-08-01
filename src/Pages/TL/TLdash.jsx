import React from "react";
import Data from "../../DataStore/TL/AllTLData.json";

const TLdash = () => {
  const tldata = Data.customer_history;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
        Team Lead Dashboard - {tldata.name}
      </h1>

      {/* Basic Info */}
      <section className="mb-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold border-b-4 border-blue-500 pb-1 mb-6">
          Profile Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-700 text-lg">
          <div><span className="font-semibold">Customer ID:</span> {tldata.customer_id}</div>
          <div><span className="font-semibold">Name:</span> {tldata.name}</div>
          <div><span className="font-semibold">Total Tickets Handled:</span> {tldata.handled_tickets.length}</div>
        </div>
      </section>

      {/* Tickets */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold border-b-4 border-blue-500 pb-1 mb-6">
          Handled Tickets
        </h2>
        <div className="space-y-6">
          {tldata.handled_tickets.map((ticket) => (
            <div
              key={ticket.ticket_id}
              className="bg-white rounded-lg shadow-md p-6 border-l-8 border-blue-600 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{ticket.subject}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-2 py-0.5 rounded text-sm font-semibold ${
                      ticket.status === "Resolved"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <div><span className="font-semibold">Priority:</span> {ticket.priority}</div>
                <div><span className="font-semibold">Created On:</span> {ticket.created_on}</div>
                <div><span className="font-semibold">Resolved On:</span> {ticket.resolved_on || "—"}</div>
                <div><span className="font-semibold">Assigned Agent:</span> {ticket.assigned_agent}</div>
                <div><span className="font-semibold">Channel:</span> {ticket.channel}</div>
                <div><span className="font-semibold">Feedback Rating:</span> {ticket.feedback_rating ?? "N/A"}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactions */}
      <section>
        <h2 className="text-2xl font-semibold border-b-4 border-blue-500 pb-1 mb-6">
          Handled Interactions
        </h2>
        <div className="space-y-6">
          {tldata.handled_interactions.map((interaction) => (
            <div
              key={interaction.interaction_id}
              className="bg-white rounded-lg shadow-md p-6 border-l-8 border-blue-400 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-2 text-gray-700">
                <div><span className="font-semibold">Date:</span> {interaction.date}</div>
                <div><span className="font-semibold">Channel:</span> {interaction.channel}</div>
                <div><span className="font-semibold">Agent:</span> {interaction.agent}</div>
              </div>
              <p className="mt-3 text-gray-600 italic">"{interaction.notes}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TLdash;
