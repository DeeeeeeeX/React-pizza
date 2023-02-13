import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";

import {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import qs from 'qs'
import {useNavigate} from "react-router-dom"
import {setItems} from "../redux/slices/pizzasSlice";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const filter = useSelector((state) => state.filter)
    const currentPage = useSelector((state) => state.filter.currentPage)
    const items = useSelector((state) => state.pizza.items)

    const {searchValue} = useContext(SearchContext)
    const [isLoading, setIsLoading] = useState(true)

    const pizzas = items
        .map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizzas = async () => {
        setIsLoading(true)

        const search = searchValue ? `&search=${searchValue}` : ''

        try {
            const {data} = await axios.get(`https://63dc382dc45e08a04356e0d4.mockapi.io/items?page=${currentPage}&limit=4&${filter.categoryId > 0 ? `category=${filter.categoryId}` : ''}&sortBy=${filter.sort.sortProperty}&order=${filter.sort.orderType}${search}`)
            dispatch(setItems(data))
        } catch (error) {
            alert('Ошибка при получении пицц')
            console.log('ERROR', error)
        } finally {
            setIsLoading(false)
        }

        window.scrollTo(0, 0)
    }

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: filter.sort.sortProperty,
                categoryId: filter.categoryId,
                currentPage,
                order: filter.sort.orderType
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [filter, searchValue, currentPage])

    // Если был первый рендер, то проверяем URL - параметры и сохраняем в редаксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort: {...sort, orderType: params.order},
                })
            )
            isSearch.current = true
        }
    }, [])

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            fetchPizzas()
        }

        isSearch.current = false
    }, [filter, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={filter.categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home