import React from "react";
import Data from "../../DataStore/TL/TLProfile.json";

const TLProfile = () => {
  const profile = Data.customer_profiles[0];

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg text-gray-800">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-8 text-center">
        Customer Profile
      </h1>

      {/* Basic Info */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold border-b-4 border-blue-500 inline-block pb-1 mb-6">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-lg">
          <div><span className="font-semibold">Name:</span> {profile.name}</div>
          <div><span className="font-semibold">Email:</span> {profile.email}</div>
          <div><span className="font-semibold">Phone:</span> {profile.phone}</div>
          <div><span className="font-semibold">Location:</span> {profile.location}</div>
          <div><span className="font-semibold">Registered On:</span> {profile.registered_on}</div>
          <div><span className="font-semibold">Status:</span> 
            <span className={`ml-2 px-2 py-0.5 rounded text-sm font-medium ${
              profile.status === "Active"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}>
              {profile.status}
            </span>
          </div>
          <div><span className="font-semibold">Preferred Contact:</span> {profile.preferred_contact_method}</div>
          <div><span className="font-semibold">Support Tier:</span> 
            <span className="ml-2 px-2 py-0.5 rounded bg-yellow-200 text-yellow-900 font-medium text-sm">
              {profile.support_tier}
            </span>
          </div>
          <div><span className="font-semibold">Recent Activity:</span> {profile.recent_activity}</div>
        </div>
      </section>

      {/* Tickets */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold border-b-4 border-blue-500 inline-block pb-1 mb-6">
          Support Tickets
        </h2>
        <div className="space-y-6">
          {profile.tickets.map(ticket => (
            <div
              key={ticket.ticket_id}
              className="bg-white rounded-lg shadow-md p-5 border-l-8 border-blue-500"
            >
              <h3 className="text-xl font-semibold mb-2">{ticket.subject}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
                <div><span className="font-semibold">Status:</span> {ticket.status}</div>
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
      <section className="mb-10">
        <h2 className="text-2xl font-semibold border-b-4 border-blue-500 inline-block pb-1 mb-6">
          Interactions
        </h2>
        <div className="space-y-6">
          {profile.interactions.map(interaction => (
            <div
              key={interaction.interaction_id}
              className="bg-white rounded-lg shadow-md p-5 border-l-8 border-blue-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
                <div><span className="font-semibold">Date:</span> {interaction.date}</div>
                <div><span className="font-semibold">Channel:</span> {interaction.channel}</div>
                <div><span className="font-semibold">Agent:</span> {interaction.agent}</div>
              </div>
              <p className="mt-3 text-gray-600 italic">"{interaction.notes}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preferences */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold border-b-4 border-blue-500 inline-block pb-1 mb-6">
          Preferences
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-lg">
          <div><span className="font-semibold">Language:</span> {profile.preferences.language}</div>
          <div><span className="font-semibold">Time Zone:</span> {profile.preferences.time_zone}</div>
          <div><span className="font-semibold">Newsletter Subscribed:</span> {profile.preferences.newsletter_subscribed ? "Yes" : "No"}</div>
          <div><span className="font-semibold">Product Updates Opt-In:</span> {profile.preferences.product_updates_opt_in ? "Yes" : "No"}</div>
        </div>
      </section>

      {/* Tags */}
      <section>
        <h2 className="text-2xl font-semibold border-b-4 border-blue-500 inline-block pb-1 mb-6">
          Tags
        </h2>
        <div className="flex flex-wrap gap-3">
          {profile.tags.map(tag => (
            <span
              key={tag}
              className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TLProfile;
