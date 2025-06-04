import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Discord webhook URL - you'll need to replace this with your actual webhook URL
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

    if (!DISCORD_WEBHOOK_URL) {
      return NextResponse.json({ error: "Discord webhook URL not configured" }, { status: 500 })
    }

    // Create Discord embed message
    const discordMessage = {
      embeds: [
        {
          title: "🚀 New Contact Form Submission",
          color: 0x3b82f6, // Blue color
          fields: [
            {
              name: "👤 Name",
              value: formData.name || "Not provided",
              inline: true,
            },
            {
              name: "📧 Email",
              value: formData.email || "Not provided",
              inline: true,
            },
            {
              name: "📱 Phone",
              value: formData.phone || "Not provided",
              inline: true,
            },
            {
              name: "🏢 Company",
              value: formData.company || "Not provided",
              inline: true,
            },
            {
              name: "🛠️ Project Type",
              value: formData.projectType || "Not specified",
              inline: true,
            },
            {
              name: "💰 Budget",
              value: formData.budget || "Not specified",
              inline: true,
            },
            {
              name: "⏰ Timeline",
              value: formData.timeline || "Not specified",
              inline: true,
            },
            {
              name: "📝 Message",
              value: formData.message || "No message provided",
              inline: false,
            },
          ],
          footer: {
            text: "Portfolio Contact Form",
            icon_url: "https://cdn.discordapp.com/emojis/123456789.png", // Optional: Add your logo
          },
          timestamp: new Date().toISOString(),
        },
      ],
    }

    // Send to Discord
    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    })

    if (!discordResponse.ok) {
      throw new Error("Failed to send Discord message")
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
