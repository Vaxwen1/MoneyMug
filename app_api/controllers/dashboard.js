// ----------------------------- REQUIRE -----------------------------
const mongoose = require('mongoose');
const Category = require('../models/category');
const Transaction = require('../models/transaction');

// ----------------------------- METHODS -----------------------------
// const dashboard = function (req, res) {
//     res
//         .status(200)
//         .json({ "status": "success"});
//  };

//  const dashboard = function(req, res) {
//   Category
//     .find()
//     .then(categories => {
//       if (!categories) {
//         return res
//           .status(404)
//           .json({ message: "Category not found" });
//       }
//       res
//         .status(200)
//         .json(categories);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ message: "Error retrieving categories", error: err });
//     });
// };


// ----------------------------- EXPORTS -----------------------------

module.exports =
{
    dashboard,
};