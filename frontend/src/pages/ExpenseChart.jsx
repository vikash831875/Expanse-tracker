import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ExpenseChart({ expenses }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // 1. Calculate Total Income
        const income = expenses
            .filter(item => item.amount > 0)
            .reduce((acc, item) => acc + item.amount, 0);

        // 2. Calculate Total Expense (convert negative to positive for the chart)
        const expense = expenses
            .filter(item => item.amount < 0)
            .reduce((acc, item) => acc + item.amount, 0) * -1;

        // 3. Prepare Data for Recharts
        const data = [
            { name: 'Income', value: income },
            { name: 'Expense', value: expense }
        ];

        setChartData(data);
    }, [expenses]);

    // Colors: Green for Income, Red for Expense (Matches your CSS)
    const COLORS = ['#27ae60', '#c0392b'];

    // If there is no data (both are 0), show a message instead of an empty chart
    if (chartData.every(item => item.value === 0)) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: '#aaa' }}>
                <p>No transactions yet.</p>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: 250, marginTop: '20px' }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ExpenseChart;