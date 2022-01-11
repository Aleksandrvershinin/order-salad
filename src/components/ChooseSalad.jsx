import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export function ChooseSalad() {
    const salads = useSelector(state => state.salads);
    return (
        <ul>
            {salads.map(salad => {
                return (
                    <li key={salad._id}>
                        <Link to={`/salad-details/${salad._id}`}  >{salad.title}</Link>
                    </li>)
            })}
        </ul>
    );
}