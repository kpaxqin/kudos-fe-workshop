export const commonErrorHandler = e => {
  window.alert(e.message);
}

export const errorMiddleware = store => next => action => {
  if (action.meta && action.meta.asyncPhase && action.meta.asyncPhase === 'FAILED') {
    commonErrorHandler(action.payload);
  }

  return next(action);
}
