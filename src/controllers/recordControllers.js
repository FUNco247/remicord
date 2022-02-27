export const getWrite = (req, res) => {
  res.render("record/write");
};

export const getHistory = (req, res) => {
  res.send("check record history");
};

export const reWrite = (req, res) => {
  res.send("edit your driving record");
};
