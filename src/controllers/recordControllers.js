import Record from "../models/Record";

export const getWrite = async (req, res) => {
  const date = new Date();
  const years = String(date.getFullYear());
  const months = String(date.getMonth() + 1);
  const dates = String(date.getDate());
  const today = `${years}-${months}-${dates}`;
  const records = await Record.find({ date: today });
  res.render("record/write", { records, years, months, dates });
};

export const postWrite = async (req, res) => {
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
    });
    return res.redirect("/record/write");
  } catch (error) {
    return res.status(400).render("record/write", {
      errorMessage: error._message,
    });
  }
};

export const getHistory = (req, res) => {
  res.send("check record history");
};

export const reWrite = (req, res) => {
  res.send("edit your driving record");
};
