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

    return (
        <div className="show-page">
            <h2 className="show-title">{groupShow.groupName}</h2>
        </div>
    )
}

export default GroupShow