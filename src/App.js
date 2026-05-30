import { useState } from "react";

const AVATARS = ["🦊","🐯","🐰","🐻","🐼","🦁","🐸","🐧","🦄","🐲"];
const GRADES = ["1º Ano","2º Ano","3º Ano","4º Ano","5º Ano"];

export default function MathQuestLogin() {
  const [screen, setScreen] = useState("splash"); // splash | welcome | login | register | onboard-avatar | onboard-name | onboard-grade | done
  const [mode, setMode] = useState("student"); // student | parent
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const next = (to) => setScreen(to);

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes slideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        * { box-sizing:border-box; margin:0; padding:0; font-family:'Nunito',sans-serif; }
        input { outline:none; }
        input:focus { border-color:#7C3AED !important; box-shadow:0 0 0 3px #7C3AED22 !important; }
      `}</style>

      <div style={s.phone}>

        {/* SPLASH */}
        {screen === "splash" && (
          <div style={s.splash}>
            <div style={s.splashBg} />
            <div style={s.splashStars}>
              {[...Array(12)].map((_,i) => (
                <div key={i} style={{
                  position:"absolute",
                  left:`${Math.random()*90+5}%`, top:`${Math.random()*80+5}%`,
                  fontSize: 10 + Math.random()*14,
                  opacity:0.6,
                  animation:`bounce ${1.5+Math.random()}s ${Math.random()*2}s infinite ease-in-out`,
                }}>⭐</div>
              ))}
            </div>
            <div style={s.splashLogo}>
              <div style={s.splashMascot}>🦊</div>
              <div style={s.splashTitle}>MathQuest</div>
              <div style={s.splashSub}>Matemática é uma aventura!</div>
            </div>
            <button style={s.splashBtn} onClick={() => next("welcome")}>
              Começar →
            </button>
          </div>
        )}

        {/* WELCOME */}
        {screen === "welcome" && (
          <div style={s.welcome}>
            <div style={s.welcomeTop}>
              <div style={s.welcomeMascot}>🦊</div>
              <div style={s.welcomeTitle}>Olá, aventureiro!</div>
              <div style={s.welcomeDesc}>
                Bem-vindo ao MathQuest — onde aprender matemática é uma grande aventura cheia de prêmios e conquistas!
              </div>
            </div>
            <div style={s.modeToggle}>
              {["student","parent"].map(m => (
                <button key={m} style={{
                  ...s.modeBtn,
                  background: mode===m ? "linear-gradient(135deg,#7C3AED,#A78BFA)" : "white",
                  color: mode===m ? "white" : "#868E96",
                  border: mode===m ? "none" : "2px solid #EDE9FE",
                }} onClick={() => setMode(m)}>
                  {m === "student" ? "🎒 Sou Aluno" : "👨‍👩‍👧 Sou Pai/Mãe"}
                </button>
              ))}
            </div>
            <div style={s.welcomeBtns}>
              <button style={s.primaryBtn} onClick={() => next("register")}>
                ✨ Criar conta grátis
              </button>
              <button style={s.secondaryBtn} onClick={() => next("login")}>
                Já tenho conta →
              </button>
            </div>
          </div>
        )}

        {/* LOGIN */}
        {screen === "login" && (
          <div style={s.form}>
            <button style={s.backLink} onClick={() => next("welcome")}>← Voltar</button>
            <div style={s.formMascot}>🦊</div>
            <div style={s.formTitle}>Entrar na aventura</div>
            <div style={s.formSub}>Olá de novo! Que saudade 🎉</div>
            <div style={s.fieldGroup}>
              <label style={s.label}>📧 E-mail</label>
              <input style={s.input} type="email" placeholder="seu@email.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>🔒 Senha</label>
              <div style={s.passWrap}>
                <input style={{...s.input, paddingRight:48}} type={showPass?"text":"password"}
                  placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                <button style={s.eyeBtn} onClick={() => setShowPass(v=>!v)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <button style={s.forgotBtn}>Esqueci minha senha</button>
            <button style={s.primaryBtn} onClick={() => next("onboard-avatar")}>
              🚀 Entrar
            </button>
            <div style={s.divider}><span>ou</span></div>
            <button style={s.googleBtn}>
              <span style={s.googleIcon}>G</span> Entrar com Google
            </button>
            <div style={s.switchText}>
              Não tem conta? <button style={s.switchLink} onClick={() => next("register")}>Criar agora →</button>
            </div>
          </div>
        )}

        {/* REGISTER */}
        {screen === "register" && (
          <div style={s.form}>
            <button style={s.backLink} onClick={() => next("welcome")}>← Voltar</button>
            <div style={s.formMascot}>✨</div>
            <div style={s.formTitle}>Criar conta grátis</div>
            <div style={s.formSub}>Sua aventura começa agora!</div>
            <div style={s.fieldGroup}>
              <label style={s.label}>📧 E-mail</label>
              <input style={s.input} type="email" placeholder="seu@email.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>🔒 Senha</label>
              <div style={s.passWrap}>
                <input style={{...s.input,paddingRight:48}} type={showPass?"text":"password"}
                  placeholder="Mínimo 6 caracteres" value={password} onChange={e=>setPassword(e.target.value)} />
                <button style={s.eyeBtn} onClick={() => setShowPass(v=>!v)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div style={s.termsRow}>
              <input type="checkbox" id="terms" style={{ width:18, height:18, accentColor:"#7C3AED" }} />
              <label htmlFor="terms" style={s.termsLabel}>
                Aceito os <span style={{ color:"#7C3AED", fontWeight:800 }}>Termos de Uso</span>
              </label>
            </div>
            <button style={s.primaryBtn} onClick={() => next("onboard-avatar")}>
              ✨ Criar minha conta
            </button>
            <div style={s.divider}><span>ou</span></div>
            <button style={s.googleBtn}>
              <span style={s.googleIcon}>G</span> Cadastrar com Google
            </button>
            <div style={s.switchText}>
              Já tem conta? <button style={s.switchLink} onClick={() => next("login")}>Entrar →</button>
            </div>
          </div>
        )}

        {/* ONBOARD: AVATAR */}
        {screen === "onboard-avatar" && (
          <div style={s.onboard}>
            <div style={s.onboardStep}>Passo 1 de 3</div>
            <div style={s.stepDots}>
              {[0,1,2].map(i => <div key={i} style={{...s.stepDot, background: i===0?"#7C3AED":"#EDE9FE"}} />)}
            </div>
            <div style={s.onboardMascot}>{AVATARS[selectedAvatar]}</div>
            <div style={s.onboardTitle}>Escolha seu avatar!</div>
            <div style={s.onboardSub}>Esse será seu personagem na aventura 🎭</div>
            <div style={s.avatarGrid}>
              {AVATARS.map((av, i) => (
                <button key={i} style={{
                  ...s.avatarBtn,
                  background: selectedAvatar===i ? "linear-gradient(135deg,#EDE9FE,#DDD6FE)" : "white",
                  border: selectedAvatar===i ? "3px solid #7C3AED" : "3px solid #EDE9FE",
                  transform: selectedAvatar===i ? "scale(1.15)" : "scale(1)",
                  boxShadow: selectedAvatar===i ? "0 4px 16px #7C3AED44" : "0 2px 6px #00000011",
                }} onClick={() => setSelectedAvatar(i)}>
                  {av}
                </button>
              ))}
            </div>
            <button style={s.primaryBtn} onClick={() => next("onboard-name")}>
              Próximo →
            </button>
          </div>
        )}

        {/* ONBOARD: NAME */}
        {screen === "onboard-name" && (
          <div style={s.onboard}>
            <div style={s.onboardStep}>Passo 2 de 3</div>
            <div style={s.stepDots}>
              {[0,1,2].map(i => <div key={i} style={{...s.stepDot, background: i<=1?"#7C3AED":"#EDE9FE"}} />)}
            </div>
            <div style={s.onboardMascot}>{AVATARS[selectedAvatar]}</div>
            <div style={s.onboardTitle}>Qual seu nome?</div>
            <div style={s.onboardSub}>Como vamos te chamar na aventura? 🏷️</div>
            <input
              style={{ ...s.input, textAlign:"center", fontSize:20, fontWeight:800, padding:"18px 20px" }}
              placeholder="Digite seu nome..."
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {name.length > 0 && (
              <div style={s.namePreview}>
                <span style={{fontSize:28}}>{AVATARS[selectedAvatar]}</span>
                <span style={{ fontWeight:900, fontSize:18, color:"#7C3AED" }}>Olá, {name}! 👋</span>
              </div>
            )}
            <button style={{
              ...s.primaryBtn,
              opacity: name.trim() ? 1 : 0.5,
              cursor: name.trim() ? "pointer" : "not-allowed",
            }} onClick={() => name.trim() && next("onboard-grade")}>
              Próximo →
            </button>
          </div>
        )}

        {/* ONBOARD: GRADE */}
        {screen === "onboard-grade" && (
          <div style={s.onboard}>
            <div style={s.onboardStep}>Passo 3 de 3</div>
            <div style={s.stepDots}>
              {[0,1,2].map(i => <div key={i} style={{...s.stepDot, background:"#7C3AED"}} />)}
            </div>
            <div style={s.onboardMascot}>{AVATARS[selectedAvatar]}</div>
            <div style={s.onboardTitle}>Qual sua série?</div>
            <div style={s.onboardSub}>Vamos ajustar o conteúdo para você! 📚</div>
            <div style={s.gradeList}>
              {GRADES.map((g, i) => (
                <button key={i} style={{
                  ...s.gradeBtn,
                  background: selectedGrade===i ? "linear-gradient(135deg,#7C3AED,#A78BFA)" : "white",
                  color: selectedGrade===i ? "white" : "#1A1A2E",
                  border: selectedGrade===i ? "none" : "2px solid #EDE9FE",
                  boxShadow: selectedGrade===i ? "0 4px 16px #7C3AED44" : "0 2px 6px #00000011",
                }} onClick={() => setSelectedGrade(i)}>
                  <span>{["📗","📘","📙","📕","📓"][i]}</span>
                  <span style={{ fontWeight:800 }}>{g}</span>
                  {selectedGrade===i && <span>✓</span>}
                </button>
              ))}
            </div>
            <button style={{
              ...s.primaryBtn,
              opacity: selectedGrade !== null ? 1 : 0.5,
              cursor: selectedGrade !== null ? "pointer" : "not-allowed",
            }} onClick={() => selectedGrade !== null && next("done")}>
              🚀 Começar aventura!
            </button>
          </div>
        )}

        {/* DONE */}
        {screen === "done" && (
          <div style={s.done}>
            <div style={s.doneBlast}>🎉</div>
            <div style={s.doneMascot}>{AVATARS[selectedAvatar]}</div>
            <div style={s.doneTitle}>Bem-vindo(a), {name}!</div>
            <div style={s.doneSub}>
              Sua aventura no MathQuest começa agora.<br />
              Boa sorte, {GRADES[selectedGrade]}! ⭐
            </div>
            <div style={s.doneCards}>
              <div style={s.doneCard}>
                <div style={{ fontSize:28 }}>⚡</div>
                <div style={{ fontWeight:900, fontSize:16, color:"#7C3AED" }}>0 XP</div>
                <div style={{ fontSize:11, color:"#868E96" }}>Pontuação</div>
              </div>
              <div style={s.doneCard}>
                <div style={{ fontSize:28 }}>🪙</div>
                <div style={{ fontWeight:900, fontSize:16, color:"#E67700" }}>50</div>
                <div style={{ fontSize:11, color:"#868E96" }}>Moedas bônus!</div>
              </div>
              <div style={s.doneCard}>
                <div style={{ fontSize:28 }}>🔥</div>
                <div style={{ fontWeight:900, fontSize:16, color:"#FF6B6B" }}>Dia 1</div>
                <div style={{ fontSize:11, color:"#868E96" }}>Sequência</div>
              </div>
            </div>
            <button style={s.primaryBtn} onClick={() => next("splash")}>
              🏠 Ir para o início
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

const s = {
  root: {
    minHeight:"100vh", background:"linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
    display:"flex", alignItems:"center", justifyContent:"center", padding:20,
  },
  phone: {
    width:375, minHeight:812, background:"#F8F9FF", borderRadius:44,
    overflow:"hidden", display:"flex", flexDirection:"column",
    boxShadow:"0 40px 80px #00000088",
  },

  // Splash
  splash: {
    flex:1, display:"flex", flexDirection:"column", alignItems:"center",
    justifyContent:"space-between", padding:"60px 32px 60px", position:"relative",
    background:"linear-gradient(160deg,#7C3AED 0%,#A78BFA 50%,#C4B5FD 100%)",
  },
  splashBg: { position:"absolute", inset:0, background:"radial-gradient(circle at 50% 40%,#ffffff22,transparent)" },
  splashStars: { position:"absolute", inset:0, pointerEvents:"none" },
  splashLogo: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, zIndex:1 },
  splashMascot: { fontSize:100, animation:"float 2s ease-in-out infinite", filter:"drop-shadow(0 8px 24px #00000044)" },
  splashTitle: { fontSize:42, fontWeight:900, color:"white", letterSpacing:-1, textShadow:"0 4px 16px #00000033" },
  splashSub: { fontSize:16, color:"#EDE9FE", fontWeight:600 },
  splashBtn: {
    width:"100%", padding:"18px 0", borderRadius:20, border:"none",
    background:"white", color:"#7C3AED", fontWeight:900, fontSize:18,
    cursor:"pointer", boxShadow:"0 8px 32px #00000033", zIndex:1,
    letterSpacing:0.5,
  },

  // Welcome
  welcome: {
    flex:1, display:"flex", flexDirection:"column", alignItems:"center",
    padding:"40px 24px 32px", gap:24,
  },
  welcomeTop: { display:"flex", flexDirection:"column", alignItems:"center", gap:12, textAlign:"center" },
  welcomeMascot: { fontSize:72, animation:"float 2.5s ease-in-out infinite" },
  welcomeTitle: { fontSize:28, fontWeight:900, color:"#1A1A2E" },
  welcomeDesc: { fontSize:14, color:"#868E96", fontWeight:600, lineHeight:1.6 },
  modeToggle: { display:"flex", gap:10, width:"100%" },
  modeBtn: { flex:1, padding:"14px 0", borderRadius:16, cursor:"pointer", fontWeight:800, fontSize:13, transition:"all 0.2s" },
  welcomeBtns: { display:"flex", flexDirection:"column", gap:12, width:"100%", marginTop:"auto" },

  // Form
  form: { flex:1, display:"flex", flexDirection:"column", padding:"24px 24px", gap:16, overflowY:"auto" },
  backLink: { border:"none", background:"none", color:"#7C3AED", fontWeight:700, fontSize:13, cursor:"pointer", textAlign:"left", padding:0 },
  formMascot: { fontSize:56, textAlign:"center", animation:"float 2s ease-in-out infinite" },
  formTitle: { fontSize:24, fontWeight:900, color:"#1A1A2E", textAlign:"center" },
  formSub: { fontSize:13, color:"#868E96", fontWeight:600, textAlign:"center", marginTop:-8 },
  fieldGroup: { display:"flex", flexDirection:"column", gap:6 },
  label: { fontSize:12, fontWeight:800, color:"#495057" },
  input: {
    width:"100%", padding:"14px 16px", borderRadius:14,
    border:"2px solid #EDE9FE", background:"white",
    fontSize:15, fontWeight:700, color:"#1A1A2E",
    transition:"border-color 0.2s, box-shadow 0.2s",
  },
  passWrap: { position:"relative" },
  eyeBtn: {
    position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
    border:"none", background:"none", fontSize:18, cursor:"pointer", padding:0,
  },
  forgotBtn: { border:"none", background:"none", color:"#7C3AED", fontWeight:700, fontSize:12, cursor:"pointer", textAlign:"right", padding:0 },
  termsRow: { display:"flex", alignItems:"center", gap:8 },
  termsLabel: { fontSize:12, fontWeight:600, color:"#495057", lineHeight:1.4 },
  divider: {
    textAlign:"center", position:"relative", color:"#CED4DA", fontSize:12, fontWeight:700,
  },
  googleBtn: {
    width:"100%", padding:"14px 0", borderRadius:14,
    border:"2px solid #DEE2E6", background:"white",
    display:"flex", alignItems:"center", justifyContent:"center", gap:10,
    fontWeight:800, fontSize:14, color:"#495057", cursor:"pointer",
  },
  googleIcon: {
    width:24, height:24, borderRadius:"50%",
    background:"linear-gradient(135deg,#EA4335,#FBBC04,#34A853,#4285F4)",
    color:"white", fontWeight:900, fontSize:12,
    display:"flex", alignItems:"center", justifyContent:"center",
  },
  switchText: { textAlign:"center", fontSize:13, color:"#868E96", fontWeight:600 },
  switchLink: { border:"none", background:"none", color:"#7C3AED", fontWeight:800, cursor:"pointer" },

  // Onboarding
  onboard: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"24px 24px 32px", gap:16, overflowY:"auto" },
  onboardStep: { fontSize:12, fontWeight:700, color:"#868E96" },
  stepDots: { display:"flex", gap:6 },
  stepDot: { width:28, height:6, borderRadius:10, transition:"background 0.3s" },
  onboardMascot: { fontSize:72, animation:"float 2s ease-in-out infinite" },
  onboardTitle: { fontSize:24, fontWeight:900, color:"#1A1A2E", textAlign:"center" },
  onboardSub: { fontSize:13, color:"#868E96", fontWeight:600, textAlign:"center", marginTop:-8 },
  avatarGrid: { display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, width:"100%" },
  avatarBtn: { borderRadius:16, padding:"12px 0", fontSize:28, cursor:"pointer", transition:"all 0.2s" },
  namePreview: {
    display:"flex", alignItems:"center", gap:10,
    background:"#EDE9FE", borderRadius:16, padding:"12px 20px", width:"100%",
    animation:"pop 0.3s ease",
  },
  gradeList: { display:"flex", flexDirection:"column", gap:10, width:"100%" },
  gradeBtn: {
    display:"flex", alignItems:"center", gap:14,
    padding:"16px 20px", borderRadius:16, cursor:"pointer",
    fontWeight:700, fontSize:15, transition:"all 0.2s",
  },

  // Done
  done: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 24px", gap:20, background:"linear-gradient(160deg,#EDE9FE,#F8F9FF)" },
  doneBlast: { fontSize:64, animation:"bounce 1s ease-in-out infinite" },
  doneMascot: { fontSize:80 },
  doneTitle: { fontSize:26, fontWeight:900, color:"#1A1A2E", textAlign:"center" },
  doneSub: { fontSize:14, color:"#868E96", fontWeight:600, textAlign:"center", lineHeight:1.6 },
  doneCards: { display:"flex", gap:10, width:"100%" },
  doneCard: {
    flex:1, background:"white", borderRadius:20, padding:"16px 0",
    display:"flex", flexDirection:"column", alignItems:"center", gap:4,
    boxShadow:"0 4px 16px #7C3AED11",
  },

  // Shared
  primaryBtn: {
    width:"100%", padding:"16px 0", borderRadius:20, border:"none",
    background:"linear-gradient(135deg,#7C3AED,#A78BFA)",
    color:"white", fontWeight:900, fontSize:16, cursor:"pointer",
    boxShadow:"0 6px 20px #7C3AED44", marginTop:"auto",
    transition:"opacity 0.2s",
  },
  secondaryBtn: {
    width:"100%", padding:"14px 0", borderRadius:20,
    border:"3px solid #EDE9FE", background:"white",
    color:"#7C3AED", fontWeight:900, fontSize:15, cursor:"pointer",
  },
};
