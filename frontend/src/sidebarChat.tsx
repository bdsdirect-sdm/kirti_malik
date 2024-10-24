import React from "react";
import { MDBCard, MDBCardBody, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";

interface ChatSideBarProps {
    jobSeekers: any[];
    onChatSelect: (userId: string) => void;
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({ jobSeekers, onChatSelect }) => {
    return (
        <MDBCard className="chat-sidebar">
            <MDBCardBody>
                <h4 className="text-info text-center">Active Users</h4>
                <MDBListGroup>
                    {jobSeekers.map((user) => (
                        <MDBListGroupItem
                            key={user.id}
                            className="d-flex justify-content-between align-items-center"
                            onClick={() => onChatSelect(user.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <span>{user.firstName}</span>
                          
                        </MDBListGroupItem>
                    ))}
                </MDBListGroup>
            </MDBCardBody>
        </MDBCard>
    );
}

export default ChatSideBar;
