export const clientAuth = (req, res, next) => {

  const clientId = req.headers["client-id"];

  if (!clientId) {
    return res.status(400).json({
      message: "client-id header is required"
    });
  }

  req.clientId = clientId;

  next();
};