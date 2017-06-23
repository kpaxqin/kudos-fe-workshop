const createStore = {
  path: '/desktop/staff/stores/create',
  method: 'POST',
  callback: function(req, res, next) {
    res.status(201).send();
    next();
  }
};

module.exports = createStore;
