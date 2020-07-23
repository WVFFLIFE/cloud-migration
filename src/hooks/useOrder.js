import { useState, useCallback } from 'react';

const useOrder = ({ initOrder, initOrderBy }) => {
    const [order, setOrder] = useState(initOrder);
    const [orderBy, setOrderBy] = useState(initOrderBy);

    const handleRequestSort = useCallback((event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, [order, orderBy]);

    return {
        order,
        orderBy,
        handleRequestSort
    }
}

export default useOrder;