"use client";
import { useState, useEffect, useRef } from "react";

const IMG = "https://image.tmdb.org/t/p";

const MOVIES = [
  {id:1,title:"Dune: Part Two",year:2024,type:"movie",rating:8.6,runtime:"2h 46m",genres:["Sci-Fi","Adventure","Drama"],
   summary:"Paul Atreides unites with the Fremen on the desert world of Arrakis to wage war against the Harkonnens, fulfilling a prophecy that would change the galaxy forever.",
   poster:`${IMG}/w500/8b8R8l88Qje9dn9OE8PY05Nxsmd.jpg`,
   backdrop:`${IMG}/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg`,
   trailerKey:"Way9Dexny3w",trending:true,isNew:true,rank:1,score:98,platforms:["netflix","prime","apple"],free:false},
  {id:2,title:"Oppenheimer",year:2023,type:"movie",rating:8.9,runtime:"3h 0m",genres:["Drama","History","Thriller"],
   summary:"The story of J. Robert Oppenheimer's role in the development of the atomic bomb during WWII, told through the lens of his later security hearings.",
   poster:`${IMG}/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
   backdrop:`${IMG}/w1280/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg`,
   trailerKey:"uYPbbksJxIg",trending:true,isNew:false,rank:2,score:96,platforms:["prime","peacock"],free:false},
  {id:3,title:"The Bear",year:2024,type:"tv",rating:8.7,runtime:"30m · S2",genres:["Drama","Comedy"],
   summary:"A young chef from the fine dining world comes home to run his family's sandwich shop in Chicago, confronting old wounds and igniting a culinary transformation.",
   poster:`${IMG}/w500/y0YlVgUaplwjzZmEr2RvPmwxJM7.jpg`,
   backdrop:`${IMG}/w1280/y04nrUygDOJ08PRGYFKBdVKB7Pf.jpg`,
   trailerKey:"",trending:true,isNew:false,rank:3,score:95,platforms:["hulu","disney"],free:false},
  {id:4,title:"Poor Things",year:2023,type:"movie",rating:8.2,runtime:"2h 21m",genres:["Fantasy","Comedy","Drama"],
   summary:"The incredible tale of Bella Baxter, a young woman brought back to life by an eccentric scientist who flees to explore the world unburdened by the prejudices of her time.",
   poster:`${IMG}/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg`,
   backdrop:`${IMG}/w1280/feSiISwgEpVzR0fgV8aV80yWFXA.jpg`,
   trailerKey:"RlbR5N6veqw",trending:false,isNew:false,rank:4,score:91,platforms:["hulu","prime"],free:false},
  {id:5,title:"Shogun",year:2024,type:"tv",rating:9.0,runtime:"60m · S1",genres:["Drama","History","Action"],
   summary:"In 1600s feudal Japan, a shipwrecked English sailor aligns with a powerful warlord as they navigate the treacherous political landscape of the civil war era.",
   poster:`${IMG}/w500/7O4iVfOMQGqg2BX0u9wmownB6q9.jpg`,
   backdrop:`${IMG}/w1280/3Wf0qWkpYpUKBKLZQTfJKfHbcc6.jpg`,
   trailerKey:"",trending:true,isNew:false,rank:5,score:99,platforms:["hulu","disney"],free:false},
  {id:6,title:"Civil War",year:2024,type:"movie",rating:7.5,runtime:"1h 49m",genres:["Action","Thriller","Drama"],
   summary:"A team of journalists race across a near-future America tearing itself apart in a second civil war, risking everything to document the conflict.",
   poster:`${IMG}/w500/sh7Rg8Er1AVdRRINPjvKWZsAFwq.jpg`,
   backdrop:`${IMG}/w1280/3R4MnZ3OrlYHEW8oCmR5LV2WiFD.jpg`,
   trailerKey:"",trending:true,isNew:true,rank:6,score:87,platforms:["prime"],free:false},
  {id:7,title:"Inside Out 2",year:2024,type:"movie",rating:7.8,runtime:"1h 40m",genres:["Animation","Family","Comedy"],
   summary:"Riley enters adolescence and her mind gets an unexpected remodel, with new emotions joining the original five.",
   poster:`${IMG}/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg`,
   backdrop:`${IMG}/w1280/3WardJyAvYsR5xWMtbz4U3uxL3z.jpg`,
   trailerKey:"",trending:false,isNew:true,rank:7,score:85,platforms:["disney"],free:false},
  {id:8,title:"Furiosa: A Mad Max Saga",year:2024,type:"movie",rating:7.8,runtime:"2h 28m",genres:["Action","Sci-Fi"],
   summary:"The origin story of the legendary warrior Furiosa before she crosses paths with the Mad Max gang and begins her long road back home.",
   poster:`${IMG}/w500/iADOJ8Zymht2JPMoy3R7xceiES7.jpg`,
   backdrop:`${IMG}/w1280/wOzKbeBdmWY7ZjvLrnW7d6bH9rO.jpg`,
   trailerKey:"",trending:true,isNew:true,rank:8,score:82,platforms:["prime","hbo"],free:false},
  {id:9,title:"House of the Dragon",year:2024,type:"tv",rating:8.4,runtime:"60m · S2",genres:["Fantasy","Drama","Action"],
   summary:"The Targaryen civil war enters its bloodiest phase as both sides marshal their forces and the fate of the Seven Kingdoms hangs in the balance.",
   poster:`${IMG}/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg`,
   backdrop:`${IMG}/w1280/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg`,
   trailerKey:"",trending:true,isNew:true,rank:9,score:90,platforms:["hbo"],free:false},
  {id:10,title:"Pluto",year:2023,type:"tv",rating:8.5,runtime:"60m · S1",genres:["Animation","Sci-Fi","Mystery"],
   summary:"Based on Naoki Urasawa's manga, a robot investigator hunts the entity destroying the world's most powerful robots.",
   poster:`${IMG}/w500/9SXjbnfjA9CKKlGta2OB3Mzh1Mb.jpg`,
   backdrop:`${IMG}/w1280/iyJlcWb50LdiUiknyXudPHtX5Ay.jpg`,
   trailerKey:"",trending:false,isNew:true,rank:10,score:88,platforms:["netflix"],free:false},
  {id:11,title:"Free Solo",year:2018,type:"movie",rating:7.7,runtime:"1h 40m",genres:["Documentary","Adventure"],
   summary:"Alex Honnold attempts to become the first person to free solo climb El Capitan's 3,000-foot wall without a rope, in a film that captures one of the greatest athletic feats in history.",
   poster:`${IMG}/w500/y8oQfMSWNQ8qBhJ1MURtxbiWznT.jpg`,
   backdrop:`${IMG}/w1280/wjOH8VtfFnZAQy2u9V8jQVQQ8wF.jpg`,
   trailerKey:"",trending:false,isNew:false,rank:11,score:72,platforms:["tubi"],free:true},
  {id:12,title:"The Grand Budapest Hotel",year:2014,type:"movie",rating:8.1,runtime:"1h 39m",genres:["Comedy","Drama"],
   summary:"The adventures of a legendary concierge at a famous European hotel between the wars, and the lobby boy who becomes his trusted friend, told through a story within a story.",
   poster:`${IMG}/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg`,
   backdrop:`${IMG}/w1280/nXJ41fst1KOlAlu6JuY1OL0Qe2g.jpg`,
   trailerKey:"",trending:false,isNew:false,rank:12,score:68,platforms:["freevee"],free:true},
];

const PLATFORMS = {
  netflix: {name:"Netflix",  short:"Netflix",  color:"#E50914", bg:"#1a0000", label:"N",  url:"https://netflix.com"},
  prime:   {name:"Prime Video",short:"Prime",  color:"#00A8E1", bg:"#001520", label:"P",  url:"https://primevideo.com"},
  disney:  {name:"Disney+",   short:"Disney+", color:"#1a78ff", bg:"#00001a", label:"D+", url:"https://disneyplus.com"},
  hulu:    {name:"Hulu",      short:"Hulu",    color:"#1CE783", bg:"#001a0a", label:"H",  url:"https://hulu.com"},
  apple:   {name:"Apple TV+", short:"Apple TV",color:"#ffffff", bg:"#111111", label:"tv", url:"https://tv.apple.com"},
  hbo:     {name:"Max",       short:"Max",     color:"#5822FF", bg:"#0d0023", label:"M",  url:"https://max.com"},
  peacock: {name:"Peacock",   short:"Peacock", color:"#FF6B35", bg:"#1a0800", label:"P",  url:"https://peacocktv.com"},
  freevee: {name:"Amazon Freevee",short:"Freevee",color:"#1CE783",bg:"#001a0a",label:"F", url:"https://amazon.com/freevee", isFree:true},
  tubi:    {name:"Tubi",      short:"Tubi",    color:"#FA004F", bg:"#1a0010", label:"T",  url:"https://tubitv.com",         isFree:true},
};

// ─── TRAILER MODAL ──────────────────────────────────────────────────────────
function TrailerModal({ trailerKey, title, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{position:"fixed",inset:0,zIndex:999,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}
    >
      <div style={{width:"100%",maxWidth:"900px",borderRadius:"12px",overflow:"hidden",background:"#0d0d0d",border:"1px solid rgba(255,255,255,0.1)",position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:"12px",right:"12px",zIndex:10,width:"32px",height:"32px",borderRadius:"50%",background:"rgba(0,0,0,0.8)",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.7)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px"}}>✕</button>
        <div style={{position:"relative",paddingBottom:"56.25%",height:0}}>
          <iframe style={{position:"absolute",inset:0,width:"100%",height:"100%",border:"none"}} src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`} title={`${title} Trailer`} allow="autoplay; encrypted-media" allowFullScreen />
        </div>
        <div style={{padding:"8px 16px",textAlign:"center",fontSize:"11px",color:"rgba(255,255,255,0.2)",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
          Official trailer only · CineScope does not stream full content
        </div>
      </div>
    </div>
  );
}

// ─── MOVIE CARD ─────────────────────────────────────────────────────────────
function MovieCard({ movie, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(movie)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{flexShrink:0,width:"170px",cursor:"pointer",userSelect:"none"}}
    >
      <div style={{position:"relative",width:"170px",height:"255px",borderRadius:"10px",overflow:"hidden",border:"1px solid rgba(255,255,255,0.07)",transition:"border-color 0.2s, transform 0.25s",borderColor:hovered?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.07)",transform:hovered?"translateY(-4px)":"translateY(0)",boxShadow:hovered?"0 16px 32px rgba(0,0,0,0.5)":"0 4px 12px rgba(0,0,0,0.25)"}}>
        <img src={movie.poster} alt={movie.title} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s ease",transform:hovered?"scale(1.05)":"scale(1)"}} loading="lazy" />
        {/* bottom fade */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 45%, transparent 70%)"}} />
        {/* hover play */}
        {hovered && (
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.15)"}}>
            <div style={{width:"46px",height:"46px",borderRadius:"50%",background:"rgba(34,197,94,0.9)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(34,197,94,0.5)"}}>
              <span style={{color:"#fff",fontSize:"14px",marginLeft:"2px"}}>▶</span>
            </div>
          </div>
        )}
        {/* rating badge */}
        <div style={{position:"absolute",top:"8px",left:"8px",background:"rgba(0,0,0,0.65)",backdropFilter:"blur(6px)",borderRadius:"5px",padding:"3px 7px",fontSize:"11px",fontWeight:600,color:movie.free?"#1CE783":"rgba(255,255,255,0.9)"}}>
          {movie.free ? "FREE" : `⭐ ${movie.rating}`}
        </div>
        {/* bottom info */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"10px"}}>
          <div style={{fontSize:"13px",fontWeight:700,color:"#fff",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",marginBottom:"2px"}}>{movie.title}</div>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,0.45)"}}>{movie.year} · {movie.type==="tv"?"TV":"Film"}</div>
        </div>
      </div>
    </div>
  );
}

// ─── PLATFORM ROW (detail page) ─────────────────────────────────────────────
function PlatformRow({ platforms }) {
  const [selected, setSelected] = useState(platforms[0]);
  const p = PLATFORMS[selected];
  if (!p) return null;

  return (
    <div>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"16px"}}>
        {platforms.map((pk) => {
          const pl = PLATFORMS[pk];
          if (!pl) return null;
          const active = selected === pk;
          return (
            <button
              key={pk}
              onClick={() => setSelected(pk)}
              style={{
                display:"flex",alignItems:"center",gap:"8px",
                padding:"8px 14px",borderRadius:"8px",
                background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                border: active ? `1px solid ${pl.color}` : "1px solid rgba(255,255,255,0.08)",
                color: active ? "#fff" : "rgba(255,255,255,0.4)",
                cursor:"pointer",fontSize:"13px",fontWeight:600,
                boxShadow: active ? `0 0 12px ${pl.color}25` : "none",
                transition:"all 0.15s",
              }}
            >
              <span style={{width:"20px",height:"20px",borderRadius:"4px",background:pl.bg,border:`1px solid ${pl.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9px",fontWeight:800,color:pl.color,flexShrink:0}}>
                {pl.label}
              </span>
              {pl.short}
              {pl.isFree && (
                <span style={{fontSize:"9px",fontWeight:700,color:"#1CE783",background:"rgba(28,231,131,0.1)",padding:"1px 5px",borderRadius:"3px"}}>
                  FREE
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{padding:"16px",borderRadius:"10px",background:"rgba(255,255,255,0.03)",border:`1px solid ${p.color}20`}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}>
          <div style={{width:"36px",height:"36px",borderRadius:"8px",background:p.bg,border:`1px solid ${p.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:800,color:p.color}}>
            {p.label}
          </div>
          <div>
            <div style={{fontWeight:700,color:"#fff",fontSize:"14px"}}>{p.name}</div>
            <div style={{fontSize:"11px",color:p.isFree?"#1CE783":"rgba(255,255,255,0.35)"}}>
              {p.isFree ? "Free · No subscription needed" : "Subscription required"}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            if (confirm("Open " + p.name + " in a new tab?")) {
              window.open(p.url, "_blank", "noopener,noreferrer");
            }
          }}
          style={{
            display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",
            width:"100%",padding:"10px",borderRadius:"8px",
            background:p.color,color:"#fff",fontWeight:700,fontSize:"13px",
            border:"none",cursor:"pointer",transition:"opacity 0.15s",
          }}
        >
          Watch on {p.short}
        </button>
      </div>
    </div>
  );
}

// ─── DETAIL PAGE ─────────────────────────────────────────────────────────────
function DetailPage({ movie, onBack, onSelect }) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);
  const [tab, setTab] = useState("watch");

  const similar = MOVIES
    .filter((m) => m.id !== movie.id && (m.type === movie.type || m.genres.some((g) => movie.genres.includes(g))))
    .slice(0, 8);

  const tabs = [
    {key:"watch", label:"Where to watch"},
    {key:"synopsis", label:"Synopsis"},
    {key:"similar", label:"Similar titles"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0d0d0f"}}>
      {trailerOpen && movie.trailerKey && (
        <TrailerModal trailerKey={movie.trailerKey} title={movie.title} onClose={() => setTrailerOpen(false)} />
      )}

      {/* BACKDROP with integrated play button */}
      <div style={{position:"relative",height:"560px",overflow:"hidden"}}>
        <img
          src={movie.backdrop || movie.poster}
          alt=""
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}
        />
        {/* cinematic gradient fades */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(13,13,15,0.1) 0%, rgba(13,13,15,0.05) 25%, rgba(13,13,15,0.55) 65%, rgba(13,13,15,1) 100%)"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, rgba(13,13,15,0.85) 0%, rgba(13,13,15,0.35) 45%, transparent 75%)"}} />

        {/* back */}
        <div style={{position:"absolute",top:"84px",left:"32px",zIndex:5}}>
          <button
            onClick={onBack}
            style={{display:"flex",alignItems:"center",gap:"6px",padding:"6px 14px",borderRadius:"6px",background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.7)",cursor:"pointer",fontSize:"13px",fontWeight:500,transition:"all 0.15s",backdropFilter:"blur(8px)"}}
            onMouseEnter={(e)=>{e.currentTarget.style.background="rgba(0,0,0,0.6)";e.currentTarget.style.color="#fff";}}
            onMouseLeave={(e)=>{e.currentTarget.style.background="rgba(0,0,0,0.4)";e.currentTarget.style.color="rgba(255,255,255,0.7)";}}
          >
            ← Back
          </button>
        </div>

        {/* PLAY BUTTON — centered on the backdrop image itself, gradiented into it */}
        <button
          onClick={() => movie.trailerKey && setTrailerOpen(true)}
          disabled={!movie.trailerKey}
          style={{
            position:"absolute",top:"42%",left:"50%",
            transform:"translate(-50%,-50%)",
            width:"84px",height:"84px",borderRadius:"50%",
            background: movie.trailerKey
              ? "radial-gradient(circle at 35% 30%, #4ade80, #16a34a 70%)"
              : "rgba(255,255,255,0.08)",
            border: movie.trailerKey ? "3px solid rgba(255,255,255,0.85)" : "2px solid rgba(255,255,255,0.15)",
            display:"flex",alignItems:"center",justifyContent:"center",
            cursor: movie.trailerKey ? "pointer" : "not-allowed",
            boxShadow: movie.trailerKey ? "0 0 0 12px rgba(255,255,255,0.05), 0 12px 40px rgba(34,197,94,0.5)" : "none",
            transition:"transform 0.2s, box-shadow 0.2s",
            zIndex:4,
          }}
          onMouseEnter={(e)=>{ if(movie.trailerKey){ e.currentTarget.style.transform="translate(-50%,-50%) scale(1.08)"; e.currentTarget.style.boxShadow="0 0 0 14px rgba(255,255,255,0.08), 0 16px 50px rgba(34,197,94,0.65)"; }}}
          onMouseLeave={(e)=>{ if(movie.trailerKey){ e.currentTarget.style.transform="translate(-50%,-50%) scale(1)"; e.currentTarget.style.boxShadow="0 0 0 12px rgba(255,255,255,0.05), 0 12px 40px rgba(34,197,94,0.5)"; }}}
        >
          <span style={{color:"#fff",fontSize:"26px",marginLeft:"4px",filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.4))"}}>▶</span>
        </button>
        {!movie.trailerKey && (
          <div style={{position:"absolute",top:"calc(42% + 56px)",left:"50%",transform:"translateX(-50%)",fontSize:"11px",color:"rgba(255,255,255,0.35)",zIndex:4,whiteSpace:"nowrap"}}>
            No trailer available
          </div>
        )}

        {/* title block bottom-left */}
        <div style={{position:"absolute",bottom:"32px",left:"32px",right:"40%",maxWidth:"700px",zIndex:5}}>
          <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"10px"}}>
            {movie.genres.map((g) => (
              <span key={g} style={{padding:"2px 10px",borderRadius:"4px",fontSize:"11px",fontWeight:600,background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.12)",backdropFilter:"blur(8px)"}}>{g}</span>
            ))}
          </div>
          <h1 style={{fontSize:"clamp(2rem,4vw,3.2rem)",fontWeight:900,color:"#fff",letterSpacing:"-0.02em",lineHeight:1.1,marginBottom:"10px",textTransform:"uppercase",textShadow:"0 4px 24px rgba(0,0,0,0.6)"}}>
            {movie.title} <span style={{fontSize:"0.45em",fontWeight:400,color:"rgba(255,255,255,0.5)",textTransform:"none"}}>({movie.year})</span>
          </h1>
          <div style={{display:"flex",alignItems:"center",gap:"12px",fontSize:"13px",color:"rgba(255,255,255,0.6)",flexWrap:"wrap"}}>
            <span style={{color:"#f5c518",fontWeight:600}}>⭐ {movie.rating}</span>
            <span>·</span>
            <span>{movie.runtime}</span>
            <span>·</span>
            <span style={{background:"rgba(255,255,255,0.1)",padding:"1px 8px",borderRadius:"3px",border:"1px solid rgba(255,255,255,0.15)",fontSize:"11px",backdropFilter:"blur(8px)"}}>{movie.type==="tv"?"TV Show":"Movie"}</span>
          </div>
        </div>

        {/* poster right side */}
        <div style={{position:"absolute",bottom:"-30px",right:"48px",zIndex:5}}>
          <img
            src={movie.poster}
            alt={movie.title}
            style={{width:"150px",height:"225px",borderRadius:"10px",objectFit:"cover",border:"1px solid rgba(255,255,255,0.15)",boxShadow:"0 20px 56px rgba(0,0,0,0.8)"}}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"56px 32px 64px",display:"grid",gridTemplateColumns:"1fr 240px",gap:"48px",alignItems:"start"}}>
        <div>
          {/* TABS */}
          <div style={{display:"flex",gap:"0",borderBottom:"1px solid rgba(255,255,255,0.08)",marginBottom:"24px"}}>
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  padding:"10px 20px",fontSize:"13px",fontWeight:600,cursor:"pointer",
                  background:"none",border:"none",
                  color:tab===t.key?"#fff":"rgba(255,255,255,0.35)",
                  borderBottom:tab===t.key?"2px solid #fff":"2px solid transparent",
                  marginBottom:"-1px",transition:"color 0.15s",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          {tab === "watch" && <PlatformRow platforms={movie.platforms} />}

          {tab === "synopsis" && (
            <p style={{fontSize:"15px",lineHeight:1.75,color:"rgba(255,255,255,0.6)",maxWidth:"600px"}}>{movie.summary}</p>
          )}

          {tab === "similar" && (
            <div style={{display:"flex",gap:"16px",overflowX:"auto",paddingBottom:"8px"}}>
              {similar.map((m) => (
                <MovieCard key={m.id} movie={m} onClick={(mv) => { onSelect(mv); window.scrollTo({top:0,behavior:"smooth"}); }} />
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div>
          {/* actions */}
          <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"}}>
            <button
              onClick={() => setWatchlisted(!watchlisted)}
              style={{
                padding:"9px 16px",borderRadius:"7px",fontSize:"13px",fontWeight:600,cursor:"pointer",
                background:watchlisted?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.04)",
                border:watchlisted?"1px solid rgba(255,255,255,0.2)":"1px solid rgba(255,255,255,0.08)",
                color:watchlisted?"#fff":"rgba(255,255,255,0.5)",transition:"all 0.15s",
              }}
            >
              {watchlisted ? "✓ In Watchlist" : "＋ Add to Watchlist"}
            </button>
          </div>

          {/* info card */}
          <div style={{padding:"16px",borderRadius:"10px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:"14px"}}>About</div>
            {[
              ["Type", movie.type==="tv"?"TV Show":"Movie"],
              ["Year", movie.year],
              ["Runtime", movie.runtime],
              ["IMDb", `${movie.rating} / 10`],
            ].map(([k,v]) => (
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px",gap:"8px"}}>
                <span style={{fontSize:"12px",color:"rgba(255,255,255,0.3)",flexShrink:0}}>{k}</span>
                <span style={{fontSize:"12px",color:"rgba(255,255,255,0.75)",fontWeight:500,textAlign:"right"}}>{v}</span>
              </div>
            ))}
            <div style={{marginTop:"4px"}}>
              <span style={{fontSize:"12px",color:"rgba(255,255,255,0.3)"}}>Genres</span>
              <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"6px"}}>
                {movie.genres.map((g) => (
                  <span key={g} style={{fontSize:"11px",padding:"2px 8px",borderRadius:"4px",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.08)"}}>{g}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ onSelectMovie }) {
  const [query, setQuery] = useState("");
  const [acResults, setAcResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchResults, setSearchResults] = useState(null);
  const searchRef = useRef(null);

  const trending  = MOVIES.filter((m) => m.trending);
  const isNew     = MOVIES.filter((m) => m.isNew);
  const free      = MOVIES.filter((m) => m.free);
  const leaderboard = [...MOVIES].sort((a,b) => b.score-a.score).slice(0,5);

  const FILTERS = [
    {key:"all",    label:"All"},
    {key:"movie",  label:"Movies"},
    {key:"tv",     label:"TV Shows"},
    {key:"trending",label:"Trending"},
    {key:"new",    label:"New"},
  ];

  function handleInput(val) {
    setQuery(val);
    if (!val.trim()) { setAcResults([]); return; }
    const q = val.toLowerCase();
    setAcResults(MOVIES.filter((m) => m.title.toLowerCase().includes(q) || m.genres.some((g) => g.toLowerCase().includes(q))).slice(0,5));
  }

  function handleKey(e) {
    if (e.key === "Enter" && query.trim()) {
      const q = query.toLowerCase();
      setSearchResults(MOVIES.filter((m) => m.title.toLowerCase().includes(q) || m.genres.some((g) => g.toLowerCase().includes(q))));
      setAcResults([]);
    }
    if (e.key === "Escape") setAcResults([]);
  }

  function applyFilter(key) {
    setActiveFilter(key);
    setSearchResults(null);
    setQuery("");
    setAcResults([]);
    if (key === "all") return;
    setSearchResults(MOVIES.filter((m) => {
      if (key==="movie") return m.type==="movie";
      if (key==="tv")    return m.type==="tv";
      if (key==="trending") return m.trending;
      if (key==="new")   return m.isNew;
      return true;
    }));
  }

  useEffect(() => {
    const h = (e) => { if (!searchRef.current?.contains(e.target)) setAcResults([]); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const showHome = !searchResults && activeFilter==="all";

  const heroMovies = MOVIES.slice(0, 8);

  return (
    <div style={{minHeight:"100vh",background:"#0d0d0f"}}>

      {/* ── HERO ── */}
      <div style={{position:"relative",minHeight:"580px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingTop:"64px"}}>

        <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",height:"100%",gap:"2px"}}>
            {heroMovies.map((m) => (
              <div key={m.id} style={{overflow:"hidden",position:"relative"}}>
                <img src={m.backdrop || m.poster} alt="" style={{width:"100%",height:"100%",objectFit:"cover",filter:"blur(6px) brightness(0.3)",transform:"scale(1.1)"}} />
              </div>
            ))}
          </div>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(13,13,15,0.55) 0%, rgba(13,13,15,0.25) 30%, rgba(13,13,15,0.7) 75%, rgba(13,13,15,1) 100%)"}} />
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(13,13,15,0.5) 100%)"}} />
        </div>

        <div style={{position:"relative",zIndex:10,textAlign:"center",padding:"0 24px",width:"100%",maxWidth:"720px"}}>
          <h1 style={{fontSize:"clamp(2rem,5vw,3.4rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.02em",lineHeight:1.2,marginBottom:"14px"}}>
            Your streaming guide for<br />movies, TV shows &amp; sports
          </h1>
          <p style={{fontSize:"15px",color:"rgba(255,255,255,0.4)",marginBottom:"32px",lineHeight:1.6}}>
            Find where to stream new, popular &amp; upcoming entertainment.
          </p>

          <div ref={searchRef} style={{position:"relative",maxWidth:"560px",margin:"0 auto 20px"}}>
            <span style={{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.25)",pointerEvents:"none",fontSize:"14px"}}>🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Search for movies or TV shows"
              style={{
                width:"100%",paddingLeft:"44px",paddingRight:"60px",paddingTop:"14px",paddingBottom:"14px",
                background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.12)",
                borderRadius:"8px",
                color:"#fff",fontSize:"14px",outline:"none",
                transition:"border-color 0.2s, background 0.2s",
              }}
              onFocus={(e)=>{ e.target.style.borderColor="rgba(255,255,255,0.3)"; e.target.style.background="rgba(255,255,255,0.09)"; }}
              onBlur={(e)=>{ e.target.style.borderColor="rgba(255,255,255,0.12)"; e.target.style.background="rgba(255,255,255,0.06)"; }}
            />
            <span style={{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",fontSize:"10px",color:"rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",padding:"2px 6px"}}>⌘K</span>

            {acResults.length > 0 && (
              <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#161620",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",overflow:"hidden",zIndex:50,boxShadow:"0 16px 40px rgba(0,0,0,0.6)"}}>
                {acResults.map((m, i) => (
                  <div
                    key={m.id}
                    onClick={() => { setAcResults([]); onSelectMovie(m); }}
                    style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px 14px",cursor:"pointer",borderBottom:i<acResults.length-1?"1px solid rgba(255,255,255,0.05)":"none",transition:"background 0.1s"}}
                    onMouseEnter={(e)=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                    onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}
                  >
                    <img src={m.poster} alt={m.title} style={{width:"32px",height:"46px",borderRadius:"4px",objectFit:"cover",flexShrink:0}} loading="lazy" />
                    <div>
                      <div style={{fontSize:"13px",fontWeight:600,color:"#fff"}}>{m.title}</div>
                      <div style={{fontSize:"11px",color:"rgba(255,255,255,0.35)"}}>{m.year} · {m.type==="tv"?"TV":"Movie"} · ⭐ {m.rating}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{display:"flex",gap:"6px",justifyContent:"center",flexWrap:"wrap"}}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => applyFilter(f.key)}
                style={{
                  padding:"6px 16px",borderRadius:"100px",fontSize:"12px",fontWeight:600,cursor:"pointer",
                  background:activeFilter===f.key?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.06)",
                  border:activeFilter===f.key?"1px solid transparent":"1px solid rgba(255,255,255,0.1)",
                  color:activeFilter===f.key?"#0d0d0f":"rgba(255,255,255,0.45)",
                  transition:"all 0.15s",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{position:"relative",zIndex:10,marginTop:"36px",textAlign:"center"}}>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,0.2)",marginBottom:"10px",letterSpacing:"0.05em"}}>Streaming services on CineScope</div>
          <div style={{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap",padding:"0 24px"}}>
            {Object.entries(PLATFORMS).map(([key,p]) => (
              <div
                key={key}
                title={p.name}
                style={{width:"42px",height:"42px",borderRadius:"10px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:800,color:p.color,cursor:"pointer",transition:"all 0.15s"}}
                onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; }}
                onMouseLeave={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}
              >
                {p.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {searchResults && (
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"32px 32px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
            <div style={{fontSize:"16px",fontWeight:700,color:"#fff"}}>
              {activeFilter!=="all"
                ? {movie:"Movies",tv:"TV Shows",trending:"Trending",new:"New Releases"}[activeFilter]
                : `Results for "${query}"`}
            </div>
            <button onClick={()=>{setSearchResults(null);setActiveFilter("all");setQuery("");}} style={{fontSize:"12px",color:"rgba(255,255,255,0.35)",background:"none",border:"none",cursor:"pointer"}}>Clear</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:"20px"}}>
            {searchResults.map((m) => <MovieCard key={m.id} movie={m} onClick={onSelectMovie} />)}
            {searchResults.length===0 && <div style={{gridColumn:"1/-1",textAlign:"center",padding:"48px",fontSize:"13px",color:"rgba(255,255,255,0.2)"}}>No results found.</div>}
          </div>
        </div>
      )}

      {showHome && (
        <>
          <Section title="Trending Now">
            <HorizontalRow movies={trending} onSelect={onSelectMovie} />
          </Section>

          <Divider />

          <div style={{maxWidth:"1200px",margin:"0 auto",padding:"32px 32px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"48px"}}>
            <div>
              <SectionTitle>Popular This Week</SectionTitle>
              <div style={{display:"flex",flexDirection:"column",gap:"6px",marginTop:"16px"}}>
                {leaderboard.map((m, i) => (
                  <div
                    key={m.id}
                    onClick={() => onSelectMovie(m)}
                    style={{display:"flex",alignItems:"center",gap:"14px",padding:"10px 12px",borderRadius:"8px",cursor:"pointer",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",transition:"all 0.15s"}}
                    onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.transform="translateX(3px)"; }}
                    onMouseLeave={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.05)"; e.currentTarget.style.transform="translateX(0)"; }}
                  >
                    <span style={{fontSize:"16px",fontWeight:800,minWidth:"24px",textAlign:"center",color:i<3?"#f5c518":"rgba(255,255,255,0.18)"}}>{i+1}</span>
                    <div style={{position:"relative",width:"46px",height:"66px",borderRadius:"6px",overflow:"hidden",flexShrink:0}}>
                      <img src={m.poster} alt={m.title} style={{width:"100%",height:"100%",objectFit:"cover"}} loading="lazy" />
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%)"}} />
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:"13px",fontWeight:600,color:"#fff",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{m.title}</div>
                      <div style={{fontSize:"11px",color:"rgba(255,255,255,0.3)",marginTop:"2px"}}>⭐ {m.rating} · {m.year}</div>
                      <div style={{marginTop:"5px",height:"2px",borderRadius:"1px",background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
                        <div style={{height:"100%",borderRadius:"1px",background:"rgba(255,255,255,0.25)",width:`${m.score}%`}} />
                      </div>
                    </div>
                    <span style={{fontSize:"10px",fontWeight:700,color:"rgba(255,255,255,0.25)",flexShrink:0}}>#{m.rank}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <SectionTitle>Free to Watch</SectionTitle>
                <span style={{fontSize:"10px",color:"rgba(255,255,255,0.2)",letterSpacing:"0.05em"}}>AD-SUPPORTED · LEGAL</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"6px",marginTop:"16px"}}>
                {free.map((m) => {
                  const p = PLATFORMS[m.platforms[0]];
                  return (
                    <div
                      key={m.id}
                      onClick={() => onSelectMovie(m)}
                      style={{display:"flex",alignItems:"center",gap:"14px",padding:"10px 12px",borderRadius:"8px",cursor:"pointer",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",transition:"all 0.15s"}}
                      onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor="rgba(28,231,131,0.15)"; e.currentTarget.style.transform="translateX(3px)"; }}
                      onMouseLeave={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.05)"; e.currentTarget.style.transform="translateX(0)"; }}
                    >
                      <div style={{position:"relative",width:"46px",height:"66px",borderRadius:"6px",overflow:"hidden",flexShrink:0}}>
                        <img src={m.poster} alt={m.title} style={{width:"100%",height:"100%",objectFit:"cover"}} loading="lazy" />
                        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%)"}} />
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:"13px",fontWeight:600,color:"#fff",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{m.title}</div>
                        <div style={{fontSize:"11px",color:"#1CE783",fontWeight:600,marginTop:"2px"}}>{p?.name}</div>
                        <div style={{fontSize:"10px",color:"rgba(255,255,255,0.25)",marginTop:"1px"}}>No subscription needed</div>
                      </div>
                      <span style={{fontSize:"12px",color:"rgba(255,255,255,0.15)"}}>›</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Divider />

          <Section title="New Releases">
            <HorizontalRow movies={isNew} onSelect={onSelectMovie} />
          </Section>

          <footer style={{textAlign:"center",padding:"48px 24px 32px",fontSize:"11px",color:"rgba(255,255,255,0.15)",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
            CineScope does not host any content. All streaming links redirect to official platforms. Trailers are embedded from YouTube.<br />
            © 2025 CineScope · Illustrative data only.
          </footer>
        </>
      )}
    </div>
  );
}

// ─── SMALL HELPERS ───────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div style={{maxWidth:"1200px",margin:"0 auto",padding:"32px 32px"}}>
      <SectionTitle>{title}</SectionTitle>
      <div style={{marginTop:"16px"}}>{children}</div>
    </div>
  );
}
function SectionTitle({ children }) {
  return <div style={{fontSize:"16px",fontWeight:700,color:"#fff",letterSpacing:"-0.01em"}}>{children}</div>;
}
function Divider() {
  return <div style={{height:"1px",background:"rgba(255,255,255,0.05)",margin:"0 32px"}} />;
}
function HorizontalRow({ movies, onSelect }) {
  return (
    <div style={{display:"flex",gap:"16px",overflowX:"auto",paddingBottom:"8px",scrollbarWidth:"none"}}>
      {movies.map((m) => <MovieCard key={m.id} movie={m} onClick={onSelect} />)}
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function CineScope() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  function openMovie(m) {
    setSelectedMovie(m);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div style={{background:"#0d0d0f",minHeight:"100vh",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>

      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 32px",background:"rgba(13,13,15,0.9)",borderBottom:"1px solid rgba(255,255,255,0.07)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)"}}>
        <button
          onClick={() => { setSelectedMovie(null); window.scrollTo({top:0}); }}
          style={{display:"flex",alignItems:"center",gap:"10px",background:"none",border:"none",cursor:"pointer",color:"#fff",fontSize:"17px",fontWeight:800,letterSpacing:"-0.02em"}}
        >
          <span style={{width:"30px",height:"30px",borderRadius:"8px",background:"linear-gradient(135deg,#6366f1,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px"}}>🎬</span>
          CineScope
        </button>

        <div style={{display:"flex",alignItems:"center",gap:"28px"}}>
          {["Home","New","Popular","Lists","Guide"].map((label) => (
            <button key={label} style={{background:"none",border:"none",cursor:"pointer",fontSize:"13px",fontWeight:500,color:"rgba(255,255,255,0.45)",transition:"color 0.15s"}}
              onMouseEnter={(e)=>e.target.style.color="#fff"}
              onMouseLeave={(e)=>e.target.style.color="rgba(255,255,255,0.45)"}
            >{label}</button>
          ))}
        </div>

        <button style={{padding:"7px 18px",borderRadius:"6px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.7)",fontSize:"13px",fontWeight:600,cursor:"pointer",transition:"all 0.15s"}}
          onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.color="#fff"; }}
          onMouseLeave={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.color="rgba(255,255,255,0.7)"; }}
        >Sign In</button>
      </nav>

      {selectedMovie ? (
        <DetailPage movie={selectedMovie} onBack={() => setSelectedMovie(null)} onSelect={openMovie} />
      ) : (
        <HomePage onSelectMovie={openMovie} />
      )}
    </div>
  );
}
