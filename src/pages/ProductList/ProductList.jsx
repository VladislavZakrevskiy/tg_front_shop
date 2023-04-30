import React, { useCallback, useEffect, useState } from 'react'
import './ProductList.css'
import ProductItem from '../../components/ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'
import axios from 'axios'
import SortBar from '../../components/UI/sortBar/sortBar'
import useFetching from '../../hooks/useFetching'
import MyLoader from '../../components/UI/MyLoader/MyLoader'



const ProductList = () => {
    const {tg, queryId} = useTelegram()
    const [addedItems, setAddedItems] = useState([])
    let [products, setProducts] = useState([])
    const [sort, setSort] = useState('все')

    const BasketHandle = () => {
        setSort('Баскеты')
    }

    const BurgerHandle = () => {
        setSort('Бургеры')
    }

    const AllHandle = async () => {
        setSort('все')
    }

    const DrinkHandle = () => {
        setSort('Напитки')
    }

    const [fetchData, isLoading] = useFetching(async () => {
        const result = await axios.get('https://tg-back.onrender.com/prod/get')
        if(sort === 'все'){
            setProducts(result.data.rows)
        }
        else {
            setProducts(result.data.rows.filter(a => a.category === sort))
        }
    })

    useEffect(()=>{
        fetchData()
// eslint-disable-next-line
    }, [sort])

    const onSendData = useCallback(()=>{
        const data = {
            products: addedItems, 
            totalPrice: getTotalPrice(addedItems),
            queryId
        }
        axios.post('http://45.140.178.84:8000/web-data', data, {
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
            return acc+= Number(item.price)
        }, 0)
    }

    const onAdd = (product) => {
        const alreadyAddded = addedItems.find(item => item.prod_id === product.prod_id)
        let newItems = []

        if(alreadyAddded){
            newItems = addedItems.filter(item => item.prod_id === product.prod_id)
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
    <div className='prodList'>
        <SortBar
            AllHandle={AllHandle}
            BasketHandle={BasketHandle}
            BurgerHandle={BurgerHandle}
            DrinkHandle={DrinkHandle}
        />
         
         {
            isLoading 
            ? <MyLoader/>
            : <div className='list'> 
            {products.map(item => (
                    <ProductItem
                        product={item}
                        onAdd={onAdd}
                        className={'item'}
                    />
                ))}
                </div>
         }
            
    </div>
    
  )
}

export default ProductList