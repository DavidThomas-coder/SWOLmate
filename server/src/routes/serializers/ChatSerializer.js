import MessageSerializer from "./MessageSerializer.js"

class ChatSerializer {
    static async showChatDetails(chat, currentUser) {
        const allowedAttributes = ["id"]
        const serializedChat = {}
        for (const attribute of allowedAttributes) {
            serializedChat[attribute] = chat[attribute]
        }
        const relatedMessages = await chat.$relatedQuery("messages")
        const serializedMessages = relatedMessages.map((message) => 
            MessageSerializer.showMessageDetails(message)
        )
        serializedChat.messages = serializedMessages

        const relatedUsers = await chat.$relatedQuery("users")
        
        relatedUsers.forEach((relatedUser) => {
            if (relatedUser.id !== currentUser.id) {
                serializedChat.title = relatedUser.firstName
                serializedChat.otherUser = relatedUser
            }
        })


        return serializedChat
    }
}

export default ChatSerializer
