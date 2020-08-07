
function send400Response(res, message=undefined) {
  res.status(400);
  return res.json({
    error: "Bad Request",
    status: 400,
    message: message ? message : "",
  });
}

function send401Response(res, message = undefined) {
  res.status(401);
  return res.json({
    error: "Unauthorized",
    status: 401,
    message: message ? message : "",
  });
}

function send403Response(res, message=undefined) {
  res.status(403);
  return res.json({
    error: "Forbidden",
    status: 403,
    message: message ? message : "",
  });
}

function send404Response(res, message=undefined) {
  res.status(404);
  return res.json({
    error: "Not Found",
    status: 404,
    message: message ? message : "",
  });
}

function send500Response(res, message=undefined) {
  res.status(500);
  return res.json({
    error: "Internal Server Error",
    status: 500,
    message: message ? message : "",
  });
}

module.exports = {
  send400Response,
  send401Response,
  send403Response,
  send404Response,
  send500Response
}
