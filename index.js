const request = require('request')

module.exports = (url, callback) => {
	return new Promise((resolve, reject) => {
		const soi = Buffer.from([0xFF, 0xD8])
		const eoi = Buffer.from([0xFF, 0xD9])

		const chunks = []

		const req = request(url)

		req.on('error', err => {
			req.abort()
			if (callback) callback(err)
			else reject(err)
		})

		req.on('response', res => {
			if ( res.statusCode !== 200 ) {
				req.abort()
				if (callback) callback(res)
				else reject(new Error(res))
			}

			res.on('data', data => {
				if ( chunks.length === 0 ) {
					const startIndex = data.indexOf(soi)
					const slicedData = data.slice(startIndex, data.length)

					chunks.push(slicedData)
				} else if ( data.indexOf(eoi) != -1 ) {
					const endIndex = data.indexOf(eoi) + 2
					const slicedData = data.slice(0, endIndex)

					chunks.push(slicedData)

					const img = new Buffer.concat(chunks)
					req.abort()

					if (callback)
						callback(undefined, img)

					resolve(img)
				} else {
					chunks.push(data)
				}
			})
		})
	})
}
