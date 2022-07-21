import { getAllCountries, filterPopu50 } from "../Actions/Index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Paginado from "./Paginado.jsx";
import SearchBar from "./SearchBar.jsx";
import FilterName from "./FilterName.jsx";
import FilterPopulation from "./FilterPopulation.jsx"
import FilterActivity from "./FilterActivity.jsx"
import FilterContinent from "./FilterContinent.jsx"
import '../CSS/Home.css'
import VideoHome from '../CSS/Videos/VideoHome.mp4'
import Countries from "./Countries.jsx";

export default function Home() {

    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)

    const [currentPage, setCurrentPage] = useState(1)
    const countriesXPage = 10
    const indexOfLastCountry = currentPage * countriesXPage
    const indexOfFirstCountry = indexOfLastCountry - countriesXPage
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry)

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])
    
    // function filterPopu (event) {

    //     let countriesPopu = countries.filter( pais => {
    //        return pais.population < 50000
    //     })

    //     dispatch(filterPopu50(countriesPopu))
    // }

    return (
        <div className="Home">
            <video autoPlay preload="auto" muted loop src={VideoHome}></video>
            <div className="TOP">
                <h1>Henry's Countries Proyect</h1>
            </div>

            <nav className="Nav_Home">
                <FilterName pages={setCurrentPage}/>

                <FilterPopulation pages={setCurrentPage}/>

                <FilterActivity pages={setCurrentPage}/>

                <FilterContinent pages={setCurrentPage}/>
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
                pages={setCurrentPage}
            />
            
{/* 
            <button onClick={(event) => filterPopu(event)}>filtrar</button> */}

            <Countries currentCountries={currentCountries}/>

        </div>
    )
}
