import React from 'react';

const NumberFormatter = (number: number) => {
    const integerPart = Math.floor(number);
    const formattedNumber = new Intl.NumberFormat('tr-TR').format(integerPart);

    return <span>{formattedNumber}</span>;
};

export default NumberFormatter;
