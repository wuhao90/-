import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProfileTable } from './components/ProfileTable';
import { Button } from './components/ui/Button';
import { Bell, Headphones, X } from 'lucide-react';

const App: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
             {/* Contextual Breadcrumb or Title could go here */}
             <div className="flex items-center gap-2 text-sm text-slate-500">
               <span className="font-medium text-slate-900">Browser</span>
               <span>/</span>
               <span>Profile List</span>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
                <Bell className="h-5 w-5 text-slate-500 hover:text-slate-700 cursor-pointer" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white">4</span>
             </div>
             <div className="h-8 w-px bg-slate-200 mx-1"></div>
             <Button variant="ghost" className="gap-2 pl-1 pr-2 hover:bg-slate-100">
                <div className="h-7 w-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                  M
                </div>
                <span className="text-sm font-medium text-slate-700">marketing</span>
             </Button>
          </div>
        </header>

        {/* Dismissible Banner */}
        {showBanner && (
          <div className="bg-orange-50 border-b border-orange-100 px-6 py-2.5 flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-sm text-orange-800">
               <span className="bg-orange-100 text-orange-600 rounded-full p-0.5">
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
               </span>
               <p>
                 <span className="font-semibold">50% OFF</span> Top-up & Earn up to <span className="font-semibold">20% Back</span>. Cloud phone Duration Packs now available. 
                 <a href="#" className="text-blue-600 hover:underline font-medium ml-2">Get Early Access &gt;&gt;</a>
               </p>
            </div>
            <button onClick={() => setShowBanner(false)} className="text-orange-400 hover:text-orange-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <ProfileTable />
        </div>
      </main>

      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6">
        <button className="h-14 w-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center transform hover:scale-105 active:scale-95">
          <Headphones size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;
