export const isAthenticated = (req, res, next) => {
    if (req.session.user) {
        
        return next();
    }
    res.redirect('https://localhost:3001/login');
}