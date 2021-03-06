var http = require('http')
var fs = require('fs')

http
    .createServer(function(req, res) {
        var url = req.url
        if (url === '/') {
            fs.readFile('./index.html', function(err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        } else if (url === '/app.js' || '/index.js') {
            fs.readFile('.' + url, function(err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        }
    })
    .listen(8888, function() {
        console.log(`running...`);
    })