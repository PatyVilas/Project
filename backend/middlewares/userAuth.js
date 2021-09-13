const jwt = require('jsonwebtoken');

const userAuth = async(req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            const error = new Error('Falta cabecera de autenticación');
            error.httpStatus = 401;
            throw error;
        }

        let tokenInfo;
        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (err) {
            const error = new Error('El token incorporado no es válido');
            error.httpStatus = 401;
            throw error;
        }
        req.userAuth = tokenInfo;
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = userAuth;