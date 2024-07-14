const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  color: String,
  icon: String,
  image: String,
});

categorySchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;