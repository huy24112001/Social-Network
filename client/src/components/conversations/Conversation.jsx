import React from 'react'

const Conversation = ({conversation}) => {
    console.log(conversation)
  return (
    <div className='conversation'>
        <p>
        {conversation._id}
        </p>
    </div>
  )
}

export default Conversation