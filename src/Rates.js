import axios from 'axios'
let min_amount_ve = 200000

const makeRequest = async (url) => {
    const { data } = await axios(url)
    if (data) return data.data
    return false
}

async function bestPriceBuy(amount, country){
    const { ad_list } = await makeRequest(`https://localbitcoins.com/buy-bitcoins-online/${country.currency}/${country.name}/.json`)
    const { data } = ad_list.filter(({ data }) => Number(data.min_amount) >= amount)[0]
    return data
}
async function bestPriceSell(amount){
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


const countries = [
    { name: 'colombia', currency: 'CO', min: 50000, operation: true}, 
    { name: 'peru', currency: 'PE', min: 50, operation: false},
    { name: 'chile', currency: 'CL', min: 20000, operation: false},
    { name: 'ecuador', currency: 'EC', min: 20, operation: false},
]


async function searchRates () {
    console.log(`${new Date()} Calculando Tasa para ${countries.map(({name}) => name.toUpperCase()).join(', ')}`)
    const _bestPriceSell = await bestPriceSell(min_amount_ve)
    console.log(`Precio de venta Actual en Venezuela ${_bestPriceSell.temp_price}`)
    return countries.map(async (country) => {
        const tasa = await calcRate(country, _bestPriceSell)
        return ({ name: country.name, rate: tasa})
    })
}
export default searchRates
