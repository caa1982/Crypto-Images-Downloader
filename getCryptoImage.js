const download = require('image-downloader')
const CoinMarketCap = require('coinmarketcap-api')
var fs = require('fs');

const client = new CoinMarketCap()

client.getTicker({ limit: 0 }).then(result => {

    result.forEach(item => {

        let options = {
            url: `https://files.coinmarketcap.com/static/img/coins/128x128/${item.id}.png`, // You can change the image resolution from 16x16, 32x32, 64x63 or 128x128
            dest: `path/${item.id}.png` // Change path (destination of the download)
        }

        if (fs.existsSync(options.dest)){
            console.log('File already exist', item.id)
        }else{
            download.image(options)
            .then(({ filename, image }) => {
                console.log('File saved to', filename)
            }).catch((err) => {
               throw err;
            })
        }

    })

    console.log("you should have around " + result.length + " images");

}).catch(console.error)

