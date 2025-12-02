const mongoose = require('mongoose');

let dbURI = 'mongodb+srv://admin_izzy:UVYMnx5I5pMl5pfw@moneymug.nsmdvxq.mongodb.net/moneymug';
try {
   
mongoose.connect(dbURI).then(
    () => {console.log(" Mongoose is connected")},
	err=> {console.log(err)}
	);
}
 catch (e) {
  console.log("could not connect");
}

require('./transaction');
require('./category');
require('./budget');
require('./user');
