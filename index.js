const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs-extra')
const name = `${Date.now()}.csv`
const writing = fs.createWriteStream( name )


const scan = async url => {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)

    $('.quote').each((i, el) => {
        const quote = $(el).find('.text').text().replace(/(^\“|\”$)/g, "").trim()
        const author = $(el).find('.author').text().replace(/(^\“|\”$)/g, "")
 
        writing.write(`${i+1};${quote};${author}\n`)
    })

}


scan('https://quotes.toscrape.com')