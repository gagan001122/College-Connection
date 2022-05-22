import React , { useContext } from 'react'
import { Avatar } from '@mui/material'
import "./Conversation.css"
import { Context } from  "../../context/Context";
export default function Conversation () {
  const user = useContext(Context);
  console.log(user);
  return (
    <div className='conversation'>
    <div className="userprofile">
    <img src="avatar.jpeg" className="userprofile_avatar" />
    <span className='username'>{user.user.first_name} {user.user.last_name}</span>
    </div>
    </div>
  )
}
