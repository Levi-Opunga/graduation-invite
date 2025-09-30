"use server"
import { InvitationEmail, ScheduleUpdateEmail } from "./templates/invitation-email"
import { renderAsync, render } from "@react-email/components"
import nodemailer from "nodemailer";


interface SendInvitationEmailParams {
  to: string
  inviteeName: string
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventDescription?: string
  inviteLink: string
}

export async function sendInvitationEmail(params: SendInvitationEmailParams) {
  try {
    const emailHtml = await render(
      InvitationEmail({
        inviteeName: params.inviteeName,
        eventName: params.eventName,
        eventDate: params.eventDate,
        eventTime: params.eventTime,
        eventLocation: params.eventLocation,
        eventDescription: params.eventDescription,
        inviteLink: params.inviteLink,
      }),
    )

    const { body, error } = process.env.NODE_ENV === "development" ? await sendMailHttp(params.to, "Graduation Invitation", emailHtml) : await sendMail(params.to, "Graduation Invitation", emailHtml)

    if (error !== null) {
      console.error("[v0] Email sending error:", error)
      return { success: false, error }
    }

    return { success: true, data: body }
  } catch (error) {
    console.error("[v0] Email sending error:", error)
    return { success: false, error }
  }
}


export async function sendScheduleUpdateEmail(params: SendInvitationEmailParams) {
  try {
    const emailHtml = await render(
      ScheduleUpdateEmail({
        inviteeName: params.inviteeName,
        eventName: params.eventName,
        eventDate: params.eventDate,
        eventTime: params.eventTime,
        eventLocation: params.eventLocation,
        eventDescription: params.eventDescription,
        inviteLink: params.inviteLink,
      }),
    )

    const { body, error } = process.env.NODE_ENV === "development" ? await sendMailHttp(params.to, "Graduation Schedule Update", emailHtml) : await sendMail(params.to, "Graduation Schedule Update", emailHtml)

    if (error !== null) {
      console.error("[v0] Email sending error:", error)
      return { success: false, error }
    }

    return { success: true, data: body }
  } catch (error) {
    console.error("[v0] Email sending error:", error)
    return { success: false, error }
  }
}


export async function sendBulkScheduleUpdates(invitations: SendInvitationEmailParams[]) {
  const results = await Promise.allSettled(invitations.map((invitation) => sendScheduleUpdateEmail(invitation)))

  const successful = results.filter((r) => r.status === "fulfilled").length
  const failed = results.filter((r) => r.status === "rejected").length

  return {
    total: invitations.length,
    successful,
    failed,
    results,
  }
}

export async function sendBulkInvitations(invitations: SendInvitationEmailParams[]) {
  const results = await Promise.allSettled(invitations.map((invitation) => sendInvitationEmail(invitation)))

  const successful = results.filter((r) => r.status === "fulfilled").length
  const failed = results.filter((r) => r.status === "rejected").length

  return {
    total: invitations.length,
    successful,
    failed,
    results,
  }
}

function GET_MAIL_CONFIG() {
  return {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === "true",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    fromName: process.env.MAIL_FROM_NAME
  }
}


export const sendMail = async (email: string, subject: string, message: string) => {
  const mailConfig = GET_MAIL_CONFIG();

  const emailConfig = {
    host: mailConfig.host,
    port: mailConfig.port,
    secure: false,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass,
    }
  } as nodemailer.TransportOptions;

  const transporter = nodemailer.createTransport(emailConfig);
  const info = await transporter.sendMail({
    from: `"${mailConfig.fromName}" <${mailConfig.user}>`,
    to: email,
    subject,
    html: message
  });

  if (info.rejected.length > 0) {
    return {
      status: 400,
      body: "Email not sent",
      error: info.response
    }
  }

  return {
    status: 200,
    body: "Email sent successfully!"
  }
}


export async function sendMailHttp(
  email: string,
  subject: string,
  message: string
) {
  let bodyContent = JSON.stringify({
    "to": email,
    subject,
    "body": message,
  });

  let response = await fetch("https://webhooks.codekxlabs.com/api/mailing?wrap=false", {
    method: "POST",
    body: bodyContent,
    mode: "no-cors",
  });

  let data = await response.text();
  console.log(data);
  return {
    status: 200,
    body: "Email sent successfully!",
    error: null
  }
}