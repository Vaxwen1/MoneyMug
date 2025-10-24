const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true
  },
  categoryColor: {
    type: String,
    required: true,
    match: /^#([0-9A-F]{3}){1,2}$/i
  }
},{ collection: 'category' });

module.exports = mongoose.model('Category', categorySchema);
