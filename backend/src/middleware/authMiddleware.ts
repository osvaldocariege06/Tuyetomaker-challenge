import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../types/env'

export interface AuthenticatedRequest extends Request {
  user?: { id: string }
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    res.status(401).json({ message: 'Access denied, no token provided' })
    return
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string }
    req.user = { id: decoded.id } // Atribui o ID do usuário autenticado
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}
