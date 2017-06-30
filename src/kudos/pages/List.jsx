import React, { Component } from 'react';
import { flowRight } from 'lodash';
import { withRedux } from '../../shared/redux';
import { layoutWrapper } from '../../shared/dashboard';
import ListTable from '../components/ListTable';
import listApi from '../../shared/api/list';

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

class List extends Component {
  constructor() {
    super();

    this.state = {
      list: {
        totalCount: 0,
        pageIndex: 1,
        pageSize: 10,
        items: [],
      },
    };
  }
  componentDidMount() {
    this.getList(1);
  }
  getList(pageIndex, query) {
    listApi.getList({
      ...query,
      pageIndex,
    }).then(list => this.setState({ list }));
  }
  handleSelectPage = (nextPageIndex) => {
    this.getList(nextPageIndex);
  }
  render() {
    const { list } = this.state;
    return (
      <ListTable
        columns={columns}
        list={list}
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
