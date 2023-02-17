import React from 'react'
import Button from '../UI/button/button'
import './ProductItem.css'

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product)
    }

  return (
    <div>
        <div className={'product ' + className}>
            <div className={'img'}/>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    </div>
  )
}

export default ProductItem