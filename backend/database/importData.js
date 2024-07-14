const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
const OrderItem = require('../models/order-item');
const Category = require('../models/category');

async function importData() {
  try {
    const categoriesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf-8'));
    const ordersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'orders.json'), 'utf-8'));
    const orderItemsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'order-items.json'), 'utf-8'));
    const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8'));
    let usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));

    // Hashear las contraseñas
    usersData = await Promise.all(usersData.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(user.password, salt);
      delete user.password;  // Eliminar el campo de texto plano
      return user;
    }));

    await Category.insertMany(categoriesData);
    await Product.insertMany(productsData);
    const insertedUsers = await User.insertMany(usersData);
    const insertedOrderItems = await OrderItem.insertMany(orderItemsData);

    const ordersWithItems = ordersData.map(order => {
      order.orderItems = order.orderItems.map((item, index) => insertedOrderItems[index]._id);
      return order;
    });

    await Order.insertMany(ordersWithItems);

    console.log('Data imported successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

module.exports = importData;
