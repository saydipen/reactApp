const parseRecord = record => {
    const dataArray = record.split(',');
    const x = new Date(parseInt(dataArray[0]));
    const open = parseFloat(dataArray[1]);
    const high = parseFloat(dataArray[2]);
    const low = parseFloat(dataArray[3]);
    const close = parseFloat(dataArray[4]);
    const volume = parseFloat(dataArray[5]);
    return Object.assign({}, {x, open, high, low, close, volume});
};

export const getParsedData = response => {
    return response.map(record => parseRecord(record));
}