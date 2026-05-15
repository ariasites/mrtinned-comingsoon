"use client"

import { useState } from "react"

export default function Home() {
  const [email, setEmail]       = useState("")
  const [status, setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/subscribe", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Signup failed")
      }
      setStatus("success")
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong")
      setStatus("error")
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display:   "flex",
      alignItems: "center",
      padding:   "48px 24px",
    }}>
      <div style={{
        width:     "100%",
        maxWidth:  "520px",
        margin:    "0 auto",
      }}>

        {/* Wordmark */}
        <p style={{
          fontFamily:    "var(--font-playfair), Georgia, serif",
          fontSize:      "clamp(28px, 5vw, 36px)",
          fontWeight:    700,
          fontStyle:     "italic",
          color:         "var(--text-primary)",
          letterSpacing: "-0.02em",
          margin:        "0 0 40px",
          lineHeight:    1,
        }}>
          MrTinned
        </p>

        {/* Label */}
        <p style={{
          fontSize:      "10px",
          fontWeight:    500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "rgba(var(--text-rgb), 0.40)",
          margin:        "0 0 28px",
          fontFamily:    "var(--font-inter), sans-serif",
        }}>
          The tinned fish market
        </p>

        {/* Headline */}
        <h1 style={{
          fontFamily:    "var(--font-playfair), Georgia, serif",
          fontSize:      "clamp(56px, 12vw, 96px)",
          fontWeight:    400,
          lineHeight:    1.0,
          letterSpacing: "-0.03em",
          margin:        "0 0 32px",
        }}>
          <span style={{ display: "block", fontStyle: "italic", color: "var(--text-primary)" }}>
            Coming
          </span>
          <span style={{ display: "block", fontStyle: "italic", fontWeight: 900, color: "var(--accent)" }}>
            soon.
          </span>
        </h1>

        {/* Standfirst */}
        <p style={{
          fontSize:   "14px",
          fontWeight: 300,
          lineHeight: 1.85,
          color:      "rgba(var(--text-rgb), 0.60)",
          margin:     "0 0 48px",
          fontFamily: "var(--font-inter), sans-serif",
        }}>
          Prices, deals, and restocks for the tinned fish market. Updated daily across dozens of retailers.
        </p>

        {/* Form or success */}
        {status === "success" ? (
          <p style={{
            fontSize:      "13px",
            fontWeight:    400,
            color:         "var(--accent)",
            letterSpacing: "0.01em",
            fontFamily:    "var(--font-inter), sans-serif",
            margin:        0,
          }}>
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{
              display:      "flex",
              alignItems:   "stretch",
              borderBottom: "1px solid rgba(var(--text-rgb), 0.22)",
              marginBottom: status === "error" ? "10px" : "14px",
            }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                disabled={status === "loading"}
                style={{
                  flex:       1,
                  background: "transparent",
                  border:     "none",
                  outline:    "none",
                  color:      "var(--text-primary)",
                  fontSize:   "14px",
                  fontWeight: 300,
                  padding:    "10px 0",
                  fontFamily: "var(--font-inter), sans-serif",
                  minWidth:   0,
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                aria-label="Subscribe"
                style={{
                  background: "transparent",
                  border:     "none",
                  outline:    "none",
                  cursor:     status === "loading" ? "default" : "pointer",
                  color:      status === "loading"
                    ? "rgba(var(--text-rgb), 0.25)"
                    : "var(--accent)",
                  fontSize:   "18px",
                  padding:    "10px 0 10px 16px",
                  transition: "color 0.15s",
                  flexShrink: 0,
                }}
              >
                {status === "loading" ? "…" : "→"}
              </button>
            </div>

            {status === "error" && (
              <p style={{
                fontSize:   "12px",
                color:      "rgba(var(--text-rgb), 0.50)",
                margin:     "0 0 14px",
                fontFamily: "var(--font-inter), sans-serif",
              }}>
                {errorMsg}
              </p>
            )}

            <p style={{
              fontSize:      "11px",
              color:         "rgba(var(--text-rgb), 0.28)",
              margin:        0,
              letterSpacing: "0.02em",
              fontFamily:    "var(--font-inter), sans-serif",
            }}>
              Weekly newsletter. Unsubscribe any time.
            </p>
          </form>
        )}

      </div>
    </main>
  )
}
