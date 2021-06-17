require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

//APP
const app = express();

//DB
const uri = "mongodb+srv://Agro-Sidd:siddhant@agrohomecluster.xe29w.mongodb.net/ecommerce"
mongoose
    .connect(process.env.MONGODB_URI || uri, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => console.log(err));

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//route
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}

//app
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
