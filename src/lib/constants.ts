import * as dotenv from 'dotenv'
dotenv.config()

// Vercel deployment
export const DEPLOY_HOOK: string = process.env.DEPLOY_HOOK || ''

// S3 bucket
export const S3_BUCKET: string = process.env.S3_BUCKET || ''
export const S3_DOMAIN: string = process.env.S3_DOMAIN || ''
export const S3_KEY: string = process.env.S3_KEY || ''
export const S3_REGION: string = process.env.S3_REGION || ''
export const S3_PRIVATE: string = process.env.S3_PRIVATE || ''
export const S3_PUBLIC_ENDPOINT: string = process.env.S3_PUBLIC_ENDPOINT || ''
export const S3_ENDPOINT: string = process.env.S3_ENDPOINT || ''
export const S3_FOLDER_PODCAST: string = process.env.S3_FOLDER_PODCAST || ''

// Brave
export const BRAVE_TOKEN_SEARCH: string = process.env.BRAVE_TOKEN_SEARCH || ''
export const BRAVE_TOKEN_SUGGEST: string = process.env.BRAVE_TOKEN_SUGGEST || ''
export const BRAVE_DATA_AI: string = process.env.BRAVE_DATA_AI || ''

// Turnstile
export const TURNSTILE_KEY: string = process.env.PUBLIC_TURNSTILE_KEY || ''
export const TURNSTILE_SECRET: string = process.env.TURNSTILE_SECRET || ''

// Resend
export const RESEND: string = process.env.RESEND || ''

// Google
export const GOOGLE_CREDENTIALS: string = process.env.GOOGLE_CREDENTIALS || ''

// APP
export const ADMIN_TOKEN: string = process.env.ADMIN_TOKEN || ''
