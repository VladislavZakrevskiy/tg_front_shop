import React, { useCallback, useEffect, useState } from 'react'
import './MakeBurger.css'
import {useTelegram} from '../../hooks/useTelegram'
import axios from 'axios'

const Form = () => {

    const {tg} = useTelegram()
    const [price, setPrice] = useState(0)    
    const [recept, setRecept] = useState('')
    const [title, setTitle] = useState('')

    const onSendData = useCallback(()=>{
        const data = {
            price,
            title,
        }
        axios.post("http://localhost:8000/prod/makeProd", data).then(data => {
        tg.sendData(JSON.stringify(data))
    })
    }, [price, title, tg])
        
    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData)
        return ()=> {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    })

    useEffect(()=>{
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    })

    useEffect(()=>{
        if(!recept || !price){
            tg.MainButton.hide()
        }
        else {
            tg.MainButton.show()
        }
    }, [price, recept, tg.MainButton])

    

    const onChangePrice = e => {
        setPrice(e.target.value)
    }

    const onChangeRecept = e => {
        setRecept(e.target.value)
    }

    const onChangeTitle = e => {
        setTitle(e.target.value)
    }


  return (
    <div className='form'>
        <h3>Введите ваши данные</h3>
        <input
            className='input'
            type="text"
            placeholder='Название'
            value = {title}
            onChange = {onChangeTitle}
            />
        <input
            className='input'
            type="text"
            placeholder='Цена'
            value = {price}
            onChange = {onChangePrice}
            />
            
        <input
            className='input'
            type="text"
            placeholder='Рецепт'
            value = {recept}
            onChange = {onChangeRecept}
            />
    </div>
  )
}

export default Form