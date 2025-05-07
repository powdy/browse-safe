import sgMail from '@sendgrid/mail';

// Constants
export const DEFAULT_FROM_EMAIL = 'reports@browse-safe.com';
export const DEFAULT_TO_EMAIL = 'webmaster@browse-safe.com';

// Flag to track if email functionality is available
let emailFunctionalityEnabled = false;

/**
 * Initialize SendGrid with the API key
 */
export function initializeSendGrid() {
  // Check if API key is available
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY is not set. Email notifications will be logged to console instead.');
    emailFunctionalityEnabled = false;
    return false;
  }
  
  try {
    // Set the API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    emailFunctionalityEnabled = true;
    console.log('SendGrid initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize SendGrid:', error);
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
 * Send an email using SendGrid if available, otherwise log to console
 * @param emailData The email data to send
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    // Check if SendGrid is available
    if (!emailFunctionalityEnabled) {
      // Log the email to console as a fallback
      console.log('=========== EMAIL NOTIFICATION (CONSOLE FALLBACK) ===========');
      console.log(`To: ${emailData.to}`);
      console.log(`From: ${emailData.from}`);
      console.log(`Subject: ${emailData.subject}`);
      console.log('------- CONTENT -------');
      console.log(emailData.text);
      console.log('==========================================================');
      
      // Return true to indicate the email was "sent" (logged)
      return true;
    }
    
    // Send the email using SendGrid
    await sgMail.send(emailData);
    console.log(`Email sent successfully to ${emailData.to}`);
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