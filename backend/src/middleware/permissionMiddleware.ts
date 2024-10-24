import type { Request, Response, NextFunction } from 'express'

export function authorizePermissions(requiredPermissions: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const hasPermission = requiredPermissions.every(permission =>
      user.permissions.includes(permission)
    )

    if (!hasPermission) {
      return res
        .status(403)
        .json({ message: 'Access denied: insufficient permissions' })
    }

    next()
  }
}
