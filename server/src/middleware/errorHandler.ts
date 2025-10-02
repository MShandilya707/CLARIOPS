import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../types/index.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  const response: APIResponse = {
    success: false,
    error: err.message || 'Internal server error',
  };

  res.status(500).json(response);
};

export const notFoundHandler = (
  req: Request,
  res: Response
): void => {
  const response: APIResponse = {
    success: false,
    error: 'Route not found',
  };

  res.status(404).json(response);
};
