const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Op } = require('sequelize')
const axios = require('axios');
const router = Router();
const { Country, Turism } = require('../db');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getCountriesApi = async () => {
    let info = await axios('https://restcountries.com/v3/all')
    let country = info.data.map(country => {
        return {
            id: country.cca3,
            name: country.name.common,
            img: country.flags[0],
            continent: country.continents ? country.continents[0] : "No continent",
            subregion: country.subregion ? country.subregion : "No subregion",
            capital: country.capital ? country.capital[0] : "No capital",
            area: country.area ? country.area : 0,
            population: country.population ? country.population : 0,
        }
    })

    return country // 250 paises traidos de la API
}

const postCuntries = async () => {

    let apiCountries = await getCountriesApi()
    apiCountries.forEach(pais => {

        let newcountry = Country.findOrCreate({
            where: {
                name: pais.name,
                id: pais.id,
                img: pais.img,
                continent: pais.continent,
                subregion: pais.subregion,
                capital: pais.capital,
                area: pais.area,
                population: pais.population,
            }
        })

        return newcountry
    });

}

const getCountriesDB = async (name) => {

    let dataBase = await Country.findOne({
        where: { name: "Bulgaria" }
    })

    if (name && dataBase) {
        let response = await Country.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` }
            },
            include: { model: Turism }
        })
        return response
    }
    else {
        if (!dataBase) {
            await postCuntries()
        }
        let countriesInDB = await Country.findAll()
        return countriesInDB
    }
}

const getCountriesByID = async (id) => {

    let response = await Country.findOne({
        where: {
            id: id
        },
        include: { model: Turism }
    })
    return response
}

const postActivity = async (name, dificulty, duration, season, countries) => {

    const activity = await Turism.create({
        name,
        dificulty,
        duration,
        season,
    })
    await getCountriesDB()

    let countriesInDB = await Country.findAll({
        where: {
            name: countries
        }, attributes: ['id']
    })
    activity.addCountry(countriesInDB)

    return "Activity created"
}

const orderByName = async (order) => {
    let allCountries = await getCountriesDB()
    if (order === 'Ascendente') {
        allCountries.sort(function (a, b) {
            if (a.name > b.name) {
                return 1
            }
            if (b.name > a.name) {
                return -1
            }
            return 0
        })
    }
    else if (order === 'Descendente') {
        allCountries.sort(function (a, b) {
            if (a.name > b.name) {
                return -1
            }
            if (b.name > a.name) {
                return 1
            }
            return 0
        })
    }
    return allCountries
}

const orderByPopulation = async (order) => {
    let allCountries = await getCountriesDB()
    if (order === 'Menor') {
        allCountries.sort(function (a, b) {
            if (a.population > b.population) {
                return 1
            }
            if (b.population > a.population) {
                return -1
            }
            return 0
        })
    }
    else if (order === 'Mayor') {
        allCountries.sort(function (a, b) {
            if (a.population > b.population) {
                return -1
            }
            if (b.population > a.population) {
                return 1
            }
            return 0
        })
    }
    return allCountries
}

const getActivities = async () => {

    let genres = await Turism.findAll()
    return genres
}

const getCountriesWithActivity = async (id) => {

    if (id != "All") {
        let response = await Turism.findOne({
            where: {
                id: id
            },
            include: { model: Country }
        })

        return response.countries
    }
    else {
        let all = await getCountriesDB()
        return all
    }
}

const filterByContinent = async (continent) => {

    let response = await Country.findAll({
        where: {
            continent: continent
        },
        include: { model: Turism }
    })

    return response
}

router.get('/countries', async (req, res, next) => {
    let name = req.query.name
    if (name) {
        try {
            let countries = await getCountriesDB(name)
            res.json(countries)
        } catch (error) {
            next(error)
        }
    }
    else {
        try {
            let countries = await getCountriesDB()
            res.json(countries)
        } catch (error) {
            next(error)
        }
    }
})

router.get('/countries/:id', async (req, res, next) => {
    let id = req.params.id.toUpperCase()
    try {
        let country = await getCountriesByID(id)
        res.json(country)
    } catch (error) {
        next(error)
    }
})

router.post('/activities', async (req, res, next) => {
    let datos = req.body
    try {
        let activityCreated = await postActivity(datos.name, datos.dificulty, datos.duration, datos.season, datos.countries)
        res.json(activityCreated)
    } catch (error) {
        next(error)
    }
})

router.get('/activities', async (req, res, next) => {
    let id = req.query.id

    if (id) {
        let countriesWhitActivity = await getCountriesWithActivity(id)

        try {
            res.json(countriesWhitActivity)
        } catch (error) {
            next(error)
        }
    }
    else {
        let activities = await getActivities();
        try {
            res.json(activities)
        } catch (error) {
            next(error)
        }
    }
})

router.get('/nameOrder', async (req, res, next) => {
    let order = req.query.order
    let orderCountries = await orderByName(order)
    try {
        res.json(orderCountries)
    } catch (error) {
        next(error)
    }
})

router.get('/populationOrder', async (req, res, next) => {
    let order = req.query.order
    let orderCountries = await orderByPopulation(order)
    try {
        res.json(orderCountries)
    } catch (error) {
        next(error)
    }
})

router.get('/continentFilter', async (req, res, next) => {
    let continent = req.query.continent
    let countries = await filterByContinent(continent)
    try {
        res.json(countries)
    } catch (error) {
        next(error)
    }
})

router.delete('/activities', async (req, res, next) => {
    let datos = req.body
    try {
        let country = await Country.findByPk(datos.countryId)
        let activity = await Turism.findByPk(datos.activityId)

        if(country && activity){
            await country.removeTurism([activity])
            res.json("Activity deleted from country")
        }
        else{
            res.json("Can't resolve request")
        }


    } catch (error) {
        next(error)
    }
})

module.exports = router;
