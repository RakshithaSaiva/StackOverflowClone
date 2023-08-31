import React from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './HomeMainbar.css'
import Questionslist from './Questionslist'

const HomeMainbar = () => {

  const location=useLocation()
  const user= '1';
  const navigate =useNavigate()
   
  const questionsList= useSelector( state =>state.questionsReducer)
  console.log(questionsList)

//   var questionslist=[{
//     _id: 1,
//     upVotes: 3,
//     downVotes:2,
//     noOfAnswers: 2,
//     questionTitle: "What is a function?",
//     questionBody: "It mean to be",
//     questionTags: ['java','node.js','react js','mongodb'],
//     userPosted: 'Rakshitha',
//     userId:1,
//     askedOn: 'jun 1',
//     answer: [{
//         answerBody: "Answer",
//         userAnswered: "saiva",
//         answeredOn:' jun 2',
//         userId: 2
//     }]
//  },{ 
//   _id: 2,
//   upVotes: 3,
//   downVotes:2,
//   noOfAnswers: 0,
//   questionTitle: "What is a function?",
//   questionBody: "It mean to be",
//   questionTags: ['javasvript','R','python'],
//   userPosted: 'Rakshitha',
//   userId:1,
//   askedOn: 'jun 1',
//   answer: [{
//     answerBody: "Answer",
//     userAnswered: "saiva",
//     answeredOn:' jun 2',
//     userId: 2
// }]
// },{
//   _id: 3,
//     upVotes: 3,
//     downVotes:2,
//     noOfAnswers: 0,
//     questionTitle: "What is a function?",
//     questionBody: "It mean to be",
//     questionTags: ['javasvript','R','python'],
//     userPosted: 'Rakshitha',
//     userId: 1,
//     askedOn: 'jun 1',
//     answer: [{
//         answerBody: "Answer",
//         userAnswered: "saiva",
//         answeredOn:' jun 2',
//         userId: 2
//     }]
// }]
 

  const checkAuth=() =>{
    if (user==null){
     alert("login or signup to ask question")
     navigate('/Auth')
   }else{
     navigate('/AskQuestion')
   }
  }


  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <button onClick={(checkAuth)} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionsList.data== null ?
          <h1>Loading...</h1> :
          <>
           <p>{questionsList.data.length} questions</p>
           <Questionslist questionsList={questionsList.data} />
           <>
             {

             }
           </>
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar
