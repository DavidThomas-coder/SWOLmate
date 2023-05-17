import React, { useState, useEffect } from "react"

const ChatShow = (props) => {
    const [chatShow, setChatShow] = useState({
        id: "",
    })

    const getChat = async () => {
        const chatId = props.match.params.id
        try {
            const response = await fetch(`/api/v1/chats/${chatId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setChatShow(body.chat)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getChat()
    }, [])

    return (
        <p>Hey Chat Away Ya Goofs</p>
    )

}

export default ChatShow
