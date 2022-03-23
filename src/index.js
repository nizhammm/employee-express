const express = require("express");
const app = express();
const cors = require("dotenv");

dotenv.config()

app.use(express.json())
app.use((req, res, next) => {
  console.log("Request masuk")
  next()
})

const PORT = process.env.PORT

const { employeeRoutes, authRoutes } = require("./routes");

app.use("/employees", employeeRoutes)
app.use("/auth", authRoutes)

app.listen(PORT, () => {
  console.log("Listening in port", PORT)
})