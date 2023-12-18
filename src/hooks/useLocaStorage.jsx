import { useCallback, useEffect, useState } from "react";

export default (key, defaultData = {}) => {
    const [storage, setStorage] = useState(() => {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : defaultData;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storage));
    }, [key, storage]);

    const destryoLocationData = useCallback(() => {
        localStorage.removeItem(key)
        setStorage(defaultData)
    }, [key, defaultData])

    return [storage, setStorage, destryoLocationData];
};
