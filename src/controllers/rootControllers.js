export const home = (req, res) => {
  res.render("home");
};

export const handleLogin = (req, res) => {
  res.send("<h1>login</h1>");
};

export const handleLogout = (req, res) => {
  res.send("<h1>logout</h1>");
};

export const handleJoin = (req, res) => {
  res.render("join");
};
