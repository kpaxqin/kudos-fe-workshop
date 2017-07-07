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

function handleError(fn) {
  return function() {
    return fn(...arguments).catch((e)=> {
      window.alert(e);
      throw e;
    })
  }
}

function wrapApi(apis) {
  let result = {};

  for (var i in apis) {
    result[i] = handleError(apis[i])
  }
  return result;
}

export default wrapApi(api);