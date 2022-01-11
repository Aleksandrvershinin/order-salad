import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { fetchCreateOrder } from "./api";

export function OrderSalad() {
    const navigate = useNavigate()
    const [sending, setSending] = useState(false)
    const location = useLocation()
    const molecules = location.state?.molecules

    useEffect(() => {
        return () => {
            setSending(false)
        }
    }, [])

    if (!molecules) {
        return <Navigate to="/" replace />
    }
    let unavailable = 0

    const createOrder = async () => {
        if (unavailable > 0 || sending) return
        setSending(true)
        const data = { molecules: [] }
        molecules.map(molecule => {
            data.molecules.push({ id: molecule._id, "qty": 1 })
        })
        try {
            const res = await fetchCreateOrder(data)
            if (res.success) {
                alert(res.result)
                navigate('/')
            } else {
                alert(res.result)
            }
        } catch (error) {
            console.log(error);
            alert('Произошла ошибка')
        } finally {
            setSending(false)
        }
    }

    const renderMolecule = (molecule) => {
        if (molecule.qty <= 0) {
            unavailable++
        }
        return (
            <li className='order-salad__molecule' key={molecule._id} >
                <p>Название молекулы - {molecule.title}</p>
                <p>Цена - {molecule.price}</p>
                {molecule.qty <= 0 &&
                    <p style={{ color: 'red' }}>Данная молекула закончилась</p>
                }
            </li>
        )
    }
    const renderBtn = () => {
        if (molecules.length > 0 && unavailable > 0) {
            return (
                <>
                    <p>Вы не можете сделать заказ, так как не все молекулы доступны для заказа</p>
                    <Link to="/" >Вернуться на главную</Link>
                </>
            )
        } else if (molecules.length > 0) {
            return (<button onClick={createOrder} className="btn">сделать заказ</button>)
        }
    }

    return (
        <>
            <h1>Ваш заказ</h1>
            <ul>
                {molecules.map(molecule => renderMolecule(molecule))}
            </ul>
            {renderBtn()}
        </>
    )

}