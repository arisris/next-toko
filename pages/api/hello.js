/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
  res.json({
    msg: "Hello World"
  })
}