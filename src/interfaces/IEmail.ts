// Interface for email content
export interface EmailContent {
  subject: string; // Subject of the email
  text?: string; // Plain text content of the email
  html?: string; // HTML content of the email
}

// Interface for email contacts
export interface EmailContacts {
  to: string[]; // Array of recipient email addresses
  from?: string; // Sender's email address
  bcc?: string[];
}

export interface EmailAttachments {
  filename: string;
  path?: string;
  contentType?: string;
  content?: any;
  encoding?: string;
}

export interface EmailAttributes extends EmailContacts, EmailContent {
  emailAttachments?: EmailAttachments[];
}
