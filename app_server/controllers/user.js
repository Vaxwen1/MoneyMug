/* GET home page */
const login = function (req, res) {
    res.render('login', {
        title: 'Login Page'});
};

const signup = function (req, res) {
    res.render('signup', {
        title: 'Sighn Up Page'});
};


module.exports = {
    login,
    signup
};
