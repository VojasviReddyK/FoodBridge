import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(8, 'Minimum 8 characters')
  .regex(/[A-Z]/, 'Include 1 uppercase letter')
  .regex(/[0-9]/, 'Include 1 number')
  .regex(/[^A-Za-z0-9]/, 'Include 1 special character')

