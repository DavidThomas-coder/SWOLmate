import { Chat } from "../../models/index.js"

class ChatSeeder {
    static async seed() {
        // const chatsData = [
        //     {
        //         id: 2
        //     },
        //     {
        //         id: 3
        //     },
        //     {
        //         id: 4
        //     }
        // ]

        for (let i = 1; i < 5; i++) {
        await Chat.query().insert({})
        }

        // for (const singleChatData of chatsData) {
        //     const currentChat = await Chat.query().findOne({ id: singleChatData.id })
        //     if (!currentChat) {
        //         await Chat.query().insert(singleChatData)
        //     }
        // }
    }
}

export default ChatSeeder