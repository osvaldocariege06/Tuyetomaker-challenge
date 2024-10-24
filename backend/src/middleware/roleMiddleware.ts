import type { Request, Response, NextFunction } from 'express'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function authorizeRoles(roles: string[]): Promise<any> {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    console.log('user: ', roles)
    if (!user || !roles.includes(user.role)) {
      console.log('authorizeRoles: ', user.role)
      return res.status(403).json({ message: 'Access denied' })
    }

    next()
  }
}
