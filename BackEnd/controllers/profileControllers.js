import connection from "../config/connectDB.js"


export const userProfileData = (req, res) => {
    const { username } = req.params;

    const sqlQeuryUserProfile = `SELECT user_information.user_id, user_information.account_type, CONCAT(user_information.first_name, " ", user_information.last_name) as full_name, user_information.first_name, user_information.last_name, user_information.email, user_information.account_password, vehicle.vehicle_plate, vehicle.vehicle_type
    FROM user_information
    LEFT JOIN vehicle ON user_information.user_id = vehicle.user_id
    WHERE email =  ?`

    connection.query(sqlQeuryUserProfile, [username], (err, profileData) => {
        if (err) {
            return res.status(500).json({isValid: false, message: "Database query failed"})
        }
            

        console.log(profileData);
        res.json(profileData)


    })
}

export const updateProfileData = (req, res) => {
    const { first_name, last_name, email, username} = req.body
    const { field } = req.params

    console.log(field);
    console.log(first_name, last_name, email, username);

    if (field === "personal") {

        // const isEmailValid = validation

        const sqlQueryUpdatePersonalProfile = `UPDATE user_information
        SET first_name = ?, last_name = ?, email = ?
        WHERE email = ?`
        connection.query(sqlQueryUpdatePersonalProfile, [first_name, last_name, email, username], (err, data) => {
            if (err){
                return res.status(500).json({isValid: false, message: "Database query failed"})
            } else {
                console.log(data);
                res.json({isValid: true, message: "Profile Personal Data successfully updated"})
            }
            
        })
    }


}