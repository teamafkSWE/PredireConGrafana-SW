const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('datasetRl.csv')
    .pipe(csv())
    .on('datasetRl', (row) => {
        console.log(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });