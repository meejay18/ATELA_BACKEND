import { Resend } from 'resend'
import { emailConfig } from './resendEmailConfig' 
export const resendClient = new Resend(emailConfig.apiKey)
