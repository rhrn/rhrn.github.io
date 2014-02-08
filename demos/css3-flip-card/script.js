var btn, offer;

offer = document.querySelector('#offer');

btn = offer.querySelector('button');

btn.addEventListener('click', function() {
  return offer.classList.toggle('clicked');
});
