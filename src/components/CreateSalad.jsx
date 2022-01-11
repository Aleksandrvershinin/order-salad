import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function CreateSalad() {
    const molecules = useSelector(state => state.molecules);
    const [salad, setSalad] = useState([])
    const addMolecule = (molecule) => {
        const newset = new Set(salad)
        newset.add(molecule)
        setSalad([...newset])
    }
    return (
        <>
            <h1 className='create-salad__title'>Сборка собственного салата</h1>
            <div className='create-salad'>
                <div className='create-salad__molecule'>
                    <h2>Молекулы</h2>
                    <ul>
                        {molecules.map(molecule => {
                            return (
                                <li className='create-salad__molecule_list' key={molecule._id}>
                                    <p>{molecule.title}</p>
                                    <button className='create-salad__molecule_btn btn' onClick={() => addMolecule(molecule)}>добавить</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className='create-salad__salad'>
                    <h2>Салат</h2>
                    {salad.map(molecule => {
                        return (
                            <li key={molecule._id}>
                                <p>{molecule.title}</p>
                            </li>
                        )
                    })}
                    {salad.length > 0 &&
                        <Link to='/order-salad' state={{ molecules: salad }} >Заказать салат</Link>
                    }
                </div>
            </div>
        </>
    )
}