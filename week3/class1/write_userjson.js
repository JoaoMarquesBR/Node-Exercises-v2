import { readFileFromFSPromise, writeFileFromFSPromise } from "./file_routines.js";

const writeUserJson = async () => {
    try {
        let users = []
        let rawData = await readFileFromFSPromise("users.txt")
        
        rawData
            .toString()
            .split("\r\n")
            .forEach((user) => {
                if (user.length > 0) {
                    let userJson = {username: user,email: user + "@abc.com"}
                    users.push(userJson)
                }
            })
        console.log("x")
        users.forEach( (x)=> console.log(x))

        await writeFileFromFSPromise("users.json", users)
        console.log("user json file written to system")

    } catch (err) {
        console.log(err)
        console.log("user json not written to file system")
    }
}


writeUserJson()