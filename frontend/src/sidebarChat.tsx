import React from "react";

interface ChatSideBarProps{
    jobSeekers:any[];
}

const ChatSideBar:React.FC<ChatSideBarProps>=({jobSeekers})=>{
 
    return(
        <div className="chat-sidebar">
             <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          
          
        </div>
      </div>
        </div>
    )
}

export default ChatSideBar