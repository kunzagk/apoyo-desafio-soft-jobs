const forRoutes = (req, res, next) => {
    console.log(`${req.method} url:: ${req.url}`);
    next();
  };
  
  module.exports = forRoutes;
  