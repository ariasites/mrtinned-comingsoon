import { Resend } from "resend"

const AUDIENCE_ID = "5b1c1a63-b145-4776-8a4a-44468ec13f5a"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email || !String(email).includes("@")) {
      return Response.json({ error: "Invalid email" }, { status: 400 })
    }
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.contacts.create({
      email: String(email).trim(),
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    })
    return Response.json({ success: true })
  } catch (err) {
    console.error("Subscribe error:", err)
    return Response.json({ error: "Signup failed" }, { status: 500 })
  }
}
