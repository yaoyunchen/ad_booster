export const convertDate = str => str ? new Date(str).toLocaleString() : '';

export const convertReadableNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
