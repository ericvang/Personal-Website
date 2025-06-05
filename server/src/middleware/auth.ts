import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

// Extend Express Request type to include API key
declare global {
  namespace Express {
    interface Request {
      apiKey?: string;
    }
  }
}

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('X-API-Key');
  
  if (!apiKey) {
    return next(new AppError('API key is required', 401));
  }

  // Validate against Google API key
  if (apiKey !== process.env.GOOGLE_API_KEY) {
    return next(new AppError('Invalid API key', 401));
  }

  req.apiKey = apiKey;
  next();
}; 