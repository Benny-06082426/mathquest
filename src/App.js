import { useState, useEffect, useRef } from "react";

export const Storage={get:(k)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch{return null;}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}}};
export const AVATARS=["🦊","🐯","🐰","🐻","🦁","🐸","🧙","🧝‍♀️"];
export const GRADES=["1º Ano","2º Ano","3º Ano","4º Ano","5º Ano"];
export const C={blue:"#1E90FF",blueDk:"#0055CC",blueBg:"#0A1628",gold:"#FFD700",goldDk:"#FF8C00",red:"#FF6B6B",purple:"#6C5CE7",green:"#2ECC71",orange:"#FFA63A",dark:"#0D1B3E",card:"#132044"};
export function gerarCodigo(nome){const n=nome.toUpperCase().replace(/\s/g,"").slice(0,4);return `${n}-${Math.floor(1000+Math.random()*9000)}`;}


export const ShieldLogo=({s=40})=>(<svg width={s*.9} height={s} viewBox="0 0 80 88"><defs><linearGradient id="sl1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFE44D"/><stop offset="100%" stopColor="#FF9800"/></linearGradient><linearGradient id="sl2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1E90FF"/><stop offset="100%" stopColor="#0047AB"/></linearGradient></defs><path d="M40 3 L76 17 L76 46 Q76 70 40 85 Q4 70 4 46 L4 17Z" fill="url(#sl1)" stroke="#FF8C00" strokeWidth="2"/><path d="M40 9 L70 22 L70 46 Q70 66 40 79 Q10 66 10 46 L10 22Z" fill="url(#sl2)" stroke="#42A5F5" strokeWidth="1"/><path d="M40 16 L56 25 L56 44 Q56 58 40 67 Q24 58 24 44 L24 25Z" fill="#0033AA"/><text x="40" y="51" textAnchor="middle" fill="white" fontSize="26" fontWeight="900" fontFamily="Arial Black">+</text><polygon points="40,3 43,11 52,11 45,16 48,24 40,19 32,24 35,16 28,11 37,11" fill="#FFE44D" stroke="#FF6600" strokeWidth="0.7"/><ellipse cx="18" cy="22" rx="5" ry="5" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1"/><ellipse cx="62" cy="22" rx="5" ry="5" fill="#9C27B0" stroke="#6A1B9A" strokeWidth="1"/></svg>);

const MaxHero=({sz=80,mood="happy"})=>(
  <img src="https://raw.githubusercontent.com/Benny-06082426/mathquest/main/public/Menino.png" alt="Max"
    style={{width:sz,height:sz*1.4,objectFit:"contain",filter:"drop-shadow(0 8px 20px rgba(0,0,0,0.4))"}}
  />
);

const LiaHero=({sz=80})=>(
  <img src="https://raw.githubusercontent.com/Benny-06082426/mathquest/main/public/Menina.png" alt="Lia"
    style={{width:sz,height:sz*1.4,objectFit:"contain",filter:"drop-shadow(0 8px 20px rgba(0,0,0,0.4))"}}
  />
);

export 
const DracoImg=({sz=80})=>(
  <img src="https://raw.githubusercontent.com/Benny-06082426/mathquest/main/public/Dragon.png" alt="Draco"
    style={{width:sz,height:sz*1.2,objectFit:"contain",filter:"drop-shadow(0 6px 16px rgba(0,0,0,0.4))"}}
  />
);
const NubiImg=({sz=80})=>(
  <img src="https://raw.githubusercontent.com/Benny-06082426/mathquest/main/public/Nuvem.png" alt="Nubi"
    style={{width:sz,height:sz,objectFit:"contain",filter:"drop-shadow(0 6px 16px rgba(0,0,0,0.3))"}}
  />
);

const Star=({on,sz=18})=>(<svg width={sz} height={sz} viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9.5 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.5 9,9" fill={on?"#FFD700":"#1E3A6E"} stroke={on?"#FF8C00":"#2A4A8E"} strokeWidth="1.2"/></svg>);
export const Coin=({sz=18})=>(<svg width={sz} height={sz} viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#FFD700" stroke="#FF8C00" strokeWidth="1.5"/><circle cx="12" cy="12" r="8.5" fill="#FFC107"/><circle cx="12" cy="12" r="6" fill="#FFD700"/><text x="12" y="16" textAnchor="middle" fill="#7B3F00" fontSize="8" fontWeight="900" fontFamily="Arial Black">$</text></svg>);



export function useToast() {
  const [toasts, setToasts] = useState([]);
  const id = useRef(0);
  const show = (icon, text, type = "info") => {
    const tid = id.current++;
    setToasts(p => [...p, { id: tid, icon, text, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== tid)), 2200);
  };
  return { toasts, show };
}

export function Toast({ toasts }) {
  return (
    <div style={{ position: "absolute", top: 60, left: 0, right: 0, zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, pointerEvents: "none" }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type === "xp" ? "linear-gradient(135deg,#FFD700,#FF8C00)" : t.type === "coin" ? "linear-gradient(135deg,#FF6B35,#FF8C00)" : t.type === "level" ? "linear-gradient(135deg,#6C5CE7,#9B59B6)" : "linear-gradient(135deg,#1E90FF,#0055CC)",
          borderRadius: 30, padding: "9px 22px", fontSize: 14, fontWeight: 900,
          color: t.type === "xp" || t.type === "coin" ? "#0D1B3E" : "white",
          fontFamily: "'Fredoka One',sans-serif", boxShadow: "0 6px 24px #00000066",
          animation: "toastIn 0.3s ease, toastOut 0.3s ease 1.7s forwards",
          display: "flex", alignItems: "center", gap: 8,
          border: t.type === "xp" ? "3px solid #FFF9C4" : "3px solid rgba(255,255,255,0.3)",
        }}>
          <span style={{ fontSize: 20 }}>{t.icon}</span>{t.text}
        </div>
      ))}
    </div>
  );
}

export function RewardBurst({ show: visible, onDone }) {
  useEffect(() => { if (visible) { const t = setTimeout(onDone, 1600); return () => clearTimeout(t); } }, [visible, onDone]);
  if (!visible) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 200, overflow: "hidden" }}>
      {["⭐","🪙","⭐","💎","🪙","⭐","🪙","⭐"].map((em, i) => (
        <div key={i} style={{ position: "absolute", left: `${10 + i * 11}%`, top: "40%", fontSize: 26, animation: `burst${i % 4} 1.4s ease-out forwards`, animationDelay: `${i * 0.08}s` }}>{em}</div>
      ))}
    </div>
  );
}



function CodigoCard({ codigo, nome, grade, avatar }) {
  const [copiado, setCopiado] = useState(false);
  const copiar = () => {
    try { navigator.clipboard.writeText(codigo); } catch {
      const el = document.createElement("textarea");
      el.value = codigo; document.body.appendChild(el);
      el.select(); document.execCommand("copy"); document.body.removeChild(el);
    }
    setCopiado(true); setTimeout(() => setCopiado(false), 2500);
  };
  const compartilhar = () => {
    const txt = `🦊 MathQuest\n\nOlá! Código de acesso:\n\n${codigo}\n\nAbra o app → "Sou Aluno" → digite o código! 🎮`;
    if (navigator.share) navigator.share({ title: "MathQuest", text: txt }).catch(() => {});
    else copiar();
  };
  return (
    <div style={{ background: "white", borderRadius: 24, padding: "20px 22px", textAlign: "center", boxShadow: "0 10px 36px #00000044", width: "100%" }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: "#78716C", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Código de {nome}</div>
      {grade !== null && avatar !== undefined && (
        <div style={{ fontSize: 11, color: C.purple, fontWeight: 700, marginBottom: 10 }}>{AVATARS[avatar]} {GRADES[grade]}</div>
      )}
      <div style={{ background: "linear-gradient(135deg,#EDE9FE,#DDD6FE)", borderRadius: 18, padding: "16px 20px", marginBottom: 14 }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: "#0D47A1", fontFamily: "'Fredoka One',sans-serif", letterSpacing: 6 }}>{codigo}</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={copiar} style={{ flex: 1, padding: "11px 0", borderRadius: 14, border: "none", cursor: "pointer", background: copiado ? "linear-gradient(135deg,#2ECC71,#1B8A3A)" : `linear-gradient(135deg,${C.blue},${C.blueDk})`, color: "white", fontSize: 13, fontWeight: 900, fontFamily: "'Fredoka One',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.25s" }}>
          <span style={{ fontSize: 16 }}>{copiado ? "✅" : "📋"}</span>{copiado ? "Copiado!" : "Copiar"}
        </button>
        <button onClick={compartilhar} style={{ flex: 1, padding: "11px 0", borderRadius: 14, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#25D366,#128C7E)", color: "white", fontSize: 13, fontWeight: 900, fontFamily: "'Fredoka One',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <span style={{ fontSize: 16 }}>📤</span>Compartilhar
        </button>
      </div>
      <div style={{ fontSize: 11, color: "#78716C", marginTop: 10, fontWeight: 600, lineHeight: 1.5 }}>
        Envie para {nome} usar no app · Não compartilhe com outros
      </div>
    </div>
  );
}



const inp = { padding:"14px 16px", borderRadius:16, border:"2px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.07)", fontSize:15, fontWeight:700, outline:"none", width:"100%", color:"white" };

function LoginScreen({ onDone }) {
  const [step, setStep]               = useState("splash");
  const [email, setEmail]             = useState("");
  const [pass, setPass]               = useState("");
  const [paiNome, setPaiNome]         = useState("");
  const [escolaNome, setEscolaNome]   = useState("");
  const [filhoNome, setFilhoNome]     = useState("");
  const [filhoGrade, setFilhoGrade]   = useState(null);
  const [filhoAvatar, setFilhoAvatar] = useState(0);
  const [codigoGerado, setCodigoGerado] = useState("");
  const [codigo, setCodigo]           = useState("");
  const [codigoErro, setCodigoErro]   = useState(false);
  const [alunoData, setAlunoData]     = useState(null);

  const confirmarFilho = () => {
    if (!filhoNome.trim() || filhoGrade === null) return;
    const cod = gerarCodigo(filhoNome);
    setCodigoGerado(cod);
    const pais   = Storage.get("mq_pais") || [];
    const filhos = Storage.get("mq_filhos") || [];
    const pai    = pais.find(p => p.email === email) || { email, nome: paiNome, filhos: [] };
    pai.filhos   = [...(pai.filhos || []), cod];
    Storage.set("mq_pais",   [...pais.filter(p => p.email !== email), pai]);
    Storage.set("mq_filhos", [...filhos, { codigo:cod, nome:filhoNome, grade:filhoGrade, avatar:filhoAvatar, xp:0, nivel:1, streak:0, acertos:0, questoes:0, paiEmail:email }]);
    Storage.set("mq_usuario_atual", { tipo:"pai", email, nome:paiNome });
    setStep("codigo_filho");
  };

  const entrarCodigo = () => {
    const filho = (Storage.get("mq_filhos") || []).find(f => f.codigo === codigo.toUpperCase().trim());
    if (!filho) { setCodigoErro(true); return; }
    setCodigoErro(false); setAlunoData(filho);
    Storage.set("mq_usuario_atual", { tipo:"aluno", codigo:filho.codigo, nome:filho.nome, avatar:filho.avatar, grade:filho.grade });
    setStep("bem_vindo_aluno");
  };

  const loginPai = () => {
    const pai = (Storage.get("mq_pais") || []).find(p => p.email === email);
    if (pai) { Storage.set("mq_usuario_atual", { tipo:"pai", email, nome:pai.nome }); onDone("parent"); }
    else { setPaiNome(""); setStep("pai_nome"); }
  };

  const loginProf = () => {
    const prof = (Storage.get("mq_professores") || []).find(p => p.email === email);
    if (prof) { Storage.set("mq_usuario_atual", { tipo:"professor", email, nome:prof.nome, escola:prof.escola }); onDone("teacher"); }
    else { setPaiNome(""); setEscolaNome(""); setStep("prof_nome"); }
  };

  /* SPLASH */
  if (step === "splash") return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"16px 20px 20px", background:"linear-gradient(180deg,#1565C0 0%,#0D47A1 50%,#0A2D6E 100%)", position:"relative", overflow:"hidden" }}>
      {/* Fundo estrelas */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        {[...Array(14)].map((_,i)=>(<div key={i} style={{ position:"absolute", left:`${[8,18,30,45,60,72,85,12,55,78,25,65,40,90][i]}%`, top:`${[10,25,8,18,6,28,14,40,35,50,55,45,60,20][i]}%`, width:i%3===0?3:2, height:i%3===0?3:2, borderRadius:"50%", background:"white", opacity:0.6, animation:`twinkle ${1.5+i*0.2}s ease-in-out infinite`, animationDelay:`${i*0.3}s` }}/>))}
        {[[3,5],[60,3],[82,10]].map(([x,y],i)=>(<div key={i} style={{ position:"absolute", left:`${x}%`, top:`${y}%`, fontSize:22+i*6, opacity:0.2 }}>☁️</div>))}
      </div>

      {/* Logo + título */}
      <div style={{ zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2, marginBottom:8 }}>
        <div style={{ animation:"heroFloat 3s ease-in-out infinite" }}><ShieldLogo s={72}/></div>
        <div style={{ fontSize:48, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", lineHeight:1, textShadow:"0 4px 0 #0033AA, 0 8px 20px #00000066" }}>Math<span style={{ color:C.gold }}>Quest</span></div>
        <div style={{ fontSize:11, color:"#90CAF9", fontWeight:700, letterSpacing:1, textAlign:"center" }}>APRENDER MATEMÁTICA NUNCA FOI TÃO DIVERTIDO!</div>
      </div>

      {/* Mascotes + botão juntos na parte de baixo */}
      <div style={{ display:"flex", justifyContent:"space-around", alignItems:"flex-end", width:"100%", zIndex:1, marginTop:"auto", marginBottom:4 }}>
        <div style={{ animation:"heroFloat 2.5s ease-in-out infinite", animationDelay:"0.3s" }}><MaxHero sz={130}/></div>
        <div style={{ animation:"heroFloat 2.5s ease-in-out infinite", animationDelay:"0.8s" }}><LiaHero sz={120}/></div>
      </div>

      {/* Botão */}
      <button onClick={() => setStep("welcome")} style={{ width:"100%", padding:"15px 0", borderRadius:40, border:"none", zIndex:1, background:"linear-gradient(135deg,#2ECC71,#1B8A3A)", color:"white", fontSize:22, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", letterSpacing:2, boxShadow:"0 6px 0 #145A20", flexShrink:0 }}>COMEÇAR</button>
    </div>
  );

  /* WELCOME */
  if (step === "welcome") {
    const filhosSalvos = Storage.get("mq_filhos") || [];
    return (
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"20px 20px 20px", gap:12, background:"linear-gradient(180deg,#0D47A1,#0A1628)", overflowY:"auto" }}>
        <div style={{ animation:"heroFloat 2s ease-in-out infinite" }}><MaxHero sz={72}/></div>
        <div style={{ fontSize:24, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", textAlign:"center" }}>Quem vai jogar? 👋</div>

        {/* Avatares de alunos cadastrados — acesso direto com 1 toque */}
        {filhosSalvos.length > 0 && (
          <div style={{ width:"100%", background:"rgba(255,255,255,0.07)", borderRadius:20, padding:"12px 14px", border:`2px solid ${C.blue}44` }}>
            <div style={{ fontSize:11, fontWeight:800, color:"#90CAF9", textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>🎒 Toque no seu personagem!</div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
              {filhosSalvos.map((f,i) => (
                <button key={i} onClick={() => {
                  Storage.set("mq_usuario_atual", { tipo:"aluno", codigo:f.codigo, nome:f.nome, avatar:f.avatar, grade:f.grade });
                  onDone("map");
                }} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:"10px 12px", borderRadius:18, border:`3px solid ${C.blue}`, background:`linear-gradient(135deg,${C.blue}33,${C.blue}11)`, cursor:"pointer", minWidth:70, boxShadow:`0 5px 0 #003A99` }}>
                  <div style={{ fontSize:36 }}>{AVATARS[f.avatar]}</div>
                  <div style={{ fontSize:12, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif" }}>{f.nome}</div>
                  <div style={{ fontSize:9, color:"#90CAF9", fontWeight:700 }}>{GRADES[f.grade]}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Botões adultos */}
        <div style={{ display:"flex", flexDirection:"column", gap:8, width:"100%" }}>
          {filhosSalvos.length === 0 && (
            <button onClick={() => setStep("aluno_codigo")} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderRadius:18, cursor:"pointer", background:`linear-gradient(135deg,${C.blue}22,${C.blue}11)`, border:`3px solid ${C.blue}`, boxShadow:`0 5px 0 #003A9988` }}>
              <div style={{ width:46, height:46, borderRadius:14, background:`linear-gradient(135deg,${C.blue},${C.blueDk})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>🎒</div>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:15, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif" }}>Sou Aluno</div>
                <div style={{ fontSize:10, color:"#90CAF9", fontWeight:600 }}>Tenho um código de acesso</div>
              </div>
              <div style={{ fontSize:18, color:C.blue, marginLeft:"auto" }}>→</div>
            </button>
          )}
          {[
            { label:"Sou Pai / Mãe", sub:"Acompanho meus filhos", icon:"👨‍👩‍👧", color:C.gold, shadow:"#B86000", step:"pai_login" },
            { label:"Sou Professor(a)", sub:"Gerencio minhas turmas", icon:"👩‍🏫", color:C.purple, shadow:"#4A00AA", step:"prof_login" }
          ].map((item,i) => (
            <button key={i} onClick={() => setStep(item.step)} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderRadius:18, cursor:"pointer", background:`linear-gradient(135deg,${item.color}22,${item.color}11)`, border:`3px solid ${item.color}`, boxShadow:`0 5px 0 ${item.shadow}88` }}>
              <div style={{ width:46, height:46, borderRadius:14, background:`linear-gradient(135deg,${item.color},${item.color}AA)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{item.icon}</div>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:15, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif" }}>{item.label}</div>
                <div style={{ fontSize:10, color:"#90CAF9", fontWeight:600 }}>{item.sub}</div>
              </div>
              <div style={{ fontSize:18, color:item.color, marginLeft:"auto" }}>→</div>
            </button>
          ))}
          {filhosSalvos.length > 0 && (
            <button onClick={() => setStep("aluno_codigo")} style={{ padding:"10px", borderRadius:14, border:`2px solid rgba(255,255,255,0.15)`, background:"transparent", color:"#90CAF9", fontSize:12, fontWeight:700, cursor:"pointer" }}>
              + Entrar com outro código
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ALUNO CÓDIGO */
  if (step === "aluno_codigo") return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"28px 24px", gap:16, background:"linear-gradient(180deg,#0D47A1,#0A1628)" }}>
      <button onClick={() => setStep("welcome")} style={{ alignSelf:"flex-start", background:"none", border:"none", color:C.blue, fontSize:14, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer" }}>◀ Voltar</button>
      <div style={{ fontSize:60, animation:"heroFloat 2s ease-in-out infinite" }}>🎒</div>
      <div style={{ fontSize:24, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", textAlign:"center" }}>Qual é o seu código?</div>
      <div style={{ fontSize:13, color:"#90CAF9", fontWeight:600, textAlign:"center", lineHeight:1.6 }}>Peça para seu pai ou mãe te mostrar! 😊</div>
      <input value={codigo} onChange={e => { setCodigo(e.target.value.toUpperCase()); setCodigoErro(false); }} placeholder="Ex: CAIO-1234" maxLength={9}
        style={{ ...inp, textAlign:"center", border:`3px solid ${codigoErro ? C.red : codigo.length > 0 ? C.gold : "rgba(255,255,255,0.15)"}`, fontSize:26, letterSpacing:5 }} />
      {codigoErro && (
        <div style={{ background:`${C.red}22`, border:`2px solid ${C.red}55`, borderRadius:16, padding:"10px 16px", width:"100%", textAlign:"center" }}>
          <div style={{ fontSize:14, fontWeight:900, color:C.red, fontFamily:"'Fredoka One',sans-serif" }}>😅 Código não encontrado!</div>
          <div style={{ fontSize:11, color:"rgba(255,107,107,0.8)", fontWeight:600, marginTop:2 }}>Pede para seu pai ou mãe verificar</div>
        </div>
      )}
      <button onClick={entrarCodigo} style={{ width:"100%", padding:16, borderRadius:20, border:"none", background:codigo.length >= 6 ? `linear-gradient(135deg,${C.gold},${C.goldDk})` : "rgba(255,255,255,0.1)", color:codigo.length >= 6 ? C.dark : "#4A7AB5", fontSize:18, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:codigo.length >= 6 ? "pointer" : "not-allowed", boxShadow:codigo.length >= 6 ? `0 5px 0 #B86000` : "none", marginTop:"auto" }}>🚀 Entrar no jogo!</button>
    </div>
  );

  /* BEM VINDO ALUNO */
  if (step === "bem_vindo_aluno" && alunoData) return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:14, padding:28, background:"linear-gradient(160deg,#0D47A1,#1E90FF)" }}>
      <div style={{ fontSize:56, animation:"bounce 0.8s ease-in-out infinite" }}>🎉</div>
      <div style={{ animation:"heroFloat 2s ease-in-out infinite" }}><MaxHero sz={90} mood="wow"/></div>
      <div style={{ fontSize:26, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", textAlign:"center" }}>Olá, {alunoData.nome}! 👋</div>
      <div style={{ display:"flex", gap:10, width:"100%" }}>
        {[{ i:AVATARS[alunoData.avatar], v:alunoData.nome, d:"Herói" },{ i:"⚡", v:`${alunoData.xp} XP`, d:"Pontos" },{ i:"🔥", v:`${alunoData.streak}d`, d:"Sequência" }].map((s,i) => (
          <div key={i} style={{ flex:1, background:"rgba(255,255,255,0.15)", borderRadius:16, padding:"12px 6px", textAlign:"center", border:"2px solid rgba(255,255,255,0.25)" }}>
            <div style={{ fontSize:22 }}>{s.i}</div>
            <div style={{ fontSize:13, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif" }}>{s.v}</div>
            <div style={{ fontSize:9, color:"#BBDEFB" }}>{s.d}</div>
          </div>
        ))}
      </div>
      <button onClick={() => onDone("map")} style={{ width:"100%", padding:16, borderRadius:20, border:"none", background:`linear-gradient(135deg,${C.gold},${C.goldDk})`, color:C.dark, fontSize:18, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", boxShadow:`0 5px 0 #B86000` }}>🏠 Jogar agora!</button>
    </div>
  );

  /* PAI LOGIN */
  if (step === "pai_login") return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"24px", gap:14, background:"linear-gradient(180deg,#0D47A1,#0A1628)", overflowY:"auto" }}>
      <button onClick={() => setStep("welcome")} style={{ background:"none", border:"none", color:C.blue, fontSize:14, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", textAlign:"left", padding:0 }}>◀ Voltar</button>
      <div style={{ textAlign:"center", fontSize:56, animation:"heroFloat 2s ease-in-out infinite" }}>👨‍👩‍👧</div>
      <div style={{ fontSize:24, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", textAlign:"center" }}>Acesso dos Pais</div>
      {[["📧 E-mail","email","seu@email.com",email,setEmail],["🔒 Senha","password","Mínimo 6 caracteres",pass,setPass]].map(([lbl,tp,ph,val,set],i) => (
        <div key={i} style={{ display:"flex", flexDirection:"column", gap:5 }}>
          <label style={{ fontSize:11, fontWeight:800, color:"#90CAF9", textTransform:"uppercase", letterSpacing:1 }}>{lbl}</label>
          <input value={val} onChange={e => set(e.target.value)} placeholder={ph} type={tp} style={inp}/>
        </div>
      ))}
      <button onClick={loginPai} style={{ width:"100%", padding:15, borderRadius:20, border:"none", background:`linear-gradient(135deg,${C.gold},${C.goldDk})`, color:C.dark, fontSize:17, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", boxShadow:`0 5px 0 #B86000` }}>👨‍👩‍👧 Entrar / Cadastrar</button>
    </div>
  );

  /* PAI NOME */
  if (step === "pai_nome") return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"24px", gap:14, background:"linear-gradient(180deg,#0D47A1,#0A1628)" }}>
      <div style={{ fontSize:52, animation:"heroFloat 2s ease-in-out infinite" }}>👋</div>
      <div style={{ fontSize:22, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", textAlign:"center" }}>Como você se chama?</div>
      <input value={paiNome} onChange={e => setPaiNome(e.target.value)} placeholder="Seu nome..." style={{ ...inp, textAlign:"center", fontSize:20, border:`3px solid ${paiNome ? C.gold : "rgba(255,255,255,0.1)"}` }}/>
      <button onClick={() => paiNome.trim() && setStep("add_filho")} style={{ width:"100%", padding:15, borderRadius:20, border:"none", marginTop:"auto", background:paiNome.trim() ? `linear-gradient(135deg,${C.gold},${C.goldDk})` : "rgba(255,255,255,0.1)", color:paiNome.trim() ? C.dark : "#4A7AB5", fontSize:17, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:paiNome.trim() ? "pointer" : "not-allowed", boxShadow:paiNome.trim() ? `0 5px 0 #B86000` : "none" }}>Próximo →</button>
    </div>
  );

  /* ADD FILHO */
  if (step === "add_filho") return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"20px 24px 28px", gap:12, background:"linear-gradient(180deg,#0D47A1,#0A1628)", overflowY:"auto" }}>
      <div style={{ fontSize:44, animation:"heroFloat 2s ease-in-out infinite" }}>👶</div>
      <div style={{ fontSize:20, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", textAlign:"center" }}>Dados do seu filho(a)</div>
      <div style={{ display:"flex", flexDirection:"column", gap:5, width:"100%" }}>
        <label style={{ fontSize:11, fontWeight:800, color:"#90CAF9", textTransform:"uppercase", letterSpacing:1 }}>🧒 Nome</label>
        <input value={filhoNome} onChange={e => setFilhoNome(e.target.value)} placeholder="Ex: Caio, Sofia..." style={{ ...inp, border:`2px solid ${filhoNome ? C.gold : "rgba(255,255,255,0.1)"}` }}/>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:5, width:"100%" }}>
        <label style={{ fontSize:11, fontWeight:800, color:"#90CAF9", textTransform:"uppercase", letterSpacing:1 }}>📚 Série do filho(a)</label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {GRADES.map((g,i) => (<button key={i} onClick={() => setFilhoGrade(i)} style={{ padding:"9px 12px", borderRadius:14, cursor:"pointer", background:filhoGrade===i?`linear-gradient(135deg,${C.blue},${C.blueDk})`:"rgba(255,255,255,0.07)", color:"white", border:filhoGrade===i?`2px solid #90CAF9`:"2px solid rgba(255,255,255,0.1)", fontFamily:"'Fredoka One',sans-serif", fontSize:12, fontWeight:900, boxShadow:filhoGrade===i?`0 4px 0 #003A99`:"none" }}>{["📗","📘","📙","📕","📓"][i]} {g}</button>))}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:5, width:"100%" }}>
        <label style={{ fontSize:11, fontWeight:800, color:"#90CAF9", textTransform:"uppercase", letterSpacing:1 }}>🎭 Avatar</label>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {AVATARS.map((av,i) => (<button key={i} onClick={() => setFilhoAvatar(i)} style={{ width:50, height:50, borderRadius:14, fontSize:24, cursor:"pointer", background:filhoAvatar===i?`${C.gold}33`:"rgba(255,255,255,0.07)", border:filhoAvatar===i?`3px solid ${C.gold}`:"2px solid rgba(255,255,255,0.1)", transform:filhoAvatar===i?"scale(1.1)":"scale(1)", transition:"all 0.2s" }}>{av}</button>))}
        </div>
      </div>
      <button onClick={confirmarFilho} style={{ width:"100%", padding:14, borderRadius:20, border:"none", background:filhoNome.trim()&&filhoGrade!==null?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)", color:filhoNome.trim()&&filhoGrade!==null?C.dark:"#4A7AB5", fontSize:16, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:filhoNome.trim()&&filhoGrade!==null?"pointer":"not-allowed", boxShadow:filhoNome.trim()&&filhoGrade!==null?`0 5px 0 #B86000`:"none", marginTop:4 }}>✨ Gerar código</button>
    </div>
  );

  /* CÓDIGO DO FILHO */
  if (step === "codigo_filho") return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:14, padding:28, background:"linear-gradient(160deg,#0D47A1,#1E90FF)" }}>
      <div style={{ fontSize:50 }}>🎉</div>
      <div style={{ fontSize:22, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", textAlign:"center" }}>Código criado para {filhoNome}!</div>
      <CodigoCard codigo={codigoGerado} nome={filhoNome} grade={filhoGrade} avatar={filhoAvatar}/>
      <button onClick={() => onDone("parent")} style={{ width:"100%", padding:16, borderRadius:20, border:"none", background:`linear-gradient(135deg,${C.gold},${C.goldDk})`, color:C.dark, fontSize:17, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", boxShadow:`0 5px 0 #B86000` }}>👨‍👩‍👧 Ir para meu painel</button>
    </div>
  );

  /* PROF LOGIN */
  if (step === "prof_login") return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"24px", gap:14, background:"linear-gradient(180deg,#2D0060,#0A1628)", overflowY:"auto" }}>
      <button onClick={() => setStep("welcome")} style={{ background:"none", border:"none", color:C.purple, fontSize:14, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", textAlign:"left", padding:0 }}>◀ Voltar</button>
      <div style={{ textAlign:"center", fontSize:56, animation:"heroFloat 2s ease-in-out infinite" }}>👩‍🏫</div>
      <div style={{ fontSize:24, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", textAlign:"center" }}>Acesso do Professor</div>
      {[["📧 E-mail","email","professor@escola.com",email,setEmail],["🔒 Senha","password","Mínimo 6 caracteres",pass,setPass]].map(([lbl,tp,ph,val,set],i) => (
        <div key={i} style={{ display:"flex", flexDirection:"column", gap:5 }}>
          <label style={{ fontSize:11, fontWeight:800, color:"#CE93D8", textTransform:"uppercase", letterSpacing:1 }}>{lbl}</label>
          <input value={val} onChange={e => set(e.target.value)} placeholder={ph} type={tp} style={inp}/>
        </div>
      ))}
      <button onClick={loginProf} style={{ width:"100%", padding:15, borderRadius:20, border:"none", background:`linear-gradient(135deg,${C.purple},#A855F7)`, color:"white", fontSize:17, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", boxShadow:`0 5px 0 #4A00AA` }}>👩‍🏫 Entrar / Cadastrar</button>
    </div>
  );

  /* PROF NOME */
  if (step === "prof_nome") return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"24px", gap:14, background:"linear-gradient(180deg,#2D0060,#0A1628)" }}>
      <div style={{ fontSize:52, animation:"heroFloat 2s ease-in-out infinite" }}>👩‍🏫</div>
      <div style={{ fontSize:20, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", textAlign:"center" }}>Dados do professor(a)</div>
      {[["👤 Seu nome","Profa. Maria Silva",paiNome,setPaiNome],["🏫 Nome da escola","E.E. Santos Dumont",escolaNome,setEscolaNome]].map(([lbl,ph,val,set],i) => (
        <div key={i} style={{ display:"flex", flexDirection:"column", gap:5, width:"100%" }}>
          <label style={{ fontSize:11, fontWeight:800, color:"#CE93D8", textTransform:"uppercase", letterSpacing:1 }}>{lbl}</label>
          <input value={val} onChange={e => set(e.target.value)} placeholder={ph} style={{ ...inp, border:`2px solid ${val ? C.purple : "rgba(255,255,255,0.1)"}` }}/>
        </div>
      ))}
      <button onClick={() => {
        if (!paiNome.trim() || !escolaNome.trim()) return;
        const profs = Storage.get("mq_professores") || [];
        Storage.set("mq_professores", [...profs.filter(p => p.email !== email), { email, nome:paiNome, escola:escolaNome, turmas:[] }]);
        Storage.set("mq_usuario_atual", { tipo:"professor", email, nome:paiNome, escola:escolaNome });
        onDone("teacher");
      }} style={{ width:"100%", padding:15, borderRadius:20, border:"none", marginTop:"auto", background:paiNome.trim()&&escolaNome.trim()?`linear-gradient(135deg,${C.purple},#A855F7)`:"rgba(255,255,255,0.1)", color:"white", fontSize:17, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:paiNome.trim()&&escolaNome.trim()?"pointer":"not-allowed", boxShadow:paiNome.trim()&&escolaNome.trim()?`0 5px 0 #4A00AA`:"none" }}>🚀 Acessar painel!</button>
    </div>
  );

  return null;
}



const NODES=[
  {id:1,x:50,y:82,label:"Soma",   icon:"➕",stars:0,state:"done"},
  {id:2,x:72,y:67,label:"Subtr.", icon:"➖",stars:0,state:"done"},
  {id:3,x:52,y:52,label:"Mult.",  icon:"✖️",stars:0,state:"current"},
  {id:4,x:28,y:38,label:"Divisão",icon:"➗",stars:0,state:"locked"},
  {id:5,x:60,y:24,label:"Frações",icon:"½", stars:0,state:"locked"},
  {id:6,x:38,y:11,label:"%",      icon:"%", stars:0,state:"locked"},
];

function MapScreen({ go, toast }) {
  const usuario = Storage.get("mq_usuario_atual");
  const nomeAluno = usuario?.nome || "Herói";
  const [regiaoAtiva, setRegiaoAtiva] = useState(0);

  // Progresso real do aluno
  const filhosLista = Storage.get("mq_filhos") || [];
  const alunoAtual = filhosLista.find(f => f.codigo === usuario?.codigo);
  const fasesCompletas = alunoAtual?.fasesCompletas || 0;

  const REGIOES = [
    {
      id:0, nome:"1. Reino dos Números", serie:"1º Ano", cor:"#2E7D32", corClaro:"#4CAF50",
      bg:"linear-gradient(135deg,#1B5E20,#2E7D32)", emoji:"🏰",
      temas:["Contagem","Números","Soma","Subtração"],
      fases:[1,2,3,4,5].map(n=>({
        n,
        stars: (alunoAtual?.starsMap||{})[n] || 0,
        done: n < fasesCompletas+1,
        current: n === Math.min(fasesCompletas+1, 5),
        locked: n > fasesCompletas+1,
      }))
    },
    {
      id:1, nome:"2. Floresta da Multiplicação", serie:"2º Ano", cor:"#1565C0", corClaro:"#42A5F5",
      bg:"linear-gradient(135deg,#0D47A1,#1565C0)", emoji:"🍄",
      temas:["Adição","Subtração","Multiplicação","Problemas"],
      fases:[
        {n:6,stars:0,locked:true},{n:7,stars:0,locked:true},{n:8,stars:0,locked:true},
        {n:9,stars:0,locked:true},{n:10,stars:0,locked:true}
      ]
    },
    {
      id:2, nome:"3. Ilha do Castelo Mágico", serie:"3º Ano", cor:"#6A1B9A", corClaro:"#9C27B0",
      bg:"linear-gradient(135deg,#4A148C,#6A1B9A)", emoji:"🔮",
      temas:["Multiplicação","Divisão","Frações","Problemas"],
      fases:[
        {n:11,stars:0,locked:true},{n:12,stars:0,locked:true},{n:13,stars:0,locked:true},
        {n:14,stars:0,locked:true},{n:15,stars:0,locked:true}
      ]
    },
    {
      id:3, nome:"4. Montanha das Operações", serie:"4º Ano", cor:"#0277BD", corClaro:"#29B6F6",
      bg:"linear-gradient(135deg,#01579B,#0277BD)", emoji:"🏔️",
      temas:["Frações","Decimais","Medidas","Geometria"],
      fases:[
        {n:16,stars:0,locked:true},{n:17,stars:0,locked:true},{n:18,stars:0,locked:true},
        {n:19,stars:0,locked:true},{n:20,stars:0,locked:true}
      ]
    },
    {
      id:4, nome:"5. Arena dos Desafios", serie:"5º Ano", cor:"#BF360C", corClaro:"#FF5722",
      bg:"linear-gradient(135deg,#870000,#BF360C)", emoji:"🌋",
      temas:["Frações Avançadas","Porcentagem","Razão e Proporção","Desafios Lógicos"],
      fases:[
        {n:21,stars:0,locked:true},{n:22,stars:0,locked:true},{n:23,stars:0,locked:true},
        {n:24,stars:0,locked:true},{n:25,stars:0,locked:true}
      ]
    },
  ];

  const regiao = REGIOES[regiaoAtiva];

  const BG_COLORS = [
    "linear-gradient(180deg,#87CEEB 0%,#B0E8FF 30%,#76C442 55%,#4E9227 100%)",
    "linear-gradient(180deg,#1A237E 0%,#283593 30%,#2E7D32 60%,#1B5E20 100%)",
    "linear-gradient(180deg,#311B92 0%,#4527A0 35%,#4A148C 65%,#212121 100%)",
    "linear-gradient(180deg,#0D47A1 0%,#01579B 30%,#E0E0E0 60%,#BDBDBD 100%)",
    "linear-gradient(180deg,#212121 0%,#4E342E 30%,#BF360C 60%,#870000 100%)",
  ];

  const BIOME_EMOJIS = [
    {trees:["🌲","🌳","🌿"], deco:["🏰","⛅","🌸"], ground:"#4CAF50"},
    {trees:["🍄","🌲","🌿"], deco:["🏯","🌙","💧"], ground:"#2E7D32"},
    {trees:["🔮","🌲","✨"], deco:["🏰","⭐","🌙"], ground:"#4A148C"},
    {trees:["❄️","🏔️","💎"], deco:["🏯","⛄","🔷"], ground:"#546E7A"},
    {trees:["🌋","💀","🔥"], deco:["🏰","☄️","💥"], ground:"#4E342E"},
  ];

  const biome = BIOME_EMOJIS[regiaoAtiva];

  return (
    <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
      {/* MAPA — tela cheia */}
      <div style={{ position:"absolute", inset:0 }}>
        {/* Background */}
        <div style={{ position:"absolute", inset:0, background:BG_COLORS[regiaoAtiva], transition:"background 0.5s" }}/>

        {/* Sol / Lua */}
        {regiaoAtiva <= 1 && <div style={{ position:"absolute", top:"6%", right:"8%", width:48, height:48, borderRadius:"50%", background:"radial-gradient(circle,#FFF176,#FFEE58,#FF8F00)", boxShadow:"0 0 30px #FFEE5888" }}/>}
        {regiaoAtiva >= 2 && <div style={{ position:"absolute", top:"6%", right:"8%", fontSize:36 }}>🌙</div>}

        {/* Nuvens */}
        {regiaoAtiva <= 1 && [[4,6],[42,4],[76,8]].map(([x,y],i)=>(
          <div key={i} style={{ position:"absolute", left:`${x}%`, top:`${y}%`, animation:`cloudDrift ${4+i}s ease-in-out infinite` }}>
            <div style={{ width:50+i*15, height:22+i*5, borderRadius:50, background:"white", opacity:0.85, position:"relative" }}>
              <div style={{ position:"absolute", top:-8, left:8, width:28+i*6, height:24+i*4, borderRadius:50, background:"white" }}/>
            </div>
          </div>
        ))}

        {/* Decoração bioma */}
        {[[5,60],[8,72],[88,58],[92,70],[2,82],[90,82]].map(([x,y],i)=>(
          <div key={i} style={{ position:"absolute", left:`${x}%`, top:`${y}%`, fontSize:18+i*2, filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
            {biome.trees[i%biome.trees.length]}
          </div>
        ))}

        {/* Edificio/castelo do reino */}
        <div style={{ position:"absolute", top:"8%", left:"50%", transform:"translateX(-50%)", textAlign:"center" }}>
          <div style={{ fontSize:52, filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.5))", animation:"heroFloat 3s ease-in-out infinite" }}>
            {biome.deco[0]}
          </div>
        </div>

        {/* Banner do reino */}
        <div style={{ position:"absolute", top:"22%", left:"50%", transform:"translateX(-50%)", zIndex:10, textAlign:"center", width:"90%" }}>
          <div style={{ background:regiao.bg, borderRadius:24, padding:"8px 20px", border:`3px solid ${regiao.corClaro}`, boxShadow:`0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px ${regiao.corClaro}44`, display:"inline-block" }}>
            <div style={{ fontSize:13, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", textShadow:"0 2px 4px rgba(0,0,0,0.4)" }}>{regiao.nome}</div>
            <div style={{ fontSize:10, color:regiao.corClaro, fontWeight:700 }}>{regiao.serie}</div>
          </div>
        </div>

        {/* FASES — layout em zigue-zague */}
        <div style={{ position:"absolute", top:"32%", left:0, right:0, bottom:"8%", overflow:"hidden" }}>
          {/* Caminho pontilhado SVG */}
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} preserveAspectRatio="none">
            <path
              d="M 15% 85% C 25% 75% 40% 90% 50% 78% S 70% 68% 85% 75% S 90% 50% 75% 42% S 55% 30% 50% 20% S 30% 12% 20% 22%"
              stroke="white" strokeWidth="3" strokeDasharray="8 6" fill="none" opacity="0.5"
            />
          </svg>

          {/* Fases posicionadas */}
          {[
            [12,85],[30,65],[52,80],[70,60],[88,75],
          ].map(([x,y],i)=>{
            const fase = regiao.fases[i];
            if(!fase) return null;
            const isCurrent = fase.current;
            const isDone = fase.done;
            const isLocked = fase.locked;

            return (
              <div key={i}
                onClick={()=>{
                  if(isLocked){toast("🔒",`Complete a fase ${fase.n-1} primeiro!`,"info");return;}
                  go("quiz");
                }}
                style={{ position:"absolute", left:`${x}%`, top:`${y}%`, transform:"translate(-50%,-50%)",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:3,
                  cursor:isLocked?"not-allowed":"pointer", zIndex:10 }}>

                {/* Brilho fase atual */}
                {isCurrent && <div style={{ position:"absolute", width:72, height:72, borderRadius:"50%",
                  background:`radial-gradient(circle,${regiao.corClaro}66,transparent 70%)`,
                  animation:"ringPulse 1.6s ease-in-out infinite",
                  top:"50%", left:"50%", transform:"translate(-50%,-50%) translateY(-20px)" }}/>}

                {/* Círculo da fase */}
                <div style={{
                  width:52, height:52, borderRadius:"50%",
                  background: isCurrent ? `linear-gradient(135deg,${C.gold},${C.goldDk})`
                    : isDone ? `linear-gradient(135deg,${regiao.corClaro},${regiao.cor})`
                    : "linear-gradient(135deg,#546E7A,#37474F)",
                  border: isCurrent ? `4px solid #FFF9C4`
                    : isDone ? `4px solid rgba(255,255,255,0.5)`
                    : "4px solid #607D8B",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize: isLocked ? 22 : 20, fontWeight:900,
                  color: isCurrent ? C.dark : "white",
                  fontFamily:"'Fredoka One',sans-serif",
                  boxShadow: isCurrent ? `0 0 24px ${C.gold}AA, 0 6px 16px rgba(0,0,0,0.5)`
                    : isDone ? `0 4px 12px rgba(0,0,0,0.4)`
                    : "0 3px 8px rgba(0,0,0,0.4)",
                }}>
                  {isLocked ? "🔒" : fase.n}
                </div>

                {/* Estrelas */}
                {(isDone || isCurrent) && <div style={{ display:"flex", gap:1 }}>
                  {[1,2,3].map(s=><Star key={s} on={s <= (fase.stars||0)} sz={12}/>)}
                </div>}

                {/* Max na fase atual */}
                {isCurrent && (
                  <div style={{ marginTop:-2, animation:"heroFloat 1.2s ease-in-out infinite" }}>
                    <MaxHero sz={38}/>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Temas do reino */}
        <div style={{ position:"absolute", bottom:"15%", right:"4%", zIndex:10 }}>
          <div style={{ background:"rgba(0,0,0,0.75)", borderRadius:16, padding:"8px 12px", border:`2px solid ${regiao.corClaro}55`, maxWidth:130 }}>
            <div style={{ fontSize:10, fontWeight:900, color:regiao.corClaro, fontFamily:"'Fredoka One',sans-serif", marginBottom:4 }}>📚 Temas</div>
            {regiao.temas.map((t,i)=>(
              <div key={i} style={{ fontSize:9, color:"rgba(255,255,255,0.85)", fontWeight:700, lineHeight:1.6 }}>• {t}</div>
            ))}
          </div>
        </div>

        {/* Missão do dia */}
        <div style={{ position:"absolute", bottom:8, left:8, right:8, background:"linear-gradient(135deg,#4527A0,#6A1B9A)", borderRadius:18, padding:"10px 14px", border:"2px solid #CE93D8", display:"flex", alignItems:"center", gap:10, boxShadow:"0 6px 24px rgba(0,0,0,0.5)" }}>
          <div style={{ fontSize:26, animation:"float 2s ease-in-out infinite" }}>⚡</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12, fontWeight:900, color:C.gold, fontFamily:"'Fredoka One',sans-serif" }}>OLÁ, {nomeAluno.toUpperCase()}!</div>
            <div style={{ fontSize:10, color:"#E1BEE7", fontWeight:700 }}>Complete 5 desafios · Ganhe 200 moedas</div>
          </div>
          <button onClick={()=>go("quiz")} style={{ background:`linear-gradient(135deg,${C.gold},${C.goldDk})`, border:"2px solid #FFF9C4", borderRadius:16, padding:"6px 14px", fontSize:12, fontWeight:900, color:C.dark, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", boxShadow:`0 4px 0 #B86000` }}>IR!</button>
        </div>
      </div>

      {/* SELETOR DE REGIÕES — overlay flutuante no topo */}
      <div style={{ position:"absolute", top:4, left:0, right:0, zIndex:20, display:"flex", justifyContent:"center", pointerEvents:"none" }}>
        <div style={{ display:"flex", gap:4, background:"rgba(0,0,0,0.6)", borderRadius:20, padding:"4px 8px", backdropFilter:"blur(8px)", pointerEvents:"all" }}>
          {REGIOES.map((r,i)=>{
            const ativo = regiaoAtiva === i;
            const bloqueado = i > 0;
            return (
              <button key={i} onClick={()=>{
                if(bloqueado){toast("🔒","Complete o reino anterior primeiro!","info");return;}
                setRegiaoAtiva(i);
              }} style={{
                display:"flex", flexDirection:"column", alignItems:"center", gap:1,
                padding:"4px 8px", borderRadius:12,
                border:`2px solid ${ativo ? r.corClaro : "transparent"}`,
                background: ativo ? r.bg : "transparent",
                cursor:"pointer", transition:"all 0.2s",
                opacity: bloqueado && !ativo ? 0.5 : 1,
              }}>
                <span style={{ fontSize:16 }}>{bloqueado ? "🔒" : r.emoji}</span>
                <span style={{ fontSize:8, fontWeight:900, color: ativo ? "white" : "#90CAF9", fontFamily:"'Fredoka One',sans-serif" }}>
                  {r.serie}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


// Conteúdo do 1º Ano: Contagem, Números, Soma, Subtração com 3 níveis
const QM={
  contagem:{label:"Contagem 🔢",color:"#2ECC71",bg:"linear-gradient(180deg,#0A1628,#061a0a)"},
  soma:    {label:"Soma ➕",    color:C.red,   bg:"linear-gradient(180deg,#0A1628,#1a0808)"},
  sub:     {label:"Subtração ➖",color:C.orange,bg:"linear-gradient(180deg,#0A1628,#1a0f00)"},
  numeros: {label:"Números 🔢", color:C.blue,  bg:"linear-gradient(180deg,#0A1628,#001020)"},
};

// ═══════════════════════════════════════════
// QUESTÕES 100% VISUAIS — sem texto longo
// Tipos: contagem, numeros, soma, sub
// nivel: 1=básico, 2=médio, 3=avançado
// ═══════════════════════════════════════════
const EMOJIS_CONTAGEM=["🍎","🐶","🦋","🎈","🍭","⭐","🐸","🌸","🍊","🎀"];

function genQNivel(mode, nivel=1){
  const max = nivel===1?5:nivel===2?10:20;

  // ── CONTAGEM: mostra emojis, responde com número ──
  if(mode==="contagem"){
    const a = Math.max(1, Math.floor(Math.random()*max)+1);
    const em = EMOJIS_CONTAGEM[Math.floor(Math.random()*EMOJIS_CONTAGEM.length)];
    const opts=[a];
    while(opts.length<4){
      const r=a+Math.floor(Math.random()*4)-(a>2?2:0);
      if(r>0&&r!==a&&!opts.includes(r))opts.push(r);
    }
    // q.visual = array de emojis para renderizar
    return{
      tipo:"contagem",
      emojis: Array(a).fill(em),
      q:`Quantos ${em} você vê?`,
      ans:a,
      opts:opts.slice(0,4).sort(()=>Math.random()-0.5)
    };
  }

  // ── NÚMEROS: identifica o numeral visualmente ──
  if(mode==="numeros"){
    const tipos=["sequencia","maior","menor","igual"];
    const t=tipos[Math.floor(Math.random()*tipos.length)];
    const a=Math.max(1,Math.floor(Math.random()*max)+1);

    if(t==="sequencia"){
      // Qual número vem depois?
      const ans=a+1;
      const opts=sh([ans,ans+1,ans-1,ans+2]).slice(0,4);
      return{tipo:"numeros_seq",q:`${a} → ?`,qVisual:[a,"→","?"],ans,opts};
    }
    if(t==="maior"){
      // Qual é o maior?
      const nums=[a,a+2,a-1,a+1].filter(n=>n>0);
      const ans=Math.max(...nums);
      return{tipo:"numeros_maior",q:"🔼 Maior",qVisual:["🔼","Qual é o maior?"],ans,opts:sh(nums).slice(0,4)};
    }
    // Identifica o numeral
    const ans=a;
    const opts=sh([a,a+1,a-1>0?a-1:a+2,a+2]).slice(0,4);
    return{tipo:"numeros",q:`${a}`,qVisual:["🔢",a],ans,opts};
  }

  // ── SOMA: visual com emojis ──
  if(mode==="soma"){
    const a=Math.max(1,Math.floor(Math.random()*max)+1);
    const b=Math.max(1,Math.floor(Math.random()*(max-a+1))+1);
    const ans=a+b;
    const em=EMOJIS_CONTAGEM[Math.floor(Math.random()*EMOJIS_CONTAGEM.length)];
    const opts=sh([ans,ans+1,ans-1,ans+2]).filter(n=>n>0).slice(0,4);
    return{tipo:"soma",emojisA:Array(a).fill(em),emojisB:Array(b).fill(em),q:`${a} + ${b}`,ans,opts};
  }

  // ── SUBTRAÇÃO: visual com emojis riscados ──
  if(mode==="sub"){
    const a=Math.max(2,Math.floor(Math.random()*max)+2);
    const b=Math.max(1,Math.floor(Math.random()*(a-1))+1);
    const ans=a-b;
    const em=EMOJIS_CONTAGEM[Math.floor(Math.random()*EMOJIS_CONTAGEM.length)];
    const opts=sh([ans,ans+1,ans-1>0?ans-1:ans+2,ans+2]).filter(n=>n>=0).slice(0,4);
    return{tipo:"sub",emojisTotal:Array(a).fill(em),retirar:b,q:`${a} - ${b}`,ans,opts};
  }

  return genQ(mode);
}
function sh(a){return[...a].sort(()=>Math.random()-0.5);}
function genQ(m){
  if(m==="soma"){const a=Math.floor(Math.random()*20)+1,b=Math.floor(Math.random()*20)+1,ans=a+b;return{q:`${a} + ${b}`,ans,opts:sh([ans,ans-2,ans+3,ans-1])};}
  if(m==="sub"){const a=Math.floor(Math.random()*20)+5,b=Math.floor(Math.random()*a)+1,ans=a-b;return{q:`${a} − ${b}`,ans,opts:sh([ans,ans+2,ans-2,ans+1])};}
  if(m==="mult"){const a=Math.floor(Math.random()*9)+2,b=Math.floor(Math.random()*9)+2,ans=a*b;return{q:`${a} × ${b}`,ans,opts:sh([ans,ans-a,ans+b,ans+a])};}
  const b=Math.floor(Math.random()*9)+2,ans=Math.floor(Math.random()*9)+1,a=b*ans;return{q:`${a} ÷ ${b}`,ans,opts:sh([ans,ans+1,ans-1,ans+2])};
}
const TOTAL=5;
const OC=[C.red,C.green,C.purple,C.orange];
function QuizScreen({ go, toast, showBurst }) {
  const [mode,setMode]=useState(null);const [qi,setQi]=useState(0);const [q,setQ]=useState(null);
  const [sel,setSel]=useState(null);const [done,setDone]=useState(false);
  const [hp,setHp]=useState(3);const [xp,setXp]=useState(0);const [end,setEnd]=useState(false);
  const [acertos,setAcertos]=useState(0); // conta acertos da rodada
  const ACERTOS_NECESSARIOS = 5; // precisa de 5 acertos para passar de fase

  const [nivel,setNivel]=useState(1);
  const start=(m,nv=1)=>{setMode(m);setNivel(nv);setQ(genQNivel(m,nv));setQi(0);setSel(null);setDone(false);setHp(3);setXp(0);setEnd(false);setAcertos(0);};

  const pick=(opt)=>{
    if(sel!==null)return;
    setSel(opt);setDone(true);
    if(opt===q.ans){
      const nacc=acertos+1; setAcertos(nacc);
      const nx=xp+100; setXp(nx); toast("⭐",`${nacc}/${ACERTOS_NECESSARIOS} acertos!`,"xp");
      if(nx%300===0){toast("🪙","+50 Moedas!","coin");showBurst();}
      // Level up check
      const novoNivel=Math.floor(nx/500)+1;
      const nivelAnterior=Math.floor((nx-100)/500)+1;
      if(novoNivel>nivelAnterior){toast("🆙",`NÍVEL ${novoNivel}! 🎉`,"level");showBurst();}
      const atual=Storage.get("mq_usuario_atual");
      if(atual?.codigo){
        const filhos=Storage.get("mq_filhos")||[];
        const idx=filhos.findIndex(f=>f.codigo===atual.codigo);
        if(idx>=0){
          filhos[idx].xp=(filhos[idx].xp||0)+100;
          filhos[idx].questoes=(filhos[idx].questoes||0)+1;
          filhos[idx].acertos=(filhos[idx].acertos||0)+1;
          filhos[idx].moedas=(filhos[idx].moedas||0)+10; // 10 moedas por acerto
          Storage.set("mq_filhos",filhos);
        }
      }
      // Verifica se completou a fase (5 acertos) - salva progresso
      if(nacc>=ACERTOS_NECESSARIOS){
        const atual2=Storage.get("mq_usuario_atual");
        if(atual2?.codigo){
          const filhos2=Storage.get("mq_filhos")||[];
          const idx2=filhos2.findIndex(f=>f.codigo===atual2.codigo);
          if(idx2>=0){
            const fc=filhos2[idx2].fasesCompletas||0;
            filhos2[idx2].fasesCompletas=fc+1;
            // Salva estrelas por fase
            const stars=filhos2[idx2].starsMap||{};
            stars[fc+1]=3; // 3 estrelas por completar com 5 acertos
            filhos2[idx2].starsMap=stars;
            // Bônus de fase completa: 50 moedas + 1 gema
            filhos2[idx2].moedas=(filhos2[idx2].moedas||0)+50;
            filhos2[idx2].gemas=(filhos2[idx2].gemas||0)+1;
            Storage.set("mq_filhos",filhos2);
          }
        }
      }
      // Avança automaticamente após 0.8s se acertou
      setTimeout(()=>next(nacc),800);
    } else {
      const nh=hp-1; setHp(nh); toast("❤️","Errou! Tenta de novo!","info");
      if(nh<=0)setTimeout(()=>setEnd(true),1200);
      const atual=Storage.get("mq_usuario_atual");
      if(atual?.codigo){const filhos=Storage.get("mq_filhos")||[];const idx=filhos.findIndex(f=>f.codigo===atual.codigo);if(idx>=0){filhos[idx].questoes=(filhos[idx].questoes||0)+1;Storage.set("mq_filhos",filhos);}}
      // Avança para próxima questão após 1.2s mesmo errando
      setTimeout(()=>next(acertos),1200);
    }
  };

  const next=(currentAcertos)=>{
    const acc = currentAcertos !== undefined ? currentAcertos : acertos;
    // Completou 5 acertos = passou de fase!
    if(acc>=ACERTOS_NECESSARIOS){setEnd(true);return;}
    // Acabou as vidas
    if(hp<=0){setEnd(true);return;}
    setQi(i=>i+1);setQ(genQNivel(mode,nivel));setSel(null);setDone(false);
  };

  if(!mode)return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:`linear-gradient(180deg,${C.blueBg},${C.dark})`,overflowY:"auto"}}>
      <div style={{padding:"16px 16px 8px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>go("map")} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:12,padding:"6px 12px",color:"white",fontSize:12,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>◀ Mapa</button>
        <div style={{flex:1,fontSize:18,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>⚔️ Escolha o desafio</div>
      </div>
      <div style={{display:"flex",justifyContent:"center",animation:"heroFloat 1.5s ease-in-out infinite"}}><MaxHero sz={80}/></div>

      {/* Nível de dificuldade */}
      <div style={{padding:"8px 16px"}}>
        <div style={{fontSize:11,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:1,marginBottom:8,textAlign:"center"}}>Nível de dificuldade</div>
        <div style={{display:"flex",gap:6,justifyContent:"center"}}>
          {[{n:1,l:"🌱 Básico",c:C.green},{n:2,l:"⚡ Médio",c:C.gold},{n:3,l:"🔥 Avançado",c:C.red}].map(nv=>(
            <button key={nv.n} onClick={()=>setNivel(nv.n)} style={{flex:1,padding:"8px 4px",borderRadius:14,border:`2px solid ${nivel===nv.n?nv.c:"rgba(255,255,255,0.15)"}`,background:nivel===nv.n?`${nv.c}33`:"rgba(255,255,255,0.05)",color:nivel===nv.n?nv.c:"#90CAF9",fontSize:11,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>
              {nv.l}
            </button>
          ))}
        </div>
      </div>

      {/* Tópicos do 1º Ano */}
      <div style={{padding:"8px 16px"}}>
        <div style={{fontSize:11,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:1,marginBottom:8,textAlign:"center"}}>Tópico</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {Object.entries(QM).map(([k,v])=>(
            <button key={k} onClick={()=>start(k,nivel)} style={{borderRadius:20,padding:"16px 10px",border:`3px solid ${v.color}`,background:`linear-gradient(135deg,${v.color}33,${v.color}11)`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,boxShadow:`0 5px 0 ${v.color}55`}}>
              <div style={{fontSize:32}}>{v.label.split(" ")[1]||v.label.split(" ")[0]}</div>
              <div style={{fontSize:12,fontWeight:900,color:v.color,fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>{v.label.split(" ")[0]}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"0 16px 16px",fontSize:11,color:"rgba(255,255,255,0.4)",textAlign:"center",fontWeight:600}}>
        Acerte {ACERTOS_NECESSARIOS} questões para completar a fase! ⭐
      </div>
    </div>
  );

  const m=QM[mode];

  if(end)return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-evenly",background:`linear-gradient(160deg,${C.blueBg},${C.dark})`,gap:8,padding:"16px 20px"}}>
      <div style={{background:acertos>=ACERTOS_NECESSARIOS?"linear-gradient(135deg,#FFD700,#FF8C00)":"linear-gradient(135deg,#37474F,#263238)",borderRadius:24,padding:"16px 32px",textAlign:"center",width:"100%",boxShadow:acertos>=ACERTOS_NECESSARIOS?`0 8px 0 #B86000`:"0 8px 0 #1C2526"}}>
        <div style={{fontSize:28,fontWeight:900,color:acertos>=ACERTOS_NECESSARIOS?C.dark:"white",fontFamily:"'Fredoka One',sans-serif"}}>{acertos>=ACERTOS_NECESSARIOS?"FASE COMPLETA! 🎉":"Tente mais uma vez! 💪"}</div>
        <div style={{fontSize:14,color:acertos>=ACERTOS_NECESSARIOS?C.dark+"aa":"rgba(255,255,255,0.7)",fontWeight:700,marginTop:4}}>{acertos}/{ACERTOS_NECESSARIOS} acertos</div>
      </div>
      <div style={{animation:"heroFloat 1.5s ease-in-out infinite"}}><MaxHero sz={80} mood={acertos>=ACERTOS_NECESSARIOS?"wow":"sad"}/></div>
      <div style={{display:"flex",gap:8}}>{[1,2,3].map(s=>(<div key={s} style={{animation:s<=(acertos>=5?3:acertos>=3?2:acertos>=1?1:0)?`popIn 0.4s ${s*0.15}s both`:"none"}}><Star on={s<=(acertos>=5?3:acertos>=3?2:acertos>=1?1:0)} sz={44}/></div>))}</div>
      <div style={{background:`${C.gold}18`,border:`3px solid ${C.gold}55`,borderRadius:20,padding:"12px 32px",fontSize:22,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif"}}>⭐ {acertos} de {ACERTOS_NECESSARIOS} acertos</div>
      {acertos>=ACERTOS_NECESSARIOS ? (
        <div style={{display:"flex",flexDirection:"column",gap:8,width:"100%"}}>
          <button onClick={()=>{setMode(null);setAcertos(0);setEnd(false);go("map");}} style={{width:"100%",padding:16,borderRadius:22,border:"none",
            background:`linear-gradient(135deg,${C.green},#1B8A3A)`,color:"white",fontSize:18,fontWeight:900,
            fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 6px 0 #145A20`,
            animation:"bounce 0.6s ease-in-out"}}>
            🗺️ VER MEU PROGRESSO!
          </button>
          <button onClick={()=>start(mode, nivel)} style={{width:"100%",padding:13,borderRadius:18,border:`2px solid ${C.blue}`,
            background:"transparent",color:C.blue,fontSize:15,fontWeight:900,
            fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>
            🔄 Jogar de novo
          </button>
        </div>
      ) : null}
      <div style={{display:"flex",gap:10,width:"100%"}}>
        <button onClick={()=>start(mode,nivel)} style={{flex:1,padding:12,borderRadius:20,border:"none",background:`linear-gradient(135deg,${C.blue},${C.blueDk})`,color:"white",fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 5px 0 #003A99`}}>🔄 De novo</button>
        <button onClick={()=>{setMode(null);go("map");}} style={{flex:1,padding:12,borderRadius:20,border:`3px solid ${C.gold}`,background:"transparent",color:C.gold,fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>🗺️ Mapa</button>
      </div>
    </div>
  );

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:m.bg}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 12px"}}>
        <button onClick={()=>setMode(null)} style={{background:`${m.color}22`,border:`2px solid ${m.color}66`,borderRadius:12,padding:"5px 10px",fontSize:11,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>◀</button>
        <div style={{fontSize:12,fontWeight:900,color:"rgba(255,255,255,0.7)",fontFamily:"'Fredoka One',sans-serif"}}>{QM[mode]?.label}</div>
        <div style={{display:"flex",gap:2}}>{[1,2,3].map(i=><span key={i} style={{fontSize:20,filter:i>hp?"grayscale(1) opacity(0.25)":"none",transition:"filter 0.3s"}}>❤️</span>)}</div>
      </div>
      <div style={{padding:"0 14px 6px",display:"flex",alignItems:"center",gap:6}}>
        <div style={{flex:1,height:8,background:"rgba(0,0,0,0.3)",borderRadius:8,overflow:"hidden",border:`1px solid ${m.color}44`}}>
          <div style={{height:"100%",width:`${(acertos/ACERTOS_NECESSARIOS)*100}%`,background:`linear-gradient(90deg,${C.green},#1B8A3A)`,borderRadius:8,transition:"width 0.4s"}}/>
        </div>
        <span style={{fontSize:11,fontWeight:900,color:C.green,fontFamily:"'Fredoka One',sans-serif",flexShrink:0}}>⭐{acertos}/{ACERTOS_NECESSARIOS}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",padding:"2px 12px 4px",gap:8}}>
        <div style={{animation:"float 2s ease-in-out infinite",flexShrink:0}}><MaxHero sz={52}/></div>
        <div style={{background:"white",borderRadius:16,padding:"6px 12px",position:"relative",boxShadow:"0 4px 12px rgba(0,0,0,0.25)",display:"flex",alignItems:"center",gap:6}}>
          <div style={{position:"absolute",left:-8,top:"50%",transform:"translateY(-50%)",width:0,height:0,borderTop:"7px solid transparent",borderBottom:"7px solid transparent",borderRight:"9px solid white"}}/>
          {/* Ícone visual do tipo de questão sem texto longo */}
          {q.tipo==="contagem"&&<><span style={{fontSize:20}}>🔢</span><span style={{fontSize:13,fontWeight:900,color:C.dark,fontFamily:"'Fredoka One',sans-serif"}}>Quantos?</span></>}
          {q.tipo==="soma"&&<><span style={{fontSize:20}}>➕</span><span style={{fontSize:13,fontWeight:900,color:C.dark,fontFamily:"'Fredoka One',sans-serif"}}>Soma!</span></>}
          {q.tipo==="sub"&&<><span style={{fontSize:20}}>➖</span><span style={{fontSize:13,fontWeight:900,color:C.dark,fontFamily:"'Fredoka One',sans-serif"}}>Subtrai!</span></>}
          {(q.tipo==="numeros"||q.tipo==="numeros_seq"||q.tipo==="numeros_maior")&&<><span style={{fontSize:20}}>🔢</span><span style={{fontSize:13,fontWeight:900,color:C.dark,fontFamily:"'Fredoka One',sans-serif"}}>Qual número?</span></>}
          {!q.tipo&&<><span style={{fontSize:20}}>🧮</span><span style={{fontSize:13,fontWeight:900,color:C.dark,fontFamily:"'Fredoka One',sans-serif"}}>Resultado?</span></>}
        </div>
        {/* Barra de progresso acertos */}
        <div style={{flex:1,display:"flex",gap:4,justifyContent:"flex-end"}}>
          {Array(ACERTOS_NECESSARIOS).fill(0).map((_,i)=>(
            <div key={i} style={{width:10,height:10,borderRadius:"50%",background:i<acertos?C.green:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.3)",transition:"background 0.3s"}}/>
          ))}
        </div>
      </div>
      <div style={{margin:"6px 12px",borderRadius:22,padding:"12px 10px",background:"linear-gradient(135deg,rgba(0,0,0,0.5),rgba(0,0,0,0.3))",border:`3px solid ${m.color}`,textAlign:"center",boxShadow:`0 0 28px ${m.color}33`,minHeight:100}}>

        {/* CONTAGEM — mostra emojis em grade */}
        {q.tipo==="contagem" && (
          <div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",maxWidth:260,margin:"0 auto 8px"}}>
              {q.emojis.map((em,i)=>(
                <span key={i} style={{fontSize:q.emojis.length<=5?40:q.emojis.length<=10?32:24,lineHeight:1,filter:done&&sel!==q.ans&&i>=q.ans?"grayscale(1) opacity(0.3)":"none"}}>{em}</span>
              ))}
            </div>
            <div style={{fontSize:16,fontWeight:900,color:"rgba(255,255,255,0.7)",fontFamily:"'Fredoka One',sans-serif"}}>
              = <span style={{fontSize:36,color:done?(sel===q.ans?C.green:C.red):C.gold}}>{done?sel:"?"}</span>
            </div>
          </div>
        )}

        {/* SOMA — duas colunas de emojis + sinal */}
        {q.tipo==="soma" && (
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,flexWrap:"wrap"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:3,maxWidth:100,justifyContent:"center"}}>
              {q.emojisA.map((em,i)=><span key={i} style={{fontSize:q.emojisA.length<=3?36:28}}>{em}</span>)}
            </div>
            <span style={{fontSize:36,fontWeight:900,color:C.orange}}>+</span>
            <div style={{display:"flex",flexWrap:"wrap",gap:3,maxWidth:100,justifyContent:"center"}}>
              {q.emojisB.map((em,i)=><span key={i} style={{fontSize:q.emojisB.length<=3?36:28}}>{em}</span>)}
            </div>
            <span style={{fontSize:32,fontWeight:900,color:"white"}}>=</span>
            <span style={{fontSize:40,fontWeight:900,color:done?(sel===q.ans?C.green:C.red):C.gold}}>{done?sel:"?"}</span>
          </div>
        )}

        {/* SUBTRAÇÃO — emojis com os retirados acinzentados */}
        {q.tipo==="sub" && (
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,flexWrap:"wrap"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:3,maxWidth:160,justifyContent:"center"}}>
              {q.emojisTotal.map((em,i)=>(
                <span key={i} style={{fontSize:q.emojisTotal.length<=4?36:28,filter:i>=(q.emojisTotal.length-q.retirar)?"grayscale(1) opacity(0.35)":"none",textDecoration:i>=(q.emojisTotal.length-q.retirar)?"line-through":"none"}}>
                  {em}
                </span>
              ))}
            </div>
            <span style={{fontSize:32,fontWeight:900,color:"white"}}>=</span>
            <span style={{fontSize:40,fontWeight:900,color:done?(sel===q.ans?C.green:C.red):C.gold}}>{done?sel:"?"}</span>
          </div>
        )}

        {/* NÚMEROS — identifica/sequência visual */}
        {(q.tipo==="numeros"||q.tipo==="numeros_seq"||q.tipo==="numeros_maior") && (
          <div>
            <div style={{fontSize:q.tipo==="numeros_seq"?32:52,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",letterSpacing:4,marginBottom:6}}>
              {q.q}
            </div>
            <div style={{fontSize:16,color:"rgba(255,255,255,0.6)",fontWeight:700}}>
              = <span style={{fontSize:36,color:done?(sel===q.ans?C.green:C.red):C.gold}}>{done?sel:"?"}</span>
            </div>
          </div>
        )}

        {/* Fallback para outros modos */}
        {!q.tipo && (
          <div style={{fontSize:44,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",letterSpacing:4}}>
            {q.q} = <span style={{color:done?(sel===q.ans?C.green:C.red):C.gold}}>{done?sel:"?"}</span>
          </div>
        )}

        {/* Feedback visual */}
        {done && (
          <div style={{marginTop:6,fontSize:22,animation:"popIn 0.35s ease both"}}>
            {sel===q.ans?"🎉":"😅"}
          </div>
        )}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"0 14px"}}>
        {q.opts.map((opt,i)=>{
          const isR=opt===q.ans,isS=opt===sel;
          let bg=`linear-gradient(135deg,${OC[i]},${OC[i]}CC)`,bd=OC[i];
          if(done){if(isR){bg="linear-gradient(135deg,#1B8A3A,#2ECC71)";bd=C.green;}else if(isS){bg="linear-gradient(135deg,#C62828,#FF6B6B)";bd=C.red;}else{bg="linear-gradient(135deg,#1C2D3F,#263C55)";bd="#2A4060";}}
          return(<button key={i} onClick={()=>pick(opt)} disabled={done} style={{border:`3px solid ${bd}`,borderRadius:20,padding:"18px 0",background:bg,cursor:done?"default":"pointer",transform:isS?"scale(1.06)":"scale(1)",opacity:done&&!isR&&!isS?0.35:1,boxShadow:`0 6px 0 ${bd}88`,transition:"transform 0.12s"}}>
            <span style={{fontSize:40,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textShadow:"0 3px 8px rgba(0,0,0,0.4)"}}>{opt}</span>
          </button>);
        })}
      </div>

    </div>
  );
}



const SD={Personagens:[{n:"Max",e:"🦊",p:0,owned:true},{n:"Lia",e:"🧝‍♀️",p:500,owned:false},{n:"Draco",e:"🐲",p:300,owned:true},{n:"Nubi",e:"☁️",p:3,owned:false,gem:true}],Poderes:[{n:"Escudo",e:"🛡️",p:200,owned:false},{n:"Feitiço",e:"🪄",p:150,owned:true},{n:"Relâmp.",e:"⚡",p:2,owned:false,gem:true},{n:"Bomba",e:"💣",p:100,owned:false}],Moedas:[{n:"500 Moedas",e:"🪙",p:"R$1,99",real:true},{n:"1200 Moedas",e:"💰",p:"R$3,99",real:true},{n:"5 Gemas",e:"💎",p:"R$2,49",real:true},{n:"20 Gemas",e:"💎",p:"R$7,99",real:true}]};

function ShopScreen({ toast }) {
  const [tab, setTab] = useState("Personagens");
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", background:"linear-gradient(180deg,#1A0040,#2D0060)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", background:"rgba(0,0,0,0.3)", borderBottom:`3px solid ${C.gold}55` }}>
        <div style={{ fontSize:22, fontWeight:900, color:C.gold, fontFamily:"'Fredoka One',sans-serif", textShadow:`0 0 16px ${C.gold}66` }}>🏪 LOJA</div>
        <div style={{ display:"flex", gap:6 }}>
          {(()=>{const s=Storage.get("mq_usuario_atual");const fs=Storage.get("mq_filhos")||[];const al=fs.find(f=>f.codigo===s?.codigo);return(<><div style={{display:"flex",alignItems:"center",gap:4,background:"linear-gradient(135deg,#BF360C,#E64A19)",borderRadius:22,padding:"4px 12px",border:`2px solid ${C.orange}`}}><Coin sz={16}/><span style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{al?.moedas||0}</span></div><div style={{display:"flex",alignItems:"center",gap:4,background:"linear-gradient(135deg,#4527A0,#6A1B9A)",borderRadius:22,padding:"4px 10px",border:"2px solid #9C6FFF"}}><span style={{fontSize:15}}>⭐</span><span style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{Object.values(al?.starsMap||{}).reduce((s,v)=>s+v,0)}</span></div></>);})()}
        </div>
      </div>
      <div style={{ display:"flex", gap:6, padding:"8px 12px" }}>
        {Object.keys(SD).map(t => (<button key={t} onClick={() => setTab(t)} style={{ flex:1, padding:"8px 2px", borderRadius:20, cursor:"pointer", background:tab===t?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)", color:tab===t?C.dark:"white", border:tab===t?`3px solid #FFF9C4`:"2px solid rgba(255,255,255,0.15)", fontSize:11, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", boxShadow:tab===t?`0 4px 0 #B86000`:"none" }}>{t}</button>))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, padding:"0 12px", flex:1, overflowY:"auto" }}>
        {SD[tab].map((item,i) => (
          <div key={i} style={{ background:"rgba(255,255,255,0.07)", borderRadius:22, padding:"16px 10px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, border:"2px solid rgba(255,255,255,0.12)" }}>
            <div style={{ fontSize:48 }}>{item.e}</div>
            <div style={{ fontSize:13, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", textAlign:"center" }}>{item.n}</div>
            {item.owned ? (
              <div style={{ background:"linear-gradient(135deg,#1B8A3A,#2ECC71)", borderRadius:20, padding:"5px 14px", fontSize:11, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif" }}>✓ Possui</div>
            ) : item.real ? (
              <button onClick={() => toast("🛒","Compra realizada!","coin")} style={{ background:"linear-gradient(135deg,#1B8A3A,#2ECC71)", border:"none", borderRadius:20, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", boxShadow:"0 4px 0 #145A20" }}>{item.p}</button>
            ) : (
              <button onClick={() => toast("🛒","Item comprado!","coin")} style={{ display:"flex", alignItems:"center", gap:5, background:`linear-gradient(135deg,${C.gold},${C.goldDk})`, border:`3px solid #FFF9C4`, borderRadius:20, padding:"6px 14px", cursor:"pointer", fontSize:12, fontWeight:900, color:C.dark, fontFamily:"'Fredoka One',sans-serif", boxShadow:`0 4px 0 #B86000` }}>{item.gem?<>💎 {item.p}</>:<><Coin sz={14}/>{item.p}</>}</button>
            )}
          </div>
        ))}
      </div>
      <div style={{ margin:"8px 12px 10px", background:"linear-gradient(135deg,#0A001A,#1A0033)", borderRadius:18, padding:"12px 14px", display:"flex", alignItems:"center", gap:10, border:`2px solid ${C.gold}55` }}>
        <div style={{ fontSize:30, animation:"float 2s infinite" }}>👑</div>
        <div style={{ flex:1 }}><div style={{ fontSize:14, fontWeight:900, color:C.gold, fontFamily:"'Fredoka One',sans-serif" }}>PREMIUM</div><div style={{ fontSize:11, color:"#CE93D8", fontWeight:700 }}>Acesso ilimitado + 200 gemas/mês</div></div>
        <button onClick={() => toast("👑","Premium ativado!","level")} style={{ background:`linear-gradient(135deg,${C.gold},${C.goldDk})`, border:"none", borderRadius:14, padding:"9px 14px", fontSize:12, fontWeight:900, color:C.dark, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", boxShadow:"0 4px 0 #B86000" }}>R$9,90</button>
      </div>
    </div>
  );
}



const RD={global:[{pos:1,n:"Ana",xp:3250,av:"🧝‍♀️"},{pos:2,n:"Lucas",xp:2800,av:"🦊",me:true},{pos:3,n:"Pedro",xp:2450,av:"🧙"},{pos:4,n:"Sofia",xp:2100,av:"🐲"},{pos:5,n:"Miguel",xp:1900,av:"☁️"}],amigos:[{pos:1,n:"Lucas",xp:2800,av:"🦊",me:true},{pos:2,n:"Ana",xp:2600,av:"🧝‍♀️"},{pos:3,n:"Pedro",xp:1800,av:"🧙"}]};

function RankScreen() {
  const [tab,setTab]=useState("global");
  const list=RD[tab];const top3=[list[1],list[0],list[2]].filter(Boolean);const rest=list.slice(3);
  const pC=["#C0C0C0","#FFD700","#CD7F32"];const pH=[88,112,72];const pM=["🥈","🥇","🥉"];
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:`linear-gradient(180deg,${C.blueBg},${C.dark})`}}>
      <div style={{fontSize:26,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",textAlign:"center",padding:"14px 0 6px",textShadow:`0 0 24px ${C.gold}88`}}>🏆 RANKING</div>
      <div style={{display:"flex",gap:8,padding:"0 14px 12px"}}>
        {["global","amigos"].map(k=>(<button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"8px",borderRadius:20,border:"none",cursor:"pointer",background:tab===k?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",color:tab===k?C.dark:"white",fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",boxShadow:tab===k?`0 4px 0 #B86000`:"none"}}>{k==="global"?"🌍 Global":"👥 Amigos"}</button>))}
      </div>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:8,padding:"0 16px 14px"}}>
        {top3.map((p,i)=>(<div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
          <div style={{fontSize:32,marginBottom:4,animation:i===1?"heroFloat 2s ease-in-out infinite":"none",filter:"drop-shadow(0 4px 8px rgba(0,0,0,0.5))"}}>{p.av}</div>
          <div style={{fontSize:12,fontWeight:900,color:pC[i],fontFamily:"'Fredoka One',sans-serif",marginBottom:5,textShadow:`0 0 12px ${pC[i]}88`}}>{p.n}</div>
          <div style={{width:"100%",height:pH[i],background:`linear-gradient(180deg,${pC[i]},${pC[i]}88)`,borderRadius:"12px 12px 0 0",border:`2px solid ${pC[i]}`,boxShadow:`0 0 16px ${pC[i]}55`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",paddingTop:10,gap:4}}>
            <span style={{fontSize:24}}>{pM[i]}</span>
            <span style={{fontSize:12,fontWeight:900,color:i===1?C.dark:"white",fontFamily:"'Fredoka One',sans-serif"}}>{p.xp.toLocaleString()}</span>
          </div>
        </div>))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 12px 4px"}}>
        {rest.map(p=>(<div key={p.pos} style={{display:"flex",alignItems:"center",gap:10,background:p.me?"rgba(255,215,0,0.1)":"rgba(255,255,255,0.05)",borderRadius:16,padding:"11px 14px",marginBottom:8,border:p.me?`2px solid ${C.gold}66`:"1px solid rgba(255,255,255,0.1)",boxShadow:p.me?`0 0 16px ${C.gold}22`:"none"}}>
          <div style={{fontSize:16,fontWeight:900,color:"#90CAF9",width:28,fontFamily:"'Fredoka One',sans-serif"}}>#{p.pos}</div>
          <div style={{fontSize:28}}>{p.av}</div>
          <div style={{flex:1,fontSize:14,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{p.n}{p.me?" (você)":""}</div>
          <div style={{fontSize:14,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif"}}>⚡{p.xp.toLocaleString()}</div>
        </div>))}
      </div>
    </div>
  );
}



function HeroScreen() {
  const usuario=Storage.get("mq_usuario_atual");
  const filhos=Storage.get("mq_filhos")||[];
  const filho=filhos.find(f=>f.codigo===usuario?.codigo);
  const nome=filho?.nome||usuario?.nome||"Aventureiro";
  const nivel=filho?.nivel||1;const xp=filho?.xp||0;
  const grade=filho?.grade??0;const avatar=filho?.avatar??0;
  const acc=filho?.questoes>0?Math.round((filho.acertos/filho.questoes)*100):0;
  const [ptab,setPtab]=useState("stats");
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:`linear-gradient(180deg,${C.blueBg},${C.dark})`,overflowY:"auto"}}>
      <div style={{background:`linear-gradient(135deg,#0033AA,${C.blue})`,padding:"18px 16px 14px",display:"flex",gap:14,alignItems:"center",borderBottom:`3px solid ${C.gold}`}}>
        <div style={{position:"relative"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,border:`5px solid #FFF9C4`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 24px ${C.gold}66`,fontSize:42}}>{AVATARS[avatar]}</div>
          <div style={{position:"absolute",bottom:-5,right:-5,background:`linear-gradient(135deg,${C.orange},${C.goldDk})`,borderRadius:"50%",width:28,height:28,border:"3px solid white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{nivel}</div>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:24,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{nome}</div>
          <div style={{fontSize:12,color:"#BBDEFB",fontWeight:700}}>Aventureiro · {GRADES[grade]}</div>
          <div style={{background:"rgba(0,0,0,0.3)",borderRadius:10,height:10,marginTop:7,overflow:"hidden",border:"1px solid rgba(255,255,255,0.1)"}}>
            <div style={{width:`${Math.min((xp%1000)/10,100)}%`,height:"100%",background:`linear-gradient(90deg,${C.gold},${C.orange})`,borderRadius:10}}/>
          </div>
          <div style={{fontSize:10,color:"#90CAF9",marginTop:3,fontWeight:700}}>{xp} XP · Nível {nivel+1}</div>
        </div>
      </div>
      <div style={{display:"flex",borderBottom:"2px solid rgba(255,255,255,0.08)"}}>
        {[["stats","📊 Stats"],["troféus","🏅 Troféus"],["pets","🐾 Pets"]].map(([k,l])=>(<button key={k} onClick={()=>setPtab(k)} style={{flex:1,padding:"10px 0",border:"none",background:"transparent",cursor:"pointer",borderBottom:`3px solid ${ptab===k?C.gold:"transparent"}`,color:ptab===k?C.gold:"#4A7AB5",fontSize:12,fontWeight:900,fontFamily:"'Fredoka One',sans-serif"}}>{l}</button>))}
      </div>
      {ptab==="stats"&&<div style={{padding:12}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
          {[{i:"📝",v:filho?.questoes||0,l:"Questões",c:C.blue},{i:"🎯",v:`${acc}%`,l:"Acertos",c:C.green},{i:"🔥",v:`${filho?.streak||0}d`,l:"Sequência",c:C.red}].map((s,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.07)",borderRadius:18,padding:"14px 6px",textAlign:"center",border:`2px solid ${s.c}44`,boxShadow:`0 4px 0 ${s.c}22`}}><div style={{fontSize:24}}>{s.i}</div><div style={{fontSize:19,fontWeight:900,color:s.c,fontFamily:"'Fredoka One',sans-serif"}}>{s.v}</div><div style={{fontSize:9,color:"#90CAF9",fontWeight:700}}>{s.l}</div></div>))}
        </div>
        {[{l:"Soma",p:92,c:C.red},{l:"Subtração",p:76,c:C.orange},{l:"Mult.",p:45,c:C.purple}].map((prog,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:74,fontSize:12,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{prog.l}</div><div style={{flex:1,height:10,background:"rgba(0,0,0,0.3)",borderRadius:10,overflow:"hidden"}}><div style={{height:"100%",width:`${prog.p}%`,background:prog.c,borderRadius:10}}/></div><div style={{fontSize:12,fontWeight:900,color:prog.c,width:34}}>{prog.p}%</div></div>))}
      </div>}
      {ptab==="troféus"&&<div style={{padding:12,display:"flex",flexWrap:"wrap",gap:8}}>
        {[{i:"⭐",l:"1ª estrela",ok:(filho?.acertos||0)>=1},{i:"🔥",l:"7 dias",ok:(filho?.streak||0)>=7},{i:"⚡",l:"Maratonista",ok:(filho?.questoes||0)>=50},{i:"🏆",l:"Top 10",ok:false},{i:"💎",l:"100 questões",ok:(filho?.questoes||0)>=100},{i:"🌟",l:"Nota 10",ok:false}].map((b,i)=>(<div key={i} style={{width:84,background:b.ok?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",borderRadius:18,padding:"12px 6px",textAlign:"center",border:b.ok?`2px solid ${C.gold}66`:"2px solid rgba(255,255,255,0.08)",opacity:b.ok?1:0.38,boxShadow:b.ok?`0 4px 0 ${C.gold}33`:"none"}}><div style={{fontSize:32,filter:b.ok?"none":"grayscale(1)"}}>{b.i}</div><div style={{fontSize:9,color:"white",fontWeight:800,marginTop:4,lineHeight:1.3}}>{b.l}</div></div>))}
      </div>}
      {ptab==="pets"&&<div style={{padding:12,display:"flex",flexWrap:"wrap",gap:8}}>
        {[{e:"🦊",n:"Max",active:true},{e:"🐲",n:"Draco",active:false},{e:"🐱",n:"Miau",active:false},{e:"🔒",n:"Bloqueado",locked:true}].map((p,i)=>(<div key={i} style={{width:84,background:p.active?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.07)",borderRadius:18,padding:"14px 8px",textAlign:"center",border:p.active?`3px solid #FFF9C4`:"2px solid rgba(255,255,255,0.12)",opacity:p.locked?0.4:1,boxShadow:p.active?`0 5px 0 #B86000`:"none"}}><div style={{fontSize:32}}>{p.e}</div><div style={{fontSize:10,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",color:p.active?C.dark:"white"}}>{p.n}</div>{p.active&&<div style={{fontSize:8,color:C.dark,fontWeight:900}}>ATIVO</div>}</div>))}
      </div>}
    </div>
  );
}



function ParentScreen({ go }) {
  const usuario=Storage.get("mq_usuario_atual");
  const pais=Storage.get("mq_pais")||[];
  const pai=pais.find(p=>p.email===usuario?.email);
  const todosFilhos=Storage.get("mq_filhos")||[];
  const meusFilhos=pai?todosFilhos.filter(f=>pai.filhos?.includes(f.codigo)):[];
  const [childIdx,setChildIdx]=useState(0);
  const [tab,setTab]=useState("resumo");
  const [limit,setLimit]=useState(30);
  const [notif,setNotif]=useState(true);
  const [adding,setAdding]=useState(false);
  const [nfNome,setNfNome]=useState("");const [nfGrade,setNfGrade]=useState(null);const [nfAvatar,setNfAvatar]=useState(0);const [nfCodigo,setNfCodigo]=useState("");

  const adicionarFilho=()=>{
    if(!nfNome.trim()||nfGrade===null)return;
    const cod=gerarCodigo(nfNome);
    const filhos2=Storage.get("mq_filhos")||[];
    Storage.set("mq_filhos",[...filhos2,{codigo:cod,nome:nfNome,grade:nfGrade,avatar:nfAvatar,xp:0,nivel:1,streak:0,acertos:0,questoes:0,paiEmail:usuario?.email}]);
    if(pai){pai.filhos=[...(pai.filhos||[]),cod];const pais2=Storage.get("mq_pais")||[];Storage.set("mq_pais",[...pais2.filter(p=>p.email!==pai.email),pai]);}
    setNfCodigo(cod);
  };

  const cd=meusFilhos[childIdx];
  const acc=cd?.questoes>0?Math.round((cd.acertos/cd.questoes)*100):0;

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:"linear-gradient(180deg,#0A1230,#0D1B3E)",overflowY:"auto"}}>
      <div style={{background:`linear-gradient(135deg,#0D2D6E,${C.blue})`,padding:"14px 16px",borderBottom:`3px solid ${C.gold}`}}>
        <div style={{fontSize:17,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",marginBottom:10}}>👨‍👩‍👧 Olá, {usuario?.nome||"Pai/Mãe"}!</div>
        {meusFilhos.length===0?(
          <div style={{background:"rgba(255,255,255,0.08)",borderRadius:16,padding:"12px",textAlign:"center"}}>
            <div style={{fontSize:13,color:"#90CAF9",fontWeight:600}}>Nenhum filho cadastrado ainda.</div>
            <button onClick={()=>setAdding(true)} style={{marginTop:8,padding:"8px 20px",borderRadius:20,border:"none",background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,color:C.dark,fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 4px 0 #B86000`}}>+ Adicionar filho(a)</button>
          </div>
        ):(
          <div style={{display:"flex",gap:8,overflowX:"auto"}}>
            {meusFilhos.map((f,i)=>(<button key={i} onClick={()=>setChildIdx(i)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:16,cursor:"pointer",flexShrink:0,background:childIdx===i?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",color:childIdx===i?C.dark:"white",border:childIdx===i?`2px solid #FFF9C4`:"2px solid rgba(255,255,255,0.15)",boxShadow:childIdx===i?`0 4px 0 #B86000`:"none"}}><span style={{fontSize:22}}>{AVATARS[f.avatar]}</span><div><div style={{fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif"}}>{f.nome}</div><div style={{fontSize:10,opacity:0.8}}>{GRADES[f.grade]}</div></div></button>))}
            <button onClick={()=>setAdding(true)} style={{display:"flex",alignItems:"center",justifyContent:"center",width:44,borderRadius:14,border:"2px dashed rgba(255,255,255,0.3)",background:"transparent",color:"rgba(255,255,255,0.5)",fontSize:22,cursor:"pointer",flexShrink:0}}>+</button>
          </div>
        )}
      </div>

      {adding&&(
        <div style={{background:"rgba(0,0,0,0.85)",position:"absolute",inset:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"#0D1F3C",borderRadius:24,padding:20,width:"100%",border:`3px solid ${C.blue}`}}>
            <div style={{fontSize:18,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",marginBottom:14}}>{nfCodigo?"✅ Filho(a) adicionado!":"➕ Adicionar filho(a)"}</div>
            {nfCodigo?(
              <><CodigoCard codigo={nfCodigo} nome={nfNome||"filho(a)"} grade={nfGrade} avatar={nfAvatar}/><button onClick={()=>{setAdding(false);setNfCodigo("");setNfNome("");setNfGrade(null);setNfAvatar(0);}} style={{width:"100%",padding:12,borderRadius:16,border:"none",marginTop:10,background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,color:C.dark,fontSize:15,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 4px 0 #B86000`}}>Fechar</button></>
            ):(
              <><div style={{display:"flex",flexDirection:"column",gap:10}}>
                <input value={nfNome} onChange={e=>setNfNome(e.target.value)} placeholder="Nome do filho(a)" style={{padding:"12px 14px",borderRadius:12,border:`2px solid ${nfNome?C.gold:"rgba(255,255,255,0.1)"}`,background:"rgba(255,255,255,0.07)",color:"white",fontSize:15,fontWeight:700,outline:"none"}}/>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{GRADES.map((g,i)=>(<button key={i} onClick={()=>setNfGrade(i)} style={{padding:"7px 10px",borderRadius:12,cursor:"pointer",background:nfGrade===i?`linear-gradient(135deg,${C.blue},${C.blueDk})`:"rgba(255,255,255,0.07)",color:"white",border:nfGrade===i?`2px solid #90CAF9`:"2px solid rgba(255,255,255,0.1)",fontSize:11,fontWeight:900,fontFamily:"'Fredoka One',sans-serif"}}>{["📗","📘","📙","📕","📓"][i]} {g}</button>))}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{AVATARS.slice(0,6).map((av,i)=>(<button key={i} onClick={()=>setNfAvatar(i)} style={{width:44,height:44,borderRadius:12,fontSize:22,cursor:"pointer",background:nfAvatar===i?`${C.gold}33`:"rgba(255,255,255,0.07)",border:nfAvatar===i?`2px solid ${C.gold}`:"2px solid rgba(255,255,255,0.1)"}}>{av}</button>))}</div>
              </div>
              <div style={{display:"flex",gap:8,marginTop:14}}>
                <button onClick={()=>{setAdding(false);setNfNome("");setNfGrade(null);setNfAvatar(0);}} style={{flex:1,padding:12,borderRadius:16,border:`2px solid rgba(255,255,255,0.15)`,background:"transparent",color:"#90CAF9",fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>Cancelar</button>
                <button onClick={adicionarFilho} style={{flex:2,padding:12,borderRadius:16,border:"none",background:nfNome.trim()&&nfGrade!==null?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",color:nfNome.trim()&&nfGrade!==null?C.dark:"#4A7AB5",fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:nfNome.trim()&&nfGrade!==null?`0 4px 0 #B86000`:"none"}}>✨ Gerar código</button>
              </div></>
            )}
          </div>
        </div>
      )}

      {!cd&&!adding&&(<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,padding:24}}><div style={{fontSize:64}}>👶</div><div style={{fontSize:18,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>Adicione seu primeiro filho(a)</div><button onClick={()=>setAdding(true)} style={{padding:"14px 32px",borderRadius:20,border:"none",background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,color:C.dark,fontSize:16,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 5px 0 #B86000`}}>+ Adicionar filho(a)</button></div>)}

      {cd&&<>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",padding:"10px 12px 8px"}}>
          {[{i:"⚡",v:`Nv.${cd.nivel||1}`,l:"Nível",c:C.purple},{i:"🔥",v:`${cd.streak||0}d`,l:"Streak",c:C.red},{i:"🎯",v:`${acc}%`,l:"Acertos",c:C.green},{i:"📝",v:cd.questoes||0,l:"Questões",c:C.blue}].map((s,i)=>(<div key={i} style={{background:`${s.c}18`,borderRadius:14,padding:"10px 4px",textAlign:"center",margin:3,border:`2px solid ${s.c}33`}}><div style={{fontSize:18}}>{s.i}</div><div style={{fontSize:14,fontWeight:900,color:s.c,fontFamily:"'Fredoka One',sans-serif"}}>{s.v}</div><div style={{fontSize:9,color:"#90CAF9",fontWeight:700}}>{s.l}</div></div>))}
        </div>
        <div style={{margin:"0 12px 8px",background:"rgba(255,215,0,0.08)",borderRadius:14,padding:"10px 14px",border:`1px solid ${C.gold}44`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:11,color:C.gold,fontWeight:800}}>🔑 Código de {cd.nome}</div><div style={{fontSize:20,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",letterSpacing:3}}>{cd.codigo}</div></div>
          <div style={{fontSize:11,color:"#90CAF9",fontWeight:600,textAlign:"right"}}>{AVATARS[cd.avatar]} {GRADES[cd.grade]}</div>
        </div>
        <div style={{display:"flex",borderBottom:"2px solid rgba(255,255,255,0.08)"}}>
          {[["resumo","📊 Resumo"],["controles","⚙️ Controles"]].map(([k,l])=>(<button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"10px 0",border:"none",background:"transparent",cursor:"pointer",borderBottom:`3px solid ${tab===k?C.gold:"transparent"}`,color:tab===k?C.gold:"#4A7AB5",fontSize:11,fontWeight:900,fontFamily:"'Fredoka One',sans-serif"}}>{l}</button>))}
        </div>
        <div style={{padding:"12px 12px 80px"}}>
          {tab==="resumo"&&(cd.questoes===0?(<div style={{textAlign:"center",padding:"32px 16px"}}><div style={{fontSize:48}}>🎮</div><div style={{fontSize:16,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginTop:10}}>{cd.nome} ainda não jogou!</div><div style={{fontSize:12,color:"#90CAF9",fontWeight:600,marginTop:6}}>Compartilhe o código <strong style={{color:C.gold}}>{cd.codigo}</strong></div></div>):(<><div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"14px",marginBottom:14,border:"1px solid rgba(255,255,255,0.08)"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,color:"#90CAF9",fontWeight:700}}>Taxa de acertos</span><span style={{fontSize:12,fontWeight:900,color:acc>=70?C.green:C.red}}>{acc}%</span></div><div style={{height:10,background:"rgba(255,255,255,0.1)",borderRadius:10,overflow:"hidden"}}><div style={{height:"100%",width:`${acc}%`,background:acc>=70?C.green:C.red,borderRadius:10}}/></div><div style={{fontSize:11,color:"#90CAF9",marginTop:6,fontWeight:600}}>{cd.acertos} acertos em {cd.questoes} questões</div></div><div style={{background:acc>=70?"rgba(46,204,113,0.12)":"rgba(255,107,107,0.12)",border:`1px solid ${acc>=70?"rgba(46,204,113,0.3)":"rgba(255,107,107,0.3)"}`,borderRadius:14,padding:"12px 14px",display:"flex",gap:10}}><span style={{fontSize:22}}>💡</span><div><div style={{fontSize:13,fontWeight:900,color:acc>=70?C.green:C.red,fontFamily:"'Fredoka One',sans-serif"}}>{acc>=80?"Ótimo desempenho!":acc>=60?"Bom progresso!":"Precisa de atenção"}</div><div style={{fontSize:12,color:acc>=70?"#A7F3D0":"#FFCDD2",fontWeight:600}}>{cd.nome}: {cd.questoes} questões · {acc}% de aproveitamento</div></div></div></>))}
          {tab==="controles"&&<><div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"14px 16px",marginBottom:12,border:"1px solid rgba(255,255,255,0.08)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div><div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>⏱️ Limite diário</div><div style={{fontSize:11,color:"#90CAF9",fontWeight:600}}>Máximo por dia</div></div><div style={{fontSize:20,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",background:`${C.gold}18`,padding:"4px 14px",borderRadius:12}}>{limit} min</div></div><input type="range" min={10} max={120} step={5} value={limit} onChange={e=>setLimit(+e.target.value)} style={{width:"100%",accentColor:C.blue}}/></div><div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"14px 16px",border:"1px solid rgba(255,255,255,0.08)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>🔔 Alertas de inatividade</div><div style={{fontSize:10,color:"#90CAF9",fontWeight:600}}>Aviso após 3 dias parado</div></div><button onClick={()=>setNotif(v=>!v)} style={{width:46,height:26,borderRadius:13,border:"none",cursor:"pointer",background:notif?C.blue:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",padding:3,justifyContent:notif?"flex-end":"flex-start",transition:"all 0.25s"}}><div style={{width:20,height:20,borderRadius:"50%",background:"white"}}/></button></div></div></>}
        </div>
      </>}

      <div style={{position:"sticky",bottom:0,padding:"10px 12px",background:"linear-gradient(180deg,transparent,#0A1230)",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
        <button onClick={()=>{Storage.set("mq_usuario_atual",null);go("login");}} style={{width:"100%",padding:11,borderRadius:16,border:`2px solid rgba(255,255,255,0.15)`,background:"transparent",color:"#90CAF9",fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>🚪 Sair da conta</button>
      </div>
    </div>
  );
}



function TeacherScreen({ go }) {
  const usuario     = Storage.get("mq_usuario_atual");
  const profs       = Storage.get("mq_professores") || [];
  const prof        = profs.find(p => p.email === usuario?.email) || { nome:usuario?.nome, escola:"", turmas:[] };
  const todosFilhos = Storage.get("mq_filhos") || [];

  const [tab,        setTab]        = useState("turmas");
  const [turmaIdx,   setTurmaIdx]   = useState(0);
  const [addTurma,   setAddTurma]   = useState(false);
  const [novaTurma,  setNovaTurma]  = useState("");

  // Cadastro de novo aluno pelo professor
  const [addAluno,     setAddAluno]     = useState(false);
  const [alunoNome,    setAlunoNome]    = useState("");
  const [alunoGrade,   setAlunoGrade]   = useState(null);
  const [alunoAvatar,  setAlunoAvatar]  = useState(0);
  const [alunoCodigo,  setAlunoCodigo]  = useState("");
  const [copiado,      setCopiado]      = useState(false);

  const turmas      = prof.turmas || [];
  const turmaAtual  = turmas[turmaIdx];
  const alunosDaTurma = turmaAtual ? todosFilhos.filter(f => turmaAtual.alunos?.includes(f.codigo)) : [];

  const salvarProf = (pa) => {
    const profs2 = Storage.get("mq_professores") || [];
    Storage.set("mq_professores", [...profs2.filter(p => p.email !== usuario?.email), pa]);
  };

  const criarTurma = () => {
    if (!novaTurma.trim()) return;
    const t = { id:Date.now(), nome:novaTurma, alunos:[] };
    const pa = { ...prof, turmas:[...(prof.turmas||[]), t] };
    salvarProf(pa);
    setNovaTurma(""); setAddTurma(false);
    setTimeout(() => window.location.reload(), 100);
  };

  // Professor cria o aluno diretamente — gera código e adiciona na turma
  const criarAluno = () => {
    if (!alunoNome.trim() || alunoGrade === null) return;
    const cod = gerarCodigo(alunoNome);
    const filhos = Storage.get("mq_filhos") || [];
    const novoAluno = {
      codigo: cod, nome: alunoNome, grade: alunoGrade, avatar: alunoAvatar,
      xp: 0, nivel: 1, streak: 0, acertos: 0, questoes: 0,
      fasesCompletas: 0, starsMap: {},
      criadoPor: "professor", professorEmail: usuario?.email,
    };
    Storage.set("mq_filhos", [...filhos, novoAluno]);
    // Adiciona na turma atual
    if (turmaAtual) {
      const turmasAtt = prof.turmas.map((t, i) =>
        i === turmaIdx ? { ...t, alunos: [...(t.alunos||[]), cod] } : t
      );
      salvarProf({ ...prof, turmas: turmasAtt });
    }
    setAlunoCodigo(cod);
  };

  const copiarCodigo = () => {
    try { navigator.clipboard.writeText(alunoCodigo); } catch {
      const el = document.createElement("textarea");
      el.value = alunoCodigo; document.body.appendChild(el);
      el.select(); document.execCommand("copy"); document.body.removeChild(el);
    }
    setCopiado(true); setTimeout(() => setCopiado(false), 2500);
  };

  const acc = (f) => f.questoes > 0 ? Math.round((f.acertos / f.questoes) * 100) : 0;
  const mediaGeral = alunosDaTurma.length > 0
    ? Math.round(alunosDaTurma.reduce((s, f) => s + acc(f), 0) / alunosDaTurma.length) : 0;

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", background:"linear-gradient(180deg,#0A1230,#0D1B3E)", overflowY:"auto" }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,#2D0060,${C.purple})`, padding:"12px 16px", borderBottom:`3px solid ${C.gold}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <div style={{ width:44, height:44, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},${C.goldDk})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, border:"3px solid #FFF9C4" }}>👩‍🏫</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:900, color:C.gold, fontFamily:"'Fredoka One',sans-serif" }}>{prof.nome || "Professor(a)"}</div>
            <div style={{ fontSize:11, color:"#CE93D8", fontWeight:600 }}>{prof.escola || "Escola"}</div>
          </div>
          <button onClick={() => { Storage.set("mq_usuario_atual", null); go("login"); }}
            style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:10, padding:"5px 10px", fontSize:11, color:"white", cursor:"pointer", fontWeight:700 }}>Sair</button>
        </div>
        {/* Stats rápidos */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6 }}>
          {[{i:"🏫",v:turmas.length,l:"Turmas"},{i:"👥",v:turmas.reduce((s,t)=>s+(t.alunos?.length||0),0),l:"Alunos"},{i:"🎯",v:`${mediaGeral}%`,l:"Média"},{i:"⚡",v:alunosDaTurma.filter(f=>f.questoes>0).length,l:"Ativos"}].map((s,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.12)", borderRadius:10, padding:"7px 4px", textAlign:"center" }}>
              <div style={{ fontSize:14 }}>{s.i}</div>
              <div style={{ fontSize:13, fontWeight:900, color:C.gold, fontFamily:"'Fredoka One',sans-serif" }}>{s.v}</div>
              <div style={{ fontSize:9, color:"#CE93D8", fontWeight:700 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:"2px solid rgba(255,255,255,0.08)" }}>
        {[["turmas","🏫 Turmas"],["alunos","👥 Alunos"],["relatorio","📊 Relatório"]].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ flex:1, padding:"10px 0", border:"none", background:"transparent", cursor:"pointer", borderBottom:`3px solid ${tab===k?C.gold:"transparent"}`, color:tab===k?C.gold:"#4A7AB5", fontSize:10, fontWeight:900, fontFamily:"'Fredoka One',sans-serif" }}>{l}</button>
        ))}
      </div>

      <div style={{ padding:"12px", flex:1 }}>

        {/* ── TURMAS ── */}
        {tab === "turmas" && <>
          {turmas.length === 0 ? (
            <div style={{ textAlign:"center", padding:"32px 16px" }}>
              <div style={{ fontSize:48 }}>📋</div>
              <div style={{ fontSize:15, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", marginTop:10 }}>Nenhuma turma ainda</div>
              <div style={{ fontSize:12, color:"#90CAF9", fontWeight:600, marginTop:6 }}>Crie sua primeira turma para cadastrar alunos</div>
            </div>
          ) : turmas.map((t, i) => (
            <div key={i} onClick={() => { setTurmaIdx(i); setTab("alunos"); }}
              style={{ background:"rgba(255,255,255,0.06)", borderRadius:18, padding:"14px", marginBottom:10, cursor:"pointer", border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 4px 0 rgba(0,0,0,0.3)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <div style={{ fontSize:15, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif" }}>{t.nome}</div>
                <div style={{ fontSize:12, fontWeight:900, color:C.blue }}>Ver →</div>
              </div>
              <div style={{ display:"flex", gap:14 }}>
                <span style={{ fontSize:11, color:"#90CAF9", fontWeight:700 }}>👥 {t.alunos?.length||0} alunos</span>
                <span style={{ fontSize:11, color:C.green, fontWeight:700 }}>✅ {todosFilhos.filter(f=>t.alunos?.includes(f.codigo)&&f.questoes>0).length} ativos</span>
              </div>
            </div>
          ))}
          {addTurma ? (
            <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:18, padding:"14px", border:`2px solid ${C.purple}` }}>
              <input value={novaTurma} onChange={e => setNovaTurma(e.target.value)} placeholder="Ex: 3º Ano A, Turma Girassol..."
                style={{ width:"100%", padding:"12px 14px", borderRadius:12, border:`2px solid ${novaTurma?C.purple:"rgba(255,255,255,0.1)"}`, background:"rgba(255,255,255,0.07)", fontSize:14, fontWeight:700, outline:"none", marginBottom:10 }}/>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => setAddTurma(false)} style={{ flex:1, padding:10, borderRadius:12, border:"2px solid rgba(255,255,255,0.15)", background:"transparent", color:"#90CAF9", fontSize:12, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer" }}>Cancelar</button>
                <button onClick={criarTurma} style={{ flex:2, padding:10, borderRadius:12, border:"none", background:`linear-gradient(135deg,${C.purple},#A855F7)`, color:"white", fontSize:12, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", boxShadow:`0 4px 0 #4A00AA` }}>✓ Criar turma</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddTurma(true)} style={{ width:"100%", padding:13, borderRadius:14, border:`2px dashed rgba(255,255,255,0.2)`, background:"transparent", color:"rgba(255,255,255,0.5)", fontSize:14, fontWeight:800, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer" }}>+ Criar nova turma</button>
          )}
        </>}

        {/* ── ALUNOS ── */}
        {tab === "alunos" && <>
          {/* Seletor de turmas */}
          {turmas.length > 0 && (
            <div style={{ display:"flex", gap:6, overflowX:"auto", marginBottom:12, paddingBottom:4 }}>
              {turmas.map((t, i) => (
                <button key={i} onClick={() => setTurmaIdx(i)} style={{ padding:"7px 14px", borderRadius:20, border:"none", cursor:"pointer", flexShrink:0, background:turmaIdx===i?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)", color:turmaIdx===i?C.dark:"white", fontSize:12, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", boxShadow:turmaIdx===i?`0 4px 0 #B86000`:"none" }}>{t.nome}</button>
              ))}
            </div>
          )}

          {/* Modal criar aluno */}
          {addAluno && (
            <div style={{ background:"rgba(0,0,0,0.9)", position:"fixed", inset:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
              <div style={{ background:"#0D1F3C", borderRadius:24, padding:20, width:"100%", maxWidth:400, border:`3px solid ${C.purple}` }}>
                {alunoCodigo ? (
                  // Código gerado - mostrar para o professor
                  <>
                    <div style={{ fontSize:16, fontWeight:900, color:C.gold, fontFamily:"'Fredoka One',sans-serif", marginBottom:4 }}>✅ Aluno cadastrado!</div>
                    <div style={{ fontSize:12, color:"#90CAF9", fontWeight:600, marginBottom:14 }}>Entregue este código para {alunoNome} ou a família</div>
                    <div style={{ background:"white", borderRadius:18, padding:"16px", textAlign:"center", marginBottom:14 }}>
                      <div style={{ fontSize:11, color:"#78716C", fontWeight:700, marginBottom:4 }}>Código de {alunoNome}</div>
                      <div style={{ fontSize:34, fontWeight:900, color:"#0D47A1", fontFamily:"'Fredoka One',sans-serif", letterSpacing:5 }}>{alunoCodigo}</div>
                      <div style={{ fontSize:10, color:"#78716C", marginTop:4 }}>{AVATARS[alunoAvatar]} {GRADES[alunoGrade]}</div>
                    </div>
                    <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                      <button onClick={copiarCodigo} style={{ flex:1, padding:"11px 0", borderRadius:14, border:"none", cursor:"pointer", background:copiado?"linear-gradient(135deg,#2ECC71,#1B8A3A)":`linear-gradient(135deg,${C.blue},${C.blueDk})`, color:"white", fontSize:13, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                        <span>{copiado?"✅":"📋"}</span>{copiado?"Copiado!":"Copiar"}
                      </button>
                      <button onClick={() => {
                        const txt = `🦊 MathQuest

Código de acesso de ${alunoNome}:

${alunoCodigo}

Abra o app → "Sou Aluno" → digite o código!`;
                        if (navigator.share) navigator.share({ title:"MathQuest", text:txt }).catch(()=>{});
                        else copiarCodigo();
                      }} style={{ flex:1, padding:"11px 0", borderRadius:14, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#25D366,#128C7E)", color:"white", fontSize:13, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                        <span>📤</span>Enviar
                      </button>
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={() => { setAlunoCodigo(""); setAlunoNome(""); setAlunoGrade(null); setAlunoAvatar(0); }} style={{ flex:1, padding:10, borderRadius:14, border:`2px solid ${C.purple}`, background:"transparent", color:C.purple, fontSize:13, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer" }}>+ Novo aluno</button>
                      <button onClick={() => { setAddAluno(false); setAlunoCodigo(""); setAlunoNome(""); setAlunoGrade(null); setAlunoAvatar(0); window.location.reload(); }} style={{ flex:1, padding:10, borderRadius:14, border:"none", background:`linear-gradient(135deg,${C.gold},${C.goldDk})`, color:C.dark, fontSize:13, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer" }}>Fechar</button>
                    </div>
                  </>
                ) : (
                  // Formulário novo aluno
                  <>
                    <div style={{ fontSize:16, fontWeight:900, color:C.gold, fontFamily:"'Fredoka One',sans-serif", marginBottom:14 }}>👤 Cadastrar aluno</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      <div>
                        <label style={{ fontSize:10, fontWeight:800, color:"#CE93D8", textTransform:"uppercase", letterSpacing:1 }}>Nome do aluno</label>
                        <input value={alunoNome} onChange={e => setAlunoNome(e.target.value)} placeholder="Ex: João Pedro"
                          style={{ width:"100%", padding:"11px 14px", borderRadius:12, border:`2px solid ${alunoNome?C.purple:"rgba(255,255,255,0.1)"}`, background:"rgba(255,255,255,0.07)", color:"white", fontSize:15, fontWeight:700, outline:"none", marginTop:4 }}/>
                      </div>
                      <div>
                        <label style={{ fontSize:10, fontWeight:800, color:"#CE93D8", textTransform:"uppercase", letterSpacing:1 }}>Série</label>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:4 }}>
                          {GRADES.map((g, i) => (
                            <button key={i} onClick={() => setAlunoGrade(i)} style={{ padding:"7px 10px", borderRadius:12, cursor:"pointer", background:alunoGrade===i?`linear-gradient(135deg,${C.purple},#A855F7)`:"rgba(255,255,255,0.07)", color:"white", border:alunoGrade===i?`2px solid #CE93D8`:"2px solid rgba(255,255,255,0.1)", fontSize:11, fontWeight:900, fontFamily:"'Fredoka One',sans-serif" }}>
                              {["📗","📘","📙","📕","📓"][i]} {g}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize:10, fontWeight:800, color:"#CE93D8", textTransform:"uppercase", letterSpacing:1 }}>Avatar</label>
                        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:4 }}>
                          {AVATARS.slice(0, 6).map((av, i) => (
                            <button key={i} onClick={() => setAlunoAvatar(i)} style={{ width:44, height:44, borderRadius:12, fontSize:22, cursor:"pointer", background:alunoAvatar===i?`${C.purple}44`:"rgba(255,255,255,0.07)", border:alunoAvatar===i?`2px solid ${C.purple}`:"2px solid rgba(255,255,255,0.1)" }}>{av}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:8, marginTop:14 }}>
                      <button onClick={() => { setAddAluno(false); setAlunoNome(""); setAlunoGrade(null); setAlunoAvatar(0); }} style={{ flex:1, padding:11, borderRadius:14, border:`2px solid rgba(255,255,255,0.15)`, background:"transparent", color:"#90CAF9", fontSize:13, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer" }}>Cancelar</button>
                      <button onClick={criarAluno} style={{ flex:2, padding:11, borderRadius:14, border:"none", background:alunoNome.trim()&&alunoGrade!==null?`linear-gradient(135deg,${C.purple},#A855F7)`:"rgba(255,255,255,0.1)", color:"white", fontSize:13, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", boxShadow:alunoNome.trim()&&alunoGrade!==null?`0 4px 0 #4A00AA`:"none" }}>✨ Gerar código</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {!turmaAtual ? (
            <div style={{ textAlign:"center", padding:"32px 0" }}>
              <div style={{ fontSize:40 }}>📋</div>
              <div style={{ fontSize:14, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", marginTop:8 }}>Crie uma turma primeiro</div>
              <button onClick={() => setTab("turmas")} style={{ marginTop:10, padding:"8px 20px", borderRadius:20, border:"none", background:`linear-gradient(135deg,${C.purple},#A855F7)`, color:"white", fontSize:13, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", boxShadow:`0 4px 0 #4A00AA` }}>Criar turma →</button>
            </div>
          ) : alunosDaTurma.length === 0 ? (
            <div style={{ textAlign:"center", padding:"24px 0" }}>
              <div style={{ fontSize:48 }}>👤</div>
              <div style={{ fontSize:15, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", marginTop:8 }}>Nenhum aluno cadastrado</div>
              <div style={{ fontSize:12, color:"#90CAF9", fontWeight:600, marginTop:4 }}>Cadastre os alunos da turma e gere os códigos de acesso</div>
              <button onClick={() => setAddAluno(true)} style={{ marginTop:12, padding:"10px 24px", borderRadius:20, border:"none", background:`linear-gradient(135deg,${C.purple},#A855F7)`, color:"white", fontSize:14, fontWeight:900, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", boxShadow:`0 4px 0 #4A00AA` }}>+ Cadastrar aluno</button>
            </div>
          ) : (
            <>
              {alunosDaTurma.map((a, i) => (
                <div key={i} style={{ background:"rgba(255,255,255,0.06)", borderRadius:16, padding:"12px 14px", marginBottom:8, border:`1px solid ${a.questoes===0?"rgba(255,107,107,0.2)":"rgba(255,255,255,0.08)"}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ fontSize:26 }}>{AVATARS[a.avatar]}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif" }}>{a.nome}</div>
                      <div style={{ fontSize:10, color:"#90CAF9", fontWeight:600 }}>{GRADES[a.grade]} · 🔑 {a.codigo}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:15, fontWeight:900, color:acc(a)>=70?C.green:acc(a)>0?C.orange:"#90CAF9" }}>{a.questoes>0?`${acc(a)}%`:"—"}</div>
                      <div style={{ fontSize:9, color:"#90CAF9" }}>acertos</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:10, marginTop:6, paddingTop:6, borderTop:"1px solid rgba(255,255,255,0.06)", flexWrap:"wrap" }}>
                    <span style={{ fontSize:10, color:"#90CAF9", fontWeight:700 }}>⚡ {a.xp||0} XP</span>
                    <span style={{ fontSize:10, color:"#90CAF9", fontWeight:700 }}>📝 {a.questoes||0} questões</span>
                    <span style={{ fontSize:10, color:"#90CAF9", fontWeight:700 }}>⭐ Fase {(a.fasesCompletas||0)+1}</span>
                    <span style={{ fontSize:10, fontWeight:700, color:a.questoes===0?C.red:a.streak>0?C.orange:"#90CAF9" }}>{a.questoes===0?"Nunca jogou":a.streak>0?`🔥 ${a.streak}d`:"⚠️ Inativo"}</span>
                  </div>
                </div>
              ))}
              <button onClick={() => setAddAluno(true)} style={{ width:"100%", padding:11, borderRadius:14, border:`2px dashed ${C.purple}88`, background:"transparent", color:C.purple, fontSize:13, fontWeight:800, fontFamily:"'Fredoka One',sans-serif", cursor:"pointer", marginTop:4 }}>+ Cadastrar novo aluno</button>
            </>
          )}
        </>}

        {/* ── RELATÓRIO ── */}
        {tab === "relatorio" && <>
          <div style={{ fontSize:13, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", marginBottom:10 }}>📊 Relatório por turma</div>
          {turmas.length === 0 ? (
            <div style={{ textAlign:"center", padding:"32px 0" }}>
              <div style={{ fontSize:40 }}>📊</div>
              <div style={{ fontSize:14, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif", marginTop:8 }}>Nenhuma turma ainda</div>
            </div>
          ) : turmas.map((t, i) => {
            const als = todosFilhos.filter(f => t.alunos?.includes(f.codigo));
            const med = als.length > 0 ? Math.round(als.reduce((s,f)=>s+acc(f),0)/als.length) : 0;
            const top = [...als].sort((a,b)=>b.xp-a.xp)[0];
            const nunca = als.filter(f=>f.questoes===0).length;
            return (
              <div key={i} style={{ background:"rgba(255,255,255,0.06)", borderRadius:18, padding:"14px", marginBottom:10, border:"1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <div style={{ fontSize:15, fontWeight:900, color:"white", fontFamily:"'Fredoka One',sans-serif" }}>{t.nome}</div>
                  <div style={{ fontSize:18, fontWeight:900, color:med>=70?C.green:med>0?C.orange:C.red, fontFamily:"'Fredoka One',sans-serif" }}>{als.length>0?`${med}%`:"—"}</div>
                </div>
                <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:8 }}>
                  <span style={{ fontSize:11, color:"#90CAF9", fontWeight:700 }}>👥 {als.length} alunos</span>
                  <span style={{ fontSize:11, color:C.green, fontWeight:700 }}>✅ {als.filter(f=>f.questoes>0).length} ativos</span>
                  {top&&<span style={{ fontSize:11, color:C.gold, fontWeight:700 }}>🏆 {top.nome}</span>}
                </div>
                {als.length > 0 && (
                  <div style={{ height:6, background:"rgba(255,255,255,0.1)", borderRadius:6, overflow:"hidden", marginBottom:6 }}>
                    <div style={{ height:"100%", width:`${med}%`, background:med>=70?C.green:C.orange, borderRadius:6 }}/>
                  </div>
                )}
                {nunca > 0 && <div style={{ fontSize:11, color:C.red, fontWeight:700 }}>⚠️ {nunca} aluno(s) nunca jogaram</div>}
                {/* Lista rápida de alunos */}
                <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:4 }}>
                  {als.map((a,j)=>(
                    <div key={j} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 8px", background:"rgba(255,255,255,0.04)", borderRadius:10 }}>
                      <span style={{ fontSize:16 }}>{AVATARS[a.avatar]}</span>
                      <span style={{ flex:1, fontSize:12, fontWeight:700, color:"white" }}>{a.nome}</span>
                      <span style={{ fontSize:11, fontWeight:900, color:acc(a)>=70?C.green:acc(a)>0?C.orange:"#90CAF9" }}>{a.questoes>0?`${acc(a)}%`:"—"}</span>
                      <span style={{ fontSize:10, color:"#90CAF9" }}>F{(a.fasesCompletas||0)+1}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>}
      </div>
    </div>
  );
}

const NAV=[
  {k:"map",  i:"🗺️", l:"Mapa"  },
  {k:"quiz", i:"⚔️", l:"Missão"},
  {k:"shop", i:"🏪", l:"Loja"  },
  {k:"rank", i:"🏆", l:"Rank"  },
  {k:"hero", i:"🦊", l:"Herói" },
];

const CSS=`
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');
  @keyframes float      {0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
  @keyframes heroFloat  {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes cloudDrift {0%,100%{transform:translateX(0)}50%{transform:translateX(12px)}}
  @keyframes ringPulse  {0%,100%{transform:translate(-50%,-50%) translateY(-32px) scale(1);opacity:.7}50%{transform:translate(-50%,-50%) translateY(-32px) scale(1.4);opacity:.3}}
  @keyframes popIn      {0%{transform:scale(0.3);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
  @keyframes bounce     {0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
  @keyframes twinkle    {0%,100%{opacity:0.2;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
  @keyframes toastIn    {from{transform:translateY(-22px);opacity:0}to{transform:translateY(0);opacity:1}}
  @keyframes toastOut   {from{opacity:1}to{opacity:0;transform:translateY(-12px)}}
  @keyframes burst0{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(-65px,-90px) scale(0);opacity:0}}
  @keyframes burst1{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(65px,-90px) scale(0);opacity:0}}
  @keyframes burst2{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(-45px,-110px) scale(0);opacity:0}}
  @keyframes burst3{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(45px,-110px) scale(0);opacity:0}}
  *{box-sizing:border-box;margin:0;padding:0}
  button:active{opacity:.85}
  input{color:white;font-family:'Nunito',sans-serif}
  input::placeholder{color:rgba(255,255,255,0.3)}
  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-thumb{background:#FFD700;border-radius:3px}
`;

export default function App(){
  const [screen,setScreen]=useState("login");
  const [burst,setBurst]=useState(false);
  const {toasts,show}=useToast();
  const [tick,setTick]=useState(0); // força re-render ao voltar para tela
  const go=s=>{setScreen(s);setTick(t=>t+1);}; // atualiza dados ao navegar
  const isGame=!["login","parent","teacher"].includes(screen);

  // Dados reais do aluno logado
  const sessao = Storage.get("mq_usuario_atual");
  const filhosAll = Storage.get("mq_filhos")||[];
  const alunoLogado = filhosAll.find(f=>f.codigo===sessao?.codigo);
  const xpReal    = alunoLogado?.xp || 0;
  const nivelReal = Math.floor(xpReal/500)+1;
  const xpProg    = xpReal % 500;
  const moedasReal = alunoLogado?.moedas || 0;
  const gemasReal  = alunoLogado?.gemas  || 0;
  const estrelas   = Object.values(alunoLogado?.starsMap||{}).reduce((s,v)=>s+v,0);

  return(
    <div style={{minHeight:"100dvh",background:"#020814",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <style>{CSS}</style>
      <div style={{width:"100%",maxWidth:480,height:"100dvh",borderRadius:0,overflow:"hidden",display:"flex",flexDirection:"column",position:"relative"}}>
        <RewardBurst show={burst} onDone={()=>setBurst(false)}/>
        <Toast toasts={toasts}/>

        {isGame&&(
          <div style={{background:C.dark,padding:"8px 16px 4px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:11,color:"#90CAF9",fontFamily:"'Nunito',sans-serif",fontWeight:800}}>
            <span>9:41</span>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <ShieldLogo s={18}/>
              <span style={{fontFamily:"'Fredoka One',sans-serif",color:C.gold,fontSize:13,textShadow:`0 0 12px ${C.gold}66`}}>Math<span style={{color:C.blue}}>Quest</span></span>
            </div>
            <span>🔋</span>
          </div>
        )}

        {isGame&&(
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 10px 6px",background:`linear-gradient(180deg,#0A1628,${C.card})`,borderBottom:`3px solid ${C.gold}`}}>
            <div style={{flex:1,height:16,background:"rgba(0,0,0,0.5)",borderRadius:20,border:`2px solid ${C.green}66`,overflow:"hidden",position:"relative"}}>
              <div style={{position:"absolute",top:0,left:0,bottom:0,width:`${Math.min((xpProg/500)*100,100)}%`,background:`linear-gradient(90deg,${C.green},#27AE60)`,borderRadius:20,transition:"width 0.8s ease",boxShadow:`0 0 8px ${C.green}88`}}/>
              <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",zIndex:1,textShadow:"0 1px 3px rgba(0,0,0,0.8)"}}>Nv.{nivelReal} · {xpReal} XP</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:4,background:"linear-gradient(135deg,#BF360C,#E64A19)",borderRadius:22,padding:"3px 10px",border:`2px solid ${C.orange}`}}>
              <Coin sz={15}/><span style={{fontSize:12,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{moedasReal}</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:4,background:"linear-gradient(135deg,#4527A0,#6A1B9A)",borderRadius:22,padding:"3px 8px",border:"2px solid #9C6FFF"}}>
              <span style={{fontSize:14}}>⭐</span><span style={{fontSize:12,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{estrelas}</span>
            </div>
            <button onClick={()=>go("parent")} style={{background:"rgba(30,144,255,0.2)",border:`2px solid ${C.blue}55`,borderRadius:10,padding:"3px 7px",fontSize:13,cursor:"pointer",color:"white",fontWeight:900}}>👨‍👩‍👧</button>
          </div>
        )}

        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {screen==="login"   && <LoginScreen   onDone={go}/>}
          {screen==="map"     && <MapScreen     go={go} toast={show}/>}
          {screen==="quiz"    && <QuizScreen    go={go} toast={show} showBurst={()=>setBurst(true)}/>}
          {screen==="shop"    && <ShopScreen    toast={show}/>}
          {screen==="rank"    && <RankScreen/>}
          {screen==="hero"    && <HeroScreen/>}
          {screen==="parent"  && <ParentScreen  go={go}/>}
          {screen==="teacher" && <TeacherScreen go={go}/>}
        </div>

        {isGame&&(
          <div style={{display:"flex",background:`linear-gradient(180deg,#060F22,#0A1628)`,borderTop:`3px solid ${C.gold}`}}>
            {NAV.map(item=>{
              const active=screen===item.k;
              return(
                <button key={item.k} onClick={()=>go(item.k)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"7px 0 5px",border:"none",background:active?`linear-gradient(180deg,${C.gold},${C.goldDk})`:"transparent",borderTop:active?`4px solid #FFF9C4`:"4px solid transparent",cursor:"pointer",transition:"all 0.18s",boxShadow:active?`0 -4px 16px ${C.gold}44`:"none"}}>
                  <span style={{fontSize:22}}>{item.i}</span>
                  <span style={{fontSize:10,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",color:active?C.dark:"#4A7AB5"}}>{item.l}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
