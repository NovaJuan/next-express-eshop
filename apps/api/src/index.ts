import express from "express"
import { PORT } from "./config/config"

const app = express()

app.get("/", (req, res) => {
  const test = "hello"

  return res.send(test)
})

app.listen(PORT, () => console.info(`Server Running on port ${PORT}`))
