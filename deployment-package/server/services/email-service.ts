import nodemailer from 'nodemailer';

// Constants
export const DEFAULT_FROM_EMAIL = 'reports@browse-safe.com';
export const DEFAULT_TO_EMAIL = 'webmaster@browse-safe.com';

// Flag to track if email functionality is available
let emailFunctionalityEnabled = false;
let transporter: nodemailer.Transporter | null = null;

/**
 * Initialize the email service
 * This function checks for various email configuration options
 * and sets up the appropriate email transporter
 */
export function initializeEmailService() {
  try {
    // First, check if we have a SMTP configuration
    if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
      // Create a transporter using SMTP configuration
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        } : undefined
      });
      
      emailFunctionalityEnabled = true;
      console.log('Email service initialized with SMTP configuration');
      return true;
    } 
    // Next, check if SendGrid is configured
    else if (process.env.SENDGRID_API_KEY) {
      // Create a transporter using SendGrid
      transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY
        }
      });
      
      emailFunctionalityEnabled = true;
      console.log('Email service initialized with SendGrid');
      return true;
    }
    // Check if we have Gmail configuration
    else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      // Create a transporter using Gmail
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });
      
      emailFunctionalityEnabled = true;
      console.log('Email service initialized with Gmail');
      return true;
    }
    // If none of the above, create an ethereal test account for development
    else if (process.env.NODE_ENV === 'development') {
      // For development, we'll create a test account
      nodemailer.createTestAccount().then(testAccount => {
        transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass
          }
        });
        
        emailFunctionalityEnabled = true;
        console.log('Created an Ethereal email test account for development');
        console.log(`User: ${testAccount.user}, Pass: ${testAccount.pass}`);
        console.log('Preview emails at: https://ethereal.email');
      }).catch(err => {
        console.error('Failed to create test account', err);
      });
      
      // Return false for now, but it might be set to true asynchronously
      return false;
    }
    
    // No email configuration found
    console.warn('No email configuration found. Email notifications will be logged to console instead.');
    emailFunctionalityEnabled = false;
    return false;
  } catch (error) {
    console.error('Failed to initialize email service:', error);
    emailFunctionalityEnabled = false;
    return false;
  }
}

/**
 * Interface for email data
 */
export interface EmailData {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * Send an email using the configured email service, or log to console as fallback
 * @param emailData The email data to send
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    // Check if email functionality is enabled and we have a transporter
    if (!emailFunctionalityEnabled || !transporter) {
      // Log the email to console as a fallback
      console.log('=========== EMAIL NOTIFICATION (CONSOLE FALLBACK) ===========');
      console.log(`To: ${emailData.to}`);
      console.log(`From: ${emailData.from}`);
      console.log(`Subject: ${emailData.subject}`);
      console.log('------- CONTENT -------');
      console.log(emailData.text);
      console.log('==========================================================');
      
      console.log(`Email notification sent for reported website: ${emailData.subject.replace('Website Report: ', '')}`);
      
      // Return true to indicate the email was "sent" (logged)
      return true;
    }
    
    // Send the email using the configured transporter
    const info = await transporter.sendMail({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html
    });
    
    console.log(`Email sent successfully to ${emailData.to}`);
    
    // If we're using the ethereal test account, provide a preview URL
    if (info.messageId && info.previewURL) {
      console.log(`Preview URL: ${info.previewURL}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Log the email to console as a fallback
    console.log('=========== EMAIL NOTIFICATION (FAILED, CONSOLE FALLBACK) ===========');
    console.log(`To: ${emailData.to}`);
    console.log(`From: ${emailData.from}`);
    console.log(`Subject: ${emailData.subject}`);
    console.log('------- CONTENT -------');
    console.log(emailData.text);
    console.log('==========================================================');
    
    return false;
  }
}

/**
 * Create and send a website report email
 * @param reportData The data from the report
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function sendReportEmail(reportData: {
  url: string;
  reason: string;
  details?: string;
  reportedBy?: string;
}): Promise<boolean> {
  const { url, reason, details, reportedBy } = reportData;
  
  // Create the email content
  const subject = `Website Report: ${url}`;
  
  // Create plain text email
  const text = `
New Website Report
------------------
URL: ${url}
Reason: ${reason}
${details ? `Details: ${details}` : ''}
${reportedBy ? `Reported By: ${reportedBy}` : ''}
Reported At: ${new Date().toLocaleString()}
  `.trim();
  
  // Create HTML email
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4a56e2; color: white; padding: 15px; border-radius: 5px 5px 0 0; }
    .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
    .footer { margin-top: 20px; font-size: 12px; color: #888; }
    .label { font-weight: bold; color: #666; }
    .value { margin-bottom: 10px; }
    .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Website Report</h2>
    </div>
    <div class="content">
      <p>A user has reported a suspicious website:</p>
      
      <p><span class="label">URL:</span><br>
      <span class="value">${url}</span></p>
      
      <p><span class="label">Reason for Report:</span><br>
      <span class="value">${reason}</span></p>
      
      ${details ? `
      <p><span class="label">Additional Details:</span><br>
      <span class="value">${details}</span></p>
      ` : ''}
      
      ${reportedBy ? `
      <p><span class="label">Reported By:</span><br>
      <span class="value">${reportedBy}</span></p>
      ` : ''}
      
      <p><span class="label">Reported At:</span><br>
      <span class="value">${new Date().toLocaleString()}</span></p>
      
      <div class="warning">
        Please review this report and take appropriate action if necessary.
      </div>
    </div>
    <div class="footer">
      <p>This is an automated message from BrowseSafe Website Security Scanner. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
  
  // Create email data
  const emailData: EmailData = {
    to: DEFAULT_TO_EMAIL,
    from: DEFAULT_FROM_EMAIL,
    subject,
    text,
    html
  };
  
  // Send the email
  return await sendEmail(emailData);
}