import ReactPaginate from "react-paginate";
import s from './Pagination.module.scss'

const Pagination = ({currentPage, onChangePage}) => {
    return (
        <div>
            <ReactPaginate
                className={s.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={event => onChangePage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel="<"
                forcePage={currentPage-1}
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Pagination