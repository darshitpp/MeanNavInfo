var fs = require('fs')

/*
 * Cleans up the data from NAVAll.txt and converts it to csv
 */

function readWriteAsync() {
    fs.readFile('NAVAll.txt', 'utf-8', function(err, data) {
        if (err) throw err;

        var val = data.replace(/^\D+/gim, '').replace(/;/gim, ',')

        fs.writeFile('Nav.csv', val, 'utf-8', function(err) {
            if (err) throw err;
            console.log('Nav.csv created');
        });
    });
}

readWriteAsync();
