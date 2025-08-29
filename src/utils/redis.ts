import Redis from "ioredis"
import logger from "../config/logger"

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT || 6379),
})

redisClient.on("connect", () => {
  logger.info("Connected to Redis")
})

redisClient.on("error", (error) => {
  logger.error({ error }, "Error connecting to Redis")
})

export default redisClient
