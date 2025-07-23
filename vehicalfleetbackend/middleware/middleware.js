import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) => {
  const token =
    req.cookies?.token ||
    req.headers['authorization']?.replace('Bearer ', '') ||
    req.headers['x-access-token']

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'vehicalfleet')
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}