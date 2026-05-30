import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════
   CORES OFICIAIS MATHQUEST
═══════════════════════════════════════ */
const C = {
  blue:"#1E90FF", blueDk:"#0055CC", blueBg:"#0A1628", dark:"#060B16",
  card:"#0D1F3C", gold:"#FFD700", goldDk:"#FF8F00",
  red:"#FF6B6B", green:"#2ECC71", purple:"#6C5CE7", orange:"#FFA63A",
};

/* ═══════════════════════════════════════
   STORAGE — persiste no localStorage
═══════════════════════════════════════ */
const Storage = {
  get: (key) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; } },
  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
  clear: () => { try { localStorage.clear(); } catch {} },
};

/* ═══════════════════════════════════════
   GERADOR DE CÓDIGO DO FILHO
═══════════════════════════════════════ */
function gerarCodigo(nome) {
  const n = nome.toUpperCase().replace(/\s/g,"").slice(0,4);
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${n}-${num}`;
}

/* ═══════════════════════════════════════
   SVGs
═══════════════════════════════════════ */
const Logo = ({ s = 32 }) => (
  <svg width={s*.9} height={s} viewBox="0 0 54 60">
    <defs>
      <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFE44D"/><stop offset="100%" stopColor="#FF9800"/></linearGradient>
      <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2196F3"/><stop offset="100%" stopColor="#0D47A1"/></linearGradient>
    </defs>
    <path d="M27 2 L52 13 L52 33 Q52 52 27 58 Q2 52 2 33 L2 13Z" fill="url(#lg1)" stroke="#FF6F00" strokeWidth="1.5"/>
    <path d="M27 7 L46 17 L46 33 Q46 48 27 53 Q8 48 8 33 L8 17Z" fill="url(#lg2)" stroke="#42A5F5" strokeWidth="1"/>
    <path d="M27 13 L38 19 L38 32 Q38 42 27 47 Q16 42 16 32 L16 19Z" fill="#0D2D7A"/>
    <text x="27" y="35" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="Arial Black">+</text>
    <polygon points="27,2 29.5,9 37,9 31,13 33,21 27,17 21,21 23,13 17,9 24.5,9" fill="#FFE44D" stroke="#FF6F00" strokeWidth="0.6"/>
  </svg>
);

const Fox = ({ sz = 70, mood = "happy" }) => (
  <svg width={sz} height={sz*1.15} viewBox="0 0 100 115">
    <path d="M22 72 Q10 92 16 108 L50 98 L84 108 Q90 92 78 72" fill="#1565C0" stroke="#0D47A1" strokeWidth="1"/>
    <path d="M22 72 Q14 86 18 98" stroke="#FFD700" strokeWidth="2" fill="none"/>
    <path d="M78 72 Q86 86 82 98" stroke="#FFD700" strokeWidth="2" fill="none"/>
    <ellipse cx="50" cy="76" rx="20" ry="16" fill="#EF6C00"/>
    <ellipse cx="50" cy="48" rx="25" ry="23" fill="#FF7043"/>
    <polygon points="25,36 18,12 38,28" fill="#FF7043"/>
    <polygon points="75,36 82,12 62,28" fill="#FF7043"/>
    <polygon points="27,34 22,16 36,28" fill="#FFCC02"/>
    <polygon points="73,34 78,16 64,28" fill="#FFCC02"/>
    <ellipse cx="50" cy="54" rx="15" ry="12" fill="#FFE0B2"/>
    <ellipse cx="41" cy="44" rx="5" ry="5.5" fill="#212121"/>
    <ellipse cx="59" cy="44" rx="5" ry="5.5" fill="#212121"/>
    <circle cx="42.8" cy="42.5" r="2" fill="white"/>
    <circle cx="60.8" cy="42.5" r="2" fill="white"/>
    <ellipse cx="50" cy="53" rx="3" ry="2.2" fill="#BF360C"/>
    {mood==="happy"&&<path d="M42 58 Q50 65 58 58" stroke="#BF360C" strokeWidth="2.2" fill="none" strokeLinecap="round"/>}
    {mood==="sad"  &&<path d="M42 63 Q50 57 58 63" stroke="#BF360C" strokeWidth="2.2" fill="none" strokeLinecap="round"/>}
    {mood==="wow"  &&<ellipse cx="50" cy="60" rx="5" ry="4" fill="#BF360C"/>}
    <ellipse cx="35" cy="54" rx="5.5" ry="3.5" fill="#FFAB91" opacity="0.65"/>
    <ellipse cx="65" cy="54" rx="5.5" ry="3.5" fill="#FFAB91" opacity="0.65"/>
    <rect x="76" y="28" width="5" height="30" rx="2.5" fill="#B0BEC5"/>
    <rect x="72" y="28" width="13" height="6" rx="3" fill="#FFD700"/>
    <rect x="77" y="19" width="4" height="11" rx="2" fill="#CFD8DC"/>
    <rect x="30" y="70" width="40" height="6" rx="3" fill="#5D4037"/>
    <rect x="46" y="69" width="8" height="8" rx="2" fill="#FFD700"/>
  </svg>
);

const StarSVG = ({ on, sz=16 }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24">
    <polygon points="12,2 15,9 22,9.5 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.5 9,9"
      fill={on?"#FFD700":"#1E3A6E"} stroke={on?"#FF8F00":"#2A4A8E"} strokeWidth="1"/>
  </svg>
);

const Coin = ({ sz=18 }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#FFD700" stroke="#FF8F00" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="8.5" fill="#FFC107"/>
    <text x="12" y="16.5" textAnchor="middle" fill="#7B3F00" fontSize="9" fontWeight="900" fontFamily="Arial">$</text>
  </svg>
);

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
function Toast({ toasts }) {
  return (
    <div style={{position:"absolute",top:60,left:0,right:0,zIndex:999,
      display:"flex",flexDirection:"column",alignItems:"center",gap:6,pointerEvents:"none"}}>
      {toasts.map(t=>(
        <div key={t.id} style={{
          background:t.type==="xp"?"linear-gradient(135deg,#FFD700,#FF8F00)"
            :t.type==="coin"?"linear-gradient(135deg,#E65100,#FF8F00)"
            :t.type==="level"?"linear-gradient(135deg,#6C5CE7,#A855F7)"
            :t.type==="badge"?"linear-gradient(135deg,#2ECC71,#1B8A3A)"
            :"linear-gradient(135deg,#1E90FF,#0055CC)",
          borderRadius:30,padding:"8px 20px",fontSize:14,fontWeight:900,
          color:t.type==="xp"||t.type==="coin"?"#0D1F3C":"white",
          fontFamily:"'Fredoka One',sans-serif",boxShadow:"0 4px 20px #00000055",
          animation:"toastIn 0.3s ease, toastOut 0.3s ease 1.7s forwards",
          display:"flex",alignItems:"center",gap:8,
          border:t.type==="xp"?"2px solid #FFF9C4":"2px solid rgba(255,255,255,0.3)",
        }}>
          <span style={{fontSize:18}}>{t.icon}</span>{t.text}
        </div>
      ))}
    </div>
  );
}
function useToast() {
  const [toasts,setToasts]=useState([]);
  const id=useRef(0);
  const show=(icon,text,type="info")=>{
    const tid=id.current++;
    setToasts(p=>[...p,{id:tid,icon,text,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==tid)),2200);
  };
  return {toasts,show};
}

function RewardBurst({show:visible,onDone}){
  useEffect(()=>{if(visible){const t=setTimeout(onDone,1600);return()=>clearTimeout(t);}},[visible,onDone]);
  if(!visible)return null;
  return(
    <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:200,overflow:"hidden"}}>
      {["⭐","🪙","⭐","💎","🪙","⭐","🪙","⭐"].map((em,i)=>(
        <div key={i} style={{position:"absolute",left:`${10+i*11}%`,top:"40%",fontSize:24,
          animation:`burst${i%4} 1.4s ease-out forwards`,animationDelay:`${i*0.08}s`}}>{em}</div>
      ))}
    </div>
  );
}

const AVATARS=["🦊","🐯","🐰","🐻","🦁","🐸","🧙","🧝‍♀️"];
const GRADES=["1º Ano","2º Ano","3º Ano","4º Ano","5º Ano"];

/* ═══════════════════════════════════════════════════
   LOGIN / ONBOARDING
   - Aluno: usa CÓDIGO gerado pelo pai (sem e-mail)
   - Pai: cadastra com e-mail + adiciona filhos
═══════════════════════════════════════════════════ */
function LoginScreen({ onDone }) {
  const [step, setStep] = useState("splash");
  const [mode, setMode] = useState("aluno");
  // pai fields
  const [email, setEmail]   = useState("");
  const [pass,  setPass]    = useState("");
  const [paiNome, setPaiNome] = useState("");
  // filho fields
  const [filhoNome,  setFilhoNome]  = useState("");
  const [filhoGrade, setFilhoGrade] = useState(null);
  const [filhoAvatar,setFilhoAvatar]= useState(0);
  const [codigoGerado, setCodigoGerado] = useState("");
  // aluno fields
  const [codigo, setCodigo] = useState("");
  const [codigoErro, setCodigoErro] = useState(false);
  const [alunoData, setAlunoData] = useState(null);

  const confirmarCadastroFilho = () => {
    if (!filhoNome.trim() || filhoGrade === null) return;
    const cod = gerarCodigo(filhoNome);
    setCodigoGerado(cod);
    // Salva pai e filho no localStorage
    const pais = Storage.get("mq_pais") || [];
    const filhos = Storage.get("mq_filhos") || [];
    const novoPai = { email, nome: paiNome, filhos: [cod] };
    const novoFilho = {
      codigo: cod, nome: filhoNome,
      grade: filhoGrade, avatar: filhoAvatar,
      xp: 0, nivel: 1, streak: 0, acertos: 0, questoes: 0,
      tempo: "0min", paiEmail: email,
    };
    Storage.set("mq_pais", [...pais.filter(p=>p.email!==email), novoPai]);
    Storage.set("mq_filhos", [...filhos.filter(f=>f.codigo!==cod), novoFilho]);
    Storage.set("mq_usuario_atual", { tipo:"pai", email, nome: paiNome });
    setStep("codigo_filho");
  };

  const entrarComCodigo = () => {
    const filhos = Storage.get("mq_filhos") || [];
    const filho = filhos.find(f => f.codigo === codigo.toUpperCase().trim());
    if (!filho) { setCodigoErro(true); return; }
    setCodigoErro(false);
    setAlunoData(filho);
    Storage.set("mq_usuario_atual", { tipo:"aluno", codigo: filho.codigo, nome: filho.nome, avatar: filho.avatar, grade: filho.grade });
    setStep("bem_vindo_aluno");
  };

  const loginPai = () => {
    const pais = Storage.get("mq_pais") || [];
    const pai = pais.find(p => p.email === email);
    if (pai) {
      Storage.set("mq_usuario_atual", { tipo:"pai", email, nome: pai.nome });
      onDone("parent");
    } else {
      // Novo cadastro de pai
      setStep("pai_nome");
    }
  };

  const loginAluno = () => {
    // Tenta entrar com código existente
    const atual = Storage.get("mq_usuario_atual");
    if (atual?.tipo === "aluno") { onDone("map"); return; }
    setStep("aluno_codigo");
  };

  /* ── SPLASH ── */
  if (step==="splash") return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"space-between",padding:"60px 32px 52px",
      background:"linear-gradient(160deg,#0D47A1,#1E90FF,#29B6F6)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#ffffff09 1px,transparent 1px)",backgroundSize:"26px 26px"}}/>
      {["÷","×","+","−","=","²"].map((s,i)=>(
        <div key={i} style={{position:"absolute",left:`${[8,80,20,65,40,88][i]}%`,top:`${[12,20,55,65,80,45][i]}%`,
          fontSize:[28,20,32,22,28,24][i],color:"#ffffff12",fontFamily:"'Fredoka One',sans-serif",fontWeight:900}}>{s}</div>
      ))}
      <div style={{zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:16,flex:1,justifyContent:"center"}}>
        <div style={{animation:"heroFloat 2s ease-in-out infinite"}}><Fox sz={110}/></div>
        <div style={{fontSize:52,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textShadow:"0 4px 20px #00000044",lineHeight:1}}>
          Math<span style={{color:"#FFD700"}}>Quest</span>
        </div>
        <div style={{fontSize:16,color:"#BBDEFB",fontWeight:700}}>Matemática é uma aventura!</div>
      </div>
      <button onClick={()=>setStep("welcome")} style={{width:"100%",padding:16,borderRadius:20,border:"none",zIndex:1,
        background:"white",color:"#0D47A1",fontSize:18,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",
        boxShadow:"0 8px 28px #00000033"}}>Começar →</button>
    </div>
  );

  /* ── WELCOME — escolha quem é ── */
  if (step==="welcome") return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"36px 24px 28px",gap:20,
      background:"linear-gradient(180deg,#0A1628,#0D1F3C)"}}>
      <div style={{animation:"heroFloat 2.5s ease-in-out infinite"}}><Fox sz={80}/></div>
      <div style={{fontSize:26,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>Olá! Quem é você? 👋</div>
      <div style={{fontSize:14,color:"#90CAF9",fontWeight:600,textAlign:"center",lineHeight:1.6}}>
        Escolha como quer entrar no MathQuest
      </div>

      {/* Cards de escolha */}
      <div style={{display:"flex",flexDirection:"column",gap:12,width:"100%",marginTop:8}}>
        {/* Aluno */}
        <button onClick={()=>setStep("aluno_codigo")} style={{
          display:"flex",alignItems:"center",gap:16,padding:"18px 20px",
          borderRadius:20,cursor:"pointer",
          background:"linear-gradient(135deg,#1E90FF22,#1E90FF11)",
          border:`3px solid ${C.blue}`,
          transition:"all 0.2s",boxShadow:`0 4px 16px ${C.blue}22`}}>
          <div style={{fontSize:44}}>🎒</div>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:17,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>Sou Aluno</div>
            <div style={{fontSize:12,color:"#90CAF9",fontWeight:600}}>Entro com meu código de acesso</div>
          </div>
          <span style={{marginLeft:"auto",fontSize:20,color:C.blue}}>→</span>
        </button>

        {/* Pai */}
        <button onClick={()=>setStep("pai_login")} style={{
          display:"flex",alignItems:"center",gap:16,padding:"18px 20px",
          borderRadius:20,cursor:"pointer",
          background:`linear-gradient(135deg,${C.gold}22,${C.gold}11)`,
          border:`3px solid ${C.gold}`,
          transition:"all 0.2s",boxShadow:`0 4px 16px ${C.gold}22`}}>
          <div style={{fontSize:44}}>👨‍👩‍👧</div>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:17,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>Sou Pai / Mãe</div>
            <div style={{fontSize:12,color:"#90CAF9",fontWeight:600}}>Cadastro meus filhos e acompanho</div>
          </div>
          <span style={{marginLeft:"auto",fontSize:20,color:C.gold}}>→</span>
        </button>

        {/* Professor */}
        <button onClick={()=>setStep("prof_login")} style={{
          display:"flex",alignItems:"center",gap:16,padding:"18px 20px",
          borderRadius:20,cursor:"pointer",
          background:`linear-gradient(135deg,${C.purple}22,${C.purple}11)`,
          border:`3px solid ${C.purple}`,
          transition:"all 0.2s",boxShadow:`0 4px 16px ${C.purple}22`}}>
          <div style={{fontSize:44}}>👩‍🏫</div>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:17,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>Sou Professor(a)</div>
            <div style={{fontSize:12,color:"#90CAF9",fontWeight:600}}>Acompanho minha turma</div>
          </div>
          <span style={{marginLeft:"auto",fontSize:20,color:C.purple}}>→</span>
        </button>
      </div>
    </div>
  );

  /* ── ALUNO — entra com código ── */
  if (step==="aluno_codigo") return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",
      padding:"32px 24px",gap:16,background:"linear-gradient(180deg,#0A1628,#0D1F3C)"}}>
      <button onClick={()=>setStep("welcome")} style={{alignSelf:"flex-start",background:"none",border:"none",
        color:C.blue,fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>◀ Voltar</button>
      <div style={{fontSize:64,animation:"heroFloat 2s ease-in-out infinite"}}>🎒</div>
      <div style={{fontSize:24,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>
        Qual é o seu código?
      </div>
      <div style={{fontSize:13,color:"#90CAF9",fontWeight:600,textAlign:"center",lineHeight:1.6}}>
        Seu pai ou mãe criou um código especial só para você! Pede para eles te mostrar 😊
      </div>

      {/* Código input */}
      <input
        value={codigo}
        onChange={e=>{setCodigo(e.target.value.toUpperCase());setCodigoErro(false);}}
        placeholder="Ex: CAIO-1234"
        maxLength={9}
        style={{width:"100%",padding:"18px 20px",borderRadius:16,textAlign:"center",
          border:`3px solid ${codigoErro?C.red:codigo.length>0?C.gold:"rgba(255,255,255,0.1)"}`,
          background:"rgba(255,255,255,0.06)",fontSize:24,fontWeight:900,
          fontFamily:"'Fredoka One',sans-serif",outline:"none",letterSpacing:4,
          color:"white",transition:"border-color 0.3s"}}/>

      {codigoErro && (
        <div style={{background:`${C.red}22`,border:`2px solid ${C.red}44`,borderRadius:14,
          padding:"10px 16px",width:"100%",textAlign:"center"}}>
          <div style={{fontSize:13,fontWeight:900,color:C.red,fontFamily:"'Fredoka One',sans-serif"}}>
            😅 Código não encontrado!
          </div>
          <div style={{fontSize:11,color:"rgba(255,107,107,0.8)",fontWeight:600,marginTop:2}}>
            Pede para seu pai ou mãe verificar o código
          </div>
        </div>
      )}

      <button onClick={entrarComCodigo} style={{width:"100%",padding:15,borderRadius:20,border:"none",
        background:codigo.length>=6?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",
        color:codigo.length>=6?C.dark:"#4A7AB5",fontSize:17,fontWeight:900,
        fontFamily:"'Fredoka One',sans-serif",cursor:codigo.length>=6?"pointer":"not-allowed",
        boxShadow:codigo.length>=6?`0 5px 0 #B86000`:"none",transition:"all 0.2s",marginTop:"auto"}}>
        🚀 Entrar no jogo!
      </button>
    </div>
  );

  /* ── BEM VINDO ALUNO ── */
  if (step==="bem_vindo_aluno" && alunoData) return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      gap:16,padding:28,background:"linear-gradient(160deg,#0D47A1,#1E90FF)"}}>
      <div style={{fontSize:60,animation:"bounce 0.8s ease-in-out infinite"}}>🎉</div>
      <div style={{animation:"heroFloat 2s ease-in-out infinite"}}><Fox sz={90} mood="wow"/></div>
      <div style={{fontSize:28,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>
        Olá, {alunoData.nome}! 👋
      </div>
      <div style={{fontSize:14,color:"#BBDEFB",fontWeight:600,textAlign:"center",lineHeight:1.6}}>
        Bem-vindo(a) de volta! Sua aventura continua. Boa sorte, {GRADES[alunoData.grade]}! ⭐
      </div>
      <div style={{display:"flex",gap:10,width:"100%"}}>
        {[
          {i:AVATARS[alunoData.avatar],v:alunoData.nome,d:"Aventureiro"},
          {i:"⚡",v:`${alunoData.xp} XP`,d:"Pontuação"},
          {i:"🔥",v:`${alunoData.streak} dias`,d:"Sequência"},
        ].map((s,i)=>(
          <div key={i} style={{flex:1,background:"rgba(255,255,255,0.15)",borderRadius:16,padding:"12px 6px",
            textAlign:"center",border:"2px solid rgba(255,255,255,0.25)"}}>
            <div style={{fontSize:22}}>{s.i}</div>
            <div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{s.v}</div>
            <div style={{fontSize:9,color:"#BBDEFB"}}>{s.d}</div>
          </div>
        ))}
      </div>
      <button onClick={()=>onDone("map")} style={{width:"100%",padding:16,borderRadius:20,border:"none",
        background:"white",color:"#0D47A1",fontSize:18,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",
        cursor:"pointer",boxShadow:"0 6px 24px #00000033"}}>🏠 Jogar agora!</button>
    </div>
  );

  /* ── PAI LOGIN ── */
  if (step==="pai_login") return (
    <div style={{flex:1,display:"flex",flexDirection:"column",padding:"20px 24px",gap:14,
      background:"linear-gradient(180deg,#0A1628,#0D1F3C)",overflowY:"auto"}}>
      <button onClick={()=>setStep("welcome")} style={{background:"none",border:"none",color:C.blue,
        fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",textAlign:"left",padding:0}}>◀ Voltar</button>
      <div style={{textAlign:"center",fontSize:52,animation:"heroFloat 2s ease-in-out infinite"}}>👨‍👩‍👧</div>
      <div style={{fontSize:24,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>Acesso dos Pais</div>
      <div style={{fontSize:13,color:"#90CAF9",textAlign:"center",fontWeight:600}}>
        Cadastre-se para acompanhar seus filhos
      </div>
      {[["📧 E-mail","email","seu@email.com",email,setEmail],
        ["🔒 Senha","password","Mínimo 6 caracteres",pass,setPass]].map(([lbl,tp,ph,val,set],i)=>(
        <div key={i} style={{display:"flex",flexDirection:"column",gap:5}}>
          <label style={{fontSize:11,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:1}}>{lbl}</label>
          <input value={val} onChange={e=>set(e.target.value)} placeholder={ph} type={tp}
            style={{padding:"13px 16px",borderRadius:14,border:`2px solid rgba(255,255,255,0.08)`,
              background:"rgba(255,255,255,0.06)",fontSize:15,fontWeight:700,outline:"none"}}/>
        </div>
      ))}
      <button onClick={loginPai} style={{width:"100%",padding:15,borderRadius:20,border:"none",
        background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,color:C.dark,fontSize:17,fontWeight:900,
        fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 5px 0 #B86000`,marginTop:4}}>
        👨‍👩‍👧 Entrar / Cadastrar
      </button>
      <div style={{fontSize:11,color:"#4A7AB5",textAlign:"center",fontWeight:600}}>
        Se já tem conta, entrará direto no painel. Se não, criaremos sua conta agora.
      </div>
    </div>
  );

  /* ── PAI NOME ── */
  if (step==="pai_nome") return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",
      padding:"24px 24px 32px",gap:14,background:"linear-gradient(180deg,#0A1628,#0D1F3C)"}}>
      <div style={{fontSize:11,fontWeight:800,color:"#4A7AB5",textTransform:"uppercase",letterSpacing:2}}>Quase lá!</div>
      <div style={{fontSize:52,animation:"heroFloat 2s ease-in-out infinite"}}>👋</div>
      <div style={{fontSize:22,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>Como você se chama?</div>
      <div style={{fontSize:13,color:"#90CAF9",fontWeight:600,textAlign:"center"}}>Seu nome no painel de acompanhamento</div>
      <input value={paiNome} onChange={e=>setPaiNome(e.target.value)} placeholder="Seu nome..."
        style={{width:"100%",padding:"16px 20px",borderRadius:16,textAlign:"center",
          border:`3px solid ${paiNome?C.gold:"rgba(255,255,255,0.1)"}`,
          background:"rgba(255,255,255,0.06)",fontSize:20,fontWeight:900,
          fontFamily:"'Fredoka One',sans-serif",outline:"none",color:"white"}}/>
      <button onClick={()=>paiNome.trim()&&setStep("add_filho")} style={{width:"100%",padding:15,borderRadius:20,
        border:"none",marginTop:"auto",
        background:paiNome.trim()?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",
        color:paiNome.trim()?C.dark:"#4A7AB5",fontSize:17,fontWeight:900,
        fontFamily:"'Fredoka One',sans-serif",cursor:paiNome.trim()?"pointer":"not-allowed",
        boxShadow:paiNome.trim()?`0 5px 0 #B86000`:"none",transition:"all 0.2s"}}>
        Próximo →
      </button>
    </div>
  );

  /* ── ADD FILHO ── */
  if (step==="add_filho") return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",
      padding:"20px 24px 28px",gap:12,background:"linear-gradient(180deg,#0A1628,#0D1F3C)",overflowY:"auto"}}>
      <div style={{fontSize:11,fontWeight:800,color:"#4A7AB5",textTransform:"uppercase",letterSpacing:2}}>
        Cadastrar filho(a)
      </div>
      <div style={{fontSize:44,animation:"heroFloat 2s ease-in-out infinite"}}>👶</div>
      <div style={{fontSize:20,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>
        Dados do seu filho(a)
      </div>
      <div style={{fontSize:12,color:"#90CAF9",fontWeight:600,textAlign:"center"}}>
        Preencha os dados para criar o código de acesso dele(a)
      </div>

      {/* Nome do filho */}
      <div style={{display:"flex",flexDirection:"column",gap:5,width:"100%"}}>
        <label style={{fontSize:11,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:1}}>
          🧒 Nome do filho(a)
        </label>
        <input value={filhoNome} onChange={e=>setFilhoNome(e.target.value)} placeholder="Ex: Caio, Sofia..."
          style={{padding:"13px 16px",borderRadius:14,
            border:`2px solid ${filhoNome?C.gold:"rgba(255,255,255,0.1)"}`,
            background:"rgba(255,255,255,0.06)",fontSize:16,fontWeight:700,
            outline:"none",color:"white",transition:"border-color 0.3s"}}/>
      </div>

      {/* Série */}
      <div style={{display:"flex",flexDirection:"column",gap:5,width:"100%"}}>
        <label style={{fontSize:11,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:1}}>
          📚 Série escolar
        </label>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {GRADES.map((g,i)=>(
            <button key={i} onClick={()=>setFilhoGrade(i)} style={{
              padding:"9px 12px",borderRadius:14,cursor:"pointer",transition:"all 0.2s",
              background:filhoGrade===i?`linear-gradient(135deg,${C.blue},${C.blueDk})`:"rgba(255,255,255,0.06)",
              color:"white",border:filhoGrade===i?`2px solid #90CAF9`:"2px solid rgba(255,255,255,0.1)",
              fontFamily:"'Fredoka One',sans-serif",fontSize:12,fontWeight:900}}>
              {["📗","📘","📙","📕","📓"][i]} {g}
            </button>
          ))}
        </div>
      </div>

      {/* Avatar */}
      <div style={{display:"flex",flexDirection:"column",gap:5,width:"100%"}}>
        <label style={{fontSize:11,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:1}}>
          🎭 Avatar favorito
        </label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {AVATARS.map((av,i)=>(
            <button key={i} onClick={()=>setFilhoAvatar(i)} style={{
              width:50,height:50,borderRadius:14,fontSize:24,cursor:"pointer",
              background:filhoAvatar===i?`${C.gold}33`:"rgba(255,255,255,0.06)",
              border:filhoAvatar===i?`3px solid ${C.gold}`:"2px solid rgba(255,255,255,0.1)",
              transform:filhoAvatar===i?"scale(1.1)":"scale(1)",transition:"all 0.2s"}}>{av}</button>
          ))}
        </div>
      </div>

      <button onClick={confirmarCadastroFilho} style={{width:"100%",padding:14,borderRadius:20,border:"none",
        background:filhoNome.trim()&&filhoGrade!==null
          ?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",
        color:filhoNome.trim()&&filhoGrade!==null?C.dark:"#4A7AB5",
        fontSize:16,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",
        cursor:filhoNome.trim()&&filhoGrade!==null?"pointer":"not-allowed",
        boxShadow:filhoNome.trim()&&filhoGrade!==null?`0 5px 0 #B86000`:"none",
        transition:"all 0.2s",marginTop:4}}>
        ✨ Gerar código de acesso
      </button>
    </div>
  );

  /* ── CÓDIGO DO FILHO ── */
  if (step==="codigo_filho") return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      gap:16,padding:28,background:"linear-gradient(160deg,#0D47A1,#1E90FF)"}}>
      <div style={{fontSize:50}}>🎉</div>
      <div style={{fontSize:24,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>
        Código criado para {filhoNome}!
      </div>
      <div style={{fontSize:13,color:"#BBDEFB",fontWeight:600,textAlign:"center",lineHeight:1.7}}>
        Mostre este código para seu filho(a). Ele(a) vai usar para entrar no jogo sem precisar de e-mail!
      </div>

      {/* Código destaque */}
      <div style={{background:"white",borderRadius:24,padding:"24px 32px",textAlign:"center",
        boxShadow:`0 8px 32px #00000044`,width:"100%"}}>
        <div style={{fontSize:11,fontWeight:800,color:"#78716C",textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>
          Código de acesso de {filhoNome}
        </div>
        <div style={{fontSize:42,fontWeight:900,color:"#0D47A1",fontFamily:"'Fredoka One',sans-serif",
          letterSpacing:4,textShadow:"none"}}>
          {codigoGerado}
        </div>
        <div style={{fontSize:11,color:"#78716C",marginTop:8,fontWeight:600}}>
          {AVATARS[filhoAvatar]} {GRADES[filhoGrade]} · Guarde este código!
        </div>
      </div>

      <div style={{background:"rgba(255,255,255,0.15)",borderRadius:16,padding:"12px 16px",width:"100%",
        border:"2px solid rgba(255,255,255,0.25)"}}>
        <div style={{fontSize:12,fontWeight:800,color:"#FFF9C4",marginBottom:4}}>💡 Como funciona:</div>
        <div style={{fontSize:12,color:"#BBDEFB",fontWeight:600,lineHeight:1.6}}>
          1. Seu filho(a) abre o MathQuest{"\n"}
          2. Clica em "Sou Aluno"{"\n"}
          3. Digita o código <strong style={{color:"white"}}>{codigoGerado}</strong>
        </div>
      </div>

      <button onClick={()=>onDone("parent")} style={{width:"100%",padding:16,borderRadius:20,border:"none",
        background:"white",color:"#0D47A1",fontSize:17,fontWeight:900,
        fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",
        boxShadow:"0 6px 24px #00000033"}}>
        👨‍👩‍👧 Ir para meu painel
      </button>
    </div>
  );


  /* ── PROFESSOR LOGIN ── */
  if(step==="prof_login") return(
    <div style={{flex:1,display:"flex",flexDirection:"column",padding:"20px 24px",gap:14,
      background:"linear-gradient(180deg,#0A1628,#0D1F3C)",overflowY:"auto"}}>
      <button onClick={()=>setStep("welcome")} style={{background:"none",border:"none",color:C.purple,
        fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",textAlign:"left",padding:0}}>◀ Voltar</button>
      <div style={{textAlign:"center",fontSize:52,animation:"heroFloat 2s ease-in-out infinite"}}>👩‍🏫</div>
      <div style={{fontSize:24,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>Acesso do Professor</div>
      <div style={{fontSize:13,color:"#90CAF9",textAlign:"center",fontWeight:600}}>
        Gerencie suas turmas e acompanhe seus alunos
      </div>
      {[["📧 E-mail","email","professor@escola.com",email,setEmail],
        ["🔒 Senha","password","Mínimo 6 caracteres",pass,setPass]].map(([lbl,tp,ph,val,set],i)=>(
        <div key={i} style={{display:"flex",flexDirection:"column",gap:5}}>
          <label style={{fontSize:11,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:1}}>{lbl}</label>
          <input value={val} onChange={e=>set(e.target.value)} placeholder={ph} type={tp}
            style={{padding:"13px 16px",borderRadius:14,border:`2px solid rgba(255,255,255,0.08)`,
              background:"rgba(255,255,255,0.06)",fontSize:15,fontWeight:700,outline:"none"}}/>
        </div>
      ))}
      <button onClick={()=>{
        if(!email.trim()||!pass.trim())return;
        const profs = Storage.get("mq_professores")||[];
        let prof = profs.find(p=>p.email===email);
        if(!prof){
          Storage.set("mq_usuario_atual",{tipo:"professor",email,nome:email.split("@")[0]});
          setStep("prof_nome");
        } else {
          Storage.set("mq_usuario_atual",{tipo:"professor",email,nome:prof.nome,escola:prof.escola});
          onDone("teacher");
        }
      }} style={{width:"100%",padding:15,borderRadius:20,border:"none",
        background:`linear-gradient(135deg,${C.purple},#A855F7)`,color:"white",fontSize:17,fontWeight:900,
        fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 5px 0 #4A00AA`,marginTop:4}}>
        👩‍🏫 Entrar / Cadastrar
      </button>
    </div>
  );

  /* ── PROFESSOR NOME + ESCOLA ── */
  if(step==="prof_nome") return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",
      padding:"24px 24px 32px",gap:14,background:"linear-gradient(180deg,#0A1628,#0D1F3C)"}}>
      <div style={{fontSize:11,fontWeight:800,color:"#9C6FFF",textTransform:"uppercase",letterSpacing:2}}>Configuração inicial</div>
      <div style={{fontSize:52,animation:"heroFloat 2s ease-in-out infinite"}}>👩‍🏫</div>
      <div style={{fontSize:22,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>
        Dados do professor(a)
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%"}}>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          <label style={{fontSize:11,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:1}}>👤 Seu nome</label>
          <input value={paiNome} onChange={e=>setPaiNome(e.target.value)} placeholder="Prof. Maria Silva"
            style={{padding:"13px 16px",borderRadius:14,border:`2px solid ${paiNome?"#9C6FFF":"rgba(255,255,255,0.08)"}`,
              background:"rgba(255,255,255,0.06)",fontSize:15,fontWeight:700,outline:"none",transition:"border-color 0.3s"}}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          <label style={{fontSize:11,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:1}}>🏫 Nome da escola</label>
          <input value={filhoNome} onChange={e=>setFilhoNome(e.target.value)} placeholder="E.E. Santos Dumont"
            style={{padding:"13px 16px",borderRadius:14,border:`2px solid ${filhoNome?"#9C6FFF":"rgba(255,255,255,0.08)"}`,
              background:"rgba(255,255,255,0.06)",fontSize:15,fontWeight:700,outline:"none",transition:"border-color 0.3s"}}/>
        </div>
      </div>
      <button onClick={()=>{
        if(!paiNome.trim()||!filhoNome.trim())return;
        const profs = Storage.get("mq_professores")||[];
        const novoProf = {email,nome:paiNome,escola:filhoNome,turmas:[]};
        Storage.set("mq_professores",[...profs.filter(p=>p.email!==email),novoProf]);
        Storage.set("mq_usuario_atual",{tipo:"professor",email,nome:paiNome,escola:filhoNome});
        onDone("teacher");
      }} style={{width:"100%",padding:15,borderRadius:20,border:"none",marginTop:"auto",
        background:paiNome.trim()&&filhoNome.trim()?`linear-gradient(135deg,${C.purple},#A855F7)`:"rgba(255,255,255,0.1)",
        color:paiNome.trim()&&filhoNome.trim()?"white":"#4A7AB5",fontSize:17,fontWeight:900,
        fontFamily:"'Fredoka One',sans-serif",
        cursor:paiNome.trim()&&filhoNome.trim()?"pointer":"not-allowed",
        boxShadow:paiNome.trim()&&filhoNome.trim()?`0 5px 0 #4A00AA`:"none",
        transition:"all 0.2s"}}>
        🚀 Acessar painel!
      </button>
    </div>
  );

  return null;
}

/* ═══════════════════════════════════════
   MAP SCREEN
═══════════════════════════════════════ */
const NODES=[
  {id:1,x:50,y:82,label:"Soma",    icon:"➕",stars:3,state:"done"},
  {id:2,x:72,y:67,label:"Subtração",icon:"➖",stars:2,state:"done"},
  {id:3,x:52,y:52,label:"Mult.",   icon:"✖️",stars:0,state:"current"},
  {id:4,x:28,y:38,label:"Divisão", icon:"➗",stars:0,state:"locked"},
  {id:5,x:60,y:24,label:"Frações", icon:"½", stars:0,state:"locked"},
  {id:6,x:38,y:11,label:"%",       icon:"%", stars:0,state:"locked"},
];

function MapScreen({go,toast}){
  const usuario = Storage.get("mq_usuario_atual");
  const nomeAluno = usuario?.nome || "Aventureiro";

  return(
    <div style={{flex:1,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#5BB8F5 0%,#ADE4FF 38%,#76C442 60%,#4E8F27 100%)"}}/>
      <div style={{position:"absolute",top:"5%",right:"10%",width:44,height:44,borderRadius:"50%",
        background:"radial-gradient(circle,#FFEE58,#FF8F00)",boxShadow:"0 0 24px #FFEE5888"}}/>
      {[[5,6],[44,4],[76,9],[18,15]].map(([x,y],i)=>(
        <div key={i} style={{position:"absolute",left:`${x}%`,top:`${y}%`,fontSize:28+i*6,opacity:0.9,
          animation:`cloudDrift ${4.5+i}s ease-in-out infinite`,animationDelay:`${i*1.1}s`}}>☁️</div>
      ))}
      <div style={{position:"absolute",top:"8%",left:"50%",transform:"translateX(-50%)",fontSize:58,opacity:0.45,filter:"blur(1px)"}}>🏰</div>
      {[[2,54],[8,62],[86,50],[93,62],[4,74],[87,72]].map(([x,y],i)=>(
        <div key={i} style={{position:"absolute",left:`${x}%`,top:`${y}%`,fontSize:20+i*3}}>🌲</div>
      ))}
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
        {NODES.slice(0,-1).map((n,i)=>{const nx=NODES[i+1];return(<g key={i}>
          <line x1={`${n.x}%`} y1={`${n.y}%`} x2={`${nx.x}%`} y2={`${nx.y}%`} stroke="#7B4F1A" strokeWidth="13" strokeLinecap="round" opacity="0.55"/>
          <line x1={`${n.x}%`} y1={`${n.y}%`} x2={`${nx.x}%`} y2={`${nx.y}%`} stroke="#C8963A" strokeWidth="8" strokeLinecap="round" strokeDasharray="13 9"/>
        </g>);})}
      </svg>
      {NODES.map(nd=>(
        <div key={nd.id} onClick={()=>{if(nd.state==="locked"){toast("🔒","Fase bloqueada!","info");return;}go("quiz");}}
          style={{position:"absolute",left:`${nd.x}%`,top:`${nd.y}%`,transform:"translate(-50%,-50%)",
            display:"flex",flexDirection:"column",alignItems:"center",gap:3,
            cursor:nd.state==="locked"?"not-allowed":"pointer",zIndex:10}}>
          {nd.state==="current"&&<div style={{position:"absolute",width:70,height:70,borderRadius:"50%",
            background:"radial-gradient(circle,#FFD70055,transparent 70%)",
            animation:"ringPulse 1.6s ease-in-out infinite",
            top:"50%",left:"50%",transform:"translate(-50%,-50%) translateY(-28px)"}}/>}
          <div style={{width:56,height:56,borderRadius:"50%",
            background:nd.state==="current"?"linear-gradient(135deg,#FFD700,#FF8F00)":nd.state==="done"?"linear-gradient(135deg,#43A047,#1B5E20)":"linear-gradient(135deg,#37474F,#1C313A)",
            border:nd.state==="current"?"4px solid #FFF9C4":nd.state==="done"?"4px solid #A5D6A7":"4px solid #546E7A",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,
            boxShadow:nd.state==="current"?"0 0 24px #FFD70099,0 6px 16px #00000066":"0 4px 12px #00000055"}}>
            {nd.state==="locked"?"🔒":nd.icon}
          </div>
          {nd.state==="done"&&<div style={{display:"flex",gap:1}}>{[1,2,3].map(s=><StarSVG key={s} on={s<=nd.stars} sz={13}/>)}</div>}
          <div style={{background:nd.state==="current"?C.gold:"rgba(0,0,0,0.75)",color:nd.state==="current"?C.dark:"white",
            fontSize:10,fontWeight:900,padding:"2px 10px",borderRadius:20,fontFamily:"'Fredoka One',sans-serif",
            whiteSpace:"nowrap",border:nd.state==="current"?`2px solid ${C.goldDk}`:"1px solid rgba(255,255,255,0.2)"}}>
            {nd.label}
          </div>
          {nd.state==="current"&&<div style={{marginTop:-2,animation:"heroFloat 1.2s ease-in-out infinite"}}><Fox sz={42}/></div>}
        </div>
      ))}
      <div style={{position:"absolute",bottom:8,left:8,right:8,background:"linear-gradient(135deg,#4527A0,#6A1B9A)",
        borderRadius:18,padding:"10px 14px",border:"3px solid #CE93D8",
        display:"flex",alignItems:"center",gap:10,boxShadow:"0 8px 24px #00000066"}}>
        <div style={{fontSize:28,animation:"float 2s ease-in-out infinite"}}>⚡</div>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif"}}>OLÁ, {nomeAluno.toUpperCase()}!</div>
          <div style={{fontSize:11,color:"#E1BEE7",fontWeight:700}}>Complete 5 desafios · Ganhe 200 moedas</div>
        </div>
        <button onClick={()=>go("quiz")} style={{background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,
          border:"2px solid #FFF9C4",borderRadius:20,padding:"7px 18px",fontSize:13,fontWeight:900,
          color:C.dark,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>IR!</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   QUIZ SCREEN
═══════════════════════════════════════ */
const QUIZ_MODES={
  soma:    {label:"Soma ➕",    color:C.red,   bg:"linear-gradient(180deg,#0A1628,#1a0a0a)"},
  sub:     {label:"Subtração ➖",color:C.orange,bg:"linear-gradient(180deg,#0A1628,#1a0f00)"},
  mult:    {label:"Mult. ✖️",  color:C.purple,bg:"linear-gradient(180deg,#0A1628,#0f0a1a)"},
  divisao: {label:"Divisão ➗", color:C.blue,  bg:"linear-gradient(180deg,#0A1628,#001020)"},
};
function genQ(mode){
  if(mode==="soma")   {const a=Math.floor(Math.random()*20)+1,b=Math.floor(Math.random()*20)+1,ans=a+b;return{q:`${a} + ${b}`,ans,opts:sh([ans,ans-2,ans+3,ans-1])};}
  if(mode==="sub")    {let a=Math.floor(Math.random()*20)+5,b=Math.floor(Math.random()*a)+1,ans=a-b;return{q:`${a} − ${b}`,ans,opts:sh([ans,ans+2,ans-2,ans+1])};}
  if(mode==="mult")   {const a=Math.floor(Math.random()*9)+2,b=Math.floor(Math.random()*9)+2,ans=a*b;return{q:`${a} × ${b}`,ans,opts:sh([ans,ans-a,ans+b,ans+a])};}
  if(mode==="divisao"){const b=Math.floor(Math.random()*9)+2,ans=Math.floor(Math.random()*9)+1,a=b*ans;return{q:`${a} ÷ ${b}`,ans,opts:sh([ans,ans+1,ans-1,ans+2])};}
}
function sh(a){return[...a].sort(()=>Math.random()-0.5);}
const OCOLS=[C.red,C.green,C.purple,C.orange];

function QuizScreen({go,toast,showBurst}){
  const [mode,setMode]=useState(null);
  const [qi,setQi]=useState(0);
  const [q,setQ]=useState(null);
  const [sel,setSel]=useState(null);
  const [done,setDone]=useState(false);
  const [hp,setHp]=useState(3);
  const [xp,setXp]=useState(0);
  const [end,setEnd]=useState(false);
  const TOTAL=5;

  const startMode=(m)=>{setMode(m);setQ(genQ(m));setQi(0);setSel(null);setDone(false);setHp(3);setXp(0);setEnd(false);};
  const pick=(opt)=>{
    if(sel!==null)return;setSel(opt);setDone(true);
    if(opt===q.ans){
      const nx=xp+100;setXp(nx);toast("⚡","+100 XP!","xp");
      if(nx%300===0){toast("🪙","+50 Moedas!","coin");showBurst();}
      // Salva XP do aluno
      const atual = Storage.get("mq_usuario_atual");
      if(atual?.codigo){
        const filhos = Storage.get("mq_filhos")||[];
        const idx = filhos.findIndex(f=>f.codigo===atual.codigo);
        if(idx>=0){filhos[idx].xp=(filhos[idx].xp||0)+100;filhos[idx].questoes=(filhos[idx].questoes||0)+1;filhos[idx].acertos=(filhos[idx].acertos||0)+1;Storage.set("mq_filhos",filhos);}
      }
    } else {
      const nh=hp-1;setHp(nh);toast("❤️","Vida perdida!","info");
      if(nh<=0)setTimeout(()=>setEnd(true),1200);
      // Salva questão errada
      const atual = Storage.get("mq_usuario_atual");
      if(atual?.codigo){
        const filhos = Storage.get("mq_filhos")||[];
        const idx = filhos.findIndex(f=>f.codigo===atual.codigo);
        if(idx>=0){filhos[idx].questoes=(filhos[idx].questoes||0)+1;Storage.set("mq_filhos",filhos);}
      }
    }
  };
  const next=()=>{if(hp<=0||qi+1>=TOTAL){setEnd(true);return;}setQi(i=>i+1);setQ(genQ(mode));setSel(null);setDone(false);};

  if(!mode)return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:`linear-gradient(180deg,${C.blueBg},${C.dark})`,padding:"20px 16px",gap:12}}>
      <div style={{fontSize:22,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>⚔️ Escolha o desafio</div>
      <div style={{textAlign:"center",animation:"heroFloat 2s ease-in-out infinite"}}><Fox sz={80}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,flex:1}}>
        {Object.entries(QUIZ_MODES).map(([k,v])=>(
          <button key={k} onClick={()=>startMode(k)} style={{borderRadius:20,padding:"20px 10px",border:`3px solid ${v.color}44`,
            background:`${v.color}15`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
            <div style={{fontSize:36}}>{v.label.split(" ")[1]}</div>
            <div style={{fontSize:14,fontWeight:900,color:v.color,fontFamily:"'Fredoka One',sans-serif"}}>{v.label.split(" ")[0]}</div>
          </button>
        ))}
      </div>
      <button onClick={()=>go("map")} style={{padding:"12px 0",borderRadius:20,border:`2px solid rgba(255,255,255,0.15)`,
        background:"transparent",color:"#90CAF9",fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>◀ Voltar ao Mapa</button>
    </div>
  );

  const mCfg=QUIZ_MODES[mode];

  if(end)return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      background:`linear-gradient(160deg,${C.blueBg},${C.dark})`,gap:14,padding:24}}>
      <div style={{animation:"heroFloat 1.5s ease-in-out infinite"}}><Fox sz={100} mood={xp>=300?"happy":"sad"}/></div>
      <div style={{fontSize:28,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",textShadow:`0 0 24px ${C.gold}99`,textAlign:"center"}}>
        {xp>=300?"PARABÉNS! 🎉":"Continue tentando! 💪"}
      </div>
      <div style={{display:"flex",gap:4}}>{[1,2,3].map(s=><StarSVG key={s} on={s<=(xp>=400?3:xp>=200?2:1)} sz={44}/>)}</div>
      <div style={{background:`${C.gold}18`,border:`2px solid ${C.gold}55`,borderRadius:20,padding:"12px 32px",
        fontSize:24,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif"}}>⚡ {xp} XP</div>
      <div style={{display:"flex",gap:10,width:"100%"}}>
        <button onClick={()=>startMode(mode)} style={{flex:1,padding:14,borderRadius:20,border:"none",
          background:`linear-gradient(135deg,${C.blue},${C.blueDk})`,color:"white",fontSize:16,fontWeight:900,
          fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>🔄 De novo</button>
        <button onClick={()=>{setMode(null);go("map");}} style={{flex:1,padding:14,borderRadius:20,
          border:`3px solid ${C.gold}`,background:"transparent",color:C.gold,fontSize:16,fontWeight:900,
          fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>🗺️ Mapa</button>
      </div>
    </div>
  );

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:mCfg.bg}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px"}}>
        <button onClick={()=>setMode(null)} style={{background:`${mCfg.color}22`,border:`2px solid ${mCfg.color}44`,borderRadius:14,
          padding:"6px 14px",fontSize:12,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>◀ Sair</button>
        <div style={{fontSize:15,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{qi+1}/{TOTAL}</div>
        <div style={{display:"flex",gap:3}}>{[1,2,3].map(i=><span key={i} style={{fontSize:20,filter:i>hp?"grayscale(1) opacity(0.3)":"none"}}>❤️</span>)}</div>
      </div>
      <div style={{height:10,background:"#060F22",margin:"0 14px 10px",borderRadius:10,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(qi/TOTAL)*100}%`,background:`linear-gradient(90deg,${C.gold},${C.orange})`,borderRadius:10,transition:"width 0.5s"}}/>
      </div>
      <div style={{display:"flex",alignItems:"flex-end",padding:"0 14px 6px",gap:2}}>
        <div style={{animation:"float 2.5s ease-in-out infinite",flexShrink:0}}><Fox sz={68}/></div>
        <div style={{background:"white",borderRadius:18,padding:"10px 14px",marginLeft:6,flex:1,position:"relative",boxShadow:"0 4px 16px #00000055"}}>
          <div style={{position:"absolute",left:-9,bottom:14,width:0,height:0,borderTop:"9px solid transparent",borderBottom:"9px solid transparent",borderRight:"10px solid white"}}/>
          <div style={{fontSize:14,fontWeight:900,color:C.dark,fontFamily:"'Fredoka One',sans-serif"}}>Qual é o resultado?</div>
        </div>
      </div>
      <div style={{margin:"8px 14px",borderRadius:22,padding:"18px 14px",
        background:"linear-gradient(135deg,#060F22,#0D2060)",border:`3px solid ${mCfg.color}`,textAlign:"center"}}>
        <div style={{fontSize:46,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",letterSpacing:4}}>
          {q.q} = <span style={{color:done?(sel===q.ans?C.green:C.red):C.gold,transition:"color 0.3s"}}>{done?sel:"?"}</span>
        </div>
        {done&&<div style={{marginTop:8,fontSize:17,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",
          color:sel===q.ans?C.green:C.red,animation:"popIn 0.35s ease both"}}>
          {sel===q.ans?"🎉 CORRETO! +100 XP":`😅 Era ${q.ans}!`}
        </div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"0 14px"}}>
        {q.opts.map((opt,i)=>{
          const isR=opt===q.ans,isS=opt===sel;
          let bg=`linear-gradient(135deg,${OCOLS[i]},${OCOLS[i]}BB)`,bd=OCOLS[i];
          if(done){if(isR){bg="linear-gradient(135deg,#1B8A3A,#2ECC71)";bd=C.green;}
            else if(isS){bg="linear-gradient(135deg,#C62828,#FF6B6B)";bd=C.red;}
            else{bg="linear-gradient(135deg,#1C2D3F,#263C55)";bd="#2A4060";}}
          return(<button key={i} onClick={()=>pick(opt)} disabled={done} style={{border:`3px solid ${bd}`,borderRadius:18,
            padding:"16px 0",background:bg,cursor:done?"default":"pointer",transition:"transform 0.12s",
            transform:isS?"scale(1.06)":"scale(1)",opacity:done&&!isR&&!isS?0.38:1,
            boxShadow:`0 5px 0 ${bd}77,0 8px 20px #00000055`}}>
            <span style={{fontSize:36,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{opt}</span>
          </button>);
        })}
      </div>
      {done&&<div style={{padding:"12px 14px 4px"}}>
        <button onClick={next} style={{width:"100%",padding:15,borderRadius:20,border:"none",
          background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,color:C.dark,fontSize:18,fontWeight:900,
          fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 5px 0 #B86000`}}>CONTINUAR →</button>
      </div>}
    </div>
  );
}

/* ═══════════════════════════════════════
   SHOP, RANK, HERO — mantidos
═══════════════════════════════════════ */
const SD={Personagens:[{n:"Max",e:"🦊",p:0,owned:true},{n:"Lia",e:"🧝‍♀️",p:500,owned:false},{n:"Draco",e:"🐲",p:300,owned:true},{n:"Nubi",e:"☁️",p:3,owned:false,gem:true}],Poderes:[{n:"Escudo",e:"🛡️",p:200,owned:false},{n:"Feitiço",e:"🪄",p:150,owned:true},{n:"Relâmp.",e:"⚡",p:2,owned:false,gem:true},{n:"Bomba",e:"💣",p:100,owned:false}],Moedas:[{n:"500 Moedas",e:"🪙",p:"R$1,99",real:true},{n:"1200 Moedas",e:"💰",p:"R$3,99",real:true},{n:"5 Gemas",e:"💎",p:"R$2,49",real:true},{n:"20 Gemas",e:"💎",p:"R$7,99",real:true}]};
function ShopScreen({toast}){
  const [tab,setTab]=useState("Personagens");
  return(<div style={{flex:1,display:"flex",flexDirection:"column",background:"linear-gradient(180deg,#1A0040,#2D0060)"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",background:"#0D0025",borderBottom:`3px solid ${C.gold}55`}}>
      <div style={{fontSize:22,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif"}}>🏪 LOJA</div>
      <div style={{display:"flex",gap:6}}>
        <div style={{display:"flex",alignItems:"center",gap:4,background:"linear-gradient(135deg,#BF360C,#E64A19)",borderRadius:20,padding:"4px 12px",border:`2px solid ${C.orange}`}}><Coin sz={15}/><span style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>1250</span></div>
        <div style={{display:"flex",alignItems:"center",gap:4,background:"linear-gradient(135deg,#4527A0,#6A1B9A)",borderRadius:20,padding:"4px 10px",border:"2px solid #9C6FFF"}}><span style={{fontSize:14}}>💎</span><span style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>25</span></div>
      </div>
    </div>
    <div style={{display:"flex",gap:6,padding:"8px 12px"}}>
      {Object.keys(SD).map(t=>(<button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"7px 2px",borderRadius:20,cursor:"pointer",background:tab===t?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",color:tab===t?C.dark:"white",border:tab===t?`2px solid #FFF9C4`:"2px solid rgba(255,255,255,0.15)",fontSize:11,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",transition:"all 0.2s"}}>{t}</button>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"0 12px",flex:1,overflowY:"auto"}}>
      {SD[tab].map((item,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.07)",borderRadius:20,padding:"14px 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,border:"2px solid rgba(255,255,255,0.12)"}}>
        <div style={{fontSize:44}}>{item.e}</div>
        <div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>{item.n}</div>
        {item.owned?(<div style={{background:"linear-gradient(135deg,#1B8A3A,#2ECC71)",borderRadius:20,padding:"4px 14px",fontSize:11,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>✓ Possui</div>):item.real?(<button onClick={()=>toast("🛒","Compra realizada!","coin")} style={{background:"linear-gradient(135deg,#1B8A3A,#2ECC71)",border:"none",borderRadius:20,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{item.p}</button>):(<button onClick={()=>toast("🛒","Item comprado!","coin")} style={{display:"flex",alignItems:"center",gap:5,background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,border:`2px solid #FFF9C4`,borderRadius:20,padding:"5px 14px",cursor:"pointer",fontSize:12,fontWeight:900,color:C.dark,fontFamily:"'Fredoka One',sans-serif"}}>{item.gem?<>💎 {item.p}</>:<><Coin sz={13}/>{item.p}</>}</button>)}
      </div>))}
    </div>
    <div style={{margin:"8px 12px 10px",background:"linear-gradient(135deg,#0A001A,#1A0033)",borderRadius:16,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,border:`2px solid ${C.gold}44`}}>
      <div style={{fontSize:28,animation:"float 2s infinite"}}>👑</div>
      <div style={{flex:1}}><div style={{fontSize:14,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif"}}>PREMIUM</div><div style={{fontSize:11,color:"#CE93D8",fontWeight:700}}>Acesso ilimitado + 200 gemas/mês</div></div>
      <button onClick={()=>toast("👑","Premium ativado!","level")} style={{background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,border:"none",borderRadius:14,padding:"8px 14px",fontSize:12,fontWeight:900,color:C.dark,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>R$9,90</button>
    </div>
  </div>);
}

const RD={global:[{pos:1,n:"Ana",xp:3250,av:"🧝‍♀️"},{pos:2,n:"Lucas",xp:2800,av:"🦊",me:true},{pos:3,n:"Pedro",xp:2450,av:"🧙"},{pos:4,n:"Sofia",xp:2100,av:"🐲"},{pos:5,n:"Miguel",xp:1900,av:"☁️"}],amigos:[{pos:1,n:"Lucas",xp:2800,av:"🦊",me:true},{pos:2,n:"Ana",xp:2600,av:"🧝‍♀️"},{pos:3,n:"Pedro",xp:1800,av:"🧙"}]};
function RankScreen(){
  const [tab,setTab]=useState("global");const list=RD[tab];const top3=[list[1],list[0],list[2]].filter(Boolean);const rest=list.slice(3);const pC=["#C0C0C0","#FFD700","#CD7F32"];const pH=[86,110,70];const pM=["🥈","🥇","🥉"];
  return(<div style={{flex:1,display:"flex",flexDirection:"column",background:`linear-gradient(180deg,${C.blueBg},${C.dark})`}}>
    <div style={{fontSize:24,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",textAlign:"center",padding:"12px 0 4px"}}>🏆 RANKING</div>
    <div style={{display:"flex",gap:8,padding:"0 14px 10px"}}>
      {["global","amigos"].map(k=>(<button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"7px",borderRadius:20,border:"none",cursor:"pointer",background:tab===k?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",color:tab===k?C.dark:"white",fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif"}}>{k==="global"?"🌍 Global":"👥 Amigos"}</button>))}
    </div>
    <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:6,padding:"0 16px 14px"}}>
      {top3.map((p,i)=>(<div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
        <div style={{fontSize:30,marginBottom:3,animation:i===1?"heroFloat 2s ease-in-out infinite":"none"}}>{p.av}</div>
        <div style={{fontSize:11,fontWeight:900,color:pC[i],fontFamily:"'Fredoka One',sans-serif",marginBottom:4}}>{p.n}</div>
        <div style={{width:"100%",height:pH[i],background:`linear-gradient(180deg,${pC[i]},${pC[i]}99)`,borderRadius:"10px 10px 0 0",border:`2px solid ${pC[i]}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",paddingTop:8,gap:3}}>
          <span style={{fontSize:22}}>{pM[i]}</span>
          <span style={{fontSize:11,fontWeight:900,color:i===1?C.dark:"white",fontFamily:"'Fredoka One',sans-serif"}}>{p.xp.toLocaleString()}</span>
        </div>
      </div>))}
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"0 12px 4px"}}>
      {rest.map(p=>(<div key={p.pos} style={{display:"flex",alignItems:"center",gap:10,background:p.me?"rgba(255,215,0,0.1)":"rgba(255,255,255,0.05)",borderRadius:14,padding:"10px 14px",marginBottom:8,border:p.me?`2px solid ${C.gold}55`:"1px solid rgba(255,255,255,0.1)"}}>
        <div style={{fontSize:15,fontWeight:900,color:"#90CAF9",width:28,fontFamily:"'Fredoka One',sans-serif"}}>#{p.pos}</div>
        <div style={{fontSize:26}}>{p.av}</div>
        <div style={{flex:1,fontSize:14,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{p.n}{p.me?" (você)":""}</div>
        <div style={{fontSize:13,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif"}}>⚡{p.xp.toLocaleString()}</div>
      </div>))}
    </div>
  </div>);
}

function HeroScreen(){
  const usuario = Storage.get("mq_usuario_atual");
  const filhos = Storage.get("mq_filhos")||[];
  const filho = filhos.find(f=>f.codigo===usuario?.codigo);
  const nome = filho?.nome || usuario?.nome || "Aventureiro";
  const nivel = filho?.nivel || 1;
  const xp = filho?.xp || 0;
  const grade = filho?.grade ?? 0;
  const avatar = filho?.avatar ?? 0;

  const [ptab,setPtab]=useState("stats");
  return(<div style={{flex:1,display:"flex",flexDirection:"column",background:`linear-gradient(180deg,${C.blueBg},${C.dark})`,overflowY:"auto"}}>
    <div style={{background:`linear-gradient(135deg,#0033AA,${C.blue})`,padding:"18px 16px 14px",display:"flex",gap:14,alignItems:"center",borderBottom:`3px solid ${C.gold}`}}>
      <div style={{position:"relative"}}>
        <div style={{width:76,height:76,borderRadius:"50%",background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,border:"4px solid #FFF9C4",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 20px ${C.gold}66`,overflow:"hidden",fontSize:44}}>{AVATARS[avatar]}</div>
        <div style={{position:"absolute",bottom:-4,right:-4,background:C.orange,borderRadius:"50%",width:26,height:26,border:"2px solid white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{nivel}</div>
      </div>
      <div style={{flex:1}}>
        <div style={{fontSize:24,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{nome}</div>
        <div style={{fontSize:12,color:"#BBDEFB",fontWeight:700}}>Aventureiro · {GRADES[grade]}</div>
        <div style={{background:"rgba(0,0,0,0.3)",borderRadius:10,height:10,marginTop:7,overflow:"hidden"}}>
          <div style={{width:`${Math.min((xp%1000)/10,100)}%`,height:"100%",background:`linear-gradient(90deg,${C.gold},${C.orange})`,borderRadius:10}}/>
        </div>
        <div style={{fontSize:10,color:"#90CAF9",marginTop:3,fontWeight:700}}>{xp} XP · Nível {nivel}</div>
      </div>
    </div>
    <div style={{display:"flex",borderBottom:"2px solid rgba(255,255,255,0.08)"}}>
      {[["stats","📊 Stats"],["troféus","🏅 Troféus"],["pets","🐾 Pets"]].map(([k,l])=>(<button key={k} onClick={()=>setPtab(k)} style={{flex:1,padding:"10px 0",border:"none",background:"transparent",cursor:"pointer",borderBottom:`3px solid ${ptab===k?C.gold:"transparent"}`,color:ptab===k?C.gold:"#4A7AB5",fontSize:12,fontWeight:900,fontFamily:"'Fredoka One',sans-serif"}}>{l}</button>))}
    </div>
    {ptab==="stats"&&<div style={{padding:12}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
        {[{i:"📝",v:filho?.questoes||0,l:"Questões",c:C.blue},{i:"🎯",v:`${filho?.questoes>0?Math.round((filho?.acertos||0)/filho.questoes*100):0}%`,l:"Acertos",c:C.green},{i:"🔥",v:`${filho?.streak||0}d`,l:"Sequência",c:C.red}].map((s,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.07)",borderRadius:16,padding:"12px 6px",textAlign:"center",border:`2px solid ${s.c}33`}}><div style={{fontSize:22}}>{s.i}</div><div style={{fontSize:17,fontWeight:900,color:s.c,fontFamily:"'Fredoka One',sans-serif"}}>{s.v}</div><div style={{fontSize:9,color:"#90CAF9",fontWeight:700}}>{s.l}</div></div>))}
      </div>
    </div>}
    {ptab==="troféus"&&<div style={{padding:12,display:"flex",flexWrap:"wrap",gap:8}}>
      {[{i:"⭐",l:"1ª estrela",ok:(filho?.acertos||0)>=1},{i:"🔥",l:"7 dias",ok:(filho?.streak||0)>=7},{i:"⚡",l:"Maratonista",ok:(filho?.questoes||0)>=50},{i:"🏆",l:"Top 10",ok:false},{i:"💎",l:"100 questões",ok:(filho?.questoes||0)>=100},{i:"🌟",l:"Nota 10",ok:false}].map((b,i)=>(<div key={i} style={{width:82,background:b.ok?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.04)",borderRadius:16,padding:"10px 6px",textAlign:"center",border:b.ok?`2px solid ${C.gold}55`:"2px solid rgba(255,255,255,0.08)",opacity:b.ok?1:0.38}}><div style={{fontSize:30,filter:b.ok?"none":"grayscale(1)"}}>{b.i}</div><div style={{fontSize:9,color:"white",fontWeight:800,marginTop:4,lineHeight:1.3}}>{b.l}</div></div>))}
    </div>}
    {ptab==="pets"&&<div style={{padding:12,display:"flex",flexWrap:"wrap",gap:8}}>
      {[{e:"🦊",n:"Max",active:true},{e:"🐲",n:"Draco",active:false},{e:"🐱",n:"Miau",active:false},{e:"🔒",n:"Bloqueado",locked:true}].map((p,i)=>(<div key={i} style={{width:82,background:p.active?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.07)",borderRadius:16,padding:"12px 8px",textAlign:"center",border:p.active?`3px solid #FFF9C4`:"2px solid rgba(255,255,255,0.12)",opacity:p.locked?0.4:1}}><div style={{fontSize:30}}>{p.e}</div><div style={{fontSize:10,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",color:p.active?C.dark:"white"}}>{p.n}</div>{p.active&&<div style={{fontSize:8,color:C.dark,fontWeight:900}}>ATIVO</div>}</div>))}
    </div>}
  </div>);
}


/* ═══════════════════════════════════════
   TEACHER SCREEN — Painel do Professor
═══════════════════════════════════════ */
function TeacherScreen({ go }) {
  const usuario = Storage.get("mq_usuario_atual");
  const profs   = Storage.get("mq_professores")||[];
  const prof    = profs.find(p=>p.email===usuario?.email)||{nome:usuario?.nome,escola:"",turmas:[]};
  const todosFilhos = Storage.get("mq_filhos")||[];

  const [tab,   setTab]   = useState("turmas");
  const [turmaIdx, setTurmaIdx] = useState(0);
  const [addTurma, setAddTurma] = useState(false);
  const [addAluno, setAddAluno] = useState(false);
  const [novaTurma, setNovaTurma] = useState("");
  const [novoAlunoCodigo, setNovoAlunoCodigo] = useState("");
  const [novoAlunoErro, setNovoAlunoErro] = useState(false);
  const [novoAlunoOk, setNovoAlunoOk] = useState(null);

  // Turmas do professor
  const turmas = prof.turmas || [];
  const turmaAtual = turmas[turmaIdx];

  // Alunos da turma atual
  const alunosDaTurma = turmaAtual
    ? todosFilhos.filter(f => turmaAtual.alunos?.includes(f.codigo))
    : [];

  const salvarProf = (profAtualizado) => {
    const profs2 = Storage.get("mq_professores")||[];
    Storage.set("mq_professores",[...profs2.filter(p=>p.email!==usuario?.email), profAtualizado]);
  };

  const criarTurma = () => {
    if(!novaTurma.trim()) return;
    const novaTurmaObj = { id: Date.now(), nome: novaTurma, serie: "", alunos: [] };
    const profAtualizado = {...prof, turmas:[...(prof.turmas||[]), novaTurmaObj]};
    salvarProf(profAtualizado);
    setNovaTurma(""); setAddTurma(false);
    // Force re-render
    window.location.reload();
  };

  const adicionarAlunoNaTurma = () => {
    const cod = novoAlunoCodigo.toUpperCase().trim();
    const filho = todosFilhos.find(f=>f.codigo===cod);
    if(!filho){ setNovoAlunoErro(true); setNovoAlunoOk(null); return; }
    setNovoAlunoErro(false); setNovoAlunoOk(filho);
    const turmasAtualizadas = prof.turmas.map((t,i)=>
      i===turmaIdx ? {...t, alunos:[...(t.alunos||[]).filter(c=>c!==cod), cod]} : t
    );
    const profAtualizado = {...prof, turmas:turmasAtualizadas};
    salvarProf(profAtualizado);
  };

  const acc = (f) => f.questoes>0 ? Math.round((f.acertos/f.questoes)*100) : 0;
  const mediaAcertos = alunosDaTurma.length>0
    ? Math.round(alunosDaTurma.reduce((s,f)=>s+acc(f),0)/alunosDaTurma.length)
    : 0;

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",
      background:"linear-gradient(180deg,#0A1230,#0D1B3E)",overflowY:"auto"}}>

      {/* Header */}
      <div style={{background:`linear-gradient(135deg,#2D0060,${C.purple})`,
        padding:"14px 16px",borderBottom:`3px solid ${C.gold}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:44,height:44,borderRadius:"50%",
            background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,border:"2px solid #FFF9C4"}}>
            👩‍🏫
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:16,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif"}}>
              {prof.nome||"Professor(a)"}
            </div>
            <div style={{fontSize:11,color:"#CE93D8",fontWeight:600}}>{prof.escola||"Escola"}</div>
          </div>
          <button onClick={()=>{Storage.set("mq_usuario_atual",null);go("login");}}
            style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",
              borderRadius:12,padding:"5px 10px",fontSize:11,color:"white",cursor:"pointer",fontWeight:700}}>
            Sair
          </button>
        </div>

        {/* Quick stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
          {[
            {i:"🏫",v:turmas.length,l:"Turmas"},
            {i:"👥",v:turmas.reduce((s,t)=>s+(t.alunos?.length||0),0),l:"Alunos"},
            {i:"🎯",v:`${mediaAcertos}%`,l:"Média"},
            {i:"⚡",v:alunosDaTurma.filter(f=>f.questoes>0).length,l:"Ativos"},
          ].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.12)",borderRadius:12,
              padding:"8px 4px",textAlign:"center"}}>
              <div style={{fontSize:16}}>{s.i}</div>
              <div style={{fontSize:14,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif"}}>{s.v}</div>
              <div style={{fontSize:9,color:"#CE93D8",fontWeight:700}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",borderBottom:"2px solid rgba(255,255,255,0.08)"}}>
        {[["turmas","🏫 Turmas"],["alunos","👥 Alunos"],["relatorio","📊 Relatório"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{
            flex:1,padding:"10px 0",border:"none",background:"transparent",cursor:"pointer",
            borderBottom:`3px solid ${tab===k?C.gold:"transparent"}`,
            color:tab===k?C.gold:"#4A7AB5",fontSize:11,fontWeight:900,
            fontFamily:"'Fredoka One',sans-serif",transition:"all 0.2s"}}>
            {l}
          </button>
        ))}
      </div>

      <div style={{padding:"12px",flex:1}}>

        {/* ── TURMAS ── */}
        {tab==="turmas" && <>
          <div style={{fontSize:13,fontWeight:900,color:"white",
            fontFamily:"'Fredoka One',sans-serif",marginBottom:10}}>
            🏫 Minhas turmas
          </div>

          {turmas.length===0 ? (
            <div style={{textAlign:"center",padding:"32px 16px"}}>
              <div style={{fontSize:48}}>📋</div>
              <div style={{fontSize:15,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginTop:10}}>
                Nenhuma turma ainda
              </div>
              <div style={{fontSize:12,color:"#90CAF9",fontWeight:600,marginTop:6}}>
                Crie sua primeira turma e adicione alunos pelos códigos deles
              </div>
            </div>
          ) : (
            turmas.map((t,i)=>(
              <div key={i} onClick={()=>{setTurmaIdx(i);setTab("alunos");}}
                style={{background:"rgba(255,255,255,0.06)",borderRadius:16,
                  padding:"14px",marginBottom:10,cursor:"pointer",
                  border:`1px solid rgba(255,255,255,0.1)`,transition:"all 0.2s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{fontSize:16,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>
                    {t.nome}
                  </div>
                  <div style={{fontSize:13,fontWeight:900,color:C.blue,fontFamily:"'Fredoka One',sans-serif"}}>
                    Ver →
                  </div>
                </div>
                <div style={{display:"flex",gap:16}}>
                  <span style={{fontSize:12,color:"#90CAF9",fontWeight:700}}>
                    👥 {t.alunos?.length||0} alunos
                  </span>
                  <span style={{fontSize:12,color:C.green,fontWeight:700}}>
                    ✅ {todosFilhos.filter(f=>t.alunos?.includes(f.codigo)&&f.questoes>0).length} ativos
                  </span>
                </div>
              </div>
            ))
          )}

          {/* Add turma */}
          {addTurma ? (
            <div style={{background:"rgba(255,255,255,0.06)",borderRadius:16,padding:"14px",
              border:`2px solid ${C.purple}`}}>
              <input value={novaTurma} onChange={e=>setNovaTurma(e.target.value)}
                placeholder="Ex: 3º Ano A, Turma Girassol..."
                style={{width:"100%",padding:"12px 14px",borderRadius:12,
                  border:`2px solid ${novaTurma?C.purple:"rgba(255,255,255,0.1)"}`,
                  background:"rgba(255,255,255,0.06)",fontSize:14,fontWeight:700,
                  outline:"none",marginBottom:10}}/>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setAddTurma(false)} style={{flex:1,padding:10,borderRadius:12,
                  border:"2px solid rgba(255,255,255,0.15)",background:"transparent",
                  color:"#90CAF9",fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>
                  Cancelar
                </button>
                <button onClick={criarTurma} style={{flex:2,padding:10,borderRadius:12,border:"none",
                  background:novaTurma.trim()?`linear-gradient(135deg,${C.purple},#A855F7)`:"rgba(255,255,255,0.1)",
                  color:"white",fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>
                  ✓ Criar turma
                </button>
              </div>
            </div>
          ) : (
            <button onClick={()=>setAddTurma(true)} style={{width:"100%",padding:13,borderRadius:14,
              border:`2px dashed rgba(255,255,255,0.2)`,background:"transparent",
              color:"rgba(255,255,255,0.5)",fontSize:14,fontWeight:800,
              fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>
              + Criar nova turma
            </button>
          )}
        </>}

        {/* ── ALUNOS ── */}
        {tab==="alunos" && <>
          {/* Turma selector */}
          {turmas.length>0 && (
            <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:12,paddingBottom:4}}>
              {turmas.map((t,i)=>(
                <button key={i} onClick={()=>setTurmaIdx(i)} style={{
                  padding:"7px 14px",borderRadius:20,border:"none",cursor:"pointer",flexShrink:0,
                  background:turmaIdx===i?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",
                  color:turmaIdx===i?C.dark:"white",fontSize:12,fontWeight:900,
                  fontFamily:"'Fredoka One',sans-serif",transition:"all 0.2s"}}>
                  {t.nome}
                </button>
              ))}
            </div>
          )}

          {/* Add aluno modal */}
          {addAluno && (
            <div style={{background:"rgba(30,144,255,0.1)",borderRadius:16,padding:"14px",
              border:`2px solid ${C.blue}`,marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginBottom:10}}>
                ➕ Adicionar aluno por código
              </div>
              <input
                value={novoAlunoCodigo}
                onChange={e=>{setNovoAlunoCodigo(e.target.value.toUpperCase());setNovoAlunoErro(false);setNovoAlunoOk(null);}}
                placeholder="Ex: CAIO-1234"
                maxLength={9}
                style={{width:"100%",padding:"12px 14px",borderRadius:12,
                  border:`2px solid ${novoAlunoErro?C.red:novoAlunoOk?C.green:C.blue}`,
                  background:"rgba(255,255,255,0.06)",fontSize:16,fontWeight:900,
                  fontFamily:"'Fredoka One',sans-serif",outline:"none",letterSpacing:4,marginBottom:8}}/>
              {novoAlunoErro && <div style={{fontSize:12,color:C.red,fontWeight:700,marginBottom:8}}>❌ Código não encontrado!</div>}
              {novoAlunoOk && <div style={{fontSize:12,color:C.green,fontWeight:700,marginBottom:8}}>✅ {novoAlunoOk.nome} adicionado!</div>}
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{setAddAluno(false);setNovoAlunoCodigo("");setNovoAlunoErro(false);setNovoAlunoOk(null);}}
                  style={{flex:1,padding:9,borderRadius:12,border:"2px solid rgba(255,255,255,0.15)",
                    background:"transparent",color:"#90CAF9",fontSize:12,fontWeight:900,
                    fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>Fechar</button>
                <button onClick={adicionarAlunoNaTurma}
                  style={{flex:2,padding:9,borderRadius:12,border:"none",
                    background:`linear-gradient(135deg,${C.blue},${C.blueDk})`,
                    color:"white",fontSize:12,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>
                  + Adicionar
                </button>
              </div>
            </div>
          )}

          {!turmaAtual ? (
            <div style={{textAlign:"center",padding:"32px 0"}}>
              <div style={{fontSize:40}}>📋</div>
              <div style={{fontSize:14,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginTop:8}}>
                Crie uma turma primeiro
              </div>
              <button onClick={()=>setTab("turmas")} style={{marginTop:10,padding:"8px 20px",borderRadius:20,border:"none",
                background:`linear-gradient(135deg,${C.purple},#A855F7)`,
                color:"white",fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>
                Criar turma →
              </button>
            </div>
          ) : alunosDaTurma.length===0 ? (
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div style={{fontSize:40}}>👶</div>
              <div style={{fontSize:14,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginTop:8}}>
                Nenhum aluno em {turmaAtual.nome}
              </div>
              <div style={{fontSize:12,color:"#90CAF9",fontWeight:600,marginTop:4}}>
                Adicione alunos pelo código de acesso deles
              </div>
              <button onClick={()=>setAddAluno(true)} style={{marginTop:10,padding:"8px 20px",borderRadius:20,border:"none",
                background:`linear-gradient(135deg,${C.blue},${C.blueDk})`,
                color:"white",fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>
                + Adicionar aluno
              </button>
            </div>
          ) : (
            <>
              {alunosDaTurma.map((a,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.06)",borderRadius:16,
                  padding:"12px 14px",marginBottom:8,
                  border:`1px solid ${a.streak===0&&a.questoes>0?"rgba(255,107,107,0.3)":"rgba(255,255,255,0.08)"}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{fontSize:28}}>{AVATARS[a.avatar]}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{a.nome}</div>
                      <div style={{fontSize:10,color:"#90CAF9",fontWeight:600}}>{GRADES[a.grade]} · Cód: {a.codigo}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",
                        color:acc(a)>=70?C.green:acc(a)>0?C.orange:C.red}}>
                        {a.questoes>0?`${acc(a)}%`:"—"}
                      </div>
                      <div style={{fontSize:9,color:"#90CAF9"}}>acertos</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:10,marginTop:8,paddingTop:6,
                    borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                    <span style={{fontSize:10,color:"#90CAF9",fontWeight:700}}>⚡ {a.xp||0} XP</span>
                    <span style={{fontSize:10,color:"#90CAF9",fontWeight:700}}>📝 {a.questoes||0} questões</span>
                    <span style={{fontSize:10,fontWeight:700,
                      color:a.streak>0?C.orange:a.questoes>0?C.red:"#90CAF9"}}>
                      {a.questoes>0?(a.streak>0?`🔥 ${a.streak}d`:"⚠️ Inativo"):"Nunca jogou"}
                    </span>
                  </div>
                </div>
              ))}
              <button onClick={()=>setAddAluno(true)} style={{width:"100%",padding:11,borderRadius:14,
                border:`2px dashed rgba(30,144,255,0.4)`,background:"transparent",
                color:C.blue,fontSize:13,fontWeight:800,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",marginTop:4}}>
                + Adicionar aluno por código
              </button>
            </>
          )}
        </>}

        {/* ── RELATÓRIO ── */}
        {tab==="relatorio" && <>
          <div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginBottom:10}}>
            📊 Visão geral de todas as turmas
          </div>
          {turmas.length===0 ? (
            <div style={{textAlign:"center",padding:"32px 0"}}>
              <div style={{fontSize:40}}>📊</div>
              <div style={{fontSize:14,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginTop:8}}>Nenhuma turma ainda</div>
            </div>
          ) : turmas.map((t,i)=>{
            const alsTurma = todosFilhos.filter(f=>t.alunos?.includes(f.codigo));
            const mediaT = alsTurma.length>0 ? Math.round(alsTurma.reduce((s,f)=>s+acc(f),0)/alsTurma.length) : 0;
            const ativos = alsTurma.filter(f=>f.questoes>0).length;
            const top = alsTurma.sort((a,b)=>b.xp-a.xp)[0];
            return (
              <div key={i} style={{background:"rgba(255,255,255,0.06)",borderRadius:16,
                padding:"14px",marginBottom:10,border:"1px solid rgba(255,255,255,0.1)"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <div style={{fontSize:15,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{t.nome}</div>
                  <div style={{fontSize:18,fontWeight:900,color:mediaT>=70?C.green:mediaT>0?C.orange:C.red,
                    fontFamily:"'Fredoka One',sans-serif"}}>{alsTurma.length>0?`${mediaT}%`:"—"}</div>
                </div>
                <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                  <span style={{fontSize:11,color:"#90CAF9",fontWeight:700}}>👥 {alsTurma.length} alunos</span>
                  <span style={{fontSize:11,color:C.green,fontWeight:700}}>✅ {ativos} ativos</span>
                  {top&&<span style={{fontSize:11,color:C.gold,fontWeight:700}}>🏆 {top.nome}</span>}
                </div>
                {alsTurma.length>0&&<>
                  <div style={{height:6,background:"rgba(255,255,255,0.1)",borderRadius:6,overflow:"hidden",marginTop:8}}>
                    <div style={{height:"100%",width:`${mediaT}%`,background:mediaT>=70?C.green:C.orange,borderRadius:6}}/>
                  </div>
                </>}
                {alsTurma.filter(f=>f.questoes===0).length>0&&(
                  <div style={{marginTop:8,fontSize:11,color:C.red,fontWeight:700}}>
                    ⚠️ {alsTurma.filter(f=>f.questoes===0).length} aluno(s) nunca jogaram
                  </div>
                )}
              </div>
            );
          })}
        </>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   PAINEL DOS PAIS — dados reais do filho
═══════════════════════════════════════ */
function ParentScreen({ go }) {
  const usuario  = Storage.get("mq_usuario_atual");
  const pai      = (Storage.get("mq_pais")||[]).find(p=>p.email===usuario?.email);
  const todosFilhos = Storage.get("mq_filhos")||[];
  const meusFilhos  = pai ? todosFilhos.filter(f=>pai.filhos?.includes(f.codigo)) : [];

  const [childIdx, setChildIdx] = useState(0);
  const [tab, setTab]     = useState("resumo");
  const [limit, setLimit] = useState(30);
  const [notif, setNotif] = useState(true);
  const [addingChild, setAddingChild] = useState(false);

  // Novo filho
  const [nfNome,  setNfNome]  = useState("");
  const [nfGrade, setNfGrade] = useState(null);
  const [nfAvatar,setNfAvatar]= useState(0);
  const [nfCodigo,setNfCodigo]= useState("");

  const adicionarFilho = () => {
    if(!nfNome.trim()||nfGrade===null) return;
    const cod = gerarCodigo(nfNome);
    const novoFilho = { codigo:cod, nome:nfNome, grade:nfGrade, avatar:nfAvatar,
      xp:0,nivel:1,streak:0,acertos:0,questoes:0,tempo:"0min",paiEmail:usuario?.email };
    const filhos = Storage.get("mq_filhos")||[];
    Storage.set("mq_filhos",[...filhos,novoFilho]);
    if(pai){pai.filhos=[...(pai.filhos||[]),cod];const pais=Storage.get("mq_pais")||[];Storage.set("mq_pais",[...pais.filter(p=>p.email!==pai.email),pai]);}
    setNfCodigo(cod); setNfNome(""); setNfGrade(null); setNfAvatar(0);
  };

  const cd = meusFilhos[childIdx];
  const acc = cd?.questoes>0 ? Math.round((cd.acertos/cd.questoes)*100) : 0;

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:"linear-gradient(180deg,#0A1230,#0D1B3E)",overflowY:"auto"}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#0D2D6E,#1565C0)",padding:"14px 16px",borderBottom:`3px solid ${C.gold}`}}>
        <div style={{fontSize:18,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",marginBottom:10}}>
          👨‍👩‍👧 Olá, {usuario?.nome || "Pai/Mãe"}!
        </div>

        {/* Seletor de filhos */}
        {meusFilhos.length===0 ? (
          <div style={{background:"rgba(255,255,255,0.1)",borderRadius:16,padding:"12px",textAlign:"center"}}>
            <div style={{fontSize:13,color:"#90CAF9",fontWeight:600}}>Nenhum filho cadastrado ainda.</div>
            <button onClick={()=>setAddingChild(true)} style={{marginTop:8,padding:"8px 20px",borderRadius:20,border:"none",
              background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,color:C.dark,fontSize:13,fontWeight:900,
              fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>+ Adicionar filho(a)</button>
          </div>
        ) : (
          <div style={{display:"flex",gap:8,overflowX:"auto"}}>
            {meusFilhos.map((f,i)=>(
              <button key={i} onClick={()=>setChildIdx(i)} style={{
                display:"flex",alignItems:"center",gap:8,padding:"8px 14px",
                borderRadius:16,cursor:"pointer",flexShrink:0,transition:"all 0.2s",
                background:childIdx===i?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",
                color:childIdx===i?C.dark:"white",
                border:childIdx===i?`2px solid #FFF9C4`:"2px solid rgba(255,255,255,0.15)"}}>
                <span style={{fontSize:22}}>{AVATARS[f.avatar]}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif"}}>{f.nome}</div>
                  <div style={{fontSize:10,opacity:0.8}}>{GRADES[f.grade]}</div>
                </div>
              </button>
            ))}
            <button onClick={()=>setAddingChild(true)} style={{
              display:"flex",alignItems:"center",justifyContent:"center",
              width:44,borderRadius:14,border:"2px dashed rgba(255,255,255,0.3)",
              background:"transparent",color:"rgba(255,255,255,0.5)",fontSize:22,cursor:"pointer",flexShrink:0}}>+</button>
          </div>
        )}
      </div>

      {/* Modal adicionar filho */}
      {addingChild && (
        <div style={{background:"rgba(0,0,0,0.8)",position:"absolute",inset:0,zIndex:100,
          display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"#0D1F3C",borderRadius:24,padding:20,width:"100%",border:`2px solid ${C.blue}`}}>
            <div style={{fontSize:18,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",marginBottom:14}}>
              {nfCodigo ? "✅ Filho(a) adicionado!" : "➕ Adicionar filho(a)"}
            </div>

            {nfCodigo ? (
              <>
                <div style={{background:"white",borderRadius:16,padding:"16px",textAlign:"center",marginBottom:14}}>
                  <div style={{fontSize:11,color:"#78716C",fontWeight:700,marginBottom:6}}>Código de acesso</div>
                  <div style={{fontSize:36,fontWeight:900,color:"#0D47A1",fontFamily:"'Fredoka One',sans-serif",letterSpacing:4}}>{nfCodigo}</div>
                  <div style={{fontSize:11,color:"#78716C",marginTop:4}}>Mostre para seu filho(a) usar no app</div>
                </div>
                <button onClick={()=>{setAddingChild(false);setNfCodigo("");}} style={{width:"100%",padding:12,borderRadius:16,border:"none",
                  background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,color:C.dark,fontSize:15,fontWeight:900,
                  fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>Fechar</button>
              </>
            ) : (
              <>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <input value={nfNome} onChange={e=>setNfNome(e.target.value)} placeholder="Nome do filho(a)"
                    style={{padding:"12px 14px",borderRadius:12,border:`2px solid rgba(255,255,255,0.1)`,
                      background:"rgba(255,255,255,0.06)",color:"white",fontSize:15,fontWeight:700,outline:"none"}}/>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {GRADES.map((g,i)=>(
                      <button key={i} onClick={()=>setNfGrade(i)} style={{padding:"7px 10px",borderRadius:12,cursor:"pointer",
                        background:nfGrade===i?`linear-gradient(135deg,${C.blue},${C.blueDk})`:"rgba(255,255,255,0.06)",
                        color:"white",border:nfGrade===i?`2px solid #90CAF9`:"2px solid rgba(255,255,255,0.1)",
                        fontSize:11,fontWeight:900,fontFamily:"'Fredoka One',sans-serif"}}>
                        {["📗","📘","📙","📕","📓"][i]} {g}
                      </button>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    {AVATARS.slice(0,6).map((av,i)=>(
                      <button key={i} onClick={()=>setNfAvatar(i)} style={{width:44,height:44,borderRadius:12,fontSize:22,cursor:"pointer",
                        background:nfAvatar===i?`${C.gold}33`:"rgba(255,255,255,0.06)",
                        border:nfAvatar===i?`2px solid ${C.gold}`:"2px solid rgba(255,255,255,0.1)"}}>{av}</button>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",gap:8,marginTop:14}}>
                  <button onClick={()=>setAddingChild(false)} style={{flex:1,padding:12,borderRadius:16,
                    border:`2px solid rgba(255,255,255,0.15)`,background:"transparent",
                    color:"#90CAF9",fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>Cancelar</button>
                  <button onClick={adicionarFilho} style={{flex:2,padding:12,borderRadius:16,border:"none",
                    background:nfNome.trim()&&nfGrade!==null?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",
                    color:nfNome.trim()&&nfGrade!==null?C.dark:"#4A7AB5",fontSize:14,fontWeight:900,
                    fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>✨ Gerar código</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Se não tem filho ainda */}
      {!cd && !addingChild && (
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,padding:24}}>
          <div style={{fontSize:64}}>👶</div>
          <div style={{fontSize:18,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>
            Adicione seu primeiro filho(a)
          </div>
          <div style={{fontSize:13,color:"#90CAF9",fontWeight:600,textAlign:"center"}}>
            Cadastre seu filho para acompanhar o progresso dele
          </div>
          <button onClick={()=>setAddingChild(true)} style={{padding:"14px 32px",borderRadius:20,border:"none",
            background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,color:C.dark,fontSize:16,fontWeight:900,
            fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 5px 0 #B86000`}}>
            + Adicionar filho(a)
          </button>
        </div>
      )}

      {/* Dados do filho selecionado */}
      {cd && <>
        {/* Quick stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,padding:"10px 12px 8px"}}>
          {[{i:"⚡",v:`Nv.${cd.nivel||1}`,l:"Nível",c:C.purple},
            {i:"🔥",v:`${cd.streak||0}d`,l:"Streak",c:C.red},
            {i:"🎯",v:`${acc}%`,l:"Acertos",c:C.green},
            {i:"📝",v:cd.questoes||0,l:"Questões",c:C.blue}].map((s,i)=>(
            <div key={i} style={{background:`${s.c}18`,borderRadius:14,padding:"10px 4px",textAlign:"center",margin:3,border:`2px solid ${s.c}33`}}>
              <div style={{fontSize:18}}>{s.i}</div>
              <div style={{fontSize:14,fontWeight:900,color:s.c,fontFamily:"'Fredoka One',sans-serif"}}>{s.v}</div>
              <div style={{fontSize:9,color:"#90CAF9",fontWeight:700}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Código de acesso do filho */}
        <div style={{margin:"0 12px 8px",background:"rgba(255,215,0,0.1)",borderRadius:14,
          padding:"10px 14px",border:`1px solid ${C.gold}44`,
          display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:C.gold,fontWeight:800}}>🔑 Código de {cd.nome}</div>
            <div style={{fontSize:18,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",letterSpacing:3}}>{cd.codigo}</div>
          </div>
          <div style={{fontSize:11,color:"#90CAF9",fontWeight:600,textAlign:"right"}}>
            {AVATARS[cd.avatar]} {GRADES[cd.grade]}
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",borderBottom:"2px solid rgba(255,255,255,0.08)"}}>
          {[["resumo","📊 Resumo"],["atividade","📋 Atividade"],["controles","⚙️ Controles"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"10px 0",border:"none",background:"transparent",cursor:"pointer",
              borderBottom:`3px solid ${tab===k?C.gold:"transparent"}`,color:tab===k?C.gold:"#4A7AB5",
              fontSize:11,fontWeight:900,fontFamily:"'Fredoka One',sans-serif"}}>
              {l}
            </button>
          ))}
        </div>

        <div style={{padding:"12px 12px 80px"}}>
          {tab==="resumo" && <>
            {cd.questoes===0 ? (
              <div style={{textAlign:"center",padding:"32px 16px"}}>
                <div style={{fontSize:48}}>🎮</div>
                <div style={{fontSize:16,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginTop:10}}>{cd.nome} ainda não jogou!</div>
                <div style={{fontSize:12,color:"#90CAF9",fontWeight:600,marginTop:6}}>Compartilhe o código <strong style={{color:C.gold}}>{cd.codigo}</strong> para ele(a) começar</div>
              </div>
            ) : (
              <>
                <div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginBottom:10}}>📊 Desempenho geral</div>
                <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"14px",marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:12,color:"#90CAF9",fontWeight:700}}>Taxa de acertos</span>
                    <span style={{fontSize:12,fontWeight:900,color:acc>=70?C.green:C.red}}>{acc}%</span>
                  </div>
                  <div style={{height:10,background:"rgba(255,255,255,0.1)",borderRadius:10,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${acc}%`,background:acc>=70?C.green:C.red,borderRadius:10,transition:"width 0.8s"}}/>
                  </div>
                  <div style={{fontSize:11,color:"#90CAF9",marginTop:6,fontWeight:600}}>
                    {cd.acertos} acertos em {cd.questoes} questões
                  </div>
                </div>
                <div style={{background:"rgba(46,204,113,0.12)",border:"1px solid rgba(46,204,113,0.3)",
                  borderRadius:14,padding:"12px 14px",display:"flex",gap:10}}>
                  <span style={{fontSize:22}}>💡</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:900,color:C.green,fontFamily:"'Fredoka One',sans-serif"}}>
                      {acc>=80?"Ótimo desempenho!":acc>=60?"Bom progresso!":"Precisa de atenção"}
                    </div>
                    <div style={{fontSize:12,color:"#A7F3D0",fontWeight:600}}>
                      {cd.nome} completou {cd.questoes} questões com {acc}% de aproveitamento.
                    </div>
                  </div>
                </div>
              </>
            )}
          </>}

          {tab==="atividade" && (
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div style={{fontSize:40}}>📋</div>
              <div style={{fontSize:15,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginTop:8}}>
                {cd.questoes>0 ? `${cd.questoes} questões respondidas` : "Nenhuma atividade ainda"}
              </div>
              <div style={{fontSize:12,color:"#90CAF9",marginTop:6,fontWeight:600}}>
                {cd.questoes>0 ? `${cd.acertos} acertos · ${cd.questoes-cd.acertos} erros` : "Compartilhe o código para começar"}
              </div>
            </div>
          )}

          {tab==="controles" && <>
            <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"14px 16px",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div>
                  <div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>⏱️ Limite diário</div>
                  <div style={{fontSize:11,color:"#90CAF9",fontWeight:600}}>Máximo por dia</div>
                </div>
                <div style={{fontSize:20,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",
                  background:`${C.gold}18`,padding:"4px 14px",borderRadius:12}}>{limit} min</div>
              </div>
              <input type="range" min={10} max={120} step={5} value={limit}
                onChange={e=>setLimit(+e.target.value)} style={{width:"100%",accentColor:C.blue}}/>
            </div>
            <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"14px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>🔔 Alertas de inatividade</div>
                  <div style={{fontSize:10,color:"#90CAF9",fontWeight:600}}>Aviso após 3 dias parado</div>
                </div>
                <button onClick={()=>setNotif(v=>!v)} style={{width:46,height:26,borderRadius:13,border:"none",cursor:"pointer",
                  background:notif?C.blue:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",
                  padding:3,justifyContent:notif?"flex-end":"flex-start",transition:"all 0.25s"}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:"white"}}/>
                </button>
              </div>
            </div>
          </>}
        </div>
      </>}

      {/* Botão voltar */}
      <div style={{position:"sticky",bottom:0,padding:"10px 12px",
        background:"linear-gradient(180deg,transparent,#0A1230)",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
        <button onClick={()=>{Storage.set("mq_usuario_atual",null);go("login");}} style={{
          width:"100%",padding:11,borderRadius:16,
          border:`2px solid rgba(255,255,255,0.15)`,background:"transparent",
          color:"#90CAF9",fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>
          🚪 Sair da conta
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ROOT APP
═══════════════════════════════════════ */
const NAV=[{k:"map",i:"🗺️",l:"Mapa"},{k:"quiz",i:"⚔️",l:"Missão"},{k:"shop",i:"🏪",l:"Loja"},{k:"rank",i:"🏆",l:"Rank"},{k:"hero",i:"🦊",l:"Herói"}];

export default function App(){
  const [burst,setBurst]=useState(false);
  const {toasts,show}=useToast();

  // Verifica se já tem sessão salva
  const sessaoAtual = Storage.get("mq_usuario_atual");
  const telaInicial = sessaoAtual?.tipo==="pai" ? "parent"
                    : sessaoAtual?.tipo==="aluno" ? "map"
                    : sessaoAtual?.tipo==="professor" ? "teacher"
                    : "login";

  const [screen,setScreen]=useState(telaInicial);
  const go=s=>setScreen(s);
  const isInApp=!["login"].includes(screen);

  return(
    <div style={{minHeight:"100vh",background:"#030609",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 0"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');
        @keyframes float      {0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes heroFloat  {0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes cloudDrift {0%,100%{transform:translateX(0)}50%{transform:translateX(10px)}}
        @keyframes ringPulse  {0%,100%{transform:translate(-50%,-50%) translateY(-28px) scale(1);opacity:.7}50%{transform:translate(-50%,-50%) translateY(-28px) scale(1.35);opacity:.3}}
        @keyframes popIn      {0%{transform:scale(.4);opacity:0}65%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
        @keyframes bounce     {0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes toastIn    {from{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes toastOut   {from{opacity:1}to{opacity:0;transform:translateY(-10px)}}
        @keyframes burst0{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(-60px,-80px) scale(0);opacity:0}}
        @keyframes burst1{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(60px,-80px) scale(0);opacity:0}}
        @keyframes burst2{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(-40px,-100px) scale(0);opacity:0}}
        @keyframes burst3{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(40px,-100px) scale(0);opacity:0}}
        *{box-sizing:border-box;margin:0;padding:0}
        button:active{opacity:.85}
        input{color:white;font-family:'Nunito',sans-serif}
        input::placeholder{color:rgba(255,255,255,0.35)}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#FFD700;border-radius:3px}
      `}</style>

      <div style={{width:390,height:844,borderRadius:48,overflow:"hidden",display:"flex",flexDirection:"column",
        boxShadow:`0 40px 90px #000000CC,0 0 0 3px #FFD70033`,position:"relative"}}>
        <RewardBurst show={burst} onDone={()=>setBurst(false)}/>
        <Toast toasts={toasts}/>

        {isInApp&&screen!=="parent"&&screen!=="teacher"&&<div style={{background:C.dark,padding:"10px 22px 5px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:11,color:"#90CAF9",fontFamily:"'Nunito',sans-serif",fontWeight:800}}>
          <span>9:41</span>
          <div style={{display:"flex",alignItems:"center",gap:6}}><Logo s={18}/><span style={{fontFamily:"'Fredoka One',sans-serif",color:C.gold,fontSize:14}}>Math<span style={{color:C.blue}}>Quest</span></span></div>
          <span>🔋</span>
        </div>}

        {isInApp&&screen!=="parent"&&screen!=="teacher"&&<div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px 8px",background:`linear-gradient(180deg,#0A1628,${C.card})`,borderBottom:`3px solid ${C.gold}`}}>
          <div style={{flex:1,height:13,background:"#050C1A",borderRadius:20,border:`2px solid rgba(30,144,255,0.2)`,overflow:"hidden",position:"relative"}}>
            <div style={{position:"absolute",inset:0,width:"63%",background:`linear-gradient(90deg,${C.green},#1B8A3A)`,borderRadius:20}}/>
            <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",zIndex:1}}>Nv.5 · 1250 XP</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:4,background:"linear-gradient(135deg,#BF360C,#E64A19)",borderRadius:20,padding:"3px 10px",border:`2px solid ${C.orange}`}}><Coin sz={15}/><span style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>1250</span></div>
          <div style={{display:"flex",alignItems:"center",gap:4,background:"linear-gradient(135deg,#4527A0,#6A1B9A)",borderRadius:20,padding:"3px 10px",border:"2px solid #9C6FFF"}}><span style={{fontSize:14}}>💎</span><span style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>25</span></div>
          <button onClick={()=>go("parent")} style={{background:"rgba(30,144,255,0.2)",border:`2px solid ${C.blue}44`,borderRadius:10,padding:"3px 8px",fontSize:13,cursor:"pointer",color:"white",fontFamily:"'Fredoka One',sans-serif",fontWeight:900}}>👨‍👩‍👧</button>
        </div>}

        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {screen==="login"  && <LoginScreen onDone={go}/>}
          {screen==="map"    && <MapScreen   go={go} toast={show}/>}
          {screen==="quiz"   && <QuizScreen  go={go} toast={show} showBurst={()=>setBurst(true)}/>}
          {screen==="shop"   && <ShopScreen  toast={show}/>}
          {screen==="rank"   && <RankScreen/>}
          {screen==="hero"   && <HeroScreen/>}
          {screen==="parent"  && <ParentScreen go={go}/>}
          {screen==="teacher"  && <TeacherScreen go={go}/>}
        </div>

        {isInApp&&screen!=="parent"&&screen!=="teacher"&&(
          <div style={{display:"flex",background:`linear-gradient(180deg,#050C1A,#0A1628)`,borderTop:`3px solid ${C.gold}`}}>
            {NAV.map(item=>{const active=screen===item.k;return(
              <button key={item.k} onClick={()=>go(item.k)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"8px 0 6px",border:"none",background:active?`linear-gradient(180deg,${C.gold},${C.goldDk})`:"transparent",borderTop:active?`3px solid #FFF9C4`:"3px solid transparent",cursor:"pointer",transition:"all 0.18s"}}>
                <span style={{fontSize:22}}>{item.i}</span>
                <span style={{fontSize:10,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",color:active?C.dark:"#4A7AB5"}}>{item.l}</span>
              </button>
            );})}
          </div>
        )}
      </div>
    </div>
  );
}
