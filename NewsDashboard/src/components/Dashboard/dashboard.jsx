import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsComponent from '../NewsComponent/newsComponent'
import './dashboard.css'

const Dashboard = () => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = "pub_b13f869c33bb42dcb620d590ea40bed8"

    useEffect(() => {
        axios.get('https://newsdata.io/api/1/latest?apikey=' + API_KEY + '&country=in&language=en&category=crime,entertainment,domestic,business,breaking')
            .then(response => {
                setResult(response.data.results || []);
                console.log(response.data.results)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message || 'Failed to fetch news');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="dashboard">
            {result.length > 0 ? (
                result.map((article, index) => (
                    <NewsComponent key={index} article={article} />
                ))
            ) : (
                <div>No news found.</div>
            )}

            {/* Add your dashboard content here */}
        </div>
    );
};

export default Dashboard;