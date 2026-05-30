import { useState, useEffect, useRef } from "react";

const C = {
  blue:"#1E90FF", blueDk:"#0055CC", blueBg:"#0A1628", dark:"#060B16",
  card:"#0D1F3C", gold:"#FFD700", goldDk:"#FF8F00",
  red:"#FF6B6B", green:"#2ECC71", purple:"#6C5CE7", orange:"#FFA63A",
};

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

/* ── TOAST ── */
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
          fontFamily:"'Fredoka One',sans-serif",
          boxShadow:"0 4px 20px #00000055",
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

/* ── BURST ── */
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

/* ── AVATARS ── */
const AVATARS=["🦊","🐯","🐰","🐻","🦁","🐸","🧙","🧝‍♀️"];
const GRADES=["1º Ano","2º Ano","3º Ano","4º Ano","5º Ano"];

/* ══════════ LOGIN / ONBOARDING ══════════ */
function LoginScreen({onDone, returning}){
  const [step,setStep]=useState(returning ? "login" : "splash");
  const [mode,setMode]=useState("aluno");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [name,setName]=useState("");
  const [avatar,setAvatar]=useState(0);
  const [grade,setGrade]=useState(null);
  const [showP,setShowP]=useState(false);

  if(step==="splash") return(
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
        <div style={{fontSize:52,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",letterSpacing:0,textShadow:"0 4px 20px #00000044",lineHeight:1}}>
          Math<span style={{color:"#FFD700"}}>Quest</span>
        </div>
        <div style={{fontSize:16,color:"#BBDEFB",fontWeight:700}}>Matemática é uma aventura!</div>
      </div>
      <button onClick={()=>setStep("welcome")} style={{width:"100%",padding:16,borderRadius:20,border:"none",zIndex:1,
        background:"white",color:"#0D47A1",fontSize:18,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",
        boxShadow:"0 8px 28px #00000033"}}>Começar →</button>
    </div>
  );

  if(step==="welcome") return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"36px 24px 28px",gap:20,
      background:"linear-gradient(180deg,#0A1628,#0D1F3C)"}}>
      <div style={{animation:"heroFloat 2.5s ease-in-out infinite"}}><Fox sz={80}/></div>
      <div style={{fontSize:26,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>Olá, aventureiro! 👋</div>
      <div style={{fontSize:14,color:"#90CAF9",fontWeight:600,textAlign:"center",lineHeight:1.6}}>
        Bem-vindo ao MathQuest — onde aprender matemática vira uma missão épica!
      </div>
      <div style={{display:"flex",gap:10,width:"100%"}}>
        {["aluno","pai"].map(m=>(
          <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"12px 0",borderRadius:16,cursor:"pointer",
            background:mode===m?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.08)",
            color:mode===m?C.dark:"#90CAF9",border:mode===m?`2px solid #FFF9C4`:"2px solid rgba(255,255,255,0.12)",
            fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",transition:"all 0.2s"}}>
            {m==="aluno"?"🎒 Sou Aluno":"👨‍👩‍👧 Sou Pai/Mãe"}
          </button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",marginTop:"auto"}}>
        <button onClick={()=>setStep("register")} style={{width:"100%",padding:15,borderRadius:20,border:"none",
          background:`linear-gradient(135deg,${C.blue},${C.blueDk})`,color:"white",fontSize:17,fontWeight:900,
          fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 5px 0 #003A99`}}>✨ Criar conta grátis</button>
        <button onClick={()=>setStep("login")} style={{width:"100%",padding:14,borderRadius:20,
          border:`3px solid ${C.gold}`,background:"transparent",color:C.gold,fontSize:16,fontWeight:900,
          fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>Já tenho conta →</button>
      </div>
    </div>
  );

  if(step==="login") return(
    <div style={{flex:1,display:"flex",flexDirection:"column",padding:"20px 24px",gap:14,
      background:"linear-gradient(180deg,#0A1628,#0D1F3C)",overflowY:"auto"}}>
      <button onClick={()=>setStep("welcome")} style={{background:"none",border:"none",color:C.blue,fontSize:13,
        fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",textAlign:"left",padding:0}}>◀ Voltar</button>
      <div style={{textAlign:"center",animation:"heroFloat 2s ease-in-out infinite"}}><Fox sz={72}/></div>
      <div style={{fontSize:26,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>Entrar na aventura</div>
      <div style={{fontSize:13,color:"#90CAF9",textAlign:"center",fontWeight:600}}>Que saudade! Vamos lá 🎉</div>
      {[["📧 E-mail","email","seu@email.com",email,setEmail],["🔒 Senha","password","••••••••",pass,setPass]].map(([lbl,tp,ph,val,set],i)=>(
        <div key={i} style={{display:"flex",flexDirection:"column",gap:5}}>
          <label style={{fontSize:11,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:1}}>{lbl}</label>
          <input value={val} onChange={e=>set(e.target.value)} placeholder={ph} type={i===1&&!showP?"password":tp}
            style={{padding:"13px 16px",borderRadius:14,border:`2px solid rgba(255,255,255,0.08)`,
              background:"rgba(255,255,255,0.06)",fontSize:15,fontWeight:700,outline:"none"}}/>
        </div>
      ))}
      <button onClick={()=>onDone("map")} style={{width:"100%",padding:15,borderRadius:20,border:"none",
        background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,color:C.dark,fontSize:17,fontWeight:900,
        fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 5px 0 #B86000`}}>🚀 Entrar</button>
      <div style={{textAlign:"center",fontSize:13,color:"#4A7AB5",fontWeight:600}}>
        Não tem conta?{" "}
        <button onClick={()=>setStep("register")} style={{background:"none",border:"none",color:C.gold,
          fontWeight:900,cursor:"pointer",fontFamily:"'Fredoka One',sans-serif"}}>Criar agora →</button>
      </div>
    </div>
  );

  if(step==="register") return(
    <div style={{flex:1,display:"flex",flexDirection:"column",padding:"20px 24px",gap:14,
      background:"linear-gradient(180deg,#0A1628,#0D1F3C)",overflowY:"auto"}}>
      <button onClick={()=>setStep("welcome")} style={{background:"none",border:"none",color:C.blue,fontSize:13,
        fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",textAlign:"left",padding:0}}>◀ Voltar</button>
      <div style={{textAlign:"center",fontSize:56,animation:"heroFloat 2s ease-in-out infinite"}}>✨</div>
      <div style={{fontSize:26,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>Criar conta grátis</div>
      {[["📧 E-mail","email","seu@email.com",email,setEmail],["🔒 Senha","password","Mínimo 6 caracteres",pass,setPass]].map(([lbl,tp,ph,val,set],i)=>(
        <div key={i} style={{display:"flex",flexDirection:"column",gap:5}}>
          <label style={{fontSize:11,fontWeight:800,color:"#90CAF9",textTransform:"uppercase",letterSpacing:1}}>{lbl}</label>
          <input value={val} onChange={e=>set(e.target.value)} placeholder={ph} type={tp}
            style={{padding:"13px 16px",borderRadius:14,border:`2px solid rgba(255,255,255,0.08)`,
              background:"rgba(255,255,255,0.06)",fontSize:15,fontWeight:700,outline:"none"}}/>
        </div>
      ))}
      <button onClick={()=>setStep("avatar")} style={{width:"100%",padding:15,borderRadius:20,border:"none",
        background:`linear-gradient(135deg,${C.blue},${C.blueDk})`,color:"white",fontSize:17,fontWeight:900,
        fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 5px 0 #003A99`}}>✨ Criar minha conta</button>
    </div>
  );

  if(step==="avatar") return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 24px 32px",gap:14,
      background:"linear-gradient(180deg,#0A1628,#0D1F3C)"}}>
      <div style={{fontSize:11,fontWeight:800,color:"#4A7AB5",textTransform:"uppercase",letterSpacing:2}}>Passo 1 de 3</div>
      <div style={{display:"flex",gap:5}}>{[0,1,2].map(i=><div key={i} style={{width:32,height:6,borderRadius:10,background:i===0?C.gold:"rgba(255,255,255,0.15)"}}/>)}</div>
      <div style={{fontSize:52,animation:"heroFloat 2s ease-in-out infinite"}}>{AVATARS[avatar]}</div>
      <div style={{fontSize:22,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>Escolha seu avatar!</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,width:"100%"}}>
        {AVATARS.map((av,i)=>(
          <button key={i} onClick={()=>setAvatar(i)} style={{borderRadius:18,padding:"14px 0",fontSize:30,cursor:"pointer",
            background:avatar===i?`linear-gradient(135deg,${C.gold}33,${C.goldDk}22)`:"rgba(255,255,255,0.06)",
            border:avatar===i?`3px solid ${C.gold}`:"3px solid rgba(255,255,255,0.1)",
            transform:avatar===i?"scale(1.12)":"scale(1)",
            boxShadow:avatar===i?`0 4px 16px ${C.gold}44`:"none",transition:"all 0.2s"}}>{av}</button>
        ))}
      </div>
      <button onClick={()=>setStep("name")} style={{width:"100%",padding:15,borderRadius:20,border:"none",marginTop:"auto",
        background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,color:C.dark,fontSize:17,fontWeight:900,
        fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 5px 0 #B86000`}}>Próximo →</button>
    </div>
  );

  if(step==="name") return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 24px 32px",gap:14,
      background:"linear-gradient(180deg,#0A1628,#0D1F3C)"}}>
      <div style={{fontSize:11,fontWeight:800,color:"#4A7AB5",textTransform:"uppercase",letterSpacing:2}}>Passo 2 de 3</div>
      <div style={{display:"flex",gap:5}}>{[0,1,2].map(i=><div key={i} style={{width:32,height:6,borderRadius:10,background:i<=1?C.gold:"rgba(255,255,255,0.15)"}}/>)}</div>
      <div style={{fontSize:52,animation:"heroFloat 2s ease-in-out infinite"}}>{AVATARS[avatar]}</div>
      <div style={{fontSize:22,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>Qual é o seu nome?</div>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Digite seu nome..."
        style={{width:"100%",padding:"16px 20px",borderRadius:16,textAlign:"center",
          border:`3px solid ${name?C.gold:"rgba(255,255,255,0.1)"}`,
          background:"rgba(255,255,255,0.06)",fontSize:20,fontWeight:900,
          fontFamily:"'Fredoka One',sans-serif",outline:"none",transition:"border-color 0.3s"}}/>
      {name.length>0&&(
        <div style={{display:"flex",alignItems:"center",gap:10,background:`${C.gold}18`,
          border:`2px solid ${C.gold}44`,borderRadius:16,padding:"10px 20px",width:"100%"}}>
          <span style={{fontSize:28}}>{AVATARS[avatar]}</span>
          <span style={{fontWeight:900,fontSize:16,color:C.gold,fontFamily:"'Fredoka One',sans-serif"}}>Olá, {name}! 👋</span>
        </div>
      )}
      <button onClick={()=>name.trim()&&setStep("grade")} style={{width:"100%",padding:15,borderRadius:20,border:"none",marginTop:"auto",
        background:name.trim()?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",
        color:name.trim()?C.dark:"#4A7AB5",fontSize:17,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",
        cursor:name.trim()?"pointer":"not-allowed",boxShadow:name.trim()?`0 5px 0 #B86000`:"none",
        transition:"all 0.2s"}}>Próximo →</button>
    </div>
  );

  if(step==="grade") return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 24px 32px",gap:14,
      background:"linear-gradient(180deg,#0A1628,#0D1F3C)",overflowY:"auto"}}>
      <div style={{fontSize:11,fontWeight:800,color:"#4A7AB5",textTransform:"uppercase",letterSpacing:2}}>Passo 3 de 3</div>
      <div style={{display:"flex",gap:5}}>{[0,1,2].map(i=><div key={i} style={{width:32,height:6,borderRadius:10,background:C.gold}}/>)}</div>
      <div style={{fontSize:52}}>{AVATARS[avatar]}</div>
      <div style={{fontSize:22,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>Qual é a sua série?</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,width:"100%"}}>
        {GRADES.map((g,i)=>(
          <button key={i} onClick={()=>setGrade(i)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",
            borderRadius:16,cursor:"pointer",transition:"all 0.2s",
            background:grade===i?`linear-gradient(135deg,${C.blue},${C.blueDk})`:"rgba(255,255,255,0.06)",
            color:"white",border:grade===i?`2px solid #90CAF9`:"2px solid rgba(255,255,255,0.1)",
            boxShadow:grade===i?`0 4px 16px ${C.blue}44`:"none",
            fontFamily:"'Fredoka One',sans-serif",fontSize:16}}>
            <span>{["📗","📘","📙","📕","📓"][i]}</span>
            <span style={{flex:1,fontWeight:900}}>{g}</span>
            {grade===i&&<span style={{fontSize:18}}>✓</span>}
          </button>
        ))}
      </div>
      <button onClick={()=>grade!==null&&setStep("ready")} style={{width:"100%",padding:15,borderRadius:20,border:"none",marginTop:4,
        background:grade!==null?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",
        color:grade!==null?C.dark:"#4A7AB5",fontSize:17,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",
        cursor:grade!==null?"pointer":"not-allowed",boxShadow:grade!==null?`0 5px 0 #B86000`:"none",
        transition:"all 0.2s"}}>🚀 Começar aventura!</button>
    </div>
  );

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:28,
      background:"linear-gradient(160deg,#0D47A1,#1E90FF)"}}>
      <div style={{fontSize:60,animation:"bounce 0.8s ease-in-out infinite"}}>🎉</div>
      <div style={{animation:"heroFloat 2s ease-in-out infinite"}}><Fox sz={90} mood="wow"/></div>
      <div style={{fontSize:28,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>
        Bem-vindo(a), {name}!
      </div>
      <div style={{fontSize:14,color:"#BBDEFB",fontWeight:600,textAlign:"center",lineHeight:1.6}}>
        Sua aventura começa agora.<br/>Boa sorte, {GRADES[grade]}! ⭐
      </div>
      <div style={{display:"flex",gap:10,width:"100%"}}>
        {[{i:"⚡",v:"0 XP"},{i:"🪙",v:"50 bônus"},{i:"🔥",v:"Dia 1"}].map((s,i)=>(
          <div key={i} style={{flex:1,background:"rgba(255,255,255,0.15)",borderRadius:16,padding:"12px 0",
            textAlign:"center",border:"2px solid rgba(255,255,255,0.25)"}}>
            <div style={{fontSize:24}}>{s.i}</div>
            <div style={{fontSize:14,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{s.v}</div>
          </div>
        ))}
      </div>
      <button onClick={()=>onDone("map")} style={{width:"100%",padding:16,borderRadius:20,border:"none",
        background:"white",color:"#0D47A1",fontSize:18,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",
        cursor:"pointer",boxShadow:"0 6px 24px #00000033"}}>🏠 Ir para o início!</button>
    </div>
  );
}

/* ══════════ MAP ══════════ */
const NODES=[
  {id:1,x:50,y:82,label:"Soma",    icon:"➕",stars:3,state:"done"},
  {id:2,x:72,y:67,label:"Subtração",icon:"➖",stars:2,state:"done"},
  {id:3,x:52,y:52,label:"Mult.",   icon:"✖️",stars:0,state:"current"},
  {id:4,x:28,y:38,label:"Divisão", icon:"➗",stars:0,state:"locked"},
  {id:5,x:60,y:24,label:"Frações", icon:"½", stars:0,state:"locked"},
  {id:6,x:38,y:11,label:"%",       icon:"%", stars:0,state:"locked"},
];

function MapScreen({go,toast}){
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
          <div style={{fontSize:13,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif"}}>MISSÃO DO DIA!</div>
          <div style={{fontSize:11,color:"#E1BEE7",fontWeight:700}}>Complete 5 desafios · Ganhe 200 moedas</div>
        </div>
        <button onClick={()=>go("quiz")} style={{background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,
          border:"2px solid #FFF9C4",borderRadius:20,padding:"7px 18px",fontSize:13,fontWeight:900,
          color:C.dark,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>IR!</button>
      </div>
    </div>
  );
}

/* ══════════ QUIZ ══════════ */
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
    if(opt===q.ans){const nx=xp+100;setXp(nx);toast("⚡","+100 XP!","xp");if(nx%300===0){toast("🪙","+50 Moedas!","coin");showBurst();}}
    else{const nh=hp-1;setHp(nh);toast("❤️","Vida perdida!","info");if(nh<=0)setTimeout(()=>setEnd(true),1200);}
  };
  const next=()=>{if(hp<=0||qi+1>=TOTAL){setEnd(true);return;}setQi(i=>i+1);setQ(genQ(mode));setSel(null);setDone(false);};

  if(!mode)return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:`linear-gradient(180deg,${C.blueBg},${C.dark})`,padding:"20px 16px",gap:12}}>
      <div style={{fontSize:22,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",textAlign:"center"}}>⚔️ Escolha o desafio</div>
      <div style={{textAlign:"center",animation:"heroFloat 2s ease-in-out infinite"}}><Fox sz={80}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,flex:1}}>
        {Object.entries(QUIZ_MODES).map(([k,v])=>(
          <button key={k} onClick={()=>startMode(k)} style={{borderRadius:20,padding:"20px 10px",border:`3px solid ${v.color}44`,
            background:`${v.color}15`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,
            boxShadow:`0 4px 16px ${v.color}22`}}>
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
          fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",boxShadow:`0 5px 0 #003A99`}}>🔄 De novo</button>
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
            <span style={{fontSize:36,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",textShadow:"0 2px 6px #00000066"}}>{opt}</span>
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

/* ══════════ SHOP ══════════ */
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

/* ══════════ RANK ══════════ */
const RD={global:[{pos:1,n:"Ana",xp:3250,av:"🧝‍♀️"},{pos:2,n:"Lucas",xp:2800,av:"🦊",me:true},{pos:3,n:"Pedro",xp:2450,av:"🧙"},{pos:4,n:"Sofia",xp:2100,av:"🐲"},{pos:5,n:"Miguel",xp:1900,av:"☁️"}],amigos:[{pos:1,n:"Lucas",xp:2800,av:"🦊",me:true},{pos:2,n:"Ana",xp:2600,av:"🧝‍♀️"},{pos:3,n:"Pedro",xp:1800,av:"🧙"}]};
function RankScreen(){
  const [tab,setTab]=useState("global");const list=RD[tab];const top3=[list[1],list[0],list[2]].filter(Boolean);const rest=list.slice(3);const pC=["#C0C0C0","#FFD700","#CD7F32"];const pH=[86,110,70];const pM=["🥈","🥇","🥉"];
  return(<div style={{flex:1,display:"flex",flexDirection:"column",background:`linear-gradient(180deg,${C.blueBg},${C.dark})`}}>
    <div style={{fontSize:24,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",textAlign:"center",padding:"12px 0 4px",textShadow:`0 0 20px ${C.gold}66`}}>🏆 RANKING</div>
    <div style={{display:"flex",gap:8,padding:"0 14px 10px"}}>
      {["global","amigos"].map(k=>(<button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"7px",borderRadius:20,border:"none",cursor:"pointer",background:tab===k?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",color:tab===k?C.dark:"white",fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",transition:"all 0.2s"}}>{k==="global"?"🌍 Global":"👥 Amigos"}</button>))}
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

/* ══════════ HERO ══════════ */
function HeroScreen({toast}){
  const [ptab,setPtab]=useState("stats");
  return(<div style={{flex:1,display:"flex",flexDirection:"column",background:`linear-gradient(180deg,${C.blueBg},${C.dark})`,overflowY:"auto"}}>
    <div style={{background:`linear-gradient(135deg,#0033AA,${C.blue})`,padding:"18px 16px 14px",display:"flex",gap:14,alignItems:"center",borderBottom:`3px solid ${C.gold}`}}>
      <div style={{position:"relative"}}>
        <div style={{width:76,height:76,borderRadius:"50%",background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,border:"4px solid #FFF9C4",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 20px ${C.gold}66`,overflow:"hidden"}}><Fox sz={66}/></div>
        <div style={{position:"absolute",bottom:-4,right:-4,background:C.orange,borderRadius:"50%",width:26,height:26,border:"2px solid white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>5</div>
      </div>
      <div style={{flex:1}}>
        <div style={{fontSize:24,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>Lucas</div>
        <div style={{fontSize:12,color:"#BBDEFB",fontWeight:700}}>Aventureiro · 3º Ano</div>
        <div style={{background:"rgba(0,0,0,0.3)",borderRadius:10,height:10,marginTop:7,overflow:"hidden"}}>
          <div style={{width:"62%",height:"100%",background:`linear-gradient(90deg,${C.gold},${C.orange})`,borderRadius:10}}/>
        </div>
        <div style={{fontSize:10,color:"#90CAF9",marginTop:3,fontWeight:700}}>1250 / 2000 XP · Nível 6</div>
      </div>
    </div>
    <div style={{display:"flex",borderBottom:"2px solid rgba(255,255,255,0.08)"}}>
      {[["stats","📊 Stats"],["troféus","🏅 Troféus"],["pets","🐾 Pets"]].map(([k,l])=>(<button key={k} onClick={()=>setPtab(k)} style={{flex:1,padding:"10px 0",border:"none",background:"transparent",cursor:"pointer",borderBottom:`3px solid ${ptab===k?C.gold:"transparent"}`,color:ptab===k?C.gold:"#4A7AB5",fontSize:12,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",transition:"all 0.2s"}}>{l}</button>))}
    </div>
    {ptab==="stats"&&<div style={{padding:12}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
        {[{i:"📝",v:"45",l:"Missões",c:C.blue},{i:"🎯",v:"89%",l:"Acertos",c:C.green},{i:"🔥",v:"7 dias",l:"Sequência",c:C.red}].map((s,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.07)",borderRadius:16,padding:"12px 6px",textAlign:"center",border:`2px solid ${s.c}33`}}><div style={{fontSize:22}}>{s.i}</div><div style={{fontSize:17,fontWeight:900,color:s.c,fontFamily:"'Fredoka One',sans-serif"}}>{s.v}</div><div style={{fontSize:9,color:"#90CAF9",fontWeight:700}}>{s.l}</div></div>))}
      </div>
      {[{l:"Soma",p:92,c:C.red},{l:"Subtração",p:76,c:C.orange},{l:"Mult.",p:45,c:C.purple}].map((prog,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:74,fontSize:12,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{prog.l}</div><div style={{flex:1,height:10,background:"#060F22",borderRadius:10,overflow:"hidden"}}><div style={{height:"100%",width:`${prog.p}%`,background:prog.c,borderRadius:10}}/></div><div style={{fontSize:11,fontWeight:900,color:prog.c,width:32}}>{prog.p}%</div></div>))}
    </div>}
    {ptab==="troféus"&&<div style={{padding:12,display:"flex",flexWrap:"wrap",gap:8}}>
      {[{i:"⭐",l:"1ª estrela",ok:true},{i:"🔥",l:"7 dias",ok:true},{i:"⚡",l:"Maratonista",ok:true},{i:"🏆",l:"Top 10",ok:false},{i:"💎",l:"100 questões",ok:false},{i:"🌟",l:"Nota 10",ok:false}].map((b,i)=>(<div key={i} style={{width:82,background:b.ok?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.04)",borderRadius:16,padding:"10px 6px",textAlign:"center",border:b.ok?`2px solid ${C.gold}55`:"2px solid rgba(255,255,255,0.08)",opacity:b.ok?1:0.38}}><div style={{fontSize:30,filter:b.ok?"none":"grayscale(1)"}}>{b.i}</div><div style={{fontSize:9,color:"white",fontWeight:800,marginTop:4,lineHeight:1.3}}>{b.l}</div></div>))}
    </div>}
    {ptab==="pets"&&<div style={{padding:12,display:"flex",flexWrap:"wrap",gap:8}}>
      {[{e:"🦊",n:"Max",active:true},{e:"🐲",n:"Draco",active:false},{e:"🐱",n:"Miau",active:false},{e:"🔒",n:"Bloqueado",locked:true}].map((p,i)=>(<div key={i} style={{width:82,background:p.active?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.07)",borderRadius:16,padding:"12px 8px",textAlign:"center",border:p.active?`3px solid #FFF9C4`:"2px solid rgba(255,255,255,0.12)",opacity:p.locked?0.4:1}}><div style={{fontSize:30}}>{p.e}</div><div style={{fontSize:10,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",color:p.active?C.dark:"white"}}>{p.n}</div>{p.active&&<div style={{fontSize:8,color:C.dark,fontWeight:900}}>ATIVO</div>}</div>))}
    </div>}
  </div>);
}

/* ══════════ PAINEL DOS PAIS ══════════ */
const CD=[
  {name:"Sofia",grade:"3º Ano",av:"🦊",level:5,xp:1250,streak:7,accuracy:89,questions:45,time:"4h 12m",subjects:[{l:"Soma",p:92,c:C.red},{l:"Subtração",p:76,c:C.orange},{l:"Mult.",p:45,c:C.purple}],weekly:[45,60,0,80,55,90,30]},
  {name:"Pedro",grade:"1º Ano",av:"🐯",level:2,xp:210,streak:2,accuracy:72,questions:18,time:"1h 30m",subjects:[{l:"Soma",p:72,c:C.red},{l:"Subtração",p:40,c:C.orange}],weekly:[20,35,10,45,0,60,0]},
];
function ParentScreen(){
  const [child,setChild]=useState(0);const [tab,setTab]=useState("resumo");const [limit,setLimit]=useState(30);const [notif,setNotif]=useState(true);const [weekend,setWeekend]=useState(false);const cd=CD[child];const maxB=Math.max(...cd.weekly);
  return(<div style={{flex:1,display:"flex",flexDirection:"column",background:"linear-gradient(180deg,#0A1230,#0D1B3E)",overflowY:"auto"}}>
    <div style={{background:"linear-gradient(135deg,#0D2D6E,#1565C0)",padding:"14px 16px",borderBottom:`3px solid ${C.gold}`}}>
      <div style={{fontSize:18,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",marginBottom:10}}>👨‍👩‍👧 Painel dos Pais</div>
      <div style={{display:"flex",gap:8}}>
        {CD.map((c,i)=>(<button key={i} onClick={()=>setChild(i)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:16,cursor:"pointer",transition:"all 0.2s",flex:1,background:child===i?`linear-gradient(135deg,${C.gold},${C.goldDk})`:"rgba(255,255,255,0.1)",color:child===i?C.dark:"white",border:child===i?`2px solid #FFF9C4`:"2px solid rgba(255,255,255,0.15)"}}><span style={{fontSize:22}}>{c.av}</span><div><div style={{fontSize:13,fontWeight:900,fontFamily:"'Fredoka One',sans-serif"}}>{c.name}</div><div style={{fontSize:10,opacity:0.8}}>{c.grade}</div></div></button>))}
        <button style={{width:44,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:14,border:"2px dashed rgba(255,255,255,0.3)",background:"transparent",color:"rgba(255,255,255,0.5)",fontSize:20,cursor:"pointer"}}>+</button>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,padding:"10px 12px 8px"}}>
      {[{i:"⚡",v:`Nv.${cd.level}`,l:"Nível",c:C.purple},{i:"🔥",v:`${cd.streak}d`,l:"Streak",c:C.red},{i:"🎯",v:`${cd.accuracy}%`,l:"Acertos",c:C.green},{i:"⏱️",v:cd.time,l:"Tempo",c:C.blue}].map((s,i)=>(<div key={i} style={{background:`${s.c}18`,borderRadius:14,padding:"10px 4px",textAlign:"center",margin:3,border:`2px solid ${s.c}33`}}><div style={{fontSize:18}}>{s.i}</div><div style={{fontSize:14,fontWeight:900,color:s.c,fontFamily:"'Fredoka One',sans-serif"}}>{s.v}</div><div style={{fontSize:9,color:"#90CAF9",fontWeight:700}}>{s.l}</div></div>))}
    </div>
    <div style={{display:"flex",borderBottom:"2px solid rgba(255,255,255,0.08)"}}>
      {[["resumo","📊 Resumo"],["atividade","📋 Atividade"],["controles","⚙️ Controles"]].map(([k,l])=>(<button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"10px 0",border:"none",background:"transparent",cursor:"pointer",borderBottom:`3px solid ${tab===k?C.gold:"transparent"}`,color:tab===k?C.gold:"#4A7AB5",fontSize:11,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",transition:"all 0.2s"}}>{l}</button>))}
    </div>
    <div style={{padding:"12px 12px 80px"}}>
      {tab==="resumo"&&<>
        <div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginBottom:10}}>📅 Tempo de estudo (min)</div>
        <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"14px 10px",marginBottom:14,border:"1px solid rgba(255,255,255,0.08)"}}>
          <div style={{display:"flex",gap:4,alignItems:"flex-end",height:80}}>
            {cd.weekly.map((v,i)=>(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <div style={{fontSize:8,color:"#90CAF9",fontWeight:700,height:14}}>{v>0?v:""}</div>
              <div style={{width:"100%",flex:1,background:"rgba(255,255,255,0.06)",borderRadius:4,display:"flex",alignItems:"flex-end",overflow:"hidden"}}><div style={{width:"100%",height:`${maxB>0?(v/maxB)*100:0}%`,background:v>0?`linear-gradient(180deg,${C.blue},${C.blueDk})`:"transparent",borderRadius:4,transition:"height 0.6s"}}/></div>
              <div style={{fontSize:9,color:"#4A7AB5",fontWeight:700}}>{["D","S","T","Q","Q","S","S"][i]}</div>
            </div>))}
          </div>
        </div>
        <div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginBottom:10}}>📚 Progresso por matéria</div>
        {cd.subjects.map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:80,fontSize:12,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{s.l}</div><div style={{flex:1,height:10,background:"rgba(255,255,255,0.08)",borderRadius:10,overflow:"hidden"}}><div style={{height:"100%",width:`${s.p}%`,background:s.c,borderRadius:10}}/></div><div style={{fontSize:12,fontWeight:900,color:s.c,width:36}}>{s.p}%</div></div>))}
        <div style={{background:"rgba(46,204,113,0.12)",border:"1px solid rgba(46,204,113,0.3)",borderRadius:14,padding:"12px 14px",marginTop:4,display:"flex",gap:10}}><span style={{fontSize:22}}>💡</span><div><div style={{fontSize:13,fontWeight:900,color:C.green,fontFamily:"'Fredoka One',sans-serif"}}>Ótima semana!</div><div style={{fontSize:12,color:"#A7F3D0",fontWeight:600}}>{cd.name} estudou 5 dos últimos 7 dias!</div></div></div>
      </>}
      {tab==="atividade"&&<>
        <div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",marginBottom:10}}>📋 Sessões recentes</div>
        {[{date:"Hoje",dur:"55 min",q:32,acc:"89%",medal:"🥇"},{date:"Ontem",dur:"40 min",q:22,acc:"77%",medal:"🥈"},{date:"Sexta",dur:"1h 20min",q:48,acc:"91%",medal:"🥇"}].map((s,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.06)",borderRadius:16,padding:"14px",marginBottom:10,border:"1px solid rgba(255,255,255,0.08)"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:14,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{s.date}</div><span style={{fontSize:20}}>{s.medal}</span></div>
          <div style={{display:"flex",gap:14}}><span style={{fontSize:12,color:"#90CAF9",fontWeight:700}}>⏱️ {s.dur}</span><span style={{fontSize:12,color:"#90CAF9",fontWeight:700}}>📝 {s.q} questões</span><span style={{fontSize:12,color:C.green,fontWeight:800}}>✅ {s.acc}</span></div>
        </div>))}
      </>}
      {tab==="controles"&&<>
        <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"14px 16px",marginBottom:12,border:"1px solid rgba(255,255,255,0.08)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div><div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>⏱️ Limite diário</div><div style={{fontSize:11,color:"#90CAF9",fontWeight:600}}>Máximo por dia</div></div>
            <div style={{fontSize:22,fontWeight:900,color:C.gold,fontFamily:"'Fredoka One',sans-serif",background:`${C.gold}18`,padding:"4px 14px",borderRadius:12,border:`1px solid ${C.gold}44`}}>{limit} min</div>
          </div>
          <input type="range" min={10} max={120} step={5} value={limit} onChange={e=>setLimit(+e.target.value)} style={{width:"100%",accentColor:C.blue}}/>
        </div>
        <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"14px 16px",marginBottom:12,border:"1px solid rgba(255,255,255,0.08)"}}>
          {[{l:"Alertas de inatividade",s:"Aviso após 3 dias parado",v:notif,set:setNotif},{l:"Dobrar limite no fim de semana",s:`Máximo ${limit*2} min`,v:weekend,set:setWeekend}].map((t,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i===0?"1px solid rgba(255,255,255,0.06)":"none"}}>
            <div><div style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>{t.l}</div><div style={{fontSize:10,color:"#90CAF9",fontWeight:600}}>{t.s}</div></div>
            <button onClick={()=>t.set(v=>!v)} style={{width:46,height:26,borderRadius:13,border:"none",cursor:"pointer",background:t.v?C.blue:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",padding:3,justifyContent:t.v?"flex-end":"flex-start",transition:"all 0.25s"}}><div style={{width:20,height:20,borderRadius:"50%",background:"white",boxShadow:"0 1px 4px #00000033"}}/></button>
          </div>))}
        </div>
        <button style={{width:"100%",padding:13,borderRadius:14,border:"none",background:`linear-gradient(135deg,${C.blue},${C.blueDk})`,color:"white",fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer",marginBottom:8}}>📄 Exportar relatório</button>
        <button style={{width:"100%",padding:13,borderRadius:14,border:`2px solid rgba(255,255,255,0.15)`,background:"transparent",color:"#90CAF9",fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>📧 Enviar por e-mail</button>
      </>}
    </div>
  </div>);
}

/* ══════════ ROOT ══════════ */
const NAV=[{k:"map",i:"🗺️",l:"Mapa"},{k:"quiz",i:"⚔️",l:"Missão"},{k:"shop",i:"🏪",l:"Loja"},{k:"rank",i:"🏆",l:"Rank"},{k:"hero",i:"🦊",l:"Herói"}];

export default function App(){
  const [screen,setScreen]=useState("login");
  const [burst,setBurst]=useState(false);
  const {toasts,show}=useToast();
  const [returning,setReturning]=useState(false);
  const go=s=>{if(s==="login"){setReturning(true);}setScreen(s);};
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

        {isInApp&&<div style={{background:C.dark,padding:"10px 22px 5px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:11,color:"#90CAF9",fontFamily:"'Nunito',sans-serif",fontWeight:800}}>
          <span>9:41</span>
          <div style={{display:"flex",alignItems:"center",gap:6}}><Logo s={18}/><span style={{fontFamily:"'Fredoka One',sans-serif",color:C.gold,fontSize:14}}>Math<span style={{color:C.blue}}>Quest</span></span></div>
          <span>🔋 100%</span>
        </div>}

        {isInApp&&<div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px 8px",background:`linear-gradient(180deg,#0A1628,${C.card})`,borderBottom:`3px solid ${C.gold}`}}>
          <div style={{flex:1,height:13,background:"#050C1A",borderRadius:20,border:`2px solid rgba(30,144,255,0.2)`,overflow:"hidden",position:"relative"}}>
            <div style={{position:"absolute",inset:0,width:"63%",background:`linear-gradient(90deg,${C.green},#1B8A3A)`,borderRadius:20}}/>
            <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif",zIndex:1}}>Nv.5 · 1250 XP</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:4,background:"linear-gradient(135deg,#BF360C,#E64A19)",borderRadius:20,padding:"3px 10px",border:`2px solid ${C.orange}`}}><Coin sz={15}/><span style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>1250</span></div>
          <div style={{display:"flex",alignItems:"center",gap:4,background:"linear-gradient(135deg,#4527A0,#6A1B9A)",borderRadius:20,padding:"3px 10px",border:"2px solid #9C6FFF"}}><span style={{fontSize:14}}>💎</span><span style={{fontSize:13,fontWeight:900,color:"white",fontFamily:"'Fredoka One',sans-serif"}}>25</span></div>
          <button onClick={()=>go("parent")} style={{background:"rgba(30,144,255,0.2)",border:`2px solid ${C.blue}44`,borderRadius:10,padding:"3px 8px",fontSize:13,cursor:"pointer",color:"white",fontFamily:"'Fredoka One',sans-serif",fontWeight:900}}>👨‍👩‍👧</button>
        </div>}

        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {screen==="login" &&<LoginScreen onDone={go} returning={returning}/>}
          {screen==="map"   &&<MapScreen   go={go} toast={show}/>}
          {screen==="quiz"  &&<QuizScreen  go={go} toast={show} showBurst={()=>setBurst(true)}/>}
          {screen==="shop"  &&<ShopScreen  toast={show}/>}
          {screen==="rank"  &&<RankScreen/>}
          {screen==="hero"  &&<HeroScreen  toast={show}/>}
          {screen==="parent"&&<ParentScreen/>}
        </div>

        {isInApp&&screen!=="parent"&&<div style={{display:"flex",background:`linear-gradient(180deg,#050C1A,#0A1628)`,borderTop:`3px solid ${C.gold}`}}>
          {NAV.map(item=>{const active=screen===item.k;return(<button key={item.k} onClick={()=>go(item.k)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"8px 0 6px",border:"none",background:active?`linear-gradient(180deg,${C.gold},${C.goldDk})`:"transparent",borderTop:active?`3px solid #FFF9C4`:"3px solid transparent",cursor:"pointer",transition:"all 0.18s"}}><span style={{fontSize:22}}>{item.i}</span><span style={{fontSize:10,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",color:active?C.dark:"#4A7AB5"}}>{item.l}</span></button>);})}
        </div>}
        {screen==="parent"&&<button onClick={()=>go("map")} style={{padding:"12px 0",background:`linear-gradient(180deg,#050C1A,#0A1628)`,borderTop:`3px solid ${C.gold}`,border:"none",color:C.gold,fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',sans-serif",cursor:"pointer"}}>◀ Voltar ao app</button>}
      </div>
    </div>
  );
}
