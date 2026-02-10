
import React, { useState } from 'react';
import { Event, User } from '../types';

interface EventDetailProps {
  event: Event;
  user: User | null;
  onBook: (eventId: string) => void;
  onBack: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, user, onBook, onBack }) => {
  const [ticketCount, setTicketCount] = useState(1);
  const isSoldOut = event.bookedCount >= event.capacity;

  return (
    <div className="pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-indigo-600 font-medium mb-8 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Events
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl">
              <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 flex gap-3">
                <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold text-indigo-600 shadow-sm">{event.category}</span>
                {event.price === 0 && <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">Free</span>}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-4 text-indigo-600 font-bold mb-4">
                <span className="uppercase tracking-widest text-sm">
                  {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="uppercase tracking-widest text-sm">{event.time}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{event.title}</h1>
              
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-10">
                 <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">📍</div>
                 <div>
                    <h3 className="font-bold text-slate-900">Location</h3>
                    <p className="text-slate-500">{event.location}</p>
                 </div>
              </div>

              <div className="prose prose-indigo max-w-none">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">About this Event</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {event.description}
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {event.longDescription || "Experience an unforgettable journey filled with knowledge, networking, and fun. This event is designed to bring together community leaders and enthusiasts from all over. Whether you are a beginner or a seasoned pro, there's something for everyone at " + event.title + "."}
                </p>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Hosted by</h3>
                <div className="flex items-center space-x-4">
                  <img className="h-16 w-16 rounded-2xl object-cover shadow-md" src="https://picsum.photos/seed/org1/200" alt="Organizer" />
                  <div>
                    <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                      Modern Events Co.
                      <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </h4>
                    <p className="text-slate-500">Premium Event Management & Strategy</p>
                    <button className="mt-2 text-indigo-600 font-semibold text-sm hover:underline">View Profile</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Tickets</h3>
                <span className="text-indigo-600 font-extrabold text-2xl">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Quantity</label>
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-2xl border border-slate-200">
                    <button 
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-slate-50 text-indigo-600 font-bold"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold text-slate-900">{ticketCount}</span>
                    <button 
                      onClick={() => setTicketCount(ticketCount + 1)}
                      className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-slate-50 text-indigo-600 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                   <span className="text-slate-500 font-medium">Total Price</span>
                   <span className="text-xl font-bold text-slate-900">${event.price * ticketCount}</span>
                </div>

                <button 
                  disabled={isSoldOut}
                  onClick={() => onBook(event.id)}
                  className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all ${
                    isSoldOut 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
                  }`}
                >
                  {isSoldOut ? 'Event Sold Out' : 'Confirm Booking'}
                </button>

                <p className="text-center text-xs text-slate-400">
                   No credit card required for free events. Secure payment powered by EventHive.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
                   <div className="text-center">
                      <div className="text-slate-900 font-bold">{event.capacity - event.bookedCount}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Left</div>
                   </div>
                   <div className="text-center">
                      <div className="text-slate-900 font-bold">{event.bookedCount}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Attendees</div>
                   </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-100 text-center">
               <h4 className="font-bold text-indigo-900 mb-2">Share this Event</h4>
               <p className="text-indigo-600/70 text-sm mb-4">Let your friends know you're attending!</p>
               <div className="flex justify-center space-x-3">
                  <button className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:scale-110 transition">🔗</button>
                  <button className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:scale-110 transition">🐦</button>
                  <button className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:scale-110 transition">👥</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
