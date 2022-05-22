import React from 'react'
import "./Message.css"
export default function Message({mine}) {
  return (
    <div className={mine? "message mine" : "message"}>
         <div className="messagetop">
         <img src="avatar.jpeg" className="userprofileimg" />  
         <p className='messagetext'>hi this is Gagan nostrum voluptates itaque totam laudantium.</p>
          </div>
          <div className="messagebottom">
          <div className="time">2:01 AM</div>
          <div className="date">Today</div>
          </div>
    </div>
  )
}
