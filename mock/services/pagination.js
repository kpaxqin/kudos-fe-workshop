module.exports = {
  getSize: function(totalCount) {
    return function(params, query) {
      const pageSize = parseInt(query['page_size']);
      const pageIndex = parseInt(query['page_index']);
      const lastPage = function() {
        return ((pageIndex + 1) * pageSize) >= totalCount;
      };

      if (lastPage()) {
        return totalCount % pageSize === 0 ? pageSize : totalCount % pageSize;
      } else {
        return pageSize;
      }
    }
  },
  rich: function(totalCount) {
    return {
      totalCount,
      pageSize: function(params, query) {
        console.dir(query);
        return parseInt(query['page_size']);
      },
      pageIndex: function(params, query) {
        return parseInt(query['page_index']);
      },
      items: function(params, query, data) {
        return data;
      }
    };
  }
};
