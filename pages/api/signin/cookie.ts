import { NextApiHandler } from 'next'

const handler: NextApiHandler = (req, res) => {
  console.log(req.body)

  res.setHeader('cookie', req.body.cookie)

  return res.status(200).json({
    message: 'Succeeded',
  })
}

export default handler
