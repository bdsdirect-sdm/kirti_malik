import React from "react";

interface ChatSideBarProps{
    jobSeekers:any[];
    onChatSelect:(userId:number)=>void;
}

const ChatSideBar:React.FC<ChatSideBarProps>=({jobSeekers,onChatSelect})=>{
 
    return(
        <div className="chat-sidebar">
             <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
            {jobSeekers.map((user)=>(
                  <p key={user.id} onClick={()=>onChatSelect(user.id)}>

                </p>

            ))}
          
          
          
        </div>
      </div>
        </div>
    )
}

export default ChatSideBar