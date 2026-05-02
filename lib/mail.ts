// import {Resend} from "resend"

// const resend = new Resend(process.env.RESEND_API_KEY)

// export const sendTwoFactorTokenEmail = async (
// 	email: string,
// 	token: string
//   ) => {
// 	await resend.emails.send({
// 	  from: "noreply@greatsume.com",
// 	  to: email,
// 	  subject: "2FA Code",
// 	  html: `<p>Your 2FA code: ${token}</p>`
// 	});
//   };

// export const sendVerificationEmail = async (
//     email: string,
//     token: string 
// ) => {
//     const confirmLink = `https://greatsume.com/auth/new-verification?token=${token}`;

//     await resend.emails.send({
//         from: "noreply@greatsume.com",
//         to: email,
//         subject: "Confirm your email",
//         html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
//     })
// }

// export const sendPasswordResetEmail = async (
// 	email: string,
// 	token: string
// ) => {
// 	const resetLink = `https://greatsume.com/auth/new-password?token=${token}`

// 	await resend.emails.send({
//         from: "noreply@greatsume.com",
//         to: email,
//         subject: "Reset your password",
//         html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
//     })
// }
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Colori del brand per le email
const BRAND_COLOR = "#7c3aed"; // violet-600
const TEXT_MAIN = "#171717";
const TEXT_MUTED = "#6b7280";
const BG_BODY = "#f9fafb";
const BG_CARD = "#ffffff";

// Wrapper HTML di base per mantenere un design coerente in tutte le email
const baseEmailTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: ${BG_BODY}; margin: 0; padding: 40px 20px; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <div style="max-width: 500px; width: 100%; background-color: ${BG_CARD}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
          
          <!-- Header -->
          <div style="padding: 32px 24px; text-align: center; border-bottom: 1px solid #f3f4f6;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: ${BRAND_COLOR}; letter-spacing: -1px;">Greatsume.</h1>
          </div>
          
          <!-- Contenuto Dinamico -->
          <div style="padding: 32px 24px; color: ${TEXT_MAIN}; text-align: left;">
            ${content}
          </div>
          
          <!-- Footer -->
          <div style="padding: 24px; text-align: center; background-color: ${BG_BODY}; border-top: 1px solid #f3f4f6;">
            <p style="margin: 0; font-size: 13px; color: ${TEXT_MUTED};">
              © ${new Date().getFullYear()} Greatsume. Tutti i diritti riservati.<br>
              <span style="font-size: 11px; margin-top: 8px; display: block;">Questa è un'email automatica, per favore non rispondere.</span>
            </p>
          </div>

        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  const content = `
    <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Codice di sicurezza 2FA</h2>
    <p style="font-size: 16px; line-height: 1.5; color: ${TEXT_MUTED}; margin-bottom: 24px;">
      Usa il seguente codice a 6 cifre per completare l'accesso al tuo account. Questo codice è valido per pochi minuti.
    </p>
    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 24px;">
      <span style="font-size: 36px; font-weight: 800; letter-spacing: 6px; color: ${TEXT_MAIN};">${token}</span>
    </div>
    <p style="font-size: 14px; line-height: 1.5; color: ${TEXT_MUTED}; margin: 0;">
      Se non hai tentato di accedere, puoi ignorare in sicurezza questa email.
    </p>
  `;

  await resend.emails.send({
    from: "Greatsume <noreply@greatsume.com>",
    to: email,
    subject: "Il tuo codice di sicurezza 2FA",
    html: baseEmailTemplate(content)
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `https://greatsume.com/auth/new-verification?token=${token}`;

  const content = `
    <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Conferma la tua email</h2>
    <p style="font-size: 16px; line-height: 1.5; color: ${TEXT_MUTED}; margin-bottom: 24px;">
      Benvenuto su Greatsume! Siamo felici di averti a bordo. Clicca sul pulsante qui sotto per confermare il tuo indirizzo e iniziare a creare il tuo nuovo CV.
    </p>
    <div style="text-align: center; margin-bottom: 24px;">
      <a href="${confirmLink}" style="display: inline-block; background-color: ${BRAND_COLOR}; color: #ffffff; padding: 14px 28px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px;">Conferma indirizzo email</a>
    </div>
    <p style="font-size: 14px; line-height: 1.5; color: ${TEXT_MUTED}; margin: 0;">
      Oppure copia e incolla questo link nel tuo browser:<br>
      <a href="${confirmLink}" style="color: ${BRAND_COLOR}; word-break: break-all;">${confirmLink}</a>
    </p>
  `;

  await resend.emails.send({
    from: "Greatsume <noreply@greatsume.com>",
    to: email,
    subject: "Conferma la tua iscrizione",
    html: baseEmailTemplate(content)
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `https://greatsume.com/auth/new-password?token=${token}`;

  const content = `
    <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Reimposta la tua password</h2>
    <p style="font-size: 16px; line-height: 1.5; color: ${TEXT_MUTED}; margin-bottom: 24px;">
      Abbiamo ricevuto una richiesta per reimpostare la password del tuo account Greatsume. Clicca sul pulsante qui sotto per sceglierne una nuova.
    </p>
    <div style="text-align: center; margin-bottom: 24px;">
      <a href="${resetLink}" style="display: inline-block; background-color: ${BRAND_COLOR}; color: #ffffff; padding: 14px 28px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px;">Reimposta Password</a>
    </div>
    <p style="font-size: 14px; line-height: 1.5; color: ${TEXT_MUTED}; margin: 0;">
      Se non hai richiesto tu il cambio password, ignora pure questa email. Il tuo account è al sicuro.
    </p>
  `;

  await resend.emails.send({
    from: "Greatsume Support <noreply@greatsume.com>",
    to: email,
    subject: "Reimposta la tua password",
    html: baseEmailTemplate(content)
  });
};