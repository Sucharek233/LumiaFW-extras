export function checkAdminKey(req, res, next) {
    const sentKey = req.headers.key;
    const expectedKey = process.env.DB_ACCESS;
    
    if (sentKey === expectedKey) {
        return next();
    } else {
        return res.status(403).json({error: "Admin is for me :)"});
    }
}