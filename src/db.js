import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/remicord", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const handleOpen = () => console.log("connected to DB");
const handleError = (error) => console.log("DB Error", error);
// DB의 event를 listen 하기
db.on("error", handleError); // on은 여러번 발생할수 있음
db.once("open", handleOpen); //once는 딱 한번만 발생함
