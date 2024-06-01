// Server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Server
app.use(bodyParser.json());

// Routes
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

let todos = [];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Database https://www.npmjs.com/package/mssql
const sql = require("mssql");

const connectionSettings = {
  server: "DESARROLLO",
  database: "products",
  //user: "...",
  //password: "...",
  options: {
    //encrypt: true,
    trustServerCertificate: true,
    trustedConnection: true,
  },
};

async function getConnection() {
  try {
    return await sql.connect(connectionSettings);
  } catch (error) {
    console.error(error);
  }
}

const getData = async () => {
  try {
    const pool = await getConnection();
    const result = pool.request().query("SELECT * FROM products");
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

getData();
