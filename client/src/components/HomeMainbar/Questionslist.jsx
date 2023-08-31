import React from 'react'
import Questions from './Questions'

const Questionslist = ({questionsList}) => {
  return (
    <>
      {
        questionsList.map((question) => (
        <Questions question={question} key={question.id}/>
        ))
      }
    </>
    )
}

export default Questionslist
