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
    const [nextToken, setNextToken] = useState(null);
    const [fetchingNext, setFetchingNext] = useState(false);
    const PAGE_SIZE = 12;
    const API_KEY = 'pub_b13f869c33bb42dcb620d590ea40bed8';

    const mergeUnique = (current, incoming) => {
        const seen = new Set(current.map(item => (item?.link || item?.url || item?.title || '').trim().toLowerCase()));
        const merged = [...current];
        for (const item of incoming) {
            const key = (item?.link || item?.url || item?.title || '').trim().toLowerCase();
            if (!key) continue;
            if (seen.has(key)) continue;
            seen.add(key);
            merged.push(item);
        }
        return merged;
    };

    const fetchNews = async (pageToken = null, append = false) => {
        if (append) {
            setFetchingNext(true);
        } else {
            setLoading(true);
            setError(null);
        }

        const url =
            'https://newsdata.io/api/1/latest?apikey=' +
            API_KEY +
            '&language=en' +
            (pageToken ? '&page=' + pageToken : '');

        try {
            const response = await axios.get(url);
            const incoming = response.data.results || [];
            const next = response.data.nextPage || null;
            const updated = append ? mergeUnique(result, incoming) : mergeUnique([], incoming);
            setResult(updated);
            setNextToken(next);
            setPage(prev => (append ? prev + 1 : 0));
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message || 'Failed to fetch news');
        } finally {
            setLoading(false);
            setFetchingNext(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) return <div className="status">Loading top stories…</div>;
    if (error) return <div className="status error">Error: {error}</div>;

    const totalPages = Math.ceil(result.length / PAGE_SIZE) || 1;
    const pageStart = page * PAGE_SIZE;
    const pageItems = result.slice(pageStart, pageStart + PAGE_SIZE);
    const featureArticles = pageItems[0] ? [pageItems[0]] : [];
    const highlightArticles = pageItems.slice(1, 3);
    const standardArticles = pageItems.slice(3);

    const handlePrevPage = () => {
        setPage(prev => Math.max(prev - 1, 0));
    };

    const handleNextPage = () => {
        const onLastLoadedPage = page >= totalPages - 1;
        if (onLastLoadedPage && nextToken) {
            fetchNews(nextToken, true);
            return;
        }
        setPage(prev => Math.min(prev + 1, totalPages - 1));
    };
    const categoryList = ["Breaking", "Business", "Domestic", "Crime", "Education", "Entertainment", "Environment", "Food", "Health", "Lifestyle", "Other", "Politics", "Science", "Sports", "Technology", "Top", "Tourism", "World"];

    const CategoriseNews = async (category, pageToken = null, append = false) => {
        // if (append) {
        //     setFetchingNext(true);
        // } else {
        //     setLoading(true);
        //     setError(null);
        // }

        const url =
            'https://newsdata.io/api/1/latest?apikey=' +
            API_KEY +
            '&language=en&category=' + category.toLowerCase()
            // +
            //(pageToken ? '&page=' + pageToken : '');

        try {
            const response = await axios.get(url);
            const incoming = response.data.results || [];
            //const next = response.data.nextPage || null;
            //const updated = append ? mergeUnique(result, incoming) : mergeUnique([], incoming);
            setResult(incoming);
            //setNextToken(next);
            //setPage(prev => (append ? prev + 1 : 0));
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message || 'Failed to fetch news');
        } finally {
            setLoading(false);
            //setFetchingNext(false);
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
                    <Category key={categoryName} name={categoryName} onClick={() => CategoriseNews(categoryName)}/>
                ))}
            </div>
            <div className="news-grid">
                {featureArticles.map(article => (
                    <NewsComponent key={`feature-${pageStart}`} article={article} variant="feature" />
                ))}

                {highlightArticles.map((article, index) => (
                    <NewsComponent key={`highlight-${pageStart + index + 1}`} article={article} variant="highlight" />
                ))}

                {standardArticles.map((article, index) => (
                    <NewsComponent key={`standard-${pageStart + index + 3}`} article={article} variant="standard" />
                ))}

                {pageItems.length === 0 && <div className="status">No news found.</div>}
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
                    disabled={(page >= totalPages - 1 && !nextToken) || totalPages === 0 || fetchingNext}
                >
                    Next page
                </button>
            </div>
        </div>
    );
};

export default Dashboard;