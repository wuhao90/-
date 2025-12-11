import React, { useState } from 'react';
import { PROFILES } from '../constants';
import { Profile } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';
import { Play, MoreHorizontal, Chrome, Monitor, Search, Filter, RefreshCcw, Sparkles, Loader2, Copy } from 'lucide-react';
import { analyzeProfile } from '../services/geminiService';

export const ProfileTable: React.FC = () => {
  const [profiles] = useState<Profile[]>(PROFILES);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{id: string, text: string} | null>(null);

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleAnalyze = async (profile: Profile) => {
    setAnalyzingId(profile.id);
    setAnalysisResult(null);
    try {
      const text = await analyzeProfile(profile);
      setAnalysisResult({ id: profile.id, text });
    } finally {
      setAnalyzingId(null);
    }
  };

  const filteredProfiles = profiles.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <div className="flex gap-1 p-1 bg-slate-100 rounded-md">
             {['Group', 'Test', 'SEO', 'Team', 'Business', 'Official'].map((tab, i) => (
               <button
                key={tab}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  i === 0 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
           <div className="relative w-full sm:w-64">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
             <Input 
               placeholder="Search profiles..." 
               className="pl-9" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
           <Button variant="outline" size="icon">
             <Filter className="h-4 w-4" />
           </Button>
           <Button variant="outline" className="gap-2">
             <RefreshCcw className="h-4 w-4" />
             <span className="hidden sm:inline">Sync</span>
           </Button>
        </div>
      </div>

      {/* Analysis Result Banner */}
      {analysisResult && (
        <div className="bg-indigo-50 border border-indigo-100 text-indigo-900 p-4 rounded-md flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="h-5 w-5 text-indigo-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">AI Analysis for {analysisResult.id}</h4>
            <p className="text-sm leading-relaxed">{analysisResult.text}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-indigo-100"
            onClick={() => setAnalysisResult(null)}
          >
            ✕
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 w-[40px]">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>
                <th className="px-4 py-3">Profile Information</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Proxy Information</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProfiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-4 py-3 align-middle">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300" 
                      checked={selectedIds.has(profile.id)}
                      onChange={() => toggleSelection(profile.id)}
                    />
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{profile.id}</span>
                        {profile.status === 'Ready' && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 rounded-full border border-emerald-100 font-medium">Ready</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">{profile.name}</div>
                      <div className="flex items-center gap-2 mt-1 text-slate-400">
                        <Monitor className="h-3 w-3" />
                        <Chrome className="h-3 w-3" />
                        <span className="text-[10px]">Windows 10 • Chrome 120</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 font-medium px-4 shadow-sm"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      Start
                    </Button>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-700 font-mono text-xs">
                         {profile.proxy === '--' ? (
                           <span className="text-slate-400">No Proxy</span>
                         ) : (
                           <>
                             <span>{profile.proxy.substring(0, 16)}...</span>
                             <button className="text-slate-300 hover:text-slate-500">
                               <Copy className="h-3 w-3" />
                             </button>
                           </>
                         )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        {profile.proxyFlag && <span className="text-base">{profile.proxyFlag}</span>}
                        <span>{profile.proxyLocation}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="text-xs text-slate-500 italic max-w-[150px] truncate">
                      {profile.notes || "--"}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex flex-wrap gap-1">
                      {profile.tags.length > 0 ? profile.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-normal">
                          {tag}
                        </Badge>
                      )) : <span className="text-slate-400 text-xs">--</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
                        title="Analyze with AI"
                        onClick={() => handleAnalyze(profile)}
                        disabled={analyzingId === profile.id}
                      >
                         {analyzingId === profile.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex items-center justify-between text-xs text-slate-500">
           <div>
             348 entries in all
           </div>
           <div className="flex items-center gap-2">
             <button className="px-2 py-1 rounded hover:bg-slate-200 disabled:opacity-50" disabled>Previous</button>
             <div className="flex gap-1">
               <button className="h-6 w-6 rounded bg-white border border-slate-300 text-slate-900 font-medium shadow-sm">1</button>
               <button className="h-6 w-6 rounded hover:bg-slate-200 text-slate-600">2</button>
               <button className="h-6 w-6 rounded hover:bg-slate-200 text-slate-600">3</button>
               <span className="h-6 w-6 flex items-center justify-center">...</span>
               <button className="h-6 w-6 rounded hover:bg-slate-200 text-slate-600">35</button>
             </div>
             <button className="px-2 py-1 rounded hover:bg-slate-200 text-slate-600">Next</button>
             <select className="ml-2 h-6 rounded border-slate-300 bg-white text-xs">
               <option>10 / page</option>
               <option>20 / page</option>
               <option>50 / page</option>
             </select>
           </div>
        </div>
      </div>
    </div>
  );
};
