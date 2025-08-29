import express, { Application } from "express"
import helmet from "helmet"
import cors from "cors"
import logger from "./config/logger"
import pinoHttp from "pino-http"
import indexRouter from "./routes"

const app: Application = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(
  pinoHttp({
    logger,
    customLogLevel: (res, err) => {
      if (err) return "error"
      const status = res?.statusCode ?? 0

      if (status >= 500) return "error"
      if (status >= 400) return "warn"
      return "info"
    },
  })
)

app.use("/api/v1", indexRouter)

export default app
