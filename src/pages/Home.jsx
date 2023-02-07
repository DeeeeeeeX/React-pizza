import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import PizzaBlock from "../components/PizzaBlock";
import {useContext, useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";

const Home = () => {
    const {searchValue} = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [orderType, setOrderType] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    })

    const pizzas = items
        //.filter((obj) => {
        //return !!obj.title.toLowerCase().includes(searchValue.toLowerCase())
        //})
        .map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)


    useEffect(() => {
        setIsLoading(true)

        const search = searchValue ? `&search=${searchValue}` : ''

        fetch(`https://63dc382dc45e08a04356e0d4.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${orderType}${search}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, orderType, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)} setOrderType={setOrderType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    )
}

export default Home