import React, { useState, useEffect } from 'react';
import './fetchData.css'

const URLS = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/users'
];

function FetchData() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const responses = await Promise.all(URLS.map(url => fetch(url)));
                const data = await Promise.all(responses.map(response => response.json()));
                const combinedData = [...data[0], ...data[1]];
                setData(combinedData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Something went wrong, please try again.</div>;
    }

    return (
        <div>
            <ul>
                {data.map((item, index) => {
                    return <li key={index}>{item.id ? `${item.id} ${item.title || item.name}` : item.name}</li>;
                })}
            </ul>
        </div>
    );
}

export default FetchData;
