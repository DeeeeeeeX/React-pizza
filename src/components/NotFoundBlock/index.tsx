import s from './NotFoundBlock.module.scss'
import React from "react";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={s.root}>
      <h1>
        <span>:(</span>
        <br/>
        Ничего не найдено
      </h1>
      <p className={s.desription}>К сожалению данная страница отсутствует в нашем интернет-магазине</p>
    </div>
  )
}

export default NotFoundBlock