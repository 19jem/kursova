import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authoeization");

        if (!token) {
            return res.status(403).send("Відмовлено в доступі");
        }

        if (token.startWith("Bearer ")) {
            token = token.slice(7, token.lenth).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        next();
    }
    catch (err) {
        res.status(500).json({ error: err.message});
    }
}