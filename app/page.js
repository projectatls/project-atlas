"use client";
import { useState, useEffect, useRef } from "react";

const MOVIES = [
  {id:1,title:"Dune: Part Two",year:2024,type:"movie",rating:8.6,runtime:"166m",genres:["Sci-Fi","Adventure","Drama"],
   summary:"Paul Atreides unites with the Fremen on the desert world of Arrakis to wage war against the Harkonnens, fulfilling a prophecy that would change the galaxy forever.",
   poster:"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=320&h=460&fit=crop&auto=format",
   trailerKey:"Way9Dexny3w",trending:true,isNew:true,rank:1,score:98,platforms:["netflix","prime","apple"],free:false},
  {id:2,title:"Oppenheimer",year:2023,type:"movie",rating:8.9,runtime:"180m",genres:["Drama","History","Thriller"],
   summary:"The story of J. Robert Oppenheimer's role in the development of the atomic bomb during WWII, told through the lens of his later security hearings.",
   poster:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=320&h=460&fit=crop&auto=format",
   trailerKey:"uYPbbksJxIg",trending:true,isNew:false,rank:2,score:96,platforms:["prime","peacock"],free:false},
  {id:3,title:"The Bear",year:2024,type:"tv",rating:8.7,runtime:"30m · 2 Seasons",genres:["Drama","Comedy"],
   summary:"A young chef from the fine dining world comes home to run his family's sandwich shop in Chicago, confronting old wounds and igniting a culinary transformation.",
   poster:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=320&h=460&fit=crop&auto=format",
   trailerKey:"",trending:true,isNew:false,rank:3,score:95,platforms:["hulu","disney"],free:false},
  {id:4,title:"Poor Things",year:2023,type:"movie",rating:8.2,runtime:"141m",genres:["Fantasy","Comedy","Drama"],
   summary:"The incredible tale of Bella Baxter, a young woman brought back to life by an eccentric scientist who flees to explore the world unburdened by the prejudices of her time.",
   poster:"https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=320&h=460&fit=crop&auto=format",
   trailerKey:"RlbR5N6veqw",trending:false,isNew:false,rank:4,score:91,platforms:["hulu","prime"],free:false},
  {id:5,title:"Shogun",year:2024,type:"tv",rating:9.0,runtime:"60m · 1 Season",genres:["Drama","History","Action"],
   summary:"In 1600s feudal Japan, a shipwrecked English sailor aligns with a powerful warlord as they navigate the treacherous political landscape of the civil war era.",
   poster:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=320&h=460&fit=crop&auto=format",
   trailerKey:"",trending:true,isNew:false,rank:5,score:99,platforms:["hulu","disney"],free:false},
  {id:6,title:"Civil War",year:2024,type:"movie",rating:7.5,runtime:"109m",genres:["Action","Thriller","Drama"],
   summary:"A team of journalists race across a near-future America tearing itself apart in a second civil war, risking everything to document the conflict.",
   poster:"https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=320&h=460&fit=crop&auto=format",
   trailerKey:"",trending:true,isNew:true,rank:6,score:87,platforms:["prime"],free:false},
  {id:7,title:"Inside Out 2",year:2024,type:"movie",rating:7.8,runtime:"100m",genres:["Animation","Family","Comedy"],
   summary:"Riley enters adolescence and her mind's headquarters gets an unexpected remodel, with new emotions joining the original five.",
   poster:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=320&h=460&fit=crop&auto=format",
   trailerKey:"",trending:false,isNew:true,rank:7,score:85,platforms:["disney"],free:false},
  {id:8,title:"Amazon Freevee Picks",year:2024,type:"movie",rating:7.2,runtime:"Varies",genres:["Various"],
   summary:"Critically acclaimed films and documentaries available at no cost with ads through Prime Video Freevee — no subscription required.",
   poster:"https://images.unsplash.com/photo-1485846234645-a62644f84728?w=320&h=460&fit=crop&auto=format",
   trailerKey:"",trending:false,isNew:false,rank:8,score:72,platforms:["freevee"],free:true},
  {id:9,title:"Tubi Originals",year:2024,type:"tv",rating:6.8,runtime:"Varies",genres:["Various"],
   summary:"Hundreds of original and classic shows streaming completely free — no credit card, no subscription. America's most-watched free streaming service.",
   poster:"https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=320&h=460&fit=crop&auto=format",
   trailerKey:"",trending:false,isNew:false,rank:9,score:68,platforms:["tubi"],free:true},
  {id:10,title:"Furiosa",year:2024,type:"movie",rating:7.8,runtime:"148m",genres:["Action","Sci-Fi"],
   summary:"The origin story of the legendary warrior Furiosa before she crosses paths with the Mad Max gang and begins her long road back home.",
   poster:"https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=320&h=460&fit=crop&auto=format",
   trailerKey:"",trending:true,isNew:true,rank:10,score:82,platforms:["prime","hbo"],free:false},
  {id:11,title:"House of the Dragon S2",year:2024,type:"tv",rating:8.4,runtime:"60m · 2 Seasons",genres:["Fantasy","Drama","Action"],
   summary:"The Targaryen civil war enters its bloodiest phase as both sides marshal their forces and the fate of the Seven Kingdoms hangs in the balance.",
   poster:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=320&h=460&fit=crop&auto=format",
   trailerKey:"",trending:true,isNew:true,rank:11,score:90,platforms:["hbo"],free:false},
  {id:12,title:"Pluto",year:2024,type:"tv",rating:8.5,runtime:"60m · 1 Season",genres:["Animation","Sci-Fi","Mystery"],
   summary:"Based on Naoki Urasawa's manga, a robot investigator hunts the entity destroying the world's most powerful robots in this stunning Netflix anime.",
   poster:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=320&h=460&fit=crop&auto=format",
   trailerKey:"",trending:false,isNew:true,rank:12,score:88,platforms:["netflix"],free:false},
];

const PLATFORMS = {
  netflix:{name:"Netflix",color:"#E50914",bg:"#2a0000",label:"N",url:"https://netflix.com"},
  prime:{name:"Prime Video",color:"#00A8E1",bg:"#00162e",label:"P",url:"https://primevideo.com"},
  disney:{name:"Disney+",color:"#0063E5",bg:"#00001f",label:"D+",url:"https://disneyplus.com"},
  hulu:{name:"Hulu",color:"#3DBB3D",bg:"#001800",label:"H",url:"https://hulu.com"},
  apple:{name:"Apple TV+",color:"#f5f5f7",bg:"#1c1c1e",label:"🍎",url:"https://tv.apple.com"},
  hbo:{name:"Max",color:"#5822FF",bg:"#0d0023",label:"M",url:"https://max.com"},
  peacock:{name:"Peacock",color:"#FF6B35",bg:"#1a0800",label:"🦚",url:"https://peacocktv.com"},
  freevee:{name:"Amazon Freevee",color:"#3DBB3D",bg:"#001800",label:"F",url:"https://amazon.com/freevee",isFree:true},
  tubi:{name:"Tubi",color:"#FA004F",bg:"#1a0010",label:"T",url:"https://tubitv.com",isFree:true},
};

// ── MOVIE CARD ──────────────────────────────────────────────────────────────
function MovieCard({ movie, onClick }) {
  return (
    <div onClick={() => onClick(movie)} className="group flex-shrink-0 w-40 cursor-pointer">
      <div className="relative w-40 h-56 rounded-xl overflow-hidden border border-white/10 mb-2">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-md px-2 py-0.5 text-xs font-semibold">
          {movie.free ? (
            <span className="text-green-400">FREE</span>
          ) : (
            <span className="text-amber-400">⭐ {movie.rating}</span>
          )}
        </div>
      </div>
      <div className="text-sm font-semibold truncate">{movie.title}</div>
      <div className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
        <span>{movie.year}</span>
        <span>·</span>
        <span>{movie.type === "tv" ? "TV" : "Film"}</span>
        <div className="flex gap-0.5 ml-1">
          {movie.platforms.slice(0, 3).map((pk) => {
            const p = PLATFORMS[pk];
            return p ? (
              <span
                key={pk}
                className="inline-flex items-center justify-center w-4 h-4 rounded text-[8px] font-bold flex-shrink-0"
                style={{ background: p.bg, color: p.color }}
              >
                {p.label}
              </span>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

// ── TRAILER MODAL ───────────────────────────────────────────────────────────
function TrailerModal({ trailerKey, title, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!trailerKey) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#111118]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
        >✕</button>
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
            title={`${title} Trailer`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        <div className="px-4 py-2 text-center text-xs text-white/30 border-t border-white/10">
          🎬 Official trailer only · CineScope does not host or stream full content · Click &ldquo;Where to Watch&rdquo; to view on the official platform
        </div>
      </div>
    </div>
  );
}

// ── DETAIL PAGE ─────────────────────────────────────────────────────────────
function DetailPage({ movie, onBack, dark }) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);

  const similar = MOVIES.filter(
    (m) => m.id !== movie.id && (m.type === movie.type || m.genres.some((g) => movie.genres.includes(g)))
  ).slice(0, 6);

  return (
    <div className="min-h-screen pt-16">
      {trailerOpen && movie.trailerKey && (
        <TrailerModal trailerKey={movie.trailerKey} title={movie.title} onClose={() => setTrailerOpen(false)} />
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all
            ${dark ? "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white" : "border-black/10 bg-black/5 text-black/60 hover:bg-black/10 hover:text-black"}`}
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <img
            src={movie.poster}
            alt={movie.title}
            className={`w-48 md:w-56 rounded-2xl object-cover flex-shrink-0 border shadow-2xl ${dark ? "border-white/10" : "border-black/10"}`}
            loading="lazy"
          />
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genres.map((g) => (
                <span key={g} className="px-3 py-0.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">{g}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
              <span className="flex items-center gap-1 font-semibold text-amber-400">⭐ {movie.rating}/10</span>
              <span className={dark ? "text-white/40" : "text-black/40"}>{movie.year}</span>
              <span className={dark ? "text-white/40" : "text-black/40"}>{movie.runtime}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${dark ? "bg-white/10 text-white/60" : "bg-black/10 text-black/60"}`}>
                {movie.type === "tv" ? "TV Show" : "Movie"}
              </span>
            </div>
            <p className={`text-sm leading-relaxed max-w-xl mb-6 ${dark ? "text-white/60" : "text-black/60"}`}>{movie.summary}</p>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => movie.trailerKey && setTrailerOpen(true)}
                disabled={!movie.trailerKey}
                className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg
                  ${movie.trailerKey
                    ? "bg-gradient-to-r from-green-700 to-green-500 text-white shadow-green-500/30 hover:-translate-y-0.5 hover:shadow-green-500/50 active:translate-y-0 cursor-pointer"
                    : "bg-white/10 text-white/30 cursor-not-allowed"}`}
              >
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">▶</span>
                {movie.trailerKey ? "Play Trailer" : "No Trailer Available"}
              </button>
              <button
                onClick={() => setWatchlisted(!watchlisted)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all
                  ${dark
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-violet-500/50"
                    : "bg-black/5 border-black/10 hover:bg-black/10 hover:border-violet-500/50"}`}
              >
                {watchlisted ? "✓ In Watchlist" : "+ Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>

        {/* WHERE TO WATCH */}
        <div className="mb-10">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">📡 Where to Watch</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {movie.platforms.map((pk) => {
              const p = PLATFORMS[pk];
              if (!p) return null;
              return (
                <a
                  key={pk}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm(`Open ${p.name} in a new tab?\n\nCineScope will redirect you to the official platform.`)) {
                      window.open(p.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:-translate-y-0.5
                    ${dark ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20" : "bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20"}`}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: p.bg, color: p.color }}>{p.label}</div>
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-violet-400 font-medium">Watch on {p.name.split(" ")[0]} →</div>
                    {p.isFree && <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded font-semibold">FREE</span>}
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* SIMILAR */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-base font-bold mb-4">You Might Also Like</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
              {similar.map((m) => <MovieCard key={m.id} movie={m} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ onSelectMovie, dark }) {
  const [query, setQuery] = useState("");
  const [acResults, setAcResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchResults, setSearchResults] = useState(null);
  const searchRef = useRef(null);

  const trending = MOVIES.filter((m) => m.trending);
  const isNew = MOVIES.filter((m) => m.isNew);
  const free = MOVIES.filter((m) => m.free);
  const leaderboard = [...MOVIES].sort((a, b) => b.score - a.score).slice(0, 5);

  const FILTERS = [
    { key: "all", label: "All" },
    { key: "movie", label: "🎬 Movies" },
    { key: "tv", label: "📺 TV Shows" },
    { key: "trending", label: "🔥 Trending" },
    { key: "new", label: "✨ New" },
  ];

  function handleInput(val) {
    setQuery(val);
    if (!val.trim()) { setAcResults([]); return; }
    const q = val.toLowerCase();
    setAcResults(MOVIES.filter((m) => m.title.toLowerCase().includes(q) || m.genres.some((g) => g.toLowerCase().includes(q))).slice(0, 5));
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
    const filtered = MOVIES.filter((m) => {
      if (key === "movie") return m.type === "movie";
      if (key === "tv") return m.type === "tv";
      if (key === "trending") return m.trending;
      if (key === "new") return m.isNew;
      return true;
    });
    setSearchResults(filtered);
  }

  useEffect(() => {
    function handler(e) { if (!searchRef.current?.contains(e.target)) setAcResults([]); }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showHome = !searchResults && activeFilter === "all";

  return (
    <div className="min-h-screen pt-16">
      {/* HERO */}
      <div
        className="px-4 py-20 text-center relative"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(108,99,255,0.12) 0%, transparent 70%)" }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4">🎬 Stream smarter</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
          Find what to watch<br />
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">across every platform</span>
        </h1>
        <p className={`text-base mb-8 max-w-md mx-auto ${dark ? "text-white/50" : "text-black/50"}`}>
          Search movies & shows, discover trailers, and find exactly where to stream them.
        </p>

        {/* SEARCH */}
        <div ref={searchRef} className="relative max-w-xl mx-auto mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search movies, shows, actors…"
            className={`w-full pl-10 pr-16 py-3.5 rounded-2xl border text-sm outline-none transition-all
              ${dark
                ? "bg-white/8 border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:bg-white/12 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                : "bg-black/5 border-black/10 text-black placeholder-black/30 focus:border-violet-500 focus:bg-black/8 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"}`}
            style={{ backgroundColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }}
          />
          <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium px-1.5 py-0.5 rounded border
            ${dark ? "bg-white/10 border-white/10 text-white/30" : "bg-black/10 border-black/10 text-black/30"}`}>⌘K</span>

          {/* AUTOCOMPLETE */}
          {acResults.length > 0 && (
            <div className={`absolute top-full mt-1.5 left-0 right-0 rounded-xl border overflow-hidden z-40 shadow-2xl
              ${dark ? "bg-[#1e1e2a] border-white/10" : "bg-white border-black/10"}`}>
              {acResults.map((m) => (
                <div
                  key={m.id}
                  onClick={() => { setAcResults([]); onSelectMovie(m); }}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
                    ${dark ? "hover:bg-white/5" : "hover:bg-black/5"}`}
                >
                  <img src={m.poster} alt={m.title} className="w-8 h-11 rounded object-cover flex-shrink-0 bg-white/10" loading="lazy" />
                  <div>
                    <div className="text-sm font-semibold">{m.title}</div>
                    <div className={`text-xs ${dark ? "text-white/30" : "text-black/30"}`}>{m.year} · {m.type === "tv" ? "TV" : "Movie"} · ⭐ {m.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FILTER PILLS */}
        <div className="flex flex-wrap gap-2 justify-center">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => applyFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all
                ${activeFilter === f.key
                  ? "bg-violet-600 border-violet-600 text-white"
                  : dark ? "bg-white/5 border-white/10 text-white/50 hover:border-violet-500 hover:text-white" : "bg-black/5 border-black/10 text-black/50 hover:border-violet-500 hover:text-black"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* FILTERED / SEARCH RESULTS */}
      {searchResults && (
        <div className="px-4 py-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold">
              {activeFilter !== "all"
                ? { movie: "🎬 Movies", tv: "📺 TV Shows", trending: "🔥 Trending", new: "✨ New Releases" }[activeFilter]
                : `Results for "${query}"`}
            </h2>
            <button onClick={() => { setSearchResults(null); setActiveFilter("all"); setQuery(""); }} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Clear</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {searchResults.map((m) => <MovieCard key={m.id} movie={m} onClick={onSelectMovie} />)}
            {searchResults.length === 0 && <p className="col-span-full text-center text-sm text-white/30 py-12">No results found.</p>}
          </div>
        </div>
      )}

      {/* HOME CONTENT */}
      {showHome && (
        <>
          {/* TRENDING */}
          <section className="px-4 py-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold">🔥 Trending Now</h2>
              <button onClick={() => applyFilter("trending")} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">See all →</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none">
              {trending.map((m) => <MovieCard key={m.id} movie={m} onClick={onSelectMovie} />)}
            </div>
          </section>

          <div className={`mx-4 h-px ${dark ? "bg-white/5" : "bg-black/5"}`} />

          {/* TWO COL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-8 max-w-7xl mx-auto">
            {/* LEADERBOARD */}
            <div>
              <h2 className="text-base font-bold mb-4">📈 Popular This Week</h2>
              <div className="flex flex-col gap-2">
                {leaderboard.map((m, i) => (
                  <div
                    key={m.id}
                    onClick={() => onSelectMovie(m)}
                    className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all hover:translate-x-1
                      ${dark ? "bg-white/4 border-white/8 hover:bg-white/8 hover:border-white/14" : "bg-black/4 border-black/8 hover:bg-black/8 hover:border-black/14"}`}
                    style={{ backgroundColor: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}
                  >
                    <span className={`text-lg font-bold min-w-[28px] text-center ${i < 3 ? "text-amber-400" : dark ? "text-white/25" : "text-black/25"}`}>{i + 1}</span>
                    <img src={m.poster} alt={m.title} className="w-12 h-16 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{m.title}</div>
                      <div className={`text-xs flex items-center gap-1.5 mb-1 ${dark ? "text-white/35" : "text-black/35"}`}>
                        <span>⭐ {m.rating}</span><span>·</span><span>{m.year}</span>
                      </div>
                      <div className={`h-1 rounded-full overflow-hidden ${dark ? "bg-white/8" : "bg-black/8"}`}>
                        <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500" style={{ width: `${m.score}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-violet-400 bg-violet-500/10 px-2 py-1 rounded-full whitespace-nowrap">#{m.rank}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FREE TO WATCH */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold">🆓 Free to Watch</h2>
                <span className={`text-xs ${dark ? "text-white/30" : "text-black/30"}`}>Ad-supported · Legal</span>
              </div>
              <div className="flex flex-col gap-2">
                {free.map((m) => {
                  const p = PLATFORMS[m.platforms[0]];
                  return (
                    <div
                      key={m.id}
                      onClick={() => onSelectMovie(m)}
                      className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all hover:translate-x-1
                        ${dark ? "bg-white/4 border-white/8 hover:bg-white/8 hover:border-white/14" : "bg-black/4 border-black/8 hover:bg-black/8 hover:border-black/14"}`}
                      style={{ backgroundColor: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}
                    >
                      <img src={m.poster} alt={m.title} className="w-12 h-16 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{m.title}</div>
                        <div className="text-xs text-green-400 font-semibold">{p?.name}</div>
                        <div className={`text-xs ${dark ? "text-white/30" : "text-black/30"}`}>No subscription needed</div>
                      </div>
                      <span className={dark ? "text-white/25" : "text-black/25"}>→</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={`mx-4 h-px ${dark ? "bg-white/5" : "bg-black/5"}`} />

          {/* NEW RELEASES */}
          <section className="px-4 py-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold">✨ New Releases</h2>
              <button onClick={() => applyFilter("new")} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">See all →</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none">
              {isNew.map((m) => <MovieCard key={m.id} movie={m} onClick={onSelectMovie} />)}
            </div>
          </section>

          <footer className={`text-center py-10 px-4 text-xs border-t ${dark ? "border-white/5 text-white/20" : "border-black/5 text-black/30"}`}>
            CineScope does not host any content. All streaming links redirect to official platforms. Trailers are embedded from YouTube.<br />
            © 2025 CineScope · All data is illustrative.
          </footer>
        </>
      )}
    </div>
  );
}

// ── ROOT ────────────────────────────────────────────────────────────────────
export default function CineScope() {
  const [dark, setDark] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function openMovie(m) {
    setSelectedMovie(m);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className={dark ? "bg-[#0a0a0f] text-white min-h-screen" : "bg-[#f8f8fc] text-[#0a0a15] min-h-screen"}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-6 border-b backdrop-blur-xl
        ${dark ? "bg-[#0a0a0f]/85 border-white/8" : "bg-[#f8f8fc]/85 border-black/8"}`}>
        <button onClick={() => { setSelectedMovie(null); }} className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-sm">🎬</span>
          CineScope
        </button>
        <div className="hidden md:flex items-center gap-7">
          {[["All","all"],["Movies","movie"],["TV Shows","tv"],["Trending","trending"],["New","new"]].map(([label, key]) => (
            <button
              key={key}
              className={`text-sm font-medium transition-colors ${dark ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setDark(!dark)}
          className={`w-10 h-10 rounded-full border flex items-center justify-center text-base transition-all
            ${dark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-black/5 border-black/10 hover:bg-black/10"}`}
        >
          {dark ? "🌙" : "☀️"}
        </button>
      </nav>

      {selectedMovie ? (
        <DetailPage movie={selectedMovie} onBack={() => setSelectedMovie(null)} dark={dark} />
      ) : (
        <HomePage onSelectMovie={openMovie} dark={dark} />
      )}
    </div>
  );
}
