
var fs = require('fs'),
    request = require('request');

const { DOMParser } = require('xmldom')

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};



fs.readFile(__dirname + '/resources/input.xml', 'utf-8', function (err, data) {
    if (err) {
        throw err;
    }
    var 
        url,
        doc;
    doc = new DOMParser().parseFromString(data, 'application/xml');

    url =  Array.from(doc.getElementsByTagName('url'));
    // console.log(url)
    url.forEach(v => console.log(v.firstChild.data));
    //url.forEach(v => download(v.firstChild.data));

});
