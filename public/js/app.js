const weatherForm = document.querySelector('form')
const searchElm = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const loader = document.querySelector('.loader')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()    
    const location = searchElm.value
    messageOne.textContent = 'Loading...'
    document.getElementById('loader').style.display = 'block'
    messageTwo.textContent = ''

    fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            document.getElementById('loader').style.display = 'none'
            messageOne.textContent = data.error
        } else {
            document.getElementById('loader').style.display = 'none'
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
    
})