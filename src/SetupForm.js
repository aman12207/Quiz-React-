import React  from 'react'
import { useGlobalContext } from './context'
import Loading from './Loading';

const SetupForm = () => {
  const {list,amount,currentques,correctans,setAmount,setCategory,setCurrentques,setDifficulty,setisSubmit,isSubmit,setisModal,setCorrectans} = useGlobalContext();
  const handleSubmit = (e) =>{
    e.preventDefault();
    setAmount(e.target.amount.value);
    setCategory(e.target.category.value);
    setDifficulty(e.target.difficulty.value);
    setisSubmit(true);
  }
  const handleClick = () =>{
    if(currentques=== list.length-1)
      setisModal(true);
    else 
    setCurrentques(currentques+1);
  }
  const handleCorrect = () =>{
    handleClick();
    setCorrectans(correctans+1);
  }
  if(!isSubmit){
    return(
      <section className="quiz quiz-small">
        <form className="setup-form" onSubmit={handleSubmit}>
          <h2>setup quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input onChange={(e)=>setAmount(e.target.value)} type="number" name="amount" id="amount" className="form-input" min="1" max="50" value={amount}/>
          </div>
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select name="category" id="category" className="form-input">
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select name="difficulty" id="difficulty" className="form-input">
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {amount<=0 && <p className="error">can't generate questions, please try different options</p>}
          <button type="submit" className="submit-btn">start</button>
          </form>
        </section>
    )
  }
  else if(list.length>0){
    const {question,correct_answer,incorrect_answers} = list[currentques];
    const RandomNo = Math.floor(Math.random()*4);
    // console.log(RandomNo);
    return (
      <section className="quiz">
        <p className="correct-answers">{`correct answers : ${correctans}/${currentques}`}</p>
        <article className="container">
          <h2>{question}</h2>
           <div className="btn-container">
            {
              incorrect_answers && incorrect_answers.map((answer,index)=>{
                if(index==RandomNo){
                  return (
                    <>
                    <button onClick={handleCorrect} className="answer-btn">{correct_answer}</button>
                    <button onClick={handleClick} className="answer-btn">{answer}</button>
                    </>
                  )
                }
                return <button onClick={handleClick} className="answer-btn">{answer}</button>
              })
            }
            {RandomNo===3 && <button onClick={handleCorrect} className="answer-btn">{correct_answer}</button>}
          </div>
        </article>
        <button onClick={handleClick} className="next-question">next question</button>
      </section>
    )
  }
  else {
    return <Loading/>
  }
}

export default SetupForm;