import jwt from 'jsonwebtoken';

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export function generateToken(_username) {
    return jwt.sign( {username: _username}, SECRET );
}

function readToken(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch (err) {
        throw new ('Invalid Token');
    }
}

export function checkToken(token) {
    return readToken(token);
}
