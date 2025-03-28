import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaFileAlt, FaBell, FaUser, FaArrowUp, FaArrowDown, FaCalendar } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardCard = ({ title, value, icon: Icon, color, trend, percentage }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-xl font-semibold text-gray-900 mt-1">{value}</h3>
        </div>
      </div>
      {trend && (
        <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
          <span className="ml-1">{percentage}%</span>
        </div>
      )}
    </div>
  </div>
);

const chartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, John! Here's what's happening with your investments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Invested"
          value="$50,000"
          icon={FaChartLine}
          color="border-blue-500"
          trend="up"
          percentage="12"
        />
        <DashboardCard
          title="Active Projects"
          value="3"
          icon={FaFileAlt}
          color="border-green-500"
          trend="up"
          percentage="8"
        />
        <DashboardCard
          title="Pending Actions"
          value="2"
          icon={FaBell}
          color="border-yellow-500"
        />
        <DashboardCard
          title="Impact Score"
          value="85"
          icon={FaUser}
          color="border-purple-500"
          trend="up"
          percentage="5"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Investment Performance Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                action: "Investment made",
                project: "Solar Farm Project",
                amount: "$10,000",
                date: "2 hours ago",
                type: "investment"
              },
              {
                action: "Document signed",
                project: "Wind Energy Project",
                amount: "$15,000",
                date: "1 day ago",
                type: "document"
              },
              {
                action: "Return received",
                project: "Recycling Facility",
                amount: "$500",
                date: "3 days ago",
                type: "return"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'investment' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'document' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {activity.type === 'investment' ? <FaChartLine /> :
                   activity.type === 'document' ? <FaFileAlt /> :
                   <FaCalendar />}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.project}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{activity.amount}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;