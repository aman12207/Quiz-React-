import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const[loading, setLoading] = useState(false);
  const[category,setCategory] = useState(null);
  const[difficulty,setDifficulty] = useState('');
  const[amount,setAmount] = useState(10);
  const[list,setList] = useState([]);
  const[currentques,setCurrentques] = useState(null);
  const[isSubmit,setisSubmit] = useState(false);
  const[isModal,setisModal] = useState(false);
  const[correctans,setCorrectans] = useState(0);
  const fetchData = async() =>{
    setLoading(true);
    try {
      const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
      const response = await axios.get(url);
      setList(response.data.results);
      setCurrentques(0);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  useEffect(()=>{
    if(isSubmit){
      fetchData();
    }
  },[isSubmit])
  return <AppContext.Provider 
  value={
    {
      loading,isModal,category,difficulty,amount,list,isSubmit,currentques,correctans,setList,setCategory,setDifficulty,setAmount,setisSubmit,setCurrentques,setisModal,setCorrectans }
    }
  >{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }