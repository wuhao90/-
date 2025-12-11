import React from 'react';
import { Button } from './ui/Button';
import { NAV_ITEMS } from '../constants';
import { ChevronRight, Plus, Download, Headphones } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform rotate-3">
             <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">MoreLogin</span>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="p-4 space-y-2">
        <Button className="w-full justify-center gap-2 font-semibold shadow-sm" size="lg">
          <Plus size={18} /> New Profile
        </Button>
        <Button variant="outline" className="w-full justify-center gap-2 border-slate-300 text-slate-600 hover:bg-slate-100">
          <Download size={18} /> Bulk Import
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`w-full justify-start gap-3 px-3 font-medium ${
              item.active 
                ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {item.icon}
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                item.badge === '●' ? 'text-red-500' : 'bg-orange-100 text-orange-600'
              }`}>
                {item.badge}
              </span>
            )}
          </Button>
        ))}
      </nav>

      {/* Plan Status */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Free Plan</span>
            <Button size="sm" className="h-6 text-xs bg-amber-500 hover:bg-amber-600 border-none text-white px-3">
              Renew
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Profiles:</span>
              <span className="font-medium text-slate-900">388/1000</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '38%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Members:</span>
              <span className="font-medium text-slate-900">28/32</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 pt-1 border-t border-slate-200 mt-2">
              <span>Remaining:</span>
              <span className="font-medium text-slate-900">273 Days</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Support Fab (Visual only, positioned absolute relative to screen in layout, or here) */}
    </aside>
  );
};
