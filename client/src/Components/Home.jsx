import { getAllCountries } from "../Actions/Index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Paginado from "./Paginado.jsx";
import Card from "./Card.jsx";
import SearchBar from "./SearchBar.jsx";
import FilterName from "./FilterName.jsx";
import FilterPopulation from "./FilterPopulation.jsx"
import FilterActivity from "./FilterActivity.jsx"
import FilterContinent from "./FilterContinent.jsx"
import '../CSS/Home.css'
import Loading from '../CSS/Imagenes/Loading.gif'
import VideoHome from '../CSS/Videos/VideoHome.mp4'

export default function Home() {

    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    //const allCountries = useSelector(state => state.allountries)

    const [currentPage, setCurrentPage] = useState(1)
    const countriesXPage = 10
    const indexOfLastCountry = currentPage * countriesXPage
    const indexOfFirstCountry = indexOfLastCountry - countriesXPage
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry)

    let pages = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])

    return (
        <div className="Home">
            <video autoPlay preload="auto" muted loop src={VideoHome}></video>
            <div className="TOP">
                <h1>Henry's Countries Proyect</h1>
            </div>

            <nav className="Nav_Home">
                <FilterName />

                <FilterPopulation />

                <FilterActivity />

                <FilterContinent />
            </nav>

            <nav className="MainNav">
                <SearchBar />

                <Link to={'/about'}><button>ABOUT THIS PAGE</button></Link>

                <Link to='/'><button>Back to start</button></Link>

                <Link to={'/activity'}><button>CREATE ACTIVITY!</button></Link>
            </nav>

            <Paginado
                countriesXPage={countriesXPage}
                allCountries={countries.length}
                pages={pages}
                currentPage={currentPage}
            />

            <div className="Cards">
                {
                    currentCountries.length > 0 ?
                        currentCountries.map(country => {
                            return (
                                <div key={country.id} >
                                    <Card name={country.name} id={country.id} img={country.img} continent={country.continent} />
                                </div>
                            )
                        })
                        :
                        <div>
                            <h3>Loading...</h3>
                            <img src={Loading} alt="Cargando" />
                        </div>
                }
            </div>
        </div>
    )
}
