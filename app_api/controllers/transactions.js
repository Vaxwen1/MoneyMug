// ----------------------------- REQUIRE -----------------------------
const mongoose = require('mongoose');
const Transaction = require('../models/transaction');

// ----------------------------- METHODS -----------------------------
const transactionsCreate = function (req, res) {
    res
        .status(200)
        .json({ "status": "success"});
 };
const transactionListByRicentDate = function (req, res) {
    res
        .status(200)
        .json({ "status": "success"});
 };
const transactionsReadOne = function (req, res) {
    res
        .status(200)
        .json({ "status": "success"});
 };
const transactionsUpdateOne = function (req, res) {
    res
        .status(200)
        .json({ "status": "success"});
 };
const transactionsDeleteOne = function (req, res) {
    res
        .status(200)
        .json({ "status": "success"});
 };



// ----------------------------- EXPORTS -----------------------------

module.exports = {
    transactionsCreate,
    transactionListByRicentDate,
    transactionsReadOne,
    transactionsUpdateOne,
    transactionsDeleteOne
};

