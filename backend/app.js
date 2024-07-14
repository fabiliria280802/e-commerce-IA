const express = require("express");
const app = express();
app.disable("x-powered-by");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const multer = require("multer");
const { spawn } = require("child_process");
const importData = require('./database/importData');

//ENV Config
const api = process.env.API_URL;
const port = process.env.PORT;
const mongoDB = process.env.MONGODB;

// Lista de dominios permitidos
const allowedOrigins = [
  "https://trustedwebsite.com",
  "https://anothertrustedwebsite.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (por ejemplo, herramientas como Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
};

//Cors
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Schemes
const Product = require("./models/product");
const Order = require("./models/order");
const User = require("./models/user");
const OrderItem = require("./models/order-item");
const Categorie = require("./models/category");

//Routes
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");

//Call routes
app.use(`${api}/products`, productsRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/categories`, categoriesRouter);

// Configuración de multer para la carga de archivos
const upload = multer({ dest: "uploads/" });

// Endpoint para entrenar el modelo
app.post("/train", upload.single("file"), (req, res) => {
  const pythonProcess = spawn("python", ["train_model.py", req.file.path]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.send("Modelo entrenado exitosamente");
    } else {
      res.status(500).send("Error entrenando el modelo");
    }
  });
});

// Endpoint para obtener recomendaciones
app.post("/recommend", (req, res) => {
  const { userId } = req.body;

  const pythonProcess = spawn("python", ["recommend.py", userId]);

  let dataToSend = "";

  pythonProcess.stdout.on("data", (data) => {
    dataToSend += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.json(JSON.parse(dataToSend));
    } else {
      res.status(500).send("Error obteniendo recomendaciones");
    }
  });
});

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database connection is ready");
    importData();
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
