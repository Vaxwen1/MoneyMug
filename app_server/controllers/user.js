/* GET home page */
const login = function (req, res) {
    res.render('login', {
        title: 'Login Page'});
};

module.exports = {
    login
};
