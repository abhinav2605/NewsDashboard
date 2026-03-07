import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsComponent from '../NewsComponent/newsComponent';
import './dashboard.css';
import Category from '../CategoryComponent/category';

const Dashboard = () => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);

    const [totalPage, setTotalpage] = useState(0);
    const [nextToken, setNextToken] = useState(null);
    const [fetchingNext, setFetchingNext] = useState(false);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [category, setCategory] = useState(null);


    const PAGE_SIZE = 12;
    const API_KEY = 'pub_b13f869c33bb42dcb620d590ea40bed8';

    const fetchNews = async (pageToken = null, append = false, previous = false) => {
        if (append) {
            setFetchingNext(true);
        } else {
            setLoading(true);
            setError(null);
        }
        setCategory(null);
        setPrevPage(pageToken);
        if(pageToken == null)
            setPage(0);
        else if(previous == true)
            setPage(page - 1);
        else
            setPage(page + 1);
        const url =
            'https://newsdata.io/api/1/latest?apikey=' +
            API_KEY +
            '&language=en' +
            (pageToken ? '&page=' + pageToken : '');

        try {
            const response = await axios.get(url);
            setTotalpage(response.data.totalResults);
            setNextPage(response.data.nextPage);
            const incoming = response.data.results || [];
            setResult(incoming);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message || 'Failed to fetch news');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    
    if (error) return <div className="status error">Error: {error}</div>;
    const totalPages = Math.ceil(totalPage / PAGE_SIZE) || 1;

    const handlePrevPage = () => {
        fetchNews(prevPage, false, true);
    };

    const handleNextPage = () => {
        fetchNews(nextPage, false, false);
    };
    
    const categoryList = ["Breaking", "Business", "Domestic", "Crime", "Education", "Entertainment", "Environment", "Food", "Health", "Lifestyle", "Other", "Politics", "Science", "Sports", "Technology", "Top", "Tourism", "World"];

    const CategoriseNews = async (category, pageToken = null, append = false) => {
        setLoading(true);
        setError(null);
        setCategory(category);
        const url =
            'https://newsdata.io/api/1/latest?apikey=' +
            API_KEY +
            '&language=en&category=' + category.toLowerCase();
        try {
            const response = await axios.get(url);
            const incoming = response.data.results || [];
            setResult(incoming);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message || 'Failed to fetch news');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="page-shell">
            <header className="page-header">
                <div>
                    <p className="eyebrow">Today • Curated for you</p>
                    <h1>Top stories</h1>
                </div>

                <div className="header-actions">
                    <button className="ghost-btn" onClick={() => fetchNews()}>
                        Refresh
                    </button>
                </div>
            </header>
            <div className='categoryList'>
                {categoryList.map(categoryName => (
                    <Category
                        key={categoryName}
                        name={categoryName}
                        isSelected={category === categoryName}
                        onClick={() => CategoriseNews(categoryName)}
                    />
                ))}
            </div>
            {loading ? (
                category ? (
                    <div className="status">Loading {category} stories…</div>
                ) : (
                    <div className="status">Loading top stories…</div>
                )
            ) : (
                <div className="news-grid">
                    {result.map((news) => (
                        <NewsComponent key={news.article_id} article={news} />
                    ))}
                </div>
                
            )}
            <div className="news-grid">
                    aBHI
                </div>

            <div className="pagination">
                <button className="ghost-btn" onClick={handlePrevPage} disabled={page === 0}>
                    Prev page
                </button>
                <span className="page-indicator">
                    Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
                </span>
                <button
                    className="ghost-btn"
                    onClick={handleNextPage}
                >
                    Next page
                </button>
            </div>
        </div>
    );
};

export default Dashboard;