const faker = require('faker');

module.exports = {
  list: {
    id: () => faker.random.uuid(),
    totalItems: () => faker.random.number(),
    totalCost: 14.99,
    userId: () => faker.random.number(),
    customerMobile: () => faker.phone.phoneNumber(),
    storeId: (params, query) => query.store_id || faker.random.uuid(),
    deliveryMethod: ()=> faker.random.arrayElement(['STORE_PICKUP']),
    orderStatus: ()=> faker.random.arrayElement(['PROCESSING', 'FULFILLED']),
    placedTime: () => faker.date.recent(),
    timeCreated: () => faker.date.past(),
    transactionProvider: ()=> faker.random.arrayElement(['ALIPAY', 'WECHAT'])
  },
  detail: {
    "id": "test-order-id",
    "userId": "test-user-id",
    "storeId": "test-store-id",
    "deliveryMethod": null,
    "status": ()=> faker.random.arrayElement(['OPEN', 'PROCESSING', 'FULFILLED']),
    "placedTime": null,
    "timeCreated": 1484245460000,
    "transactionProvider": null,
    "customerMobile": "134567",
    "pickupCode": null,
    "note": null,
    "totalCost": 123.23,
    "items": [
      {
        "id": 1,
        "storeProductId": "test-store-product-id",
        "storeItemId": "test-store-item-id",
        "storeProductName": "storeProductName",
        "storeItemName": "storeItemName",
        "quantity": 5,
        "price": 1
      }
    ]
  }
};
