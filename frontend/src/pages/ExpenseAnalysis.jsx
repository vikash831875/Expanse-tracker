import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseChart from './ExpenseChart';
import ExpenseTable from './ExpenseTable';

function ExpenseAnalysis() {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    // Fetch expenses just like in Home.jsx
    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const deleteExpens = async (id) => {
        try {
            const url = `${APIUrl}/expenses/${id}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                method: "DELETE"
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchExpenses()
    }, [])

    return (
        <div className='container dashboard'>
            <div className='user-section'>
                <h1>Analytics & History</h1>
                <button onClick={() => navigate('/home')}>Back to Home</button>
            </div>

            <div className="analysis-container">
                <div className="chart-wrapper">
                    <ExpenseChart expenses={expenses} />
                </div>
                
                <div className="history-wrapper" style={{marginTop: '30px'}}>
                    <h3>Full Transaction History</h3>
                    <ExpenseTable 
                        expenses={expenses} 
                        deleteExpens={deleteExpens} 
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ExpenseAnalysis;