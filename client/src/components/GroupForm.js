import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const GroupForm = (props) => {
    const [newGroup, setNewGroup] = useState({
        groupName:"",
    })
    const [errors, setErrors] = useState({})
    const [redirect, setRedirect] = useState(false)
    const [groups, setGroups] = useState([])
    const [groupId, setGroupId] = useState(null)

    const fetchGroups = async () => {
        try {
            const response = await fetch("/api/v1/groups")
            if (response.ok) {
                const data = await response.json()
                setGroups(data.groups)
            } else {
                console.error("Failed to fetch groups:", response.statusText)
            }
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    const handleGroupChange = (event) => {
        setNewGroup({
            ...newGroup,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    const handleGroupSubmit = async (event) => {
        event.preventDefault();
    
        try {

            const response = await fetch('/api/v1/groups', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ groupName: newGroup.groupName }),
            });
    
            if (response.ok) {
                const body = await response.json();
                const { id} = body.group
                setGroupId(id)
                setRedirect(true)
            } else {
                console.log("Failed to add group:", response.statusText);
            }
        } catch (error) {
            console.log("Error in fetch:", error.message);
        }
    }
    

    return (
        <div className="GroupForm-wrapper">
            <form onSubmit={handleGroupSubmit} className="GroupForm">
                <label>
                    Why Settle For Just One SWOLmate?
                </label>
                <label>
                    Name Your Group Here:
                    <input
                        type="text"
                        name="groupName"
                        value={newGroup.groupName}
                        onChange={handleGroupChange}
                    />
                </label>
                {errors.groupName && <div className="error">{errors.groupName}</div>}
                <button type="submit" className="message-btn">
                    submit
                </button>
                {redirect && groupId && (
                    <Redirect to={`/groups/${groupId}`} /> // Redirect only when redirect is true and groupId is defined
                )}
                </form>
        </div>
    )
}

export default GroupForm