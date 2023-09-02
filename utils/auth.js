//Authentication

const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect them to the login page
    if (!req.session.logged_in) {
      res.redirect("/login");
    } else {
      // If the user is logged in, continue with the request
      next();
    }
  };
  
  module.exports = withAuth;
  