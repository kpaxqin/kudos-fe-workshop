const faker = require('faker');

module.exports = {
  template: {
    id: () => faker.random.uuid(),
    name: () => faker.company.companyName(),
    shopTime: '08:00',
    closingTime: '22:00',
    province: {
      id: 110000,
      language: 'mainland',
      parentId: 0,
      path: ',110000',
      grade: 1,
      name: '北京',
      nameEn: 'beijing',
    },
    city: {
      id: 110100,
      language: 'mainland',
      parentId: 110000,
      path: ',110000,110100',
      grade: 2,
      name: '北京市',
      nameEn: 'beijingshi',
    },
    district: {
      id: 110101,
      language: 'mainland',
      parentId: 110100,
      path: ',110000,110100,110101',
      grade: 3,
      name: '东城区',
      nameEn: 'dongchengqu'
    },
    address: () => faker.address.streetAddress(),
    longitude: () => parseFloat(faker.address.longitude()),
    latitude: () => parseFloat(faker.address.latitude()),
    contactNumber: () => faker.phone.phoneNumberFormat(),
    status: 'DISABLED',
    timeCreated: () => +faker.date.past(),
  }
};
