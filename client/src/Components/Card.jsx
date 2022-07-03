import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, id, img, continent }) {
    return (
        <div className="card">
            <Link to={'/countries/' + id}>
                <h3>{name}</h3>
                <h4>{continent}</h4>
                <img src={img} alt={name} width="300" height="150" />
            </Link>
        </div>
    )
}