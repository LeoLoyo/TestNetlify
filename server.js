const express = require('express')
const axios = require('axios')
const app = express()
const port = 80

app.get('/tasa/:country/:min', async (req, res) => {
    try {
        const { country, min } = req.params
        const _bestPriceSell = await bestPriceSell(min_amount_ve)
        const countries = [
            { name: 'colombia', currency: 'CO', min: 50000, operation: true },
            { name: 'peru', currency: 'PE', min: 50, operation: false },
            { name: 'chile', currency: 'CL', min: 20000, operation: false },
            { name: 'ecuador', currency: 'EC', min: 20, operation: false },
        ]
        const conuntrySelected = countries.find(item => item.name === country)
        if (!conuntrySelected) throw Error()

        if (parseInt(min)) {
            conuntrySelected.min = min
        }
        const tasas = await searchRates([conuntrySelected], _bestPriceSell)
        return res.json({ fecha: new Date(), precio_venta_venezuela: _bestPriceSell.temp_price, tasas })
    } catch (error) {
        console.log("TCL: error", error)
        return res.json({ error: "verifica" })
    }

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



let min_amount_ve = 200000

const makeRequest = async (url) => {
    const { data } = await axios(url)
    if (data) return data.data
    return false
}

async function bestPriceBuy(amount, country) {
    const { ad_list } = await makeRequest(`https://localbitcoins.com/buy-bitcoins-online/${country.currency}/${country.name}/.json`)
    const { data } = ad_list.filter(({ data }) => Number(data.min_amount) >= amount)[0]
    return data
}
async function bestPriceSell(amount) {
    const { ad_list } = await makeRequest("https://localbitcoins.com/sell-bitcoins-online/VE/venezuela/.json")
    const { data = {} } = ad_list.filter(({ data }) => Number(data.min_amount) >= amount)[0] || {}
    return data
}


async function calcRate(country, priceSell) {
    const _bestPriceBuy = await bestPriceBuy(country.min, country)
    if (!_bestPriceBuy.temp_price) return 0
    if (country.operation) return _bestPriceBuy.temp_price / priceSell.temp_price
    return priceSell.temp_price / _bestPriceBuy.temp_price
}


async function searchRates(countries, bestPriceSell) {
    const rates = countries.map(async country => ({ name: country.name, tasa: 1, tasa: await calcRate(country, bestPriceSell) }))
    return await Promise.all(rates)
}