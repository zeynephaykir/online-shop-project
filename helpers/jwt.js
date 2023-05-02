const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.secret;
    return jwt({
        secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
            { url: '/favicon.ico', methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
            "/api/v1/users/login",
            "/api/v1/users/register",
        ],
    });
}

async function isRevoked(req, token) {
    if (!token.payload.isAdmin) {
        return true;
    }

}

module.exports = authJwt;
