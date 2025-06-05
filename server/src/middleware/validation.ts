import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { AppError } from './errorHandler';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }
  next();
};

export const chatValidation = [
  body('question')
    .trim()
    .notEmpty()
    .withMessage('Question is required')
    .isLength({ max: 500 })
    .withMessage('Question must be less than 500 characters')
    .escape(),
  validateRequest
];

export const projectValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters')
    .escape(),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters')
    .escape(),
  body('githubUrl')
    .trim()
    .notEmpty()
    .withMessage('GitHub URL is required')
    .isURL()
    .withMessage('Invalid GitHub URL')
    .escape(),
  body('technologies')
    .isArray()
    .withMessage('Technologies must be an array')
    .notEmpty()
    .withMessage('At least one technology is required'),
  body('technologies.*')
    .trim()
    .notEmpty()
    .withMessage('Technology name cannot be empty')
    .isLength({ max: 50 })
    .withMessage('Technology name must be less than 50 characters')
    .escape(),
  body('date')
    .trim()
    .notEmpty()
    .withMessage('Date is required')
    .matches(/^(Spring|Summer|Fall|Winter|January|February|March|April|May|June|July|August|September|October|November|December)( \d{1,2},)? \d{4}$/)
    .withMessage('Invalid date format. Use season/month and year (e.g., "Spring 2025" or "July 2024")')
    .escape(),
  validateRequest
]; 