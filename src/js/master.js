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
})
