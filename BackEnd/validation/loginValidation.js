import connection from "../config/connectDB.js";

export function checkExistingEmail(email) {
    return new Promise ((resolve, reject) => {
        const querySQL = `SELECT email
        FROM user_information
        WHERE email = ?`

        connection.query(querySQL, [email], (error, result) => {
            if (error) {
                console.log(error);
                return reject(error);
            }
            
            
            if (Object.keys(result).length === 0) {
                resolve({exist: true})
            } else {
                resolve({exist: false});
            }
        })
    })
}