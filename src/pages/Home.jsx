import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import PizzaBlock from "../components/PizzaBlock";
import {useContext, useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../redux/slices/filterSlice";

const Home = () => {

    const dispatch = useDispatch()
    const filter = useSelector((state) => state.filter)

    const {searchValue} = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const pizzas = items
        .map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)


    useEffect(() => {
        setIsLoading(true)

        const search = searchValue ? `&search=${searchValue}` : ''

        fetch(`https://63dc382dc45e08a04356e0d4.mockapi.io/items?page=${currentPage}&limit=4&${filter.categoryId > 0 ? `category=${filter.categoryId}` : ''}&sortBy=${filter.sort.sortProperty}&order=${filter.sort.orderType}${search}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [filter, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={filter.categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    )
}

export default Home