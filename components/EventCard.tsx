
import React from 'react';
import { Event, EventStatus } from '../types';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const isSoldOut = event.bookedCount >= event.capacity;

  return (
    <div 
      onClick={() => onClick(event)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur shadow-sm text-indigo-600 uppercase tracking-wider">
            {event.category}
          </span>
        </div>
        {event.isFeatured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 shadow-sm">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-1">
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="text-slate-900 font-bold">
            {event.price === 0 ? 'Free' : `$${event.price}`}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {event.title}
        </h3>
        
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img 
                key={i}
                className="w-7 h-7 rounded-full border-2 border-white"
                src={`https://picsum.photos/seed/${event.id}-${i}/50`}
                alt="Attendee"
              />
            ))}
            <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
              +{Math.max(0, event.bookedCount - 3)}
            </div>
          </div>
          <button className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            isSoldOut 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
          }`}>
            {isSoldOut ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
