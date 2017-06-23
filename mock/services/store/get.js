const Store = require('./stores');
const pagination = require('../pagination');

const TOTAL_COUNT = 51;

const stores = {
  path: '/desktop/staff/stores/list/all',
  collection: true,
  template: Store.template,
  size: pagination.getSize(TOTAL_COUNT),
  container: pagination.rich(TOTAL_COUNT)
};

const store = {
  path: '/desktop/staff/stores/get/:id',
  template: Object.assign(
    {},
    Store.template,
    {
      id: function(params) {
        return params.id;
      },
    })
};

module.exports = [stores, store];
