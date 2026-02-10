
import React, { useState } from 'react';
import { generateEventDescription } from '../services/geminiService';
import { CATEGORIES } from '../constants.tsx';

export const CreateEvent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tech',
    description: '',
    date: '',
    time: '',
    location: '',
    price: 0,
    capacity: 100
  });

  const handleMagicWrite = async () => {
    if (!formData.title) {
        alert("Please enter a title first!");
        return;
    }
    setLoading(true);
    const generated = await generateEventDescription(formData.title, formData.category, "Networking, innovative, high-energy");
    setFormData({ ...formData, description: generated });
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-indigo-600 p-10 text-white">
          <h1 className="text-3xl font-extrabold mb-2">Create New Event</h1>
          <p className="text-indigo-100">Set the stage for your next big experience.</p>
        </div>

        <form className="p-10 space-y-8" onSubmit={(e) => {e.preventDefault(); alert('Event Created (Demo)')}}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Event Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Summer Music Gala 2024"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                {CATEGORIES.map(c => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Location</label>
              <input 
                type="text" 
                placeholder="City or Virtual"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-3">
                 <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Description</label>
                 <button 
                  type="button"
                  onClick={handleMagicWrite}
                  disabled={loading}
                  className="flex items-center gap-2 text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl hover:bg-indigo-100 transition"
                 >
                    {loading ? 'AI Thinking...' : '✨ Magic Write (AI)'}
                 </button>
              </div>
              <textarea 
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Tell your audience what makes this event special..."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Date</label>
              <input type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Time</label>
              <input type="time" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Ticket Price ($)</label>
              <input type="number" placeholder="0 for Free" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Capacity</label>
              <input type="number" placeholder="Max attendees" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
             <button type="submit" className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition">Publish Event</button>
             <button type="button" className="px-10 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 transition">Save Draft</button>
          </div>
        </form>
      </div>
    </div>
  );
};
