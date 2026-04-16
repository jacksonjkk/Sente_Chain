// src/components/Nav.jsx
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { T } from "../styles/theme"

const roleTag = {
  member:  { color:T.green,   bg:T.greenLite, bdr:T.greenBdr,  label:"Member"  },
  cashier: { color:T.goldMid, bg:T.goldLite,  bdr:T.goldBdr,   label:"Cashier" },
  admin:   { color:T.purple,  bg:"rgba(124,58,237,0.10)", bdr:T.purpleBdr, label:"Admin" },
}

export default function Nav() {
  const { auth, logout } = useAuth()
  const navigate = useNavigate()
  const rt = roleTag[auth?.role] || roleTag.member

  function handleLogout() { logout(); navigate("/", { replace:true }) }

  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background:"#ffffff", borderBottom:`1px solid ${T.border}`, boxShadow:"0 1px 12px rgba(0,0,0,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px", height:"68px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"14px", cursor:"pointer" }} onClick={() => navigate("/")}>
        <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:T.greenLite, border:`1.5px solid ${T.greenBdr}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ display:"flex" }}>
            <div style={{ width:"8px", height:"13px", borderRadius:"4px", border:`2.5px solid ${T.green}` }} />
            <div style={{ width:"8px", height:"13px", borderRadius:"4px", border:`2.5px solid ${T.green}`, marginLeft:"-3px" }} />
          </div>
        </div>
        <span style={{ fontSize:"22px", fontWeight:900, letterSpacing:"4px", fontFamily:T.font }}>
          <span style={{color:T.textHi}}>SENTE</span><span style={{color:T.goldMid}}>CHAIN</span>
        </span>
        {auth?.role && (
          <span style={{ fontSize:"11px", fontFamily:T.fontMono, fontWeight:700, padding:"4px 12px", borderRadius:"99px", letterSpacing:"1px", background:rt.bg, color:rt.color, border:`1px solid ${rt.bdr}`, textTransform:"uppercase" }}>
            {rt.label}
          </span>
        )}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
        {auth && <span style={{ fontSize:"14px", color:T.textMid, fontWeight:500, fontFamily:T.font }}>{auth.name}</span>}
        <button onClick={() => navigate("/sacco/SACCO01")} style={{ fontSize:"14px", fontWeight:600, padding:"8px 18px", borderRadius:"9px", cursor:"pointer", fontFamily:T.font, border:`1.5px solid ${T.border}`, background:"#fff", color:T.textMid, transition:"all 0.18s" }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=T.green;e.currentTarget.style.color=T.green}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.textMid}}>
          Public View
        </button>
        {auth && (
          <button onClick={handleLogout} style={{ fontSize:"14px", fontWeight:700, padding:"8px 18px", borderRadius:"9px", cursor:"pointer", fontFamily:T.font, background:T.redBg, color:T.red, border:`1.5px solid ${T.redBdr}`, transition:"opacity 0.18s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.75"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            Sign Out
          </button>
        )}
      </div>
    </nav>
  )
}