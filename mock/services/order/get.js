const Order = require('./order');
const pagination = require('../pagination');

const TOTAL_COUNT = 51;

const orders = {
  path: '/desktop/staff/orders',
  collection: true,
  template: Order.list,
  size: pagination.getSize(TOTAL_COUNT),
  container: pagination.rich(TOTAL_COUNT)
};

const order = {
  path: '/desktop/staff/orders/:id',
  template: Order.detail
};

module.exports = [orders, order];
