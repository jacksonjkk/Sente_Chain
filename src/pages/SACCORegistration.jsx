import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { EAC_COUNTRIES } from "../data/countries"

// Mobile detection hook
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

const C = {
  green: "#15803d", greenMid: "#16a34a", greenLite: "#dcfce7", greenBdr: "#bbf7d0", greenDark: "#14532d",
  gold: "#b45309", goldMid: "#d97706", goldLite: "#fef3c7", goldBdr: "#fde68a",
  textHi: "#0a0a0a", textMid: "#374151", textDim: "#6b7280",
  border: "#e5e7eb", surface: "#f9fafb",
  font: "'DM Sans', sans-serif"
}

const inpStyle = {
  width: "100%", padding: "14px", borderRadius: "10px", border: `1.5px solid ${C.border}`,
  fontSize: "15px", fontFamily: C.font, outline: "none", transition: "all 0.2s",
  color: C.textHi, background: "#ffffff"
}

const Label = ({ children }) => (
  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: C.textDim, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
    {children}
  </label>
)

export default function SACCORegistration() {
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const isMobile = width < 768
  const [step, setStep] = useState(1)
  const [agreed, setAgreed] = useState(false)
  const [country, setCountry] = useState(EAC_COUNTRIES[0])
  const [formData, setFormData] = useState({
    name: "", regNo: "", type: "Deposit-taking",
    address: "", phone: "", email: "",
    chairmanName: "", chairmanID: "",
    secretaryName: "", secretaryID: "",
  })

  const next = () => setStep(s => s + 1)
  const prev = () => setStep(s => s - 1)

  const steps = [
    { id: 1, title: "Identity", sub: "Legal SACCO details" },
    { id: 2, title: "Contact", sub: "Location & reach" },
    { id: 3, title: "Documents", sub: "Compliance uploads" },
    { id: 4, title: "Officials", sub: "Key board members" },
    { id: 5, title: "Verify", sub: "Final submission" },
  ]

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: C.font }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');`}</style>

      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#ffffff", borderBottom: `1px solid ${C.border}`,
        boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "0 16px" : "0 40px", height: "72px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src="/image10.png" alt="Logo" style={{ height: isMobile ? "38px" : "48px", objectFit: "contain" }} />
          {!isMobile && (
            <span style={{ fontSize: "20px", fontWeight: 900, letterSpacing: "2px", fontFamily: C.font }}>
              <span style={{ color: C.textHi }}>SENTE</span><span style={{ color: C.goldMid }}>CHAIN</span>
            </span>
          )}
        </div>
        <button onClick={() => navigate("/")} style={{
          fontSize: isMobile ? "12px" : "14px", fontWeight: 700,
          padding: isMobile ? "8px 16px" : "10px 24px",
          borderRadius: "9px", cursor: "pointer", fontFamily: C.font,
          border: `1.5px solid ${C.border}`, background: "#fff",
          color: C.textMid, transition: "all 0.2s"
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid }}>
          Home
        </button>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: C.textHi, marginBottom: "10px" }}>Register Your SACCO</h1>
          <p style={{ color: C.textMid, margin: 0 }}>Join SenteChain to digitize your records on the blockchain.</p>
        </div>

        {/* Stepper */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: isMobile ? "24px" : "40px", position: "relative" }}>
          <div style={{ position: "absolute", top: "20px", left: "0", right: "0", height: "2px", background: C.border, zIndex: 0 }} />
          {steps.map(s => (
            <div key={s.id} style={{ position: "relative", zIndex: 1, textAlign: "center", width: "20%" }}>
              <div style={{
                width: isMobile ? "32px" : "40px", height: isMobile ? "32px" : "40px", borderRadius: "50%", background: step >= s.id ? C.green : "#fff",
                border: `2px solid ${step >= s.id ? C.green : C.border}`, color: step >= s.id ? "#fff" : C.textDim,
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", fontWeight: 700,
                transition: "all 0.3s", fontSize: isMobile ? "12px" : "14px"
              }}>
                {step > s.id ? "✓" : s.id}
              </div>
              {!isMobile && <p style={{ fontSize: "12px", fontWeight: 700, color: step >= s.id ? C.green : C.textDim, margin: 0 }}>{s.title}</p>}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div style={{ background: "#fff", borderRadius: isMobile ? "16px" : "24px", padding: isMobile ? "24px" : "40px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", border: `1px solid ${C.border}` }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "24px", color: C.textHi }}>SACCO Legal Identity</h2>
              <div style={{ display: "grid", gap: "20px" }}>
                <div><Label>SACCO Legal Name</Label><input style={inpStyle} placeholder="e.g. Starlight Savings & Credit" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                  <div><Label>Registration Number</Label><input style={inpStyle} placeholder="CS/2023/..." value={formData.regNo} onChange={e => setFormData({ ...formData, regNo: e.target.value })} /></div>
                  <div><Label>SACCO Type</Label>
                    <select style={inpStyle} value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                      <option>Deposit-taking</option>
                      <option>Non-deposit taking</option>
                      <option>Community-based</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "24px", color: C.textHi }}>Contact & Location</h2>
              <div style={{ display: "grid", gap: "20px" }}>
                <div><Label>Headquarters Address</Label><input style={inpStyle} placeholder="Street, Building, Floor" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} /></div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                  <div>
                    <Label>Official Phone</Label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <select
                        value={country.code}
                        onChange={(e) => setCountry(EAC_COUNTRIES.find(c => c.code === e.target.value))}
                        style={{ ...inpStyle, width: "100px", padding: "14px 8px" }}
                      >
                        {EAC_COUNTRIES.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.prefix}</option>
                        ))}
                      </select>
                      <input style={inpStyle} placeholder="700 000 000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                  </div>
                  <div><Label>Official Email</Label><input style={inpStyle} placeholder="info@sacco.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "24px", color: C.textHi }}>Document Uploads</h2>
              <p style={{ color: C.textDim, fontSize: "14px", marginBottom: "20px" }}>Please upload clear PDF or Image scans of your official documents.</p>
              <div style={{ display: "grid", gap: "16px" }}>
                {["Registration Certificate", "Operational License", "TIN/PIN Certificate"].map(doc => (
                  <div key={doc} style={{ padding: "20px", border: `2px dashed ${C.border}`, borderRadius: "12px", textAlign: "center", cursor: "pointer", background: "#fff" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.green} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: "14px", color: C.textHi }}>Upload {doc}</p>
                    <p style={{ margin: "4px 0 0", fontSize: "11px", color: C.textMid }}>Max size 5MB (PDF, PNG, JPG)</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "24px" }}>Key Officials Verification</h2>
              <div style={{ display: "grid", gap: "24px" }}>
                <div style={{ padding: "20px", background: C.surface, borderRadius: "12px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 800, marginBottom: "16px", color: C.green }}>Chairman Details</h3>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                    <div><Label>Full Name</Label><input style={inpStyle} placeholder="Name" value={formData.chairmanName} onChange={e => setFormData({ ...formData, chairmanName: e.target.value })} /></div>
                    <div><Label>National ID Number</Label><input style={inpStyle} placeholder="ID Number" value={formData.chairmanID} onChange={e => setFormData({ ...formData, chairmanID: e.target.value })} /></div>
                  </div>
                </div>
                <div style={{ padding: "20px", background: C.surface, borderRadius: "12px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 800, marginBottom: "16px", color: C.green }}>Secretary Details</h3>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                    <div><Label>Full Name</Label><input style={inpStyle} placeholder="Name" value={formData.secretaryName} onChange={e => setFormData({ ...formData, secretaryName: e.target.value })} /></div>
                    <div><Label>National ID Number</Label><input style={inpStyle} placeholder="ID Number" value={formData.secretaryID} onChange={e => setFormData({ ...formData, secretaryID: e.target.value })} /></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "80px", height: "80px", background: C.greenLite, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h2 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "12px", color: C.textHi }}>Ready for Verification</h2>
              <p style={{ color: C.textMid, lineHeight: 1.6, marginBottom: "32px" }}>
                Please review your SACCO details below. Once submitted, your legal documentation will be verified against regional regulatory standards.
              </p>
              
              <div style={{ textAlign: "left", background: C.surface, padding: "20px", borderRadius: "12px", border: `1px solid ${C.border}`, marginBottom: "24px" }}>
                <p style={{ fontSize: "13px", margin: "0 0 8px", color: C.textHi }}><strong>SACCO:</strong> {formData.name || "N/A"}</p>
                <p style={{ fontSize: "13px", margin: "0 0 8px", color: C.textHi }}><strong>Reg No:</strong> {formData.regNo || "N/A"}</p>
                <p style={{ fontSize: "13px", margin: 0, color: C.textHi }}><strong>Chairman:</strong> {formData.chairmanName || "N/A"}</p>
              </div>

              <div style={{ marginTop: "24px", display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", textAlign: "left" }} onClick={() => setAgreed(!agreed)}>
                <div style={{ 
                  width: "20px", height: "20px", borderRadius: "6px", 
                  border: `2px solid ${agreed ? C.green : C.border}`,
                  background: agreed ? C.green : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  transition: "all 0.2s"
                }}>
                  {agreed && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: C.textMid, lineHeight: 1.5 }}>
                  I confirm that I am an authorized official of this SACCO and I agree to the <span style={{ color: C.green, fontWeight: 700 }}>Terms of Service</span>, <span style={{ color: C.green, fontWeight: 700 }}>Privacy Policy</span>, and regional cooperative regulations.
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: "16px", marginTop: "40px" }}>
            {step > 1 && (
              <button onClick={prev} style={{ flex: 1, padding: "16px", borderRadius: "12px", border: `1.5px solid ${C.border}`, background: "#fff", fontWeight: 700, cursor: "pointer" }}>
                Back
              </button>
            )}
            <button
              onClick={step === 5 ? () => navigate("/verification-pending") : next}
              disabled={step === 5 && !agreed}
              style={{ 
                flex: 2, padding: "16px", borderRadius: "12px", border: "none", 
                background: (step === 5 && !agreed) ? C.border : C.green, 
                color: (step === 5 && !agreed) ? C.textDim : "#fff", 
                fontWeight: 800, cursor: (step === 5 && !agreed) ? "not-allowed" : "pointer", 
                boxShadow: (step === 5 && !agreed) ? "none" : `0 4px 20px ${C.green}44` 
              }}
            >
              {step === 5 ? "Submit Registration" : "Next Step"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
