import React from 'react'
import './message.css'
import getTimeAgo from "../../time/GetTimeAgo";


const Message = ({message, own}) => {

    // console.log(message)
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {/* <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        /> */}
                {
                    message?.text ? (
                        <p className="messageText">{message?.text}</p>
                    ) : (
                        <audio controls  src={message?.audio} />
                    )
                }
            </div>
            <div className="messageBottom">{getTimeAgo(message?.createdAt)}</div>
        </div>
    )
}

export default Message
