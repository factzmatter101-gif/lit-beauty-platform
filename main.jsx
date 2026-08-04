import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './hairstyle-db.jsx'

// Progress bar animation while React mounts
const bar = document.getElementById('lti-bar')
let pct = 0
const tick = setInterval(() => {
  pct = Math.min(pct + Math.random() * 15, 90)
  if (bar) bar.style.width = pct + '%'
}, 150)

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(React.createElement(React.StrictMode, null, React.createElement(App)))

// Hide loading screen once mounted
setTimeout(() => {
  clearInterval(tick)
  if (bar) bar.style.width = '100%'
  setTimeout(() => {
    const loading = document.getElementById('lti-loading')
    if (loading) loading.style.display = 'none'
  }, 300)
}, 100)
