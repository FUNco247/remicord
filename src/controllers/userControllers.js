import User from "../models/User";
import bcrypt from "bcrypt";

export const getEdit = (req, res) => {
  res.send("edit user profile");
};

export const handleLogin = (req, res) => {
  res.render("user/login");
};

export const handleLogout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const handleJoin = (req, res) => {
  res.render("user/join");
};

export const getPersonalJoin = (req, res) => {
  res.render("user/personalJoin");
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("user/login", {
      errorMessage: "존재하지 않는 아이디 입니다..",
    });
  }
  // check if password correct
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("user/login", {
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  const id = user._id;
  return res.redirect(`/record/write/:${id}`);
};

export const getGroupJoin = (req, res) => {
  res.render("user/groupJoin");
};

export const postPersonalJoin = async (req, res) => {
  console.log(req.body);
  const { username, name, password, password2, phoneNumber, plateNumber } =
    req.body;
  if (password !== password2) {
    return res.status(400).render("user/personalJoin", {
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  const usernameDup = await User.exists({ username: username });
  const phoneNumberDup = await User.exists({ phoneNumber: phoneNumber });
  const plateNumberDup = await User.exists({ plateNumber: plateNumber });

  if (usernameDup) {
    return res.status(400).render("user/personalJoin", {
      errorMessage: "이미 존재하는 아이디입니다.",
    });
  } else if (phoneNumberDup) {
    return res.status(400).render("user/personalJoin", {
      errorMessage: "이미 존재하는 전화번호입니다.",
    });
  } else if (plateNumberDup) {
    return res.status(400).render("user/personalJoin", {
      errorMessage: "이미 존재하는 차량번호입니다.",
    });
  }
  try {
    await User.create({
      username,
      name,
      password,
      phoneNumber,
      plateNumber,
    });
    return res.redirect("/user/login");
  } catch (error) {
    console.log(error);
    return res.status(400).render("user/personalJoin", {
      errorMessage: error._message,
    });
  }
};
