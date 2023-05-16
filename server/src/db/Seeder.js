/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import UserChatSeeder from "./seeders/UserChatSeeder.js"
import ChatSeeder from "./seeders/ChatSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding Users...")
    await UserSeeder.seed()
    
    console.log("Seeding Chats...")
    await ChatSeeder.seed()

    console.log("Seeding UserChats...")
    await UserChatSeeder.seed()

    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder