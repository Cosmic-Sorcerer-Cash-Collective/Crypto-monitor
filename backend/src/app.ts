import express from 'express'
import cors from 'cors'
import routesGetDataCrypto from './cryptoData/routes/Get'
import routesDockerInstance from './instances/routes'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routesDockerInstance)
app.use('/crypto', routesGetDataCrypto)

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
