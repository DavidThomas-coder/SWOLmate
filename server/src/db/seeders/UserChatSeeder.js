import { UserChat, User } from "../../models/index.js";

class UserChatSeeder {
    static async seed() {
        const user2 = await User.query().findOne({ email: "conor@conor.com" })
        const user3 = await User.query().findOne({ email: "kayleigh@kayleigh.com" })
        const user4 = await User.query().findOne({ email: "ben@ben.com" })
        
        
        const userChatsData = [
            {
                userId: user2.id,
                chatId: 2
            },
            {
                userId: user3.id,
                chatId: 2
            },
            {
                userId: user4.id,
                chatId: 4
            }
        ]

        for (const singleUserChatData of userChatsData) {
            const currentUserChat = await UserChat.query().findOne({ userId: singleUserChatData.userId, chatId: singleUserChatData.chatId })
            if (!currentUserChat) {
                await UserChat.query().insert(singleUserChatData)
            }
        }

        // for (const singleUserChatData of userChatsData) {
        //     const currentUserChat = await UserChat.query().findOne(singleUserChatData).skipUndefined()
        //     if (!currentUserChat) {
        //         await UserChat.query().insert(singleUserChatData)
        //     }
        // }
    }
}

export default UserChatSeeder