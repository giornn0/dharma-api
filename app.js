const {
  throwError,
  headers,
  notFound,
  setAccesAllowOrigin,
  notAuthenticated,
} = require("./response");
const { Request } = require("./app/models/request.model");

async function onRequest(req, res) {
  if (
    req.headers.origin === "http://localhost:4200" ||
    req.headers.origin === "https://g0-dharma.netlify.app"
  ) {
    setAccesAllowOrigin(req.headers.origin);
  }
  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    return res.end();
  }
  const request = new Request(req, res);
  if (!request.route && !request.dataRoute) return notFound(res);
  try {
    let body = undefined;
    if (request.relation === "images") {
      const { getImageData } = require("./getBody");
      body = await getImageData(req);
    } else if (request.method === "PUT" || request.method === "POST") {
      const { getData } = require("./getBody");
      body = await getData(req);
    }


    if (request.section === "login")
      return require("./app/routes/login.routes")(request, res, body);

    if (!request.authorization) return notAuthenticated(res);
    
    if(request.dataRoute) return require("./app/routes/data.routes")(request, res, body)
    else {
      return require("./app/routes/root.routes")(request, res, body);
    }
  } catch (error) {
    return throwError(res, error);
  }
}
module.exports = {
  onRequest,
};
