const express = require("express");
const cors = require("cors");
const app = express();
const session = require('express-session');
const passport = require('passport');
const path = require('path');

//* Users Router
const UserRoute = require("./routers/usersRouter");
// const loginRoute = require("./routers/usersRouter");
// const deleteUserRoute = require("./routers/usersRouter");
// const updateUserRoute = require("./routers/usersRouter");

//* Courses Router
 const CoursesRoute  = require("./routers/coursesRouter");
// const updateProduct = require("./routers/productsRouter");
// const deleteProduct = require("./routers/productsRouter");


const AdminRoute  = require("./routers/adminUserRouter");



const TaskRoute  = require("./routers/taskRouter");

const googleRoute = require("./routers/googleRoute");

// const addCoursetoUser  = require("./routers/courseUserRouter");

app.use("/images", express.static(path.join(__dirname, "images")));

//* Payment Router
// const payment = require("./routers/paymentRouter");

//* Product images Router
// const multer = require("./routers/multerRouter");

//* Cart Router
// const cart = require("./routers/cartRouter");

//* Comments Router
// const comments = require("./routers/commentsRouter");

app.use(cors());
app.use(express.json());

app.use(UserRoute);
app.use(CoursesRoute);
app.use(AdminRoute);
app.use(TaskRoute);



app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// app.use(addCoursetoUser);
// app.use(updateUserRoute);
// app.use(addProduct);
// app.use(updateProduct);
// app.use(deleteProduct);
// app.use(payment);
// app.use(multer);
// app.use(cart);
// app.use(comments);
// app.use("/images", express.static("images"));
app.use(googleRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
