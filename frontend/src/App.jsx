import { useState } from 'react'
import Map from './components/Map'
import Chat from './components/Chat'

function App() {
  return (
    <div>
      <Map location="Los Angeles, CA"/>
      <Chat/>
    </div>
  )
}

export default App
