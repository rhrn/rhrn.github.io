offer = document.querySelector '#offer'
btn = offer.querySelector 'button'
btn.addEventListener 'click', ->
  offer.classList.toggle 'clicked'
