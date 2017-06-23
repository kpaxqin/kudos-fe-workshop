const StoreProducts = require('./storeProduct');
const pagination = require('../pagination');

const TOTAL_COUNT = 51;

const storeProducts = {
  path: '/desktop/staff/store-products',
  collection: true,
  template: StoreProducts.list,
  size: pagination.getSize(TOTAL_COUNT),
  container: pagination.rich(TOTAL_COUNT)
};

module.exports = [storeProducts];
