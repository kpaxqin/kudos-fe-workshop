// mock async behavior

const api = {
  addTodo(text) {
    return new Promise(function(resolve, reject) {
      setTimeout(()=> {
        if (text.startsWith('err')) {
          reject(new Error(`should not include text "err": ${text}`))
        } else {
          resolve(text);
        }
      }, 1000)
    });
  }
}

export default api;