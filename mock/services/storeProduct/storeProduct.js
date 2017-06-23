const faker = require('faker');

module.exports = {
  list: {
    "id": () => faker.random.uuid(),
    "productId": () => faker.random.uuid(),
    "categoryId": () => faker.random.uuid(),
    "storeId": "test-store-id",
    "name": "Product_50",
    "description": "product description",
    "thumbnail": "thumbnail",
    "items": [{
      "id": "5156e171-510a-4922-8c9d-24644ed50420",
      "storeProductId": "31bb4bf1-e87e-4960-8349-e3a98db0dec1",
      "itemId": "76b0885e-2be2-459a-82eb-bd588a24d803",
      "storeId": "test-store-id",
      "quantity": 0,
      "price": 0,
      "timeCreated": 1493275776000,
      "optionPairs": [{"valueId": "69087039-1acc-46db-a916-4b7d71e30d54", "name": "colour", "value": "Red"}]
    }, {
      "id": "716c114b-50ee-4b40-9117-71c0d5798841",
      "storeProductId": "31bb4bf1-e87e-4960-8349-e3a98db0dec1",
      "itemId": "454c319f-fefd-40e6-abf2-cb2bb2ccfbd8",
      "storeId": "test-store-id",
      "quantity": 0,
      "price": 0,
      "timeCreated": 1493275776000,
      "optionPairs": [{"valueId": "e39873b0-48fd-435b-a328-925955c51db6", "name": "colour", "value": "Yellow"}]
    }, {
      "id": "a75f531d-bf2f-4f70-83c1-9d5b6745e6f8",
      "storeProductId": "31bb4bf1-e87e-4960-8349-e3a98db0dec1",
      "itemId": "c30178ab-059e-4d28-b89a-2a11304b5095",
      "storeId": "test-store-id",
      "quantity": 0,
      "price": 0,
      "timeCreated": 1493275776000,
      "optionPairs": [{"valueId": "94e015f2-ef34-4cac-afd7-cff2e0f81171", "name": "colour", "value": "White"}]
    }, {
      "id": "cc031407-8804-4927-8b1f-7927ce46da04",
      "storeProductId": "31bb4bf1-e87e-4960-8349-e3a98db0dec1",
      "itemId": "3e6079b3-faa8-4a78-ba70-c14b09801bca",
      "storeId": "test-store-id",
      "quantity": 0,
      "price": 0,
      "timeCreated": 1493275776000,
      "optionPairs": [{"valueId": "0487511c-6f20-4f7b-b539-f39d9cc4aa1d", "name": "colour", "value": "Blue"}]
    }],
    "status": ()=> faker.random.arrayElement(['INACTIVE', 'ACTIVE']),
    "timeCreated": 1493275776000,
    "categoryName": "Category_42"
  }
};
