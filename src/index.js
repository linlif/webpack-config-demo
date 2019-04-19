import _ from 'lodash'
import './style.css'
import './valiable.scss'
import imgSrc from './img.png'
import router from './router'

import { cube } from './math'

async function component () {
  let element = document.createElement('div')
  const { default: _ } = await import(/*webpackChunkName:"lodash"*/ 'lodash')
  element.innerHTML = _.join(['hello webpack!', `3 cube equals ${cube(3)}`], ' :')
  let span = document.createElement('span')
  span.innerHTML = router
  element.appendChild(span)
  // let img = document.createElement('img')
  // img.src = imgSrc
  // element.appendChild(img)
  console.log(cube(3))

  let btn = document.createElement('button')
  let br = document.createElement('br')
  btn.onclick = e => import(/*webpackChunkName:"print"*/ './print').then(module => {
    let print = module.default
    print()
  })
  btn.innerHTML = '点我动态加载js文件'
  element.appendChild(br)
  element.appendChild(btn)
  return element
}

component().then(component => {
  document.body.appendChild(component)
})
