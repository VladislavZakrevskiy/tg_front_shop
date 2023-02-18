import React, { useCallback, useEffect, useState } from 'react'
import './Form.css'
import {useTelegram} from '../../hooks/useTelegram'

const Form = () => {

    const {tg} = useTelegram()
    const [country, setCountry] = useState('')    
    const [street, setStreet] = useState('')
    const [subject, setSubject] = useState('physical')
    const [last_name, setName] = useState('')

    const onSendData = useCallback(()=>{
        const data = {
            country,
            street: street.split(' ')[0],
            num_house: street.split(' ')[1],
            subject, 
            last_name,
            table: Math.floor(Math.random() * 10),
            restourant: 'Улица Волгоградская 12А'
        }
        tg.sendData(JSON.stringify(data))
    }, [country,street,subject, last_name, tg])
        
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
        if(!street || !country){
            tg.MainButton.hide()
        }
        else {
            tg.MainButton.show()
        }
    }, [country, street, tg.MainButton])

    

    const onChangeCountry = e => {
        setCountry(e.target.value)
    }

    const onChangeStreet = e => {
        setStreet(e.target.value)
    }

    const onChangeSubject = e => {
        setSubject(e.target.value)
    }

    const onChangeName = e => {
        setName(e.target.value)
    }


  return (
    <div className='form'>
        <h3>Введите ваши данные</h3>
        <input
            className='input'
            type="text"
            placeholder='Фамилия'
            value = {last_name}
            onChange = {onChangeName}
            />
        <input
            className='input'
            type="text"
            placeholder='Страна'
            value = {country}
            onChange = {onChangeCountry}
            />
            
        <input
            className='input'
            type="text"
            placeholder='Улица и дом'
            value = {street}
            onChange = {onChangeStreet}
            />
        <select value={subject} onChange={onChangeSubject} className='select'>
            <option value="physical">Физ. лицо</option>
            <option value="legal">Юр. лицо</option>
        </select>

    </div>
  )
}

export default Form