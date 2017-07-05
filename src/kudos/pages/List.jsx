import React, { Component } from 'react';
import { flowRight } from 'lodash';
import { parse } from 'query-string';
import { withRedux } from '../../shared/redux';
import { layoutWrapper } from '../../shared/dashboard';
import ListTable from '../components/ListTable';
import SearchBar from '../components/SearchBar';
import listApi from '../../shared/api/list';
import makePath from '../../shared/utils/makePath';
import history from '../../history';

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
    this.getList(this.props.location);
  }
  componentWillReceiveProps(nextProps) {
    this.getList(nextProps.location);
  }
  getList(location) {
    const { pageIndex = 1, ...searchParams } = parse(location.search);

    listApi.getList({
      ...searchParams,
      pageIndex,
    }).then(list => this.setState({ list }));
  }
  changeUrlQuery(nextQuery, isOverride) {
    const { location: { pathname, search } } = this.props;
    const currentQuery = parse(search);
    const nextPath = makePath(
      pathname,
      undefined,
      isOverride ? nextQuery : { ...currentQuery, ...nextQuery },
    );
    history.push(nextPath);
  }
  handleSelectPage = (nextPageIndex) => {
    this.changeUrlQuery({
      pageIndex: nextPageIndex,
    });
  }
  handleSearch = (search) => {
    this.changeUrlQuery({
      ...search,
      pageIndex: 1,
    }, true);
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
