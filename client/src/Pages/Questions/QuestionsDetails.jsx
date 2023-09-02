import React, {useState} from 'react'
import { useParams ,Link, useNavigate, useLocation} from 'react-router-dom'
import moment from 'moment'
import {useSelector, useDispatch} from 'react-redux'


import './Questions.css'

import upvotes from '../../assets/upvotes.jpg'
import downvotes from '../../assets/downvotes.png'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswers from './DisplayAnswers'
import {postAnswer, deleteQuestion, voteQuestion} from '../../actions/question'
import copy from 'copy-to-clipboard'

const QuestionsDetails = () => {

    const { id } = useParams()
    const questionsList= useSelector( state =>state.questionsReducer)

    // console.log(id)
    
    // var questionsList=[{
    //     _id: '1',
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
    //   _id: '2',
    //   upVotes: 3,
    //   downVotes:2,
    //   noOfAnswers: 0,
    //   questionTitle: "What is a function?",
    //   questionBody: "It mean to be",
    //   questionTags: ['javasvript','R','python'],
    //   userPosted: 'Rakshitha',
    //   userId: 1,
    //   askedOn: 'jun 1',
    //   answer: [{
    //     answerBody: "Answer",
    //     userAnswered: "saiva",
    //     answeredOn:' jun 2',
    //     userId: 2
    //       }]
    // },{
    //   _id: '3',
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
   const [Answer, setAnswer] = useState('')
   const Navigate= useNavigate()
   const dispatch= useDispatch()
   const User= useSelector((state) => (state.currentUserReducer))
   const location = useLocation()
   const url ='https://Stack-overflow-rakshitha.netlify.app'

   const handlePostAns= (e, answerLength) =>{
      e.preventDefault()
      if (User === null){
          alert('Login or Signup to answer a question')
          Navigate('/Auth')
      }else{
        if (Answer === ""){
          alert("Enter an answer before submitting")
        }else{
          dispatch(postAnswer({id, noOfAnswers: answerLength + 1, answerBody:Answer, userAnswered:User.result.name, userId: User.result._id}))
        }
      }
   }
   
    const handleShare = () => {
       copy(url+ location.pathname)
       alert('Copied url: '+url+location.pathname)
    }

    const handleDelete =() => {
       dispatch(deleteQuestion(id ,Navigate))
       
    }

    const handleUpVote =() =>{
      dispatch(voteQuestion(id,'upVote', User.result._id))
    }

    const handleDownVote =() =>{
      dispatch(voteQuestion(id,'downVote', User.result._id))
    }

  return (
    <div className='question-details-page'>
       {
         questionsList.data === null ?
          <h1> Loading...</h1> :
         <>{
           questionsList.data.filter(question => question._id === id).map(question =>(
            <div key={question._id}>
                <section className='question-details-container-1'>
                       <h1>{question.questionTitle}</h1>
                     <div className='question-details-container-2'>
                         <div className='question-votes'>
                            <img src={upvotes} alt="" width='50' className='votes-icon' onClick ={handleUpVote}/>
                            <p>{question.upVote.length- question.downVote.length}</p>
                            <img src={downvotes} alt="" height='14' width='23' className='votes-icon' style={{padding:'15px' }} onClick ={handleDownVote}/>
                         </div>
                         <div style={{width:'100%'}}>
                            <p className='question-body'>
                              {question.questionBody}
                            </p>
                            <div className="question-details-tags">
                              {
                                question.questionTags.map((tag)=> (
                                 <p key={tag}>{tag}</p>
                              ))
                             }
                            </div>
                          <div className='question-actions-user'>
                            <div>
                              <button type='button' onClick={handleShare}>Share</button>
                              {
                                User.result._id === question.userId && (
                                  <button type='button' onClick= {handleDelete}>Delete</button>
                                  )
                              }
                            
                            </div>
                            <div>
                              <p>asked {moment(question.askedOn).fromNow()}</p>
                              <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                <Avatar backgroundColor='orange' px='8px' py='8px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                <div>
                                  {question.userPosted}
                                </div>
                              </Link>
                            </div>
                          </div>
                         </div>
                     </div>
                </section>
                {
                  question.noOfAnswers !==0 && (
                    <section>
                      <h1>{ question.noOfAnswers} Answers</h1>
                      <DisplayAnswers  key={question._id} question={question} handleShare={handleShare}/>
                    </section>
                  )
                }
                <section className='post-ans-container'>
                 <h3>Your answer</h3>
                 <form onSubmit={(e)=> handlePostAns(e, question.answer.length)}>
                 <textarea name="" id="" cols="10" rows="10" onChange={e=> setAnswer(e.target.value)}></textarea><br/>
                 <input type='Submit' className='post-ans-btn' value='Post Your Answer' />
                 </form>
                 <p>
                  Browse other Question tagged
                  {
                    question.questionTags.map((tag) =>(
                      <Link to='/Tags' className='ans-tags' key={tag}> {tag} </Link>
                    ))
                  } or
                  <Link to='/AskQuestion' style={{textDecoration:'none', color:'#009dff'}}> ask your own question</Link>
                 </p>
                </section>
            </div>
             ))
            }
         </>
        }
    </div>
  )
}

export default QuestionsDetails
