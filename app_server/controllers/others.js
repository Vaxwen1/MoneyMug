/* GET home page */
const about = function(req, res){
  res.render('about', {
    title: 'About MoneyMug',
    content: 'Money Mug is a web application developed as a university project by Vladislav Onishchenko. The idea was inspired by an adventurer who began living independently and realized that unplanned expenses, a huge pile of money began to disappear.This application aims to help users track their expenses across different categories and generate visual charts for better financial insight. Currently, the project consists of three pages, but limited time will not stop its creator from expanding and enhancing it in the future.'});
};

module.exports = {
  about
};