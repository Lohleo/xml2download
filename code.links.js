
 var fs = require('fs'),
 request = require('request');
 const util = require('util');
 xml2js = require('xml2js');

 var parser = new xml2js.Parser();

 var download = function(uri, filename, callback){
 request.head(uri, function(err, res, body){
 console.log('content-type:', res.headers['content-type']);
 console.log('content-length:', res.headers['content-length']);

 request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
 });
};


fs.readFile(__dirname + '/resources/input.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result);
        console.log(util.inspect(result, false, null))
        var obj = JSON.parse(util.inspect(result, false, null))
        console.log(obj.verzeichnis.eintrag.url)
        console.log('Done');
    });
});
