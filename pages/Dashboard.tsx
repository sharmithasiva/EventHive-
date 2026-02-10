
import React from 'react';
import { User, UserRole, Booking, Event } from '../types';
import { MOCK_EVENTS, MOCK_BOOKINGS } from '../constants.tsx';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const isOrganizer = user.role === UserRole.ORGANIZER;
  const userBookings = MOCK_BOOKINGS.filter(b => b.userId === user.id);
  const myEvents = MOCK_EVENTS.filter(e => e.organizerId === user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 mt-1">Here is what's happening with your account.</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
           <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${isOrganizer ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
              {user.role} Account
           </div>
           {user.isVerified && (
             <span className="flex items-center text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-2 rounded-xl">
               Verified ✓
             </span>
           )}
        </div>
      </div>

      {isOrganizer ? (
        <div className="space-y-12">
           {/* Stats Row */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Revenue', value: '$12,450', change: '+12%', color: 'text-indigo-600' },
                { label: 'Active Events', value: myEvents.length.toString(), change: '0', color: 'text-slate-900' },
                { label: 'Total Tickets Sold', value: '450', change: '+8%', color: 'text-slate-900' },
                { label: 'Profile Views', value: '1.2k', change: '+24%', color: 'text-slate-900' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
           </div>

           {/* Event Management Table */}
           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-bold text-slate-900 text-xl">Manage Your Events</h3>
                 <button className="text-indigo-600 font-bold text-sm">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Event</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Booked</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {myEvents.map(event => (
                      <tr key={event.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4 font-bold text-slate-900">{event.title}</td>
                        <td className="px-6 py-4">
                           <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-lg uppercase">
                             {event.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-sm">{event.date}</td>
                        <td className="px-6 py-4 text-slate-500 text-sm">{event.bookedCount}/{event.capacity}</td>
                        <td className="px-6 py-4">
                           <button className="text-indigo-600 font-bold hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* My Tickets */}
          <div className="lg:col-span-2 space-y-8">
             <h2 className="text-2xl font-bold text-slate-900">Upcoming Experiences</h2>
             {userBookings.length > 0 ? (
               <div className="space-y-6">
                 {userBookings.map(booking => {
                   const event = MOCK_EVENTS.find(e => e.id === booking.eventId);
                   return event ? (
                     <div key={booking.id} className="flex flex-col md:flex-row bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition">
                       <div className="w-full md:w-48 h-32">
                         <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                       </div>
                       <div className="p-6 flex-1 flex flex-col justify-between">
                         <div>
                            <div className="flex justify-between">
                               <h3 className="font-bold text-slate-900 text-lg">{event.title}</h3>
                               <span className="text-indigo-600 font-bold">#{booking.id}</span>
                            </div>
                            <p className="text-slate-500 text-sm flex items-center mt-1">
                               <span className="mr-3">📅 {event.date}</span>
                               <span>🕒 {event.time}</span>
                            </p>
                         </div>
                         <div className="flex justify-between items-center mt-4">
                            <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">Confirmed</span>
                            <button className="text-slate-400 hover:text-red-500 text-sm font-semibold">Cancel</button>
                         </div>
                       </div>
                       <div className="bg-slate-900 flex items-center justify-center p-6 md:w-24">
                          <div className="text-white text-xs font-bold text-center">
                             <div className="text-2xl mb-1">🎫</div>
                             QR
                          </div>
                       </div>
                     </div>
                   ) : null;
                 })}
               </div>
             ) : (
               <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
                  <div className="text-4xl mb-4">🎟️</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">No tickets yet!</h3>
                  <p className="text-slate-500 mb-6">Your next big adventure is just a few clicks away.</p>
                  <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200">Explore Events</button>
               </div>
             )}
          </div>

          {/* Preferences & AI Recommendations */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mb-6">🤖</div>
               <h3 className="text-xl font-bold mb-3">AI Recommendations</h3>
               <p className="text-indigo-100 text-sm leading-relaxed mb-6">We've noticed you enjoy tech and music events. We're looking for similar experiences near you!</p>
               <ul className="space-y-3">
                 <li className="flex items-center gap-3 text-sm font-bold bg-white/10 p-3 rounded-xl hover:bg-white/20 cursor-pointer">
                    <span className="w-6 h-6 bg-white text-indigo-600 rounded-full flex items-center justify-center text-[10px]">✨</span>
                    Future of AI Summit
                 </li>
                 <li className="flex items-center gap-3 text-sm font-bold bg-white/10 p-3 rounded-xl hover:bg-white/20 cursor-pointer">
                    <span className="w-6 h-6 bg-white text-indigo-600 rounded-full flex items-center justify-center text-[10px]">✨</span>
                    Cyberpunk Music Night
                 </li>
               </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-900 mb-6">Account Settings</h3>
               <div className="space-y-4">
                  <button className="w-full text-left p-4 rounded-2xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-slate-100 transition">Profile Information</button>
                  <button className="w-full text-left p-4 rounded-2xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-slate-100 transition">Notification Settings</button>
                  <button className="w-full text-left p-4 rounded-2xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-slate-100 transition text-red-600">Privacy & Security</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
