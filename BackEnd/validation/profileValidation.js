import connection from "../config/connectDB.js";

export function checkExistingEmail(email, ID) {
    return new Promise((resolve, reject) => {
        console.log("checking email existence in the database");
        connection.query("SELECT email, user_id FROM user_information WHERE email = ?", [email], (error, data) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                let emailError = {}
                console.log("checking data . userId", data[0]?.user_id)
                if (data[0]?.user_id === ID) {
                    resolve(emailError.exist = false);  
                } else {
                    console.log("email data checking plez",data)
                    if (Object.keys(data).length !== 0) {
                    console.log("email error exists")
                    resolve(emailError.exist = true);
                } else {
                    console.log("email error does not exist")
                    resolve(emailError.exist = false);
                }
                }

                
            }
        })
    })
}