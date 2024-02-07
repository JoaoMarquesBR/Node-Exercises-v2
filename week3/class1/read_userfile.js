import { readFileFromFSPromise } from "./file_routines.js";

const readFileUser = async () => {
    try {
        let users = [];
        let rawData = await readFileFromFSPromise("users.txt")
        rawData
            .toString()
            .split("\r\n")
            .forEach(user => {
                if (user.length > 0) {
                    let userJson = { username: user, email: user + "@abc.com" }
                    users.push(userJson)
                }
            })
        
        users.forEach(user=> console.log(`user ==>${user.username}, email==>${user.email}`))
    } catch (error) {
        console.log(error)
    }
}

readFileUser();