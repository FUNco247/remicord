import Record from "../models/Record";

export const getWrite = async (req, res) => {
  const { user } = req.session;
  const date = new Date();
  const years = String(date.getFullYear());
  let months = String(date.getMonth() + 1);
  let dates = String(date.getDate());
  months = months < 10 ? "0" + months : months;
  dates = dates < 10 ? "0" + dates : dates;
  const today = `${years}-${months}-${dates}`;
  const records = await Record.find({ owner: user, date: today });
  res.render("record/write", { records, years, months, dates });
};

export const postWrite = async (req, res) => {
  const id = req.session.user._id;
  const {
    date,
    siteName,
    distance,
    water,
    overTime,
    nightSupport,
    oiling,
    memo,
  } = req.body;
  console.log(id);
  try {
    await Record.create({
      date,
      siteName,
      distance,
      water: water === "on",
      overTime: overTime === "on",
      nightSupport: nightSupport === "on",
      oiling,
      memo,
      owner: id,
    });
    return res.redirect(`/record/write/${id}`);
  } catch (error) {
    return res.status(400).render(`record/write`, {
      errorMessage: error._message,
    });
  }
};

export const removeTodaysRecord = async (req, res) => {
  const { user } = req.session;
  let { date, siteName, distance, water, overTime, nightSupport, oiling } =
    req.body;
  water = water === "O";
  overTime = overTime === "O";
  nightSupport = nightSupport === "O";
  oiling = Number(oiling) > 0 ? Number(oiling) : null;
  console.log(date, siteName, distance, water, overTime, nightSupport, oiling);
  try {
    await Record.findOneAndDelete({
      date: date,
      siteName: siteName,
      distance: distance,
      water: water,
      overTime: overTime,
      nightSupport: nightSupport,
      oiling: oiling,
      owner: user,
    });
    //return res.redirect(`/record/write/${id}`);
  } catch (error) {
    return res.status(400).render("record/write", {
      errorMessage: error._message,
    });
  }
};

export const getHistory = async (req, res) => {
  const { dateStart, dateEnd } = req.query;
  const { user } = req.session;
  try {
    const records = await Record.find({
      owner: user._id,
      date: {
        $gte: dateStart,
        $lte: dateEnd,
      },
    });
    res.render("record/myHistory", { records });
  } catch (error) {
    res.render("record/myHistory", { errorMessage: "에러발생" });
  }
};

export const reWrite = (req, res) => {
  res.send("edit your driving record");
};
