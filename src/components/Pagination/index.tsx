import ReactPaginate from "react-paginate";
import s from './Pagination.module.scss'
import React from "react";

type PaginationProps = {
    currentPage: number;
    onChangePage: any
}

const Pagination:React.FC<PaginationProps> = ({currentPage, onChangePage}) => {
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
            />
        </div>
    )
}

export default Pagination