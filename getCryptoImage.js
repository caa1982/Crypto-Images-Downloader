const download = require('image-downloader');
const CoinMarketCap = require('coinmarketcap-api');
const fs = require('fs');
const config = require('./config');

const client = new CoinMarketCap();

client.getTicker({ limit: 0 }).then(result => {

    result.forEach(item => {

        let options = {
            url: `https://files.coinmarketcap.com/static/img/coins/${config.resolution}/${item.id}.png`, 
            dest: `${config.path}/${item.id}.png` 
        }

        if (fs.existsSync(options.dest)){
            console.log('File already exist', item.id);
        }else{
            download.image(options)
            .then(({ filename, image }) => {
                console.log('File saved to', filename);
            }).catch((err) => {
               throw err;
            });
        };

    });

    console.log("you should have around " + result.length + " images");

}).catch(console.error);

