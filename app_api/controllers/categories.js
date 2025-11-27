// ----------------------------- REQUIRE -----------------------------
const mongoose = require('mongoose');
const Category = require('../models/category');
const category = require('../models/category');


// ----------------------------- METHODS -----------------------------

 const categoryReadAll = function(req, res) {
  Category
    .find()
    .then(categories => {
      if (!categories) {
        return res
          .status(404)
          .json({ message: "Category not found" });
      }
      res
        .status(200)
        .json(categories);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error retrieving categories", error: err });
    });
};


const categoryReadOne = function (req, res) {
  if (req.params && req.params.categoryid) {
    Category
      .findById(req.params.categotyid)
      .then(category => {
        if (!category) {
          return res
            .status(404)
            .json({ message: "categoryid not found" });
        }
        res
          .status(200)
          .json(category);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Error retrieving category", error: err });
      });
  } else {
    res
      .status(400)
      .json({ message: "No categoryid in request" });
  }
};

const categoryCreate = function(req, res) {
  Category.create({
    categoryName: req.body.categoryName,
    categoryColor: req.body.categoryColor,
  })
  .then(category => {
    res
      .status(201)
      .json(category);
  })
  .catch(err => {
    res
      .status(400)
      .json({ message: "Error creating category", error: err });
  });
};


 
const categoryUpdateOne = function (req, res) {
    res
        .status(200)
        .json({ "status": "success"});
 };
const categoryDeleteOne = function (req, res) {
    res
        .status(200)
        .json({ "status": "success"});
 };




// ----------------------------- EXPORTS -----------------------------
module.exports = {
  categoryReadAll,
  categoryCreate,
  categoryReadOne,
  categoryUpdateOne,
  categoryDeleteOne
};
