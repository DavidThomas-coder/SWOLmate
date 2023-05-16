import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const usersData = [
            {
                email: "kayleigh@kayleigh.com",
                firstName: "Kayleigh",
                password: "123",
                age: 30,
                pronouns: "she/her",
                cityNeighborhood: "Somerville",
                experienceLevel: "almost a year in"
            },
            {
                email: "ben@ben.com",
                firstName: "Ben",
                password: "123",
                age: 42,
                pronouns: "he/him",
                cityNeighborhood: "Cambridge",
                experienceLevel: "been lifting for two years"
            },
            {
                email: "ashley@ashley.com",
                firstName: "Ashley",
                password: "123",
                age: 41,
                pronouns: "she/her",
                cityNeighborhood: "Somerville",
                experienceLevel: "I'm about 1-2 years in"
            },
            {
                email: "conor@conor.com",
                firstName: "Conor",
                password: "123",
                age: 30,
                pronouns: "he/him",
                cityNeighborhood: "Dedham",
                experienceLevel: "I'm a big strong boy"
            },
            {
                email: "todd@todd.com",
                firstName: "Todd",
                password: "123",
                age: 36,
                pronouns: "he/him",
                cityNeighborhood: "Medfield",
                experienceLevel: "been runnin' my whole life.  from what, I dunno."
            }
        ]

        for (const singleUserData of usersData) {
            const currentUser = await User.query().findOne({email: singleUserData.email })
            if (!currentUser) {
                await User.query().insert(singleUserData)
            }
        }
    }
}

export default UserSeeder