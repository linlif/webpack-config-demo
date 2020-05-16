
import './style.css'
import './valiable.scss'

// 静态引入
import jquery from 'jquery'
// import a from './a.js'
// import b from './b.js'

// 动态引入
// import(/*webpackChunkName:"react"*/ 'react-dom')

// import b from './b.js'
import(/*webpackChunkName:"a"*/ './a.js')
// import(/*webpackChunkName:"b"*/ './b.js')