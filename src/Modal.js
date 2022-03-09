import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const {list,correctans,setisModal,setisSubmit,setCorrectans,setAmount,setList,setCurrentques,} = useGlobalContext();
  const handleClick = () =>{
    setisModal(false);
    setisSubmit(false);
    setCorrectans(0);
    setAmount(10);
    setList([]);
    setCurrentques(0);
  }
  return <div className={`modal-container isOpen`}>
    <div className="modal-content">
      <h2>congrats!</h2>
      <p>{`You answered ${Math.round((correctans/list.length)*100)}% of questions correctly`}</p>
      <button onClick={handleClick} className="close-btn">play again</button>
    </div>
  </div>
}

export default Modal
