import React, { Component } from 'react';
import { flowRight } from 'lodash';
import { withRedux } from '../../shared/redux';
import { layoutWrapper } from '../../shared/dashboard';
import ListTable from '../components/ListTable';

const columns = [
  {
    key: 'name',
  },
  {
    key: 'role',
  },
  {
    key: 'address',
  },
];

const datas = {
  totalCount: 49,
  pageSize: 10,
  pageIndex: 1,
  items: [
    {
      id: '0ec8a9b6-2640-4ca4-87e3-a25d80fb2a4d',
      name: 'asdf Lazaro Schmeler',
      role: 'ADMIN',
      address: '925 Nina Park',
    },
    {
      id: '53ce571c-deff-4545-bb3d-9675cdf9d503',
      name: 'asdf Clement Upton',
      role: 'ADMIN',
      address: '6910 Jast Vista',
    },
    {
      id: '21f67014-51df-4ed7-85c5-e94dbd36d61e',
      name: 'asdf Mary Bernier',
      role: 'ADMIN',
      address: '563 Nikita Drive',
    },
    {
      id: '1f128279-aafe-463a-aa2b-52dc1b7c6c5b',
      name: 'asdf Camron DuBuque',
      role: 'ADMIN',
      address: '860 Bernier Way',
    },
    {
      id: 'd9add5ff-b0c5-48df-a4df-725239134016',
      name: 'asdf Jerome Hagenes',
      role: 'ADMIN',
      address: '200 Mayert Brook',
    },
    {
      id: 'fa80fd02-ebef-4d5f-b2ee-81dfaba72d6d',
      name: 'asdf Victor Borer',
      role: 'ADMIN',
      address: '034 Jessyca Forges',
    },
    {
      id: '438d91db-0f5b-4096-9064-c267d34b88b0',
      name: 'asdf Ephraim Torp',
      role: 'ADMIN',
      address: '21709 Antonina Streets',
    },
    {
      id: '33531c36-030e-44e7-9bc1-7f63182b4c70',
      name: 'asdf Ollie Sawayn',
      role: 'ADMIN',
      address: '732 Lonie Tunnel',
    },
    {
      id: '22d3080c-dfc3-4b25-83b4-7656ca72a20b',
      name: 'asdf Asa Mertz',
      role: 'ADMIN',
      address: '881 McLaughlin Walk',
    },
    {
      id: 'ce296d98-cd66-4879-8f95-058f8917e847',
      name: 'asdf Sigmund Schowalter',
      role: 'ADMIN',
      address: '5222 Luettgen Overpass',
    },
  ],
};

class List extends Component {
  handleSelectPage = (nextPageIndex) => {
    console.log(nextPageIndex);
  }
  render() {
    return (
      <ListTable
        columns={columns}
        list={datas}
        onSelectPage={this.handleSelectPage}
      />
    );
  }
}

const decorator = flowRight([
  withRedux(),
  layoutWrapper,
  // connect(state => state),
]);

export default decorator(List);
