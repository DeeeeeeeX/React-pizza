import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {selectCurrentPage, selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";

import {useContext, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import qs from 'qs'
import {useNavigate} from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const filter = useSelector(selectFilter)
    const {searchValue} = useSelector(selectFilter)
    const currentPage = useSelector(selectCurrentPage)
    const {items, status} = useSelector(selectPizzaData)

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {

        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(fetchPizzas({
                currentPage,
                filter,
                search
            })
        )
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
            getPizzas()
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
            {
                status === 'error' ? (
                    <div className='content__error-info'>
                        <h2>Произошла ошибка :(</h2>
                        <p>К сожалению, не удалось получить пиццы. Попробуйте попытку позже</p>
                    </div>
                ) : (
                    <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
                )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home