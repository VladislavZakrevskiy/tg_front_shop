import React from 'react'
// import { useImage } from '../../hooks/useImage'
import Button from '../UI/button/button'
import './ProductItem.css'

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product)
    }

    // const img = useImage(product.id)

  return (
    <div>
        <div className={'product ' + className}>
            {/* <img className='img' src={img} alt='Наш продукт'/> */}
            <div className={'title'}>{product.title}</div>
            <div className={'price'}>
                <span>{product.price} Руб.</span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    </div>
  )
}

export default ProductItem