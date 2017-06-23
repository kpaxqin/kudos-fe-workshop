const faker = require('faker');

const isManager = accountId => accountId === 'manager_id';

const signIn = {
  path: '/desktop/staff/sign-in',
  method: 'POST',
  template: {
    token: faker.random.uuid(),
    staff: function(params, query, body) {
      return {
        name: faker.name.findName(),
        authorizations: [
          {
            organization: {
              id: 'test-organ-id',
              storeId: 'test-store-id',
              storeName: 'enabled store',
              type: 'STORE',
            },
            role: {
              name: 'mock_admin',
              permissions: [{
                permissionType: isManager(body.accountId) ? 'MANAGER' : 'ADMIN',
              }]
            }
          }
        ],
      }
    },
  },
  render: function(req, res, next) {
    if (req.body.accountId === 'NULL') {
      res.sendStatus(401);
    } else {
      res.send(res.body);
    }
    next();
  }
};

module.exports = signIn;
