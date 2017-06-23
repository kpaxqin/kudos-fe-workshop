const batchUtils = require('../batch');

const batchUpdate = {
  path: '/desktop/staff/store-products',
  method: 'PUT',
  callback: function(req, res, next) {

    const commands = req.body.commands;
    const result = batchUtils.buildBatchResponse(commands, (cmd, index)=> index > 2);

    res.send(JSON.stringify(result));
    next();
  }
};

module.exports = batchUpdate;

