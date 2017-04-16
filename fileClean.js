var fs = require('fs')


function readWriteAsync() {
    fs.readFile('NAVAll.txt', 'utf-8', function(err, data) {
        if (err) throw err;

        var val = data.replace(/^\D+/gim, '').replace(/;/gim, ',')

        fs.writeFile('filelistAsync.csv', val, 'utf-8', function(err) {
            if (err) throw err;
            console.log('filelistAsync complete');
        });
    });
}

readWriteAsync();
