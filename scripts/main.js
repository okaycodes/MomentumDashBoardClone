
// const bodyEl = document.getElementById('body')
const timeEl = document.getElementById('time-data')
const inputEl = document.getElementById('input')
const weatherEl = document.getElementById('weather')
const coinImgEl = document.getElementById('coin-img')
const settingsEl = document.getElementById('settings')
// const bgCreatorEl = document.getElementById('bg-creator')
// const bgLocationEl = document.getElementById('bg-location')
const weatherIconEl = document.getElementById('weather-icon')
const weatherLocationEl = document.getElementById('weather-location')
const weatherDescriptionEl = document.getElementById('weather-desc')
const quoteEl = document.getElementById('quote')
let weatherLocation = "Lagos"




function getBackground(){
  fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
      const url = data.urls.regular
      const img = new Image()
      img.src =  url
      img.onload = function () {
          bodyEl.style.backgroundImage = `url(${url})`
          bgCreatorEl.textContent = `Pic by: ${data.user.name}`
          bgLocationEl.textContent = `Location: ${data.location.name}`
          getCoin()
          getQuote()
      }
    }).catch( err => {
      console.log(err)
      const url = "https://images.unsplash.com/photo-1486673748761-a8d18475c757?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2ODUzODQ&ixlib=rb-1.2.1&q=85"
      const img = new Image()
      img.src =  url
      img.onload = function () {
          bodyEl.style.backgroundImage = `url(${url})`
          bgCreatorEl.textContent = `Pic by: Karsten Würth`
          bgLocationEl.textContent = `Location: Alsheim, Germany`
          getCoin()
          getQuote()
      }
    })
}
// let interval = setInterval (getBackground, 8000)
// setTimeout(getBackground, 800)
getBackground()


async function getCoin(){
  const coinArr = ['bitcoin', 'dogecoin', 'ethereum', 'litecoin', 'cardano']
  const randomCoin = coinArr[Math.floor(Math.random()*coinArr.length)]
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${randomCoin}`)
  const data = await response.json()
  const imgUrl = data.image.thumb
  coinImgEl.src = imgUrl
  coinImgEl.onload = function(){
    const html = `<li> 🎯:  $${data.market_data.current_price.usd}</li>
                  <li> ↗️:  $${data.market_data.high_24h.usd}</li>
                  <li> ↘️:  $${data.market_data.low_24h.usd}</li>`
    document.getElementById('coin-id').textContent = data.id
    document.getElementById('coin-data').innerHTML = html
    let timeInterval = setInterval(currentTime, 1000)
  }
}


function currentTime(){
  const date = new Date()
  const options1 = { hour: 'numeric', minute: 'numeric', hour12: true }
  const options2 = { timeStyle: 'medium'}
  timeEl.innerHTML = ""
  timeEl.textContent = date.toLocaleString('en-US', options1 )
}

function getQuote(){
  fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(data => {
        let blockquoteEl = document.createElement('blockquote')
        let quoteCaptionEl = document.createElement('figcaption')
        let seeMoreEl = document.createElement('span')
        blockquoteEl.cite = "https://api.quotable.io/random"
        blockquoteEl.textContent = `${data.content}`
        quoteCaptionEl.textContent = `-${data.author}`
        quoteEl.appendChild(blockquoteEl)
        quoteEl.appendChild(quoteCaptionEl)
      })
}


function getWeather(){
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${weatherLocation}&units=metric`)
      .then(response => response.json())
      .then(data=>{

        let img = new Image()
        let currentLocation = document.createElement('p')
        let tempEl = document.createElement('p')
        img.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
        tempEl.innerHTML = `<p class="temp">${Math.floor(data.main.temp)}<sup>o</sup>C</p>`
        img.onload = function(){
          weatherIconEl.innerHTML = ""
          weatherIconEl.appendChild(img)
          weatherIconEl.appendChild(tempEl)
          weatherLocationEl.textContent = weatherLocation
          weatherDescriptionEl.textContent =  data.weather[0].description
        }
      })
}

getWeather()


settingsEl.addEventListener('click', function(){
  if(inputEl.style.display === "none"){
    inputEl.style.display = "block"
    hideBar()
  }else{
    inputEl.style.display = "none"
  }
})

document.addEventListener('keypress', function(event){
  if(event.keyCode === 13){
    console.log('keypressed')
    weatherLocation = inputEl.value
    inputEl.value = ""
    inputEl.style.display = "none"
    getWeather()
  }
})

function hideBar(){
  document.addEventListener('click', function(event){
    let isClicked = inputEl.contains(event.target)
    let settingsIsClicked = settingsEl.contains(event.target)
    if(!isClicked && !settingsIsClicked){
      inputEl.style.display = "none"
    }
  })
}
