import * as path from "path"
import * as dotenv from "dotenv"

export const ENVIRONMENT = process.env.NODE_ENV ?? "development"

if (ENVIRONMENT === "development") {
  dotenv.config({ path: path.join(__dirname, "../../.env") })
}

export const PORT = process.env.PORT ?? 3030
