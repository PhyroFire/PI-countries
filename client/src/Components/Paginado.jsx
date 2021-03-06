import React from "react";
import '../CSS/Paginado.css'

export default function Paginado({ countriesXPage, allCountries, pages, currentPage }) {

    let pageNumbers = []

    for (let index = 1; index <= Math.ceil(allCountries / countriesXPage); index++) {
        pageNumbers.push(index)
    }

    return (
        <nav>
            <ul className="Paginado">
                {
                    pageNumbers &&
                    pageNumbers.map(number => {
                        return (
                            <li key={number}>
                                <button onClick={() => pages(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}