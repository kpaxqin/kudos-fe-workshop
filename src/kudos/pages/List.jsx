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


const connectListPage = ({ getListData }) => (Page) => {
  class ListPage extends Component {
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
      this.getList(this.props.location);
    }
    componentWillReceiveProps(nextProps) {
      this.getList(nextProps.location);
    }
    getList(location) {
      const { pageIndex = 1, ...searchParams } = parse(location.search);

      getListData({
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
      const { list } = this.state;
      const { pageIndex, ...searchParams } = parse(this.props.location.search);
      return (
        <Page
          list={list}
          searchParams={searchParams}
          searchListPage={this.handleSearch}
          selectPage={this.handleSelectPage}
        />
      );
    }
  }
  return ListPage;
};

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

const List = (props) => {
  const { list, searchParams, searchListPage, selectPage } = props;
  return (
    <div className="content">
      <SearchBar searchParams={searchParams} onSearch={searchListPage} />
      <ListTable
        columns={columns}
        list={list}
        onSelectPage={selectPage}
      />
    </div>
  );
};

const decorator = flowRight([
  withRedux(),
  layoutWrapper,
  connectListPage({
    getListData: listApi.getList,
  }),
  // connect(state => state),
]);

export default decorator(List);
