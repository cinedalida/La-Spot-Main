import connection from "../config/connectDB.js";

export function checkExistingEmail(email) {
    return new Promise((resolve, reject) => {
        console.log("checking email existence in the database");
        connection.query("SELECT email FROM user_information WHERE email = ?", [email], (error, data) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                let emailError = {}
                if (Object.keys(data) !== 0) {
                    console.log("email error exists")
                    resolve(emailError.exist = true);
                } else {
                    console.log("email error does not exist")
                    resolve(emailError.exist = false);
                }
            }
        })
    })
}