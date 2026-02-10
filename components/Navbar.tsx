
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onLogin: (role: UserRole) => void;
  setCurrentPage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onLogin, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => setCurrentPage('home')} className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hidden sm:block">
                EventHive Pro
              </span>
            </button>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <button onClick={() => setCurrentPage('home')} className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Explore</button>
              <button onClick={() => setCurrentPage('events')} className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Events</button>
              {user?.role === UserRole.ORGANIZER && (
                <button onClick={() => setCurrentPage('create-event')} className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Create Event</button>
              )}
              {user?.role === UserRole.ADMIN && (
                <button onClick={() => setCurrentPage('admin')} className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Admin Panel</button>
              )}
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <button onClick={() => setCurrentPage('dashboard')} className="flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-indigo-600">
                  <img className="h-8 w-8 rounded-full border border-slate-200" src={user.avatar} alt="" />
                  <span>{user.name}</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => onLogin(UserRole.ATTENDEE)}
                  className="text-slate-600 px-4 py-2 text-sm font-semibold hover:text-indigo-600"
                >
                  Login
                </button>
                <button 
                  onClick={() => onLogin(UserRole.ATTENDEE)}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => {setCurrentPage('home'); setIsOpen(false)}} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50">Explore</button>
            <button onClick={() => {setCurrentPage('events'); setIsOpen(false)}} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50">Events</button>
            {user ? (
              <>
                <button onClick={() => {setCurrentPage('dashboard'); setIsOpen(false)}} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50">Dashboard</button>
                <button onClick={() => {onLogout(); setIsOpen(false)}} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
              </>
            ) : (
              <button onClick={() => {onLogin(UserRole.ATTENDEE); setIsOpen(false)}} className="block w-full text-left px-3 py-2 text-base font-medium text-indigo-600">Login / Signup</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
