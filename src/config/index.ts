import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  secret_access_token: process.env.SECRET_ACCESS_TOKEN,
  secret_access_expires_in: process.env.SECRET_ACCESS_EXPIRES_IN,
}
