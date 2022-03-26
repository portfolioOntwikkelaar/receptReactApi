import axios from 'axios'
import React, {useState} from 'react'
import './Food.css'
import cake from './images/cake2.png'
import shop from './images/shop.jpeg'

const Food = () => {

  const  [query, setQuery] = useState('')
  const [rcp, setRcp] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [list,setList] = useState('alcohol-free')

  const APP_ID = 'a0cb2036'  
  const APP_KEY = '92264c96f86689d81c3ca796c5b28911'  

  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&&health=${list}`

  async function getRecipe() {
    const result = await axios.get(url)
    setRcp(result.data.hits)
    console.log(result.data)
  }

  const submitForm = e => {
    e.preventDefault();
    getRecipe();
  }
  return (
    <div className='App'>

      <div className="header">
        <nav className='nav'>
          <div className="logo">
            <img src={cake} alt="" className='img-1' />
          </div>
          <ul className='ul'>
            <li><a href="#">Sponsors</a></li>
            <li><a href="#">Klanten</a></li>
            <li><a href="#">Maaltijd</a></li>
            <li><a href="#">Contact</a></li>
          </ul>

      <form className='form_1' onSubmit={submitForm}>
        <input type="text" placeholder='schrijf maar benaming van het artikel' value={query} onChange={e => setQuery(e.target.value)} />
        <button className="button-3" type='submit'>Invoeren</button>
      </form>
        </nav>
      

      <div>

        <div className='text'>
          <h1><span className='span-h2'>Snelste Levering </span>Ter Wereld</h1>
          <p>Voel Het <span>Smaak</span></p>
        </div>
        <div className='print'>

        {rcp.map((item,index) => {
          return (
            <div key={index} className='product'>
              <img src={item['recipe']['image']} alt=""  />
              <p><span>Benaming : </span>{item['recipe']['label']}</p>
              <p><span>Calorie : </span>{item['recipe']['calories'].toFixed(2)}</p>
              <div className='buttons'>

              <p>{<a className='d-2' href={item['recipe']['url']}>Lezen</a>}</p>
              <button className='button-2'>Bestelling</button>
              </div>
              
            </div>
          )
        })}
      </div>
        </div>
        </div>
    </div>
  )
}

export default Food
