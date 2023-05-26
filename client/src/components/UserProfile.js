import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Dropzone from "react-dropzone"
import ProfileImage from "./ProfileImage";

const UserProfile = ({ user }) => {
    const [userChats, setUserChats] = useState([])
    const [userGroups, setUserGroups] = useState([])

    const getUserChats = async () => {
        try {
        const response = await fetch(`/api/v1/chats`);
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
        }
        const chatBody = await response.json();
        setUserChats(chatBody.chats);
        } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
        }
    };

    const getUserGroups = async () => {
        try {
            const response = await fetch(`/api/v1/groups`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const groupBody = await response.json()
            setUserGroups(groupBody.groups)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getUserChats()
        getUserGroups()
    }, [])

    const chatsArray = userChats.map((chat) => {
        return (
        <div key={chat.id}className="chat-item">
            <Link to={`/chats/${chat.id}`}>{chat.title}</Link>
        </div>
        )
    })

    const groupsArray = userGroups.map((group) => {
        return (
            <div key={group.id}className="group-item">
                <Link to={`/groups/${group.id}`}>{group.groupName}</Link>
            </div>
        )
    })

    return (
        <div className="userProfile">
            <h1>Welcome to SWOLmate!</h1>
            <div className="grid-x">
                <div className="cell medium-6">
                    <div className="profile-box cell rounded-corner">
                        <ProfileImage className="profile-picture" />
                    </div>
                </div>
                <div className="cell medium-6 profile-info">
                    <p>Your Name: {user.firstName}</p>
                    <p>Your Email: {user.email}</p>
                    <p>Your Age: {user.age}</p>
                    <p>Your Pronouns: {user.pronouns}</p>
                    <p>Your City/Neighborhood: {user.cityNeighborhood}</p>
                    <p>Your State: {user.state}</p>
                    <p>Your Experience Level: {user.experienceLevel}</p>
                </div>
            </div>
            <div className="grid-container">
                <div className="grid-x grid-margin-x align-center">
                    <div className="cell medium-6">
                        <div className="chat-list">
                            <h2>Your Chats:</h2>
                            <div>
                                {chatsArray}
                            </div>
                        </div>
                    </div>
                    <div className="cell medium-6">
                        <div className="group-list">
                            <h2>Your Groups:</h2>
                            <div className="grid-x small-up-1 medium-up-3">
                                {groupsArray}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile