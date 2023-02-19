import React from 'react'
import './sortBar.css'
import Button from '../button/button'

const SortBar = ({products, AllHandle, BasketHandle, BurgerHandle, DrinkHandle}) => {

  return (
    <div className='sortBar'>
        <Button
            onClick ={AllHandle}
        >
            Все
        </Button>
        <Button
            onClick ={BurgerHandle}
        >
            Бургеры
        </Button>
        <Button
            onClick ={BasketHandle}
        >
            Баскеты
        </Button>
        <Button
            onClick ={DrinkHandle}
        >
            Напитки
        </Button>
    </div>
  )
}

export default SortBar