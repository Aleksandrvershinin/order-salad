import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchMolecule, fetchSalad } from "./api";

let molecules = [];

export function SaladDetails() {
    molecules = [];
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [salad, setSalad] = useState({})
    const [message, setMessage] = useState('')

    const getSalad = async (id) => {
        setLoading(true)
        try {
            const res = await fetchSalad(id)
            if (res.success) {
                setSalad(res.result)
            } else {
                setMessage('Салат не найден')
            }
        } catch (error) {
            console.log(error);
            setMessage('Произошла ошибка')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getSalad(id)
    }, [id])

    return (
        <>
            {loading &&
                <h1>Загрузка...</h1>
            }
            {message &&
                <h1>{message}</h1>
            }
            {salad._id &&
                <>
                    <h1>{salad.title}</h1>
                    <p>Цена - {salad.price}</p>
                    <h2>Молекулы</h2>
                    <ul>
                        {salad.composition.map(molecule => {
                            return <li key={molecule} ><MoleculeTitle id={molecule} /></li>
                        })}
                    </ul>
                    <button className="btn">
                        <Link to='/order-salad' state={{ molecules: molecules }} >Заказать салат</Link>
                    </button>
                </>
            }
            <p style={{ marginTop: '20px' }}><a style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>Вернуться назад</a></p>
        </>
    );
}

function MoleculeTitle({ id }) {
    const [loading, setLoading] = useState(false)
    const [molecule, setMolecule] = useState({})
    const [message, setMessage] = useState('')
    const getMolecule = async (id) => {
        setLoading(true)
        try {
            const res = await fetchMolecule(id)
            if (res.success) {
                setMolecule(res.result)
                molecules.push(res.result)
            } else {
                setMessage('Молекула не найдена')
            }
        } catch (error) {
            console.log(error);
            setMessage('Произошла ошибка')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMolecule(id)
    }, [id])

    return (
        <>
            {loading &&
                <p>Загрузка...</p>
            }
            {message &&
                <p>{message}</p>
            }
            {molecule._id &&
                <p>{molecule.title}</p>
            }
        </>
    );
}