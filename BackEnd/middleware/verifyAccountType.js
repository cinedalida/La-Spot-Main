
export const verifyAccountType = (...allowedAccountType) => {
    return (req, res, next) => {
        if (!req?.accountType) return res.sendStatus(401); //Unauthorized
        const accountTypeArrays = [...allowedAccountType];
        console.log(accountTypeArrays);
        console.log(req.accountType);
        // const result = req.accountType.map(type => typeArray.includes(type)).find(val => val === true);
        const result = accountTypeArrays.includes(req.accountType)
        if (!result) return res.sendStatus(401); //Unauthorized
        next()
    }
}