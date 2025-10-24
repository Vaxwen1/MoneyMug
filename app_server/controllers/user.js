/* GET home page */
const login = function (req, res) {
    res.render('login', {
        title: 'Login Page'});
};

const signup = function (req, res) {
    res.render('signup', {
        title: 'Sign Up Page'});
};


module.exports = {
    login,
    signup
};
