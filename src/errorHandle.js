export const commonErrorHandler = e => {
  window.alert(e.message);
}

export const errorMiddleware = store => next => action => {
  const isFailedAsync = action.meta && action.meta.asyncPhase && action.meta.asyncPhase === 'FAILED';
  const omitError  = action.meta && action.meta.omitError;
  if (isFailedAsync && !omitError) {
    commonErrorHandler(action.payload);
  }

  return next(action);
}
