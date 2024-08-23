import { createBleep } from '@arwes/bleeps'

const rootElement = document.querySelector('#root')!

rootElement.innerHTML = '<button class="bleep">Bleep!</button>'

const bleepElement = rootElement.querySelector('.bleep')!

const bleep = createBleep({
  sources: [
    { src: '/assets/sounds/click.webm', type: 'audio/webm' },
    { src: '/assets/sounds/click.mp3', type: 'audio/mpeg' }
  ]
})

bleepElement.addEventListener('click', () => {
  bleep?.play()
})
