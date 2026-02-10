
import React from 'react';
import { CATEGORIES, MOCK_EVENTS } from '../constants.tsx';
import { EventCard } from '../components/EventCard';
import { Event } from '../types';

interface HomeProps {
  onEventClick: (event: Event) => void;
  setCurrentPage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onEventClick, setCurrentPage }) => {
  const featuredEvents = MOCK_EVENTS.filter(e => e.isFeatured);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-indigo-900">
        <div className="absolute inset-0 z-0 opacity-20">
           <img src="https://picsum.photos/seed/hero/1600/900" alt="Hero background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 z-0 opacity-90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Elevate Your <span className="text-indigo-400">Experience</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Discover and book the most exclusive events in town. From secret concerts to high-impact tech summits, find your next core memory here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentPage('events')}
              className="px-8 py-4 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/30 text-lg w-full sm:w-auto"
            >
              Browse Events
            </button>
            <button 
              onClick={() => setCurrentPage('create-event')}
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-md text-lg w-full sm:w-auto"
            >
              Organize Event
            </button>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="text-white font-bold text-2xl">TECHCORP</div>
            <div className="text-white font-bold text-2xl">GLOBALMUSIC</div>
            <div className="text-white font-bold text-2xl">EVENTMASTER</div>
            <div className="text-white font-bold text-2xl">VIBECHECK</div>
          </div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Search Events</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="What are you looking for?"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500"
                />
                <svg className="w-6 h-6 absolute left-4 top-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Location</label>
              <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500">
                <option>All Locations</option>
                <option>New York</option>
                <option>San Francisco</option>
                <option>Remote</option>
              </select>
            </div>
            <button className="h-full bg-indigo-600 text-white font-bold rounded-2xl py-4 mt-6 md:mt-0 hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
              Search
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                className={`p-6 rounded-3xl transition-all hover:scale-105 border border-transparent hover:border-indigo-200 ${cat.color} flex flex-col items-center justify-center space-y-3 shadow-sm hover:shadow-md`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="font-bold text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Featured Events</h2>
            <p className="text-slate-500 mt-2">Handpicked experiences you can't miss.</p>
          </div>
          <button 
            onClick={() => setCurrentPage('events')}
            className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-2 group"
          >
            View all <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} onClick={onEventClick} />
          ))}
        </div>
      </section>

      {/* Why EventHive */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">The Standard in Event Mgmt</h2>
            <p className="text-slate-400">Everything you need to host, book, and enjoy events at scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition">
              <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold">01</div>
              <h3 className="text-xl font-bold mb-4">Seamless Ticketing</h3>
              <p className="text-slate-400">Lightning-fast booking experience with instant QR ticket delivery and mobile-first access.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition">
              <div className="w-14 h-14 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold">02</div>
              <h3 className="text-xl font-bold mb-4">Organizer Portal</h3>
              <p className="text-slate-400">Powerful analytics, attendee management, and real-time sales tracking for professional hosts.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold">03</div>
              <h3 className="text-xl font-bold mb-4">Global Discovery</h3>
              <p className="text-slate-400">AI-powered recommendations based on your preferences and previous booking history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How do I get my ticket?", a: "Once your booking is confirmed, you'll receive an email with a unique QR code. You can also access it in your dashboard." },
            { q: "Can I get a refund?", a: "Refund policies vary by organizer. Usually, cancellations are allowed up to 48 hours before the event start time." },
            { q: "How can I host my own event?", a: "Simply sign up as an Organizer, verify your profile, and click 'Create Event' to start publishing." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-2">{item.q}</h4>
              <p className="text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">E</div>
                <span className="text-xl font-bold text-indigo-600 tracking-tight">EventHive Pro</span>
             </div>
             <p className="text-slate-500 max-w-sm mb-8">The most trusted platform for high-impact event discovery and professional management. Join the hive today.</p>
             <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition cursor-pointer">FB</div>
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition cursor-pointer">TW</div>
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition cursor-pointer">IG</div>
             </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4 text-slate-500">
              <li><button className="hover:text-indigo-600">Browse Events</button></li>
              <li><button className="hover:text-indigo-600">How it Works</button></li>
              <li><button className="hover:text-indigo-600">Organizer Portal</button></li>
              <li><button className="hover:text-indigo-600">Pricing</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-slate-500">
              <li><button className="hover:text-indigo-600">Help Center</button></li>
              <li><button className="hover:text-indigo-600">Contact Us</button></li>
              <li><button className="hover:text-indigo-600">Privacy Policy</button></li>
              <li><button className="hover:text-indigo-600">Terms of Service</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
          © 2024 EventHive Pro. All rights reserved. Designed for world-class experiences.
        </div>
      </footer>
    </div>
  );
};
