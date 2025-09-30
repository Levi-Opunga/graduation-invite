interface InvitationEmailProps {
  inviteeName: string
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventDescription?: string
  inviteLink: string
}

export function InvitationEmail({
  inviteeName,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  eventDescription,
  inviteLink,
}: InvitationEmailProps) {
  return (
    <html>
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          lineHeight: "1.6",
          color: "#1f2937",
          backgroundColor: "#faf8f5",
          margin: 0,
          padding: 0,
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 10px" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div
                style={{
                  width: "64px",
                  height: "4px",
                  backgroundColor: "#22d3ee",
                  borderRadius: "2px",
                  margin: "0 auto 24px",
                }}
              ></div>
              <h1
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "24px",
                  color: "#1a2f4a",
                  margin: "0 0 16px",
                  lineHeight: "1.2",
                }}
              >
                {eventName}
              </h1>
            </div>

            {/* Greeting */}
            <p style={{ fontSize: "18px", color: "#4b5563", marginBottom: "24px" }}>
              Dear <strong>{inviteeName}</strong>,
            </p>

            {/* Short description */}
            <p style={{ color: "#4b5563", margin: "24px 0", lineHeight: "1.8" }}>
              You are cordially invited to attend our graduation ceremony.
            </p>

            {/* Details */}
            <div
              style={{
                backgroundColor: "#f9fafb",
                borderLeft: "4px solid #22d3ee",
                padding: "24px",
                margin: "24px 0",
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontWeight: 600, color: "#1a2f4a", marginBottom: "4px" }}>
                  Date
                </div>
                <div style={{ color: "#4b5563" }}>{eventDate}</div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontWeight: 600, color: "#1a2f4a", marginBottom: "4px" }}>
                  Time
                </div>
                <div style={{ color: "#4b5563" }}>{eventTime}</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "#1a2f4a", marginBottom: "4px" }}>
                  Location
                </div>
                <div style={{ color: "#4b5563" }}>{eventLocation}</div>
              </div>
            </div>

            {/* Optional description */}
            {eventDescription && (
              <p style={{ color: "#4b5563", margin: "24px 0", lineHeight: "1.8" }}>
                {eventDescription}
              </p>
            )}

            {/* Button */}
            <div style={{ textAlign: "center" }}>
              <a
                href={inviteLink}
                style={{
                  display: "inline-block",
                  backgroundColor: "#1a2f4a",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "14px 32px",
                  borderRadius: "6px",
                  fontWeight: 600,
                  margin: "24px 0",
                  textAlign: "center",
                }}
              >
                View Invitation & RSVP
              </a>
            </div>

            {/* Reminder */}
            <p
              style={{
                color: "#6b7280",
                margin: "24px 0",
                lineHeight: "1.8",
                fontSize: "14px",
              }}
            >
              Please click the button above to view your personalized invitation and
              submit your RSVP.
            </p>

            {/* Footer */}
            <div
              style={{
                textAlign: "center",
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid #e5e7eb",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              <p>
                This is a personalized invitation. Please do not share this link with
                others.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}



export function ScheduleUpdateEmail({
  inviteeName,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  eventDescription,
  inviteLink,
}: InvitationEmailProps) {
  return (
    <html>
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          lineHeight: "1.6",
          color: "#1f2937",
          backgroundColor: "#faf8f5",
          margin: 0,
          padding: 0,
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 10px" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div
                style={{
                  width: "64px",
                  height: "4px",
                  backgroundColor: "#f59e0b", // amber color for update
                  borderRadius: "2px",
                  margin: "0 auto 24px",
                }}
              ></div>
              <h1
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "24px",
                  color: "#1a2f4a",
                  margin: "0 0 16px",
                  lineHeight: "1.2",
                }}
              >
                Schedule Update: {eventName}
              </h1>
            </div>

            {/* Greeting */}
            <p style={{ fontSize: "18px", color: "#4b5563", marginBottom: "24px" }}>
              Dear <strong>{inviteeName}</strong>,
            </p>

            {/* Update message */}
            <p style={{ color: "#4b5563", margin: "24px 0", lineHeight: "1.8" }}>
              Please note that the schedule for the event has been updated. Kindly find
              the revised details below:
            </p>

            {/* Details */}
            <div
              style={{
                backgroundColor: "#f9fafb",
                borderLeft: "4px solid #f59e0b",
                padding: "24px",
                margin: "24px 0",
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontWeight: 600, color: "#1a2f4a", marginBottom: "4px" }}>
                  New Date
                </div>
                <div style={{ color: "#4b5563" }}>{eventDate}</div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontWeight: 600, color: "#1a2f4a", marginBottom: "4px" }}>
                  New Time
                </div>
                <div style={{ color: "#4b5563" }}>{eventTime}</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "#1a2f4a", marginBottom: "4px" }}>
                  Location
                </div>
                <div style={{ color: "#4b5563" }}>{eventLocation}</div>
              </div>
            </div>

            {/* Optional description */}
            {eventDescription && (
              <p style={{ color: "#4b5563", margin: "24px 0", lineHeight: "1.8" }}>
                {eventDescription}
              </p>
            )}

            {/* Button */}
            <div style={{ textAlign: "center" }}>
              <a
                href={inviteLink}
                style={{
                  display: "inline-block",
                  backgroundColor: "#1a2f4a",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "14px 32px",
                  borderRadius: "6px",
                  fontWeight: 600,
                  margin: "24px 0",
                  textAlign: "center",
                }}
              >
                View Updated Schedule
              </a>
            </div>

            {/* Reminder */}
            <p
              style={{
                color: "#6b7280",
                margin: "24px 0",
                lineHeight: "1.8",
                fontSize: "14px",
              }}
            >
              Please click the button above to view the latest event details and confirm
              your availability.
            </p>

            {/* Footer */}
            <div
              style={{
                textAlign: "center",
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid #e5e7eb",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              <p>
                This is a personalized update. Please do not share this link with others.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}