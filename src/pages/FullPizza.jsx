import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const FullPizza = () => {
    const [pizza, setPizza] = useState()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://63dc382dc45e08a04356e0d4.mockapi.io/items/` + id)
                setPizza(data)
            } catch (error) {
                alert('Ошибка при получении пиццы')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return 'Загрузка ...'
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt="pizza"/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    )
}

export default FullPizza