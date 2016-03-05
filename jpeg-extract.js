var extract = function(url,callback) {
	var request = require('request');

	var chunks = [];
	var img;

	var soi = new Buffer(2);
	soi.writeUInt16LE(0xd8ff, 0);

	var eoi = new Buffer(2);
	eoi.writeUInt16LE(0xd9ff, 0);

	var req = request(url);

	req.on('error',function (error) {
		req.abort();
		console.log(error,url);
	});

	req.on('response',function (response) {
		if(response.statusCode !== 200){
			req.abort();
			console.log(response.statusCode,url);
		}
		req.on('data',function (data) {
			if(chunks.length === 0){
				chunks.push(data.slice(data.indexOf(soi), data.length));
			}
			else{
				if(data.indexOf(eoi) != -1){
					chunks.push(data.slice(0, data.indexOf(eoi)));
					img = new Buffer.concat(chunks);

					req.abort();
					callback(img);
				}else{
					chunks.push(data);
				}
			}
		});
	});
}
module.exports = extract;