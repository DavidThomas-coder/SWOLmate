import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Dropzone from "react-dropzone"
import ProfileImage from "./ProfileImage";

const UserProfile = ({ user }) => {
    const [userChats, setUserChats] = useState([])
    const [userOwnedGroups, setUserOwnedGroups] = useState([])
    const [userMemberGroups, setUserMemberGroups] = useState([])

    const getUserChats = async () => {
        try {
            const response = await fetch(`/api/v1/chats`);
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            const chatBody = await response.json();
            // console.log(chatBody); // Add this console log
            setUserChats(chatBody.chats);
            } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };      

    const getUserGroups = async (userId) => {
        try {
            const response = await fetch(`/api/v1/users/${userId}/groups`);
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                throw new Error(errorMessage);
            }
            const groupBody = await response.json();
            console.log("groupBody:", groupBody);
            const { ownedGroups, memberGroups } = groupBody;
            console.log("ownedGroups:", ownedGroups);
            console.log("memberGroups:", memberGroups);
            setUserOwnedGroups(ownedGroups);
            setUserMemberGroups(memberGroups);
            } catch (error) {
            console.error(`Error in fetch: ${error.message}`);    
        }
    }

    useEffect(() => {
        getUserChats()
        getUserGroups(user.id) // pass user.id as argument
    }, [user.id])    

    const chatsArray = userChats.map((chat) => {
        return (
            <div key={chat.id} className="chat-item">
                <Link to={`/chats/${chat.id}`}>{chat.title}</Link>
            </div>
        );
    });      

    const ownedGroupsArray = Array.isArray(userOwnedGroups)
    ? userOwnedGroups.map((group) => (
        <div key={group.id} className="group-item">
          <Link to={`/groups/${group.id}`}>{group.groupName}</Link>
        </div>
      ))
    : [];

  const memberGroupsArray = Array.isArray(userMemberGroups)
    ? userMemberGroups.map((group) => (
        <div key={group.id} className="group-item">
          <Link to={`/groups/${group.id}`}>{group.groupName}</Link>
        </div>
      ))
    : [];


    return (
        <div className="userProfile">
            <div className="cell small-12 grid-x align-center">
                <div className="cell small-6">
                    <img src="https://i.imgur.com/UJV9S9n.png" alt="swolmate info" />
                </div>
            </div>
            <div className="homepage-googlemap-section">
            <div class="grid-x">
            <div class="cell medium-6">
                <div class="profile-box cell rounded-corner">
                <ProfileImage class="profile-picture" />
                </div>
            </div>
            <div class="cell medium-6">
                <div class="profile-info">
                <p>Your Name: {user.firstName}</p>
                <p>Your Email: {user.email}</p>
                <p>Your Age: {user.age}</p>
                <p>Your Pronouns: {user.pronouns}</p>
                <p>Your City/Neighborhood: {user.cityNeighborhood}</p>
                <p>Your State: {user.state}</p>
                <p>Your Experience Level: {user.experienceLevel}</p>
                <div class="user-image">
                    <img src={user.imageUrl || "https://i.imgur.com/cFrP4WI.png"} alt="Profile" />
                </div>
                </div>
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
        <h2>Your Created Groups:</h2>
        <div>{ownedGroupsArray}</div>
      </div>
      <div className="group-list">
        <h2>Your Member Groups:</h2>
        <div>{memberGroupsArray}</div>
      </div>
    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile