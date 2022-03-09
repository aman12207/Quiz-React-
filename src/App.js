import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {loading,isModal} = useGlobalContext();
  if(isModal){
    return <main>
      <Modal/>
    </main>
  }
  if(loading){
    return (
      <main>
        <Loading/>
      </main>
    )
  }
  return(
    <main>
      <SetupForm/>
  </main>
  )
}

export default App
