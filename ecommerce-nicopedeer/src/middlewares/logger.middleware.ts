import { NextFunction, Request, Response } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const date = new Date()
  console.log(
    `Ejecutando Middleware: método ${req.method} en la ruta ${req.url} a las ${date}`,
  );
  next();
}