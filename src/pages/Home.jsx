import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import PizzaBlock from "../components/PizzaBlock";
import {useEffect, useState} from "react";

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://63dc382dc45e08a04356e0d4.mockapi.io/items')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(8)].map((_, index) => <Skeleton key={index}/>)
                    : items.map(obj => (<PizzaBlock key={obj.id} {...obj} />))}
            </div>
        </div>
    )
}

export default Home