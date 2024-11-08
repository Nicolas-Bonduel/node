import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import User from '../Repositories/user.repository.js'

export const auth = async(req, res, next) => {
    // get auth token
    let token = req.header('Authorization');
    if (!token)
        return res.status(401).json({ error: 'Unauthorized !' });

    // remove designation (if any)
    if (token.startsWith('Bearer '))
        token = token.substring('Bearer '.length);

    // verify token
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } 
    catch (err) { // invalid token
        return res.status(403).json({ error: 'Invalid token !' });
    }

    // get auth params
    try {
        req.userId = decoded.userId;
    }
    catch (err) { // messed up
        return res.status(500).json({ error: 'Internal Server Error ! (1)' });
    }

    let user;
    try {
        // get user
        user = await User.find(decoded.userId);
        if (! user) // not found (deleted ?)
            return res.status(401).json({ error: 'Unauthorized !' });
    }
    catch (err) { // messed up
        return res.status(500).json({ error: 'Internal Server Error ! (2)' });
    }
    
    // OK
    next();
};

export default auth;
