// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // Mock users
  const mockUsers = [
    {
      role: "Team Leader",
      email: "tl.crm@example.com",
      password: "tl@123",
      name: "Priya Sharma",
    },
    {
      role: "Telecaller",
      email: "telecaller.crm@example.com",
      password: "tele@123",
      name: "Ankita Singh",
    },
    {
      role: "Sales Person",
      email: "sales.crm@example.com",
      password: "sales@123",
      name: "Rahul Sales",
    },
  ];

  const handleLogin = () => {
    const user = mockUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    switch (user.role) {
      case 'Team Leader':
        navigate('/tl');
        break;
      case 'Telecaller':
        navigate('/telecom');
        break;
      case 'Sales Person':
        navigate('/sales');
        break;
      default:
        setError('Unknown role');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">CRM Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      </div>

      {/* Render mock user data for reference */}
      <div className="mt-10 w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Mock User Credentials</h3>
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-3 border">Name</th>
              <th className="py-2 px-3 border">Role</th>
              <th className="py-2 px-3 border">Email</th>
              <th className="py-2 px-3 border">Password</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-3 border">{user.name}</td>
                <td className="py-2 px-3 border">{user.role}</td>
                <td className="py-2 px-3 border">{user.email}</td>
                <td className="py-2 px-3 border">{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Login;
