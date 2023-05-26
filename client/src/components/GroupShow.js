import React, { useState, useEffect } from "react"

const GroupShow = (props) => {
    const [groupShow, setGroupShow] = useState({
        id: "",
        groupName: "",
        notes: [],
    })

    const getGroup = async () => {
        const groupId = props.match.params.id
        try {
            const response = await fetch(`/api/v1/groups/${groupId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setGroupShow(body.group)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getGroup()
    }, [])

    const handleAddUser = async (event, userId) => {
        event.preventDefault()

        try {
            const groupId = groupShow.id
            const response = await fetch(`/api/v1/groups/${groupId}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            })
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error 
            }
            getGroup()
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    return (
        <div className="show-page">
            <h2 className="show-title">{groupShow.groupName}</h2>
            <h3>**Adding Users In Progress**</h3>
            <button onClick={handleAddUser}>Add User</button>
        </div>
    )
}

export default GroupShow