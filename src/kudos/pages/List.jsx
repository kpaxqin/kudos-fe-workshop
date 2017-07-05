import React, { Component } from 'react';
import { flowRight } from 'lodash';
import { parse } from 'query-string';
import { withRedux } from '../../shared/redux';
import { layoutWrapper } from '../../shared/dashboard';
import ListTable from '../components/ListTable';
import SearchBar from '../components/SearchBar';
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
      searchParams: {
        name: '',
      },
    };
  }
  componentDidMount() {
    const { pageIndex, ...searchParams } = parse(this.props.location.search);
    this.getList(pageIndex, searchParams);
  }
  getList(pageIndex = 1, searchParams) {
    listApi.getList({
      ...searchParams,
      pageIndex,
    }).then(list => this.setState({ list }));
  }
  handleSelectPage = (nextPageIndex) => {
    this.getList(nextPageIndex, this.state.searchParams);
  }
  handleSearch = (search) => {
    this.setState({
      searchParams: search, 
    }, ()=> this.getList(1, search));
  }
  render() {
    const { list, searchParams } = this.state;
    return (
      <div className="content">
        <SearchBar searchParams={searchParams} onSearch={this.handleSearch} />
        <ListTable
          columns={columns}
          list={list}
          onSelectPage={this.handleSelectPage}
        />
      </div>
    );
  }
}

const decorator = flowRight([
  withRedux(),
  layoutWrapper,
  // connect(state => state),
]);

export default decorator(List);
