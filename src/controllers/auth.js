const User = require("../models/user");

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    title: "Login",
    isAuth: req.session.isLoggedIn,
  });
};

exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    title: "Signup",
    isAuth: req.session.isLoggedIn,
  });
};

exports.postSignup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        console.log("User already exists with that email");
        return res.redirect("/login");
      }

      if (password === confirmPassword) {
        const user = new User({ email, password, cart: { items: [] } });
        return user.save();
      } else {
        console.log("Password don't match!");
        return res.redirect("/signup");
      }
    })
    .then(() => res.redirect("/login"))
    .catch((err) => console.log(err));
};

exports.postLogin = (req, res) => {
  User.findById("6ad53c3196ef1da92e2bedc4")
    .then((user) => {
      if (!user) {
        return res.status(401).send("User not found");
      }
      req.session.isLoggedIn = true;
      req.session.userId = user._id.toString();
      req.session.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal server error!");
        }
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.error("Failed to load user:", err);
      res.status(401).send(`<p style="color: red;">Error: ${err}</p>`);
    });
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error while logging out.");
    }
    res.redirect("/");
  });
};
