const buildSuccessResp = ()=> ({});
const buildFailedResp = ()=> ({message: 'xxx'});

function buildBatchSuccess(command, responseBuilder = buildSuccessResp) {
  return {
    command,
    failed: false,
    response: responseBuilder(command),
  }
}

function buildBatchFailed(command, responseBuilder = buildFailedResp) {
  return {
    command,
    failed: true,
    response: responseBuilder(command),
  }
}

module.exports = {
  buildBatchSuccess,
  buildBatchFailed,
  buildBatchResponse(
    commands = [],
    shouldCommandFailed,
    successRespBuilder = buildSuccessResp,
    failedRespBuilder = buildFailedResp
  ) {
    const items = commands.map((cmd, index)=> {
      return shouldCommandFailed(cmd, index)
        ? buildBatchFailed(cmd, failedRespBuilder)
        : buildBatchSuccess(cmd, successRespBuilder);
    })

    return {
      totalCount: commands.length,
      items
    }
  }
}
