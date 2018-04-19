window.addEventListener('DOMContentLoaded', e => {
  // intro animations
  [...document.querySelectorAll('.to-animate')]
    .forEach((node, idx) => {
      setTimeout(() => {
        node.classList.add('fade-in-up')
      }, (idx * 180))
    })

  // circles effect.
  const circles = document.querySelectorAll('.circle')
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  let getTopAndRightFromNode = node => ({
    top: parseInt(window.getComputedStyle(node, null).top),
    right: parseInt(window.getComputedStyle(node, null).right)
  })

  function moveCircleAround(middle, x, y, circle) {
    const accelarationValue = 2
    const { top, right } = getTopAndRightFromNode(circle)

    if(middle) {
      circle.style.transform = `translate(${(x - 50) / 2}px, ${(y - 50) / 2}px)`
    } else {
      circle.style.transform = `translate(${x - 50}px, ${y - 50}px)`
    }
  }

  document.body.addEventListener('mousemove', ({ clientX, clientY }) => {
    const horizontal = Math.floor((clientX / screenWidth) * 100)
    const vertical = Math.floor((clientY / screenHeight) * 100)

    moveCircleAround(true, horizontal, vertical, circles[1])
    moveCircleAround(false, horizontal, vertical, circles[2])
  })

  // submit email
  const inputFormContainer = document.querySelector('.input-form')
  const input = document.querySelector('#input')
  const submit = document.querySelector('#submit')
  const apiUrl = 'https://api.blankoapp.com/v1/beta/signup'

  submit.addEventListener('click', e => {
    const toPost = { email: input.value }
    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if(reg.test(toPost.email)) {
      input.classList.remove('error')
      input.classList.add('success')

      fetch(apiUrl, {
        body: JSON.stringify(toPost),
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      })
      .then(binary => binary.json())
      .then(json => {
        submit.innerText = 'Thanks for submitting!';
        input.value = ''
        inputFormContainer.style.boxShadow = '0 6px 18px -3px rgba(76, 217, 100, 0.47)';

        setTimeout(() => {
          inputFormContainer.style.boxShadow = '0 6px 18px -3px rgba(4,19,36,0.27)';
        }, 1000)

        console.info(json)
      })
      .catch(err => console.error(err))
    } else {
      console.error('not a valid email address');
      input.classList.add('error')
    }
  })
})
