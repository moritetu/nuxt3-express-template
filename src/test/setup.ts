// setup is executed before running all test
import * as dotenv from 'dotenv'

export default () => {
  dotenv.config({ path: '.env.test' })
}
