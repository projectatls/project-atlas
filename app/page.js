'use client';
import { useState } from 'react';

// Live mock database of curated resources
const DATASET = [
    { id: 1, name: "Make.com Advanced Blueprints", category: "Automation", desc: "Enterprise-grade workflow templates for complex API mapping and data synchronization.", link: "https://www.make.com", featured: true },
    { id: 2, name: "v0.dev by Vercel", category: "Development", desc: "Generative UI system to construct clean, modular frontend components using plain text.", link: "https://v0.dev", featured: false },
    { id: 3, name: "Phantombuster Lead Scaler", category: "Lead Gen", desc: "Cloud-based data extraction engines to automate list-building from LinkedIn and Sales Navigator.", link: "https://phantombuster.com", featured: false },
    { id: 4, name: "Supabase Postgres Hosting", category: "Database", desc: "Instantaneous relational database provisioning equipped with authentication and real-time listeners.", link: "https://supabase.com", featured: false },
    { id: 5, name: "Airtable Systems Architecture", category: "Data Management", desc: "Low-code relational databases built to handle internal company tracking and automated operations.", link: "https://airtable.com", featured: false },
    { id: 6, name: "Clay.com Data Enrichment", category: "Lead Gen", desc: "Combines 50+ data providers to automatically enrich prospect lists with hyper-targeted personalization.", link: "https://clay.com", featured: true },
    { id: 7, name: "Cursor AI Code Editor", category: "Development", desc: "An AI-first fork of VS Code designed for rapid codebase iteration and programmatic engineering.", link: "https://cursor.sh", featured: false },
    { id: 8, name: "Replicate Model Hosting", category: "AI Infrastructure", desc: "Run open-source machine learning and AI models in the cloud via a clean, predictable API.", link: "https://replicate.com", featured: false }
  ];

export default function Home() {
  const [search, setSearch] = useState('');

  const filteredData = DATASET.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12 selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* TOP BAR / MONETIZATION HOOK */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6 mb-12">
          <div className="text-xl font-bold tracking-wider text-blue-400">PROJECT ATLAS</div>
          <button 
            onClick={() => alert('Sponsorship slot opening soon! Secure your placement.')}
            className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-blue-500/10"
          >
            Submit a Resource ($15)
          </button>
        </div>

        {/* HERO HEADER */}
        <header className="text-center my-12">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Elite Operator <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Tools</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
            Zero fluff. Just highly curated tools and system infrastructures proven to fast-track digital execution.
          </p>
        </header>

        {/* SEARCH BAR */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search by tool name or category (e.g., Lead Gen)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
          />
        </div>

        {/* DIRECTORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredData.map((item) => (
            <div 
              key={item.id} 
              className={`p-6 rounded-xl border transition-all ${
                item.featured 
                  ? 'bg-gradient-to-br from-blue-950/40 to-slate-900 border-blue-500/40 shadow-md shadow-blue-500/5' 
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  {item.category}
                </span>
                {item.featured && (
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                    Featured Placement
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">{item.desc}</p>
              <a 
                href={item.link} 
                className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Access Infrastructure →
              </a>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}