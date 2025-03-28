import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AnalyticsCard = ({ title, value, chart: Chart }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-2xl font-bold text-blue-600 mb-4">{value}</p>
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        {Chart}
      </ResponsiveContainer>
    </div>
  </div>
);

const Analytics = () => {
  const investmentData = [
    { month: 'Jan', value: 5000 },
    { month: 'Feb', value: 7000 },
    { month: 'Mar', value: 8500 },
    { month: 'Apr', value: 9800 },
    { month: 'May', value: 12000 },
    { month: 'Jun', value: 15000 },
  ];

  const returnsData = [
    { month: 'Jan', value: 300 },
    { month: 'Feb', value: 450 },
    { month: 'Mar', value: 600 },
    { month: 'Apr', value: 750 },
    { month: 'May', value: 900 },
    { month: 'Jun', value: 1200 },
  ];

  const impactData = [
    { name: 'Solar', value: 40 },
    { name: 'Wind', value: 30 },
    { name: 'Recycling', value: 20 },
    { name: 'Agriculture', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Track your investment performance and impact</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <AnalyticsCard
            title="Investment Growth"
            value="$15,000"
            chart={
              <LineChart data={investmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            }
          />

          <AnalyticsCard
            title="Monthly Returns"
            value="$1,200"
            chart={
              <AreaChart data={returnsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
              </AreaChart>
            }
          />

          <AnalyticsCard
            title="Portfolio Distribution"
            value="4 Sectors"
            chart={
              <PieChart>
                <Pie
                  data={impactData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {impactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            }
          />

          <AnalyticsCard
            title="Environmental Impact"
            value="-750 CO2 tons"
            chart={
              <BarChart data={investmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366F1" />
              </BarChart>
            }
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;