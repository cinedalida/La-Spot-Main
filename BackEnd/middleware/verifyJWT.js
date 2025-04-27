import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    // console.log(authHeader); //Beared token

    const token = authHeader.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {;
            if (err) return res.sendStatus(403); //Forbidden (Invalid token)
            console.log("Decoded JWT:", decoded);
            req.user = decoded.email;
            //  also include the type of account
            next();
        }
    )
}