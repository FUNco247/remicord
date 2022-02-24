export const getEdit = (req, res) => {
  res.send("edit user profile");
};

export const handleLogin = (req, res) => {
  res.send("<h1>login</h1>");
};

export const handleLogout = (req, res) => {
  res.send("<h1>logout</h1>");
};

export const handleJoin = (req, res) => {
  res.render("user/join");
};

export const getPersonalJoin = (req, res) => {
  res.render("user/personalJoin");
};

export const getGroupJoin = (req, res) => {
  res.render("user/groupJoin");
};

export const postPersonalJoin = (req, res) => {
  console.log(req.body);
};
