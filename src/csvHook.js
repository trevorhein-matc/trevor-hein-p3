import { useState, useEffect } from "react";
function useCsvFetch(url) {
    const [csvData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        const response = await fetch(url);
        const csv = await response.csv();
        setData(csv);
        setLoading(false);
    }
    useEffect(() => {
        fetchUrl();
    }, []);
    return [csvData, loading];
}
export { useCsvFetch }