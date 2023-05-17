import MessageSerializer from "./MessageSerializer.js"

class ChatSerializer {
    static async showChatDetails(chat) {
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
        return serializedChat
    }
}

export default ChatSerializer