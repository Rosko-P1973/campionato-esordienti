import { useState, useEffect } from "react";

// ── DATI REALI DA GOOGLE CALENDAR "Calcio Esordienti" ────────────────────────
const PARTITE_GCAL = [
  { id: "gc_0ekh3ufbg9k3h634io5b2mncoa", casaNome: "LE TORRI CASTELPLANIO", trasfertaNome: "CUPRAMONTANA G.IPPOLITI", data: "2026-02-07T16:00:00+01:00", ora: "16:00", campo: "Campo Sportivo Le Torri, Viale dello Sport 9, Castelplanio AN", giornata: 1, gcalLink: "https://calendar.google.com/calendar/event?eid=MGVraDN1ZmJnOWszaDYzNGlvNWIybW5jb2EgODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
  { id: "gc_5al9kq5oincbjbp2un2abtqgvl", casaNome: "CUPRAMONTANA G.IPPOLITI", trasfertaNome: "FABRIANO CERRETO", data: "2026-02-15T09:00:00+01:00", ora: "09:00", campo: "Campo Cupramontana G.Ippoliti, Via Giuseppe Uncini 13, Cupramontana AN", giornata: 2, gcalLink: "https://calendar.google.com/calendar/event?eid=NWFsOWtxNW9pbmNiamJwMnVuMmFidHFndmwgODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
  { id: "gc_53nai61ru0l49krl0kjmet307s", casaNome: "MOIE VALLESINA", trasfertaNome: "CUPRAMONTANA G.IPPOLITI", data: "2026-02-28T16:00:00+01:00", ora: "16:00", campo: "Campo Sportivo Grande Torino, Via Ascoli Piceno 18, Moie AN", giornata: 3, gcalLink: "https://calendar.google.com/calendar/event?eid=NTNuYWk2MXJ1MGw0OWtybDBram1ldDMwN3MgODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
  { id: "gc_2n8sm0res39vtggq95lm5pntr9", casaNome: "CUPRAMONTANA G.IPPOLITI", trasfertaNome: "JUNIOR JESINA S.R.L.", data: "2026-03-08T09:00:00+01:00", ora: "09:00", campo: "Campo Cupramontana G.Ippoliti, Via Giuseppe Uncini 13, Cupramontana AN", giornata: 4, gcalLink: "https://calendar.google.com/calendar/event?eid=Mm44c20wcmVzMzl2dGdncTk1bG01cG50cjkgODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
  { id: "gc_76kidcjgt0vlnohak6dd864vg0", casaNome: "AURORA CALCIO JESI", trasfertaNome: "CUPRAMONTANA G.IPPOLITI", data: "2026-03-15T15:00:00+01:00", ora: "15:00", campo: "Campo Sportivo Cardinaletti, Via del Burrone, Jesi AN", giornata: 5, gcalLink: "https://calendar.google.com/calendar/event?eid=NzZraWRjamd0MHZsbm9oYWs2ZGQ4NjR2ZzAgODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
  { id: "gc_0dc0i034k9glle9bmffspanm5t", casaNome: "CUPRAMONTANA G.IPPOLITI", trasfertaNome: "MONSERRA", data: "2026-03-22T09:00:00+01:00", ora: "09:00", campo: "Campo Cupramontana G.Ippoliti, Via Giuseppe Uncini 13, Cupramontana AN", giornata: 6, gcalLink: "https://calendar.google.com/calendar/event?eid=MGRjMGkwMzRrOWdsbGU5Ym1mZnNwYW5tNXQgODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
  { id: "gc_1aff27jc47i3els75j2pbd16q9", casaNome: "CUPRAMONTANA G.IPPOLITI", trasfertaNome: "LE TORRI CASTELPLANIO", data: "2026-03-29T09:00:00+02:00", ora: "09:00", campo: "Campo Cupramontana G.Ippoliti, Via Giuseppe Uncini 13, Cupramontana AN", giornata: 7, gcalLink: "https://calendar.google.com/calendar/event?eid=MWFmZjI3amM0N2kzZWxzNzVqMnBiZDE2cTkgODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
  { id: "gc_0pjorfc3n4iltv4dq88huc57fp", casaNome: "FABRIANO CERRETO", trasfertaNome: "CUPRAMONTANA G.IPPOLITI", data: "2026-04-11T15:00:00+02:00", ora: "15:00", campo: "Campo Sportivo Genga, 60040 Genga AN", giornata: 8, gcalLink: "https://calendar.google.com/calendar/event?eid=MHBqb3JmYzNuNGlsdHY0ZHE4OGh1YzU3ZnAgODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
  { id: "gc_5votevhabjb1kg7nmg40ts9lcq", casaNome: "CUPRAMONTANA G.IPPOLITI", trasfertaNome: "MOIE VALLESINA", data: "2026-05-03T09:00:00+02:00", ora: "09:00", campo: "Campo Cupramontana G.Ippoliti, Via Giuseppe Uncini 13, Cupramontana AN", giornata: 9, gcalLink: "https://calendar.google.com/calendar/event?eid=NXZvdGV2aGFiamIxa2c3bm1nNDB0czlsY3EgODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
  { id: "gc_6tdqq1ada9pa9omra4hk6caan9", casaNome: "JUNIOR JESINA S.R.L.", trasfertaNome: "CUPRAMONTANA G.IPPOLITI", data: "2026-05-09T18:30:00+02:00", ora: "18:30", campo: "Stadio Pirani ex Boario, Viale Don Minzoni, Jesi AN", giornata: 10, gcalLink: "https://calendar.google.com/calendar/event?eid=NnRkcXExYWRhOXBhOW9tcmE0aGs2Y2FhbjkgODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
  { id: "gc_2laaalivgt6gk53oml3kt6tgbo", casaNome: "CUPRAMONTANA G.IPPOLITI", trasfertaNome: "AURORA CALCIO JESI", data: "2026-05-17T09:00:00+02:00", ora: "09:00", campo: "Campo Cupramontana G.Ippoliti, Via Giuseppe Uncini 13, Cupramontana AN", giornata: 11, gcalLink: "https://calendar.google.com/calendar/event?eid=MmxhYWFsaXZndDZnazUzb21sM2t0NnRnYm8gODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
  { id: "gc_0u11vdjldkoird872kf6m21827", casaNome: "MONSERRA", trasfertaNome: "CUPRAMONTANA G.IPPOLITI", data: "2026-05-24T11:15:00+02:00", ora: "11:15", campo: "Campo Sportivo A. Novelli, Serra De' Conti AN", giornata: 12, gcalLink: "https://calendar.google.com/calendar/event?eid=MHUxMXZkamxka29pcmQ4NzJrZjZtMjE4MjcgODhmN2U0NzlmYWRlYjcwNDM3NzZkOGE1ODJjNjE2OWZkNjk3OWY3OGIwOGI4MjUzNTgzMTA5NDVjZGIyNTc3OEBn" },
];

const NOW = new Date();
const PARTITE_INIT = PARTITE_GCAL.map(p => ({
  ...p,
  stato: new Date(p.data) < NOW ? "completata" : "programmata",
  golCasa: undefined,
  golTrasferta: undefined,
}));

const SQUADRE_NOMI = [
  "CUPRAMONTANA G.IPPOLITI","LE TORRI CASTELPLANIO","FABRIANO CERRETO",
  "MOIE VALLESINA","JUNIOR JESINA S.R.L.","AURORA CALCIO JESI","MONSERRA",
];
const SQUADRA_COLORS = {
  "CUPRAMONTANA G.IPPOLITI": "#f5c518",
  "LE TORRI CASTELPLANIO":   "#e74c3c",
  "FABRIANO CERRETO":        "#3498db",
  "MOIE VALLESINA":          "#2ecc71",
  "JUNIOR JESINA S.R.L.":    "#9b59b6",
  "AURORA CALCIO JESI":      "#e67e22",
  "MONSERRA":                "#1abc9c",
};

const MESI = ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];
const GIORNI = ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];
const fmt = iso => { const d = new Date(iso); return `${GIORNI[d.getDay()]} ${d.getDate()} ${MESI[d.getMonth()]} ${d.getFullYear()}`; };
const fmtShort = iso => { const d = new Date(iso); return `${d.getDate()} ${MESI[d.getMonth()]}`; };

const STORAGE_KEY = "campionato_gcal_v1";

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("calendario");
  const [partite, setPartite] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : PARTITE_INIT; }
    catch { return PARTITE_INIT; }
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(partite)); }, [partite]);

  const updatePartita = (id, upd) => setPartite(prev => prev.map(p => p.id === id ? { ...p, ...upd } : p));

  const syncGcal = () => {
    if (!window.confirm("Risincronizzare dal Google Calendar? Le date e i campi verranno aggiornati. I risultati inseriti verranno mantenuti.")) return;
    setPartite(prev => {
      const map = Object.fromEntries(prev.map(p => [p.id, p]));
      return PARTITE_INIT.map(p => ({
        ...p,
        stato: map[p.id]?.stato ?? p.stato,
        golCasa: map[p.id]?.golCasa,
        golTrasferta: map[p.id]?.golTrasferta,
      }));
    });
  };

  const prossima = [...partite].filter(p => p.stato === "programmata").sort((a,b) => new Date(a.data)-new Date(b.data))[0];
  const completate = partite.filter(p => p.stato === "completata" && p.golCasa !== undefined).length;

  return (
    <div style={s.app}>
      <style>{css}</style>

      <header style={s.header}>
        <div style={s.headerRow}>
          <div style={s.headerLeft}>
            <span style={{ fontSize: 28 }}>⚽</span>
            <div>
              <div style={s.title}>CUPRAMONTANA G.IPPOLITI</div>
              <div style={s.subtitle}>Calcio Esordienti · Seconda Fase 2025/26</div>
            </div>
          </div>
          <button onClick={syncGcal} style={s.syncBtn} className="sync-btn" title="Risincronizza da Google Calendar">
            <span style={{ fontSize: 16 }}>📆</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5 }}>SYNC</span>
          </button>
        </div>
        {prossima && (
          <div style={s.nextMatch}>
            <span style={s.nextLabel}>⏭ PROSSIMA</span>
            <span style={s.nextText}>
              {prossima.casaNome === "CUPRAMONTANA G.IPPOLITI"
                ? `🏠 vs ${prossima.trasfertaNome}`
                : `✈️ vs ${prossima.casaNome}`}
              {" — "}{fmtShort(prossima.data)} ore {prossima.ora}
            </span>
          </div>
        )}
        <div style={s.headerStats}>
          <span style={s.statPill}>{partite.length} partite</span>
          <span style={s.statPill}>{completate} risultati</span>
          <span style={s.statPill}>{partite.filter(p=>p.stato==="programmata").length} da giocare</span>
        </div>
      </header>

      <nav style={s.nav}>
        {[["calendario","📅","Calendario"],["risultati","🏆","Risultati"],["classifica","📊","Classifica"]].map(([id,icon,lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{ ...s.navBtn, ...(tab===id ? s.navActive : {}) }}>
            <span>{icon}</span><span style={s.navLbl}>{lbl}</span>
          </button>
        ))}
      </nav>

      <main style={s.main}>
        {tab === "calendario"  && <Calendario partite={partite} update={updatePartita} />}
        {tab === "risultati"   && <Risultati  partite={partite} update={updatePartita} />}
        {tab === "classifica"  && <Classifica partite={partite} />}
      </main>
    </div>
  );
}

// ── CALENDARIO ────────────────────────────────────────────────────────────────
function Calendario({ partite, update }) {
  const [filtro, setFiltro] = useState("tutti");
  const FILTRI = [
    {id:"tutti",lbl:"Tutte"},{id:"casa",lbl:"🏠 Casa"},
    {id:"trasferta",lbl:"✈️ Trasferta"},{id:"programmata",lbl:"⏳ Da giocare"},{id:"completata",lbl:"✅ Giocate"},
  ];
  const filtered = {
    tutti: partite,
    casa: partite.filter(p => p.casaNome === "CUPRAMONTANA G.IPPOLITI"),
    trasferta: partite.filter(p => p.trasfertaNome === "CUPRAMONTANA G.IPPOLITI"),
    programmata: partite.filter(p => p.stato === "programmata"),
    completata: partite.filter(p => p.stato === "completata"),
  }[filtro] ?? partite;

  const sorted = [...filtered].sort((a,b) => new Date(a.data)-new Date(b.data));
  const grouped = {};
  sorted.forEach(p => { if (!grouped[p.giornata]) grouped[p.giornata] = []; grouped[p.giornata].push(p); });

  const statoC = { programmata:{lbl:"⏳ Programmata",col:"#f5c518"}, completata:{lbl:"✅ Completata",col:"#2ecc71"}, rinviata:{lbl:"🔁 Rinviata",col:"#e74c3c"} };
  const cycle  = p => update(p.id, { stato: {programmata:"completata",completata:"rinviata",rinviata:"programmata"}[p.stato] });

  return (
    <div style={s.view}>
      <div style={s.chipBar}>{FILTRI.map(f =>
        <button key={f.id} onClick={() => setFiltro(f.id)}
          style={{ ...s.chip, ...(filtro===f.id ? s.chipOn : {}) }}>{f.lbl}</button>
      )}</div>
      {Object.keys(grouped).length === 0
        ? <Empty text="Nessuna partita trovata." />
        : Object.entries(grouped).map(([g, ps]) => (
          <div key={g}>
            <div style={s.gHeader}><div style={s.gBadge}>{g}ª GIORNATA</div><div style={s.gLine}/></div>
            {ps.map(p => (
              <div key={p.id} style={s.card} className="card">
                <div style={s.cardMeta}>
                  <span style={s.cardDate}>{fmt(p.data)} · {p.ora}</span>
                  {p.campo && <span style={s.cardCampo}>📍 {p.campo.split(",")[0]}</span>}
                </div>
                <div style={s.teams}>
                  <Team nome={p.casaNome} align="left" />
                  <div style={s.teamsCenter}>
                    {p.stato==="completata" && p.golCasa!==undefined
                      ? <span style={s.score}>{p.golCasa}—{p.golTrasferta}</span>
                      : <span style={s.vs}>VS</span>}
                  </div>
                  <Team nome={p.trasfertaNome} align="right" />
                </div>
                <div style={s.cardFoot}>
                  <button onClick={() => cycle(p)} style={{ ...s.statoBtn, color: statoC[p.stato].col }}>{statoC[p.stato].lbl}</button>
                  <a href={p.gcalLink} target="_blank" rel="noopener noreferrer" style={s.gcalA}>📆 Cal</a>
                </div>
              </div>
            ))}
          </div>
        ))
      }
    </div>
  );
}

// ── RISULTATI ─────────────────────────────────────────────────────────────────
function Risultati({ partite, update }) {
  const [editId, setEditId] = useState(null);
  const [gc, setGc] = useState(""); const [gt, setGt] = useState("");

  const save = id => {
    const a=parseInt(gc), b=parseInt(gt);
    if(isNaN(a)||isNaN(b)||a<0||b<0) return;
    update(id, { golCasa:a, golTrasferta:b, stato:"completata" });
    setEditId(null);
  };

  const prossime = [...partite.filter(p => p.stato==="programmata")].sort((a,b)=>new Date(a.data)-new Date(b.data));
  const passate  = [...partite.filter(p => p.stato!=="programmata")].sort((a,b)=>new Date(b.data)-new Date(a.data));

  const Row = ({p}) => (
    <div style={s.card} className="card">
      <div style={s.cardMeta}>
        <span style={{color:"#f5c518",fontSize:11,fontWeight:700}}>{p.giornata}ª giornata</span>
        <span style={s.cardDate}>{fmtShort(p.data)} · {p.ora}</span>
      </div>
      <div style={s.teams}>
        <Team nome={p.casaNome} align="left"/>
        <div style={s.teamsCenter}>
          {p.stato==="completata" && p.golCasa!==undefined ? (
            <span style={s.score}>{p.golCasa}—{p.golTrasferta}</span>
          ) : editId===p.id ? (
            <div style={s.scoreForm}>
              <input value={gc} onChange={e=>setGc(e.target.value)} style={s.sIn} type="number" min="0" max="99"/>
              <span style={{color:"#4a6a90",fontWeight:900}}>—</span>
              <input value={gt} onChange={e=>setGt(e.target.value)} style={s.sIn} type="number" min="0" max="99"/>
              <button onClick={()=>save(p.id)} style={s.sOk}>✓</button>
              <button onClick={()=>setEditId(null)} style={s.sX}>✕</button>
            </div>
          ) : (
            <button onClick={()=>{setEditId(p.id);setGc("");setGt("");}} style={s.insBtn}>
              {p.stato==="rinviata"?"🔁 Rinviata":"Inserisci"}
            </button>
          )}
        </div>
        <Team nome={p.trasfertaNome} align="right"/>
      </div>
    </div>
  );

  return (
    <div style={s.view}>
      <div style={s.secTitle}>📅 Prossime partite</div>
      {prossime.length===0 ? <div style={s.dim}>Nessuna partita in programma.</div> : prossime.map(p=><Row key={p.id} p={p}/>)}
      <div style={{...s.secTitle,marginTop:26}}>✅ Partite giocate</div>
      {passate.length===0 ? <div style={s.dim}>Nessuna partita ancora completata.</div> : passate.map(p=><Row key={p.id} p={p}/>)}
    </div>
  );
}

// ── CLASSIFICA ────────────────────────────────────────────────────────────────
function Classifica({ partite }) {
  const completate = partite.filter(p => p.stato==="completata" && p.golCasa!==undefined);
  const stats = Object.fromEntries(SQUADRE_NOMI.map(n => [n,{nome:n,g:0,v:0,n:0,p:0,gf:0,gs:0,pt:0}]));

  completate.forEach(({casaNome,trasfertaNome,golCasa,golTrasferta}) => {
    if(!stats[casaNome]||!stats[trasfertaNome]) return;
    stats[casaNome].g++; stats[trasfertaNome].g++;
    stats[casaNome].gf+=golCasa; stats[casaNome].gs+=golTrasferta;
    stats[trasfertaNome].gf+=golTrasferta; stats[trasfertaNome].gs+=golCasa;
    if(golCasa>golTrasferta){ stats[casaNome].v++; stats[casaNome].pt+=3; stats[trasfertaNome].p++; }
    else if(golCasa<golTrasferta){ stats[trasfertaNome].v++; stats[trasfertaNome].pt+=3; stats[casaNome].p++; }
    else{ stats[casaNome].n++; stats[casaNome].pt++; stats[trasfertaNome].n++; stats[trasfertaNome].pt++; }
  });

  const clas = Object.values(stats).map(s=>({...s,diff:s.gf-s.gs})).sort((a,b)=>b.pt-a.pt||b.diff-a.diff||b.gf-a.gf);
  const cupraIdx = clas.findIndex(s=>s.nome==="CUPRAMONTANA G.IPPOLITI");
  const medals = ["🥇","🥈","🥉"];

  if(completate.length===0) return (
    <div style={{...s.view,textAlign:"center",paddingTop:50}}>
      <div style={{fontSize:48,marginBottom:12}}>📊</div>
      <div style={{fontSize:17,fontWeight:700}}>Nessun risultato ancora</div>
      <div style={{color:"#4a6a90",fontSize:14,marginTop:6}}>Inserisci i risultati dalla scheda 🏆</div>
    </div>
  );

  return (
    <div style={s.view}>
      {cupraIdx>=0 && (
        <div style={s.banner}>
          <span style={{fontSize:28}}>{medals[cupraIdx]??`#${cupraIdx+1}`}</span>
          <div>
            <div style={{color:"#f5c518",fontWeight:900,fontSize:15}}>CUPRAMONTANA G.IPPOLITI</div>
            <div style={{color:"#7a9ab8",fontSize:12,marginTop:2}}>
              {cupraIdx+1}° posto · {clas[cupraIdx].pt} punti · {clas[cupraIdx].v}V {clas[cupraIdx].n}N {clas[cupraIdx].p}P
            </div>
          </div>
        </div>
      )}
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr>{["#","Squadra","G","V","N","P","GF","GS","Diff","Pt"].map(h=><th key={h} style={s.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {clas.map((sq,i) => {
              const isc = sq.nome==="CUPRAMONTANA G.IPPOLITI";
              return (
                <tr key={sq.nome} style={isc?{background:"rgba(245,197,24,0.07)"}:{}} className="tr-row">
                  <td style={s.td}>{medals[i]??i+1}</td>
                  <td style={{...s.td,textAlign:"left",paddingLeft:10}}>
                    <div style={{display:"flex",alignItems:"center",gap:7}}>
                      <div style={{width:10,height:10,borderRadius:"50%",background:SQUADRA_COLORS[sq.nome]??"#888",flexShrink:0}}/>
                      <span style={{fontWeight:isc?900:600,color:isc?"#f5c518":"#fff",fontSize:12}}>{sq.nome}</span>
                    </div>
                  </td>
                  <td style={s.td}>{sq.g}</td>
                  <td style={{...s.td,color:"#2ecc71"}}>{sq.v}</td>
                  <td style={s.td}>{sq.n}</td>
                  <td style={{...s.td,color:"#e74c3c"}}>{sq.p}</td>
                  <td style={s.td}>{sq.gf}</td>
                  <td style={s.td}>{sq.gs}</td>
                  <td style={{...s.td,color:sq.diff>0?"#2ecc71":sq.diff<0?"#e74c3c":"#fff"}}>{sq.diff>0?`+${sq.diff}`:sq.diff}</td>
                  <td style={{...s.td,color:"#f5c518",fontWeight:900,fontSize:15}}>{sq.pt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── SHARED ────────────────────────────────────────────────────────────────────
function Team({ nome, align }) {
  const isc = nome==="CUPRAMONTANA G.IPPOLITI";
  return (
    <div style={{...s.teamSide,...(align==="right"?{justifyContent:"flex-end"}:{})}}>
      {align==="left" && <div style={{width:11,height:11,borderRadius:"50%",background:SQUADRA_COLORS[nome]??"#888",flexShrink:0}}/>}
      <span style={{fontWeight:isc?900:700,fontSize:13,color:isc?"#f5c518":"#fff",flex:1,textAlign:align,lineHeight:1.3}}>{nome}</span>
      {align==="right" && <div style={{width:11,height:11,borderRadius:"50%",background:SQUADRA_COLORS[nome]??"#888",flexShrink:0}}/>}
    </div>
  );
}
function Empty({text}) {
  return <div style={{textAlign:"center",paddingTop:50}}><div style={{fontSize:36,marginBottom:10}}>📅</div><div style={{color:"#7a9ab8",fontSize:15}}>{text}</div></div>;
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const C = { bg:"#071525", sur:"#0d2035", sur2:"#0a2744", bord:"#1a3a5a", gold:"#f5c518" };
const s = {
  app:{ minHeight:"100vh", background:C.bg, color:"#fff", fontFamily:"'Barlow','Segoe UI',sans-serif", maxWidth:720, margin:"0 auto", display:"flex", flexDirection:"column" },
  header:{ background:`linear-gradient(150deg,#0d2a4a,#071525)`, borderBottom:`3px solid ${C.gold}`, padding:"14px 18px 10px", position:"sticky", top:0, zIndex:100 },
  headerRow:{ display:"flex", justifyContent:"space-between", alignItems:"center" },
  headerLeft:{ display:"flex", alignItems:"center", gap:12 },
  title:{ fontSize:17, fontWeight:900, letterSpacing:0.3 },
  subtitle:{ color:C.gold, fontSize:10, fontWeight:700, letterSpacing:0.8, textTransform:"uppercase", marginTop:2 },
  syncBtn:{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, background:"#132a44", border:`1px solid ${C.bord}`, borderRadius:10, padding:"7px 10px", cursor:"pointer", color:"#7a9ab8", fontFamily:"inherit" },
  nextMatch:{ marginTop:10, background:"rgba(245,197,24,0.09)", border:"1px solid rgba(245,197,24,0.2)", borderRadius:8, padding:"7px 12px", display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" },
  nextLabel:{ color:C.gold, fontSize:10, fontWeight:900, letterSpacing:1 },
  nextText:{ color:"#ccd5e0", fontSize:12, fontWeight:600 },
  headerStats:{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" },
  statPill:{ background:"rgba(255,255,255,0.05)", border:`1px solid ${C.bord}`, borderRadius:20, padding:"3px 10px", fontSize:11, color:"#7a9ab8", fontWeight:600 },
  nav:{ display:"flex", background:C.sur2, borderBottom:`1px solid ${C.bord}`, position:"sticky", top:115, zIndex:99 },
  navBtn:{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"9px 4px", border:"none", background:"transparent", color:"#3a5a7a", cursor:"pointer", borderBottom:"3px solid transparent", fontSize:17, transition:"all 0.2s", fontFamily:"inherit" },
  navActive:{ color:C.gold, borderBottom:`3px solid ${C.gold}` },
  navLbl:{ fontSize:11, fontWeight:700 },
  main:{ flex:1 },
  view:{ padding:"14px 16px 40px" },
  chipBar:{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 },
  chip:{ padding:"5px 13px", borderRadius:20, border:`1.5px solid ${C.bord}`, background:C.sur, color:"#7a9ab8", cursor:"pointer", fontWeight:700, fontSize:12, fontFamily:"inherit", transition:"all 0.15s" },
  chipOn:{ background:C.gold, borderColor:C.gold, color:"#0a2744" },
  gHeader:{ display:"flex", alignItems:"center", gap:10, margin:"18px 0 8px" },
  gBadge:{ background:C.gold, color:"#0a2744", borderRadius:6, padding:"3px 10px", fontSize:10, fontWeight:900, letterSpacing:1, whiteSpace:"nowrap" },
  gLine:{ flex:1, height:1, background:C.bord },
  card:{ background:C.sur, borderRadius:14, padding:"12px 14px", marginBottom:8, border:`1px solid ${C.bord}`, transition:"border-color 0.2s" },
  cardMeta:{ display:"flex", justifyContent:"space-between", marginBottom:8, flexWrap:"wrap", gap:3 },
  cardDate:{ color:"#7a9ab8", fontSize:12, fontWeight:600 },
  cardCampo:{ color:"#3a5a7a", fontSize:11 },
  teams:{ display:"flex", alignItems:"center", gap:6, marginBottom:8 },
  teamSide:{ flex:1, display:"flex", alignItems:"center", gap:7 },
  teamsCenter:{ padding:"0 6px", textAlign:"center", flexShrink:0 },
  score:{ color:C.gold, fontSize:22, fontWeight:900, letterSpacing:1 },
  vs:{ color:"#3a5a7a", fontSize:13, fontWeight:900 },
  cardFoot:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:2 },
  statoBtn:{ background:"transparent", border:"none", cursor:"pointer", fontSize:12, fontWeight:700, padding:"2px 0", fontFamily:"inherit" },
  gcalA:{ color:"#3a5a7a", fontSize:11, textDecoration:"none" },
  secTitle:{ color:C.gold, fontSize:14, fontWeight:800, marginBottom:10, letterSpacing:0.5 },
  dim:{ color:"#3a5a7a", fontSize:13, marginBottom:12 },
  scoreForm:{ display:"flex", alignItems:"center", gap:4 },
  sIn:{ width:36, textAlign:"center", background:C.bg, border:`1.5px solid ${C.bord}`, borderRadius:7, color:"#fff", fontSize:15, fontWeight:700, padding:"5px 2px", outline:"none", fontFamily:"inherit" },
  sOk:{ background:C.gold, border:"none", borderRadius:7, width:27, height:27, color:"#0a2744", fontWeight:900, cursor:"pointer", fontSize:13, fontFamily:"inherit" },
  sX:{ background:"#1a3a5a", border:"none", borderRadius:7, width:27, height:27, color:"#7a9ab8", fontWeight:900, cursor:"pointer", fontSize:12, fontFamily:"inherit" },
  insBtn:{ background:C.sur2, border:`1px solid ${C.bord}`, borderRadius:7, padding:"5px 8px", color:"#7a9ab8", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" },
  banner:{ background:"rgba(245,197,24,0.1)", border:"1px solid rgba(245,197,24,0.3)", borderRadius:12, padding:"14px 16px", marginBottom:16, display:"flex", alignItems:"center", gap:14 },
  tableWrap:{ overflowX:"auto", borderRadius:12, border:`1px solid ${C.bord}` },
  table:{ width:"100%", borderCollapse:"collapse", fontSize:12 },
  th:{ background:"#0a2744", color:"#7a9ab8", padding:"9px 5px", textAlign:"center", fontSize:11, fontWeight:700, letterSpacing:0.5, borderBottom:`1px solid ${C.bord}`, whiteSpace:"nowrap" },
  td:{ padding:"9px 5px", textAlign:"center", borderBottom:"1px solid #0f2a40", verticalAlign:"middle", fontWeight:600 },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#071525}
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-track{background:#0a2744}
  ::-webkit-scrollbar-thumb{background:#1a3a5a;border-radius:3px}
  .card:hover{border-color:#2a5a7a!important}
  .tr-row:hover{background:rgba(255,255,255,0.025)}
  .sync-btn:hover{background:#1a3a5a!important;color:#f5c518!important}
  input[type=number]::-webkit-inner-spin-button{opacity:0.4}
  input:focus{border-color:#f5c518!important}
  a:hover{color:#7a9ab8!important}
`;
