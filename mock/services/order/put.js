const markFulfilled = {
  path: '/desktop/staff/orders',
  method: 'PUT',
  render: function(req, res, next) {
    const commands = req.body.commands;
    const resBody = {"successOrderIds":[], "updateErrors":[]}

    if (commands.length > 3) {
      resBody.updateErrors = commands.slice(0, 2).map(cmd=> ({errorCode: '000', id: cmd.orderId}));
      resBody.successOrderIds = commands.slice(2, commands.length).map(cmd=> cmd.orderId);
    } else {
      resBody.updateErrors = [];
      resBody.successOrderIds = commands.map(cmd=> cmd.orderId);
    }
    console.log(resBody);
    res.send(JSON.stringify(resBody))
    next();
  }
};

module.exports = markFulfilled;
