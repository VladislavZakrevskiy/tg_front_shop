import React, { useCallback, useEffect, useState } from 'react'
import './ProductList.css'
import ProductItem from '../../components/ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'
import axios from 'axios'



const ProductList = () => {
    const {tg, queryId} = useTelegram()
    const [addedItems, setAddedItems] = useState([])
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchData = async () => {
            const result = await axios.get('http://localhost:8000/prod/get')
            setProducts(result.data.rows)
        }
        fetchData()
    }, [])

    const onSendData = useCallback(()=>{
        const data = {
            products: addedItems, 
            totalPrice: getTotalPrice(addedItems),
            queryId
        }
        axios.post('http://localhost:8000/web-data', data, {
        'Content-Type':'application/json'
    })
    }, [addedItems, queryId])
        
    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData)
        return ()=> {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    })

    const getTotalPrice=(items =[])=>{
        return items.reduce((acc, item)=>{
            return acc+= item.price
        }, 0)
    }

    const onAdd = (product) => {
        const alreadyAddded = addedItems.find(item => item.id === product.id)
        let newItems = []

        if(alreadyAddded){
            newItems = addedItems.filter(item => item.id === product.id)
        }
        else {
            newItems = [...addedItems, product]
        }

        setAddedItems(newItems)

        if(newItems.length ===0){
            tg.MainButton.hide()
        }
        else {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }
    
    
  return (
    <div className='list'>
        
        {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
    </div>
  )
}

export default ProductList