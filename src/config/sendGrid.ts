import sgMail from '@sendgrid/mail';

export const sendMailSendGrid = (data: sgMail.MailDataRequired ) => {
  const apiKey = process.env.SENGRID_API_KEY as string;
  sgMail.setApiKey(apiKey);

  return sgMail.send(data);
}