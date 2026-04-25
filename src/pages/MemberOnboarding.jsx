import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { T, card } from "../styles/theme"
import { useAuth } from "../context/AuthContext"
import { ALL_SACCOS } from "../data/demo"

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

export default function MemberOnboarding() {
  const navigate = useNavigate()
  const { auth, updateAuth } = useAuth()
  const { width } = useWindowSize()
  const isMobile = width < 768
  const [step, setStep] = useState(1)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const steps = [
    { id: 1, title: "Identity Document", sub: "National ID or Passport" },
    { id: 2, title: "Liveliness Check", sub: "Face verification" },
    { id: 3, title: "Review", sub: "Confirm and submit" },
  ]

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please ensure you have given permission.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      setCapturedImage(canvas.toDataURL("image/png"));
      // Stop camera stream
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleNext = () => {
    if (step === 2 && !capturedImage) {
      alert("Please capture your photo for the liveliness check.");
      return;
    }
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      updateAuth({ status: "under_review" });
      navigate("/dashboard");
    }, 2000);
  };

  useEffect(() => {
    if (step === 2) {
      startCamera();
    }
  }, [step]);

  return (
    <div style={{ minHeight: "100vh", background: T.pageBg, fontFamily: T.font }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');`}</style>
      
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#ffffff", borderBottom: `1.5px solid ${T.border}`,
        boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "0 16px" : "0 40px", height: "72px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/image10.png" alt="Logo" style={{ height: "38px" }} />
          <span style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "1px" }}>
            <span style={{ color: T.textHi }}>SENTE</span><span style={{ color: T.goldMid }}>CHAIN</span>
          </span>
        </div>
        {!isMobile && <div style={{ fontSize: "13px", fontWeight: 700, color: T.textMid }}>Member Onboarding</div>}
      </nav>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 20px" }}>
        {/* Stepper */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: isMobile ? "32px" : "40px" }}>
          {steps.map(s => (
            <div key={s.id} style={{ textAlign: "center", width: "33%" }}>
              <div style={{
                width: isMobile ? "28px" : "32px", height: isMobile ? "28px" : "32px", borderRadius: "50%",
                background: step >= s.id ? T.green : "#fff",
                border: `2px solid ${step >= s.id ? T.green : T.border}`,
                color: step >= s.id ? "#fff" : T.textDim,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 8px", fontWeight: 700, fontSize: isMobile ? "12px" : "14px"
              }}>
                {step > s.id ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : s.id}
              </div>
              <p style={{ fontSize: isMobile ? "10px" : "11px", fontWeight: 700, color: step >= s.id ? T.green : T.textDim, margin: 0, lineHeight: 1.2 }}>{isMobile ? s.title.split(" ")[0] : s.title}</p>
            </div>
          ))}
        </div>

        <div style={{ ...card(), background: "#fff", padding: isMobile ? "20px" : "40px", borderRadius: isMobile ? "16px" : "24px" }}>
          
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: isMobile ? "19px" : "22px", fontWeight: 800, marginBottom: "12px", color: T.textHi }}>Verify Your Identity</h2>
              <p style={{ fontSize: isMobile ? "13px" : "15px", color: T.textMid, marginBottom: "32px", lineHeight: 1.6 }}>Please upload a clear photo of your National ID card or Passport. Ensure all details are legible.</p>
              
              <div style={{ display: "grid", gap: "16px" }}>
                <div style={{ padding: isMobile ? "32px 16px" : "40px 20px", border: `2px dashed ${T.border}`, borderRadius: "16px", textAlign: "center", background: T.surface, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={T.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="12" y2="16"/></svg>
                  </div>
                  <p style={{ margin: 0, fontWeight: 700, color: T.textHi, fontSize: isMobile ? "14px" : "16px" }}>Upload Front of ID</p>
                  <p style={{ margin: "4px 0 0", fontSize: "11px", color: T.textDim }}>PDF, JPG, or PNG (Max 5MB)</p>
                </div>
                <div style={{ padding: isMobile ? "32px 16px" : "40px 20px", border: `2px dashed ${T.border}`, borderRadius: "16px", textAlign: "center", background: T.surface, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={T.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <p style={{ margin: 0, fontWeight: 700, color: T.textHi, fontSize: isMobile ? "14px" : "16px" }}>Upload Back of ID</p>
                  <p style={{ margin: "4px 0 0", fontSize: "11px", color: T.textDim }}>PDF, JPG, or PNG (Max 5MB)</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: isMobile ? "19px" : "22px", fontWeight: 800, marginBottom: "12px", color: T.textHi }}>Liveliness Check</h2>
              <p style={{ fontSize: isMobile ? "13px" : "15px", color: T.textMid, marginBottom: "24px", lineHeight: 1.6 }}>We need to ensure you're a real person. Please look directly at the camera and take a clear selfie.</p>
              
              <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", background: "#000", borderRadius: "16px", overflow: "hidden", marginBottom: "20px" }}>
                {!capturedImage ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: isMobile ? "180px" : "220px", height: isMobile ? "240px" : "280px", border: "2px dashed rgba(255,255,255,0.6)", borderRadius: "100px" }} />
                  </>
                ) : (
                  <img src={capturedImage} alt="Captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
              </div>

              {capturedImage ? (
                <button onClick={() => { setCapturedImage(null); startCamera(); }} style={{ padding: "10px 20px", borderRadius: "99px", background: "#f1f5f9", border: "none", color: T.textMid, fontWeight: 700, cursor: "pointer", marginBottom: "20px", fontSize: "13px" }}>Retake Photo</button>
              ) : (
                <button onClick={capturePhoto} style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fff", border: `5px solid ${T.green}`, cursor: "pointer", marginBottom: "20px", boxShadow: "0 0 0 4px rgba(255,255,255,0.3)" }} />
              )}
              
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: isMobile ? "19px" : "22px", fontWeight: 800, marginBottom: "12px", color: T.textHi }}>Final Review</h2>
              <p style={{ fontSize: isMobile ? "13px" : "15px", color: T.textMid, marginBottom: "32px", lineHeight: 1.6 }}>Please confirm that the documents and photo you've provided are correct before submitting for verification.</p>
              
              <div style={{ display: "grid", gap: "12px" }}>
                <div style={{ padding: isMobile ? "12px" : "16px", background: T.surface, borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: T.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p style={{ margin: 0, fontSize: isMobile ? "13px" : "14px", fontWeight: 700, color: T.textHi }}>Identity Documents Uploaded</p>
                </div>
                <div style={{ padding: isMobile ? "12px" : "16px", background: T.surface, borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: T.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p style={{ margin: 0, fontSize: isMobile ? "13px" : "14px", fontWeight: 700, color: T.textHi }}>Liveliness Check Completed</p>
                </div>
              </div>

              <div style={{ marginTop: "24px", display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }} onClick={() => setAgreed(!agreed)}>
                <div style={{ 
                  width: "20px", height: "20px", borderRadius: "6px", 
                  border: `2px solid ${agreed ? T.green : T.border}`,
                  background: agreed ? T.green : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  transition: "all 0.2s"
                }}>
                  {agreed && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: T.textMid, lineHeight: 1.5 }}>
                  I agree to the <span style={{ color: T.green, fontWeight: 700 }}>Terms of Service</span> and <span style={{ color: T.green, fontWeight: 700 }}>Privacy Policy</span>, and I authorize the SACCO to verify my documents with government registries.
                </p>
              </div>

              <div style={{ marginTop: "32px", padding: "16px", background: T.blueBg, borderRadius: "12px", border: `1px solid ${T.blueBdr}` }}>
                <p style={{ fontSize: "13px", color: T.blue, margin: 0, lineHeight: 1.5 }}>
                  <strong>Next Step:</strong> Your application will be sent to the SACCO administrator for review. This typically takes 24-48 hours.
                </p>
              </div>
            </div>
          )}

          <div style={{ marginTop: isMobile ? "32px" : "40px" }}>
            <button 
              onClick={handleNext} 
              disabled={loading || (step === 3 && !agreed)}
              style={{ 
                width: "100%", padding: isMobile ? "14px" : "16px", borderRadius: "12px", border: "none", 
                background: (loading || (step === 3 && !agreed)) ? T.border : T.green, 
                color: (loading || (step === 3 && !agreed)) ? T.textDim : "#fff", 
                fontWeight: 800, cursor: (loading || (step === 3 && !agreed)) ? "not-allowed" : "pointer",
                boxShadow: (loading || (step === 3 && !agreed)) ? "none" : `0 4px 20px ${T.green}44`, transition: "all 0.2s",
                fontSize: isMobile ? "15px" : "16px"
              }}
            >
              {loading ? "Submitting..." : (step === 3 ? "Submit for Verification" : "Continue")}
            </button>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} style={{ width: "100%", padding: "12px", background: "none", border: "none", color: T.textDim, fontWeight: 700, cursor: "pointer", marginTop: "8px", fontSize: "14px" }}>Go Back</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
