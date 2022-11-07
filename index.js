const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')
const PORT = 8000
const app = express()
const url = 'https://weather.com/news'
const articles = []

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        $('li', html).each(function(){
            const title = $(this).find('span').text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))


