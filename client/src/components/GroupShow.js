import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GroupShow = (props) => {
    const [groupShow, setGroupShow] = useState({
        id: "",
        groupName: "",
        notes: [],
        users: [],
    });
    const [userChats, setUserChats] = useState([]);
    const [groupUsers, setGroupUsers] = useState([]);

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

    const getGroupUsers = async (groupId) => {
        try {
            const response = await fetch(`/api/v1/groups/${groupId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log("groupUsers data:", data)
            const { group } = data; // Extract the users array
            setGroupUsers(group.users); // Set the users array in the state
            } catch (error) {
            console.error("Error fetching group users:", error.message);
        }
    };      

    const getGroup = async () => {
        const groupId = props.match.params.id;
        console.log("GROUPID:", groupId)
        try {
        const response = await fetch(`/api/v1/groups/${groupId}`);
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log("data:", data);
        const { group } = data;

        // Set the group in the state
        setGroupShow(group);

        // Fetch the group users
        getGroupUsers(groupId);
        } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
        }
    };

    useEffect(() => {
        getUserChats();
        getGroup();
    }, []);

    console.log("groupShow:", groupShow);
    console.log("groupUsers:", groupUsers);

    const handleAddUser = async (event, userId) => {
        event.preventDefault();

        try {
        const groupId = groupShow.id;

        const response = await fetch(`/api/v1/groups/${groupId}/users`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ groupId, userId }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Assuming the response contains the updated group information
        const data = await response.json();
        console.log("data:", data);
        const updatedGroup = data.group;

        // Update state
        setGroupShow(updatedGroup);

        // Show a message or error
        console.log("User added to group successfully!");
        } catch (error) {
        console.error("Error adding user:", error.message);
        }
    };

    const chatsArray = userChats
    .filter(
        (chat) =>
            chat.otherUser.id !== props.user.id &&
            !groupUsers.find((user) => user.id === chat.otherUser.id)
    )
    .map((chat) => (
        <div key={chat.id} className="chat-item">
            <Link to={`/chats/${chat.id}`}>{chat.title}</Link>
            <button
                onClick={(event) => handleAddUser(event, chat.otherUser.id)}
                className="invite-button"
            >
                Invite
            </button>
        </div>
    ));

    console.log("groupShow:", groupShow);
    console.log("groupShow.ownerId:", groupShow.ownerId);
    console.log("props.user.id:", props.user.id);
    console.log("Evaluation result:", groupShow.ownerId === props.user.id);

    console.log(typeof groupShow.ownerId); // should be "number"
    console.log(typeof props.user.id);    // should be "number"


    
    return (
        <div className="show-page">
            <h2 className="show-title">{groupShow?.groupName || "Loading..."}</h2>
            {groupShow.ownerId === props.user.id ? (
            <div className="owner-invite">
                <h3>Add A User You've Connected With:</h3>
                {chatsArray}
            </div>
            ) : null}
            {groupUsers && (
            <div className="group-users">
                <h2>Group Users:</h2>
                <ul>
                {groupUsers.map((user) => (
                    <li key={user.id}>{user.firstName}</li>
                ))}
                </ul>
            </div>
            )}
        </div>
    );
    

    
};

export default GroupShow;
