import User from "../models/User";
import Record from "../models/Record";
import bcrypt from "bcrypt";

export const getEdit = (req, res) => {
  res.render("user/editProfile");
};

export const postEdit = async (req, res) => {
  //console.log(req.body);
  const { user } = req.session;
  const id = user._id;
  const {
    username,
    name,
    currentPW,
    password,
    password2,
    phoneNumber,
    plateNumber,
  } = req.body;
  const ok = await bcrypt.compare(currentPW, user.password);
  const exist = await User.exists({ username, name });
  if (!ok) {
    return res.render("user/editProfile", {
      errorMessage: "현재 비밀번호가 일치하지 않습니다.",
    });
  }
  try {
    if (password) {
      const pwCheck = password !== password2;
      if (pwCheck) {
        return res.render("user/editProfile", {
          errorMessage: "새 비밀번호가 일치하지 않습니다.",
        });
      }
      if (exist) {
        const user = await User.findById(id);
        user.password = password;
        await user.save();
        return res.redirect("/user/logout");
      }
    } else {
      await User.findByIdAndUpdate(id, {
        phoneNumber,
        plateNumber,
      });
      req.session.user.phoneNumber = phoneNumber;
      req.session.user.plateNumber = plateNumber;
      return res.render("user/editProfile", {
        errorMessage: "회원정보가 변경되었습니다.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).render(`user/edit/${user._id}`, {
      errorMessage: error._message,
    });
  }
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
  const { username, password, rememberMe } = req.body;
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
  console.log(req.session);
  if (rememberMe == "on") {
    //req.session.cookie._expires = new Date(253402300000000);
    req.session.cookie.originalMaxAge = new Date(253402300000000);
  }
  console.log(req.session);
  req.session.loggedIn = true;
  req.session.user = user;
  const id = user._id;
  return res.redirect(`/record/write/${id}`);
};

export const getGroupJoin = (req, res) => {
  res.render("user/groupJoin");
};

export const postPersonalJoin = async (req, res) => {
  console.log(req.body);
  const { username, name, password, password2, phoneNumber, plateNumber } =
    req.body;
  if (password !== password2) {
    return res.status(40).render("user/personalJoin", {
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

export const getFindPW = (req, res) => {
  res.render("user/findPassword");
};

export const postFindPW = async (req, res) => {
  const { username, name, plateNumber, phoneNumber } = req.body;
  const user = await User.findOne({ username, name, plateNumber, phoneNumber });
  if (user) {
    return res.redirect(`/user/resetPassword/${user._id}`);
  } else {
    return res.render("user/findPassword", {
      errorMessage: "입력하신 정보와 일치하는 회원이 없습니다.",
    });
  }
};

export const getResetPW = (req, res) => {
  res.render("user/resetPW");
};

export const postResetPW = async (req, res) => {
  const { id } = req.params;
  const { newPassword, password2 } = req.body;
  if (newPassword != password2) {
    return res.render("user/resetPW", {
      errorMessage: "비밀번호를 확인하세요.",
    });
  }
  console.log(req.body, id);
  const user = await User.findById(id);
  user.password = newPassword;
  await user.save();
  return res.redirect("/user/login");
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  req.session.destroy();
  await Record.deleteMany({ owner: id });
  await User.findByIdAndDelete({ _id: id });
  return res.redirect("/");
};
