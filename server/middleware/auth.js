const jwt = require('jsonwebtoken')
const User = require('../models/User')

// const auth = async (req, res, next) => {
//     try {
//         // const token = req.header('Authorization').replace('Bearer ','')
//         const token = req.cookies.authToken
//         console.log(token)
//         const decoded = jwt.verify(token, 'socialnetworking')
//         const user = await User.findOne({_id: decoded._id, 'tokens.token' : token})
//         if(!user) {
//             throw new Error()
//         }
//         req.token = token
//         req.user = user
//         next()
//     } catch(e) {
//         res.status(401).send({error: 'Please authenticate'})
//     }
// }

// module.exports = auth

// import jwt from 'jsonwebtoken'


const auth = async(req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1]

        const isCustomAuth = token.length < 500

        let decodedData

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test')
            console.log(decodedData)
            const user = await User.findById(decodedData.id)
            if(!user) {
                throw new Error()
            }

            req.token = token
            req.user = user

        } else {
            decodedData = jwt.decode(token)

            req.userId = decodedData.sub;
        }

        next();
    } catch (error) {
        console.error(error)

        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth