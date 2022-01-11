import React from "react";
import { Link } from "react-router-dom";

export function Main() {

    return (
        <ul>
            <li>
                <Link to="/choose-salad" >Выбрать готовый салат</Link>
            </li>
            <li>
                <Link to="/create-salad" >Собрать свой салат</Link>
            </li>
        </ul>
    );
}