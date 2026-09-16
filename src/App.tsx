import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, MessageCircle } from 'lucide-react';
import Sparkles from './components/Sparkles';
import DoorEntrance from './components/DoorEntrance';
import ScratchCard from './components/ScratchCard';
import Countdown from './components/Countdown';

export default function App() {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [showVenue, setShowVenue] = useState(false);

  // Set to a future date to ensure countdown is visible
  const weddingDate = '2026-11-15T18:00:00';
  const gcalLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Royal+Wedding:+Arthur+%26+Guinevere&dates=20261115T180000Z/20261115T230000Z&details=Join+us+for+our+sacred+celebration!&location=The+Royal+Palace,+Grand+Courtyard";
  const mapsLink = "https://www.google.com/maps/search/?api=1&query=The+Royal+Palace";

  return (
    <div className="min-h-screen bg-charcoal text-gold-light font-sans relative">
      <Sparkles />

      {/* Door Overlay: Covers screen initially, transitions out when opened */}
      <DoorEntrance isOpen={isDoorOpen} onOpen={() => setIsDoorOpen(true)} />

      {/* Main Content Area */}
      <main className={`relative z-10 max-w-3xl mx-auto px-6 py-16 sm:py-24 transition-all duration-[2000ms] ease-out origin-center ${
        isDoorOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 h-screen overflow-hidden'
      }`}>

         {/* Header Title Section */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isDoorOpen ? { opacity: 1, y: 0 } : {}}
           transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
           className="text-center"
         >
           <h2 className="uppercase tracking-[0.4em] text-xs sm:text-sm text-gold mb-6 font-medium">Together with their families</h2>
           <h1 className="font-serif text-6xl sm:text-8xl text-gold mb-8 mt-4 leading-tight">
             Arthur <br/>
             <span className="text-4xl sm:text-6xl italic text-gold-light/80">&amp;</span><br/> 
             Guinevere
           </h1>
           <p className="tracking-[0.3em] text-xs sm:text-sm uppercase text-gold/70">Request the honor of your presence</p>
         </motion.div>

         {/* Interactive Scratch-to-Reveal Card */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={isDoorOpen ? { opacity: 1 } : {}}
           transition={{ delay: 1.2, duration: 1 }}
           className="mt-16 text-center"
         >
           <ScratchCard revealDate={
             <div className="text-gold">
               <div className="font-serif text-2xl sm:text-3xl mb-2">Sunday, Nov 15th, 2026</div>
               <div className="font-sans tracking-widest text-xs sm:text-sm mt-1 uppercase">At six o'clock in the evening</div>
             </div>
           } />
         </motion.div>

         {/* Live Countdown Timer */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={isDoorOpen ? { opacity: 1 } : {}}
           transition={{ delay: 1.8, duration: 1 }}
         >
           <Countdown targetDate={weddingDate} />
         </motion.div>

         {/* Core Action Buttons */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isDoorOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12 mb-24"
         >
            <a href={gcalLink} target="_blank" rel="noreferrer" className="btn-gold px-8 py-4 rounded-full flex items-center justify-center gap-3 text-sm tracking-wider uppercase">
              <Calendar size={18} />
              Add to Calendar
            </a>
            <button onClick={() => setShowVenue(true)} className="border border-gold text-gold px-8 py-4 rounded-full flex items-center justify-center gap-3 hover:bg-gold/10 transition-colors text-sm tracking-wider uppercase">
              <MapPin size={18} />
              Venue Location
            </button>
         </motion.div>

         {/* Event Itinerary Timeline */}
         <div className="max-w-xl mx-auto mb-32">
            <h3 className="font-serif text-4xl text-gold text-center mb-16 relative inline-block left-1/2 -translate-x-1/2">
              <span className="relative z-10 bg-charcoal px-6">Itinerary</span>
              <div className="absolute top-1/2 left-0 w-full h-px bg-gold/30 -z-0"></div>
            </h3>
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-gold/30 before:to-transparent">
              {[
                { time: '4:00 PM', title: 'Welcome & Baraat', desc: 'Join us for a royal welcome.' },
                { time: '6:00 PM', title: 'Sacred Pheras / Vows', desc: 'The union of two souls under the stars.' },
                { time: '8:00 PM', title: 'Banquet & Reception', desc: 'An evening of feast and celebration.' }
              ].map((event, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                   {/* Timeline dot */}
                   <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gold/50 bg-charcoal text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                   </div>
                   
                   {/* Timeline content */}
                   <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-12 md:ml-0 p-6 rounded-2xl border border-gold/20 bg-charcoal shadow-lg hover:border-gold/50 transition-colors">
                      <div className="text-gold tracking-[0.2em] text-xs font-semibold mb-2 uppercase">{event.time}</div>
                      <div className="font-serif text-2xl text-gold-light mb-2">{event.title}</div>
                      <div className="text-sm text-gold-light/60 leading-relaxed">{event.desc}</div>
                   </div>
                </div>
              ))}
            </div>
         </div>

         {/* Romantic Quote & Dress Code block */}
         <div className="text-center border-t border-b border-gold/20 py-16 mb-24 relative">
           <span className="absolute left-1/2 -top-4 -translate-x-1/2 bg-charcoal px-6 text-gold/50 text-xl">✦</span>
           <p className="font-serif text-2xl sm:text-3xl text-gold-light/90 italic max-w-2xl mx-auto leading-relaxed">
             "Whatever our souls are made of, his and mine are the same."
           </p>
           <div className="mt-10 inline-block px-6 py-3 border border-gold/40 rounded-full text-xs sm:text-sm tracking-[0.2em] uppercase text-gold bg-gold/5">
             Dress Code: Black Tie Optional / Traditional
           </div>
           <span className="absolute left-1/2 -bottom-4 -translate-x-1/2 bg-charcoal px-6 text-gold/50 text-xl">✦</span>
         </div>

         {/* Replay Footer Trigger */}
         <div className="text-center pb-24">
           <button onClick={() => setIsDoorOpen(false)} className="text-xs text-gold/50 tracking-[0.3em] uppercase hover:text-gold transition-colors underline underline-offset-8">
             Replay Door Opening
           </button>
         </div>
      </main>

      {/* Floating RSVP Contact Pill */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noreferrer" 
        className="fixed bottom-6 right-6 z-40 bg-gold text-charcoal p-4 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:scale-110 transition-transform"
        aria-label="RSVP via WhatsApp"
      >
         <MessageCircle size={24} />
      </a>

      {/* Venue Location Modal Overlay */}
      {showVenue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-md" onClick={() => setShowVenue(false)}>
           <div className="bg-charcoal border border-gold rounded-3xl max-w-md w-full p-8 text-center shadow-[0_20px_60px_rgba(212,175,55,0.2)]" onClick={e => e.stopPropagation()}>
              <h3 className="font-serif text-3xl text-gold mb-3">The Royal Palace</h3>
              <p className="text-gold-light/70 text-sm mb-8 tracking-wide">123 Crown Estate, King's Road, London, UK</p>
              
              <div className="w-full h-48 bg-charcoal border border-gold/20 rounded-xl mb-8 flex items-center justify-center overflow-hidden relative group">
                 {/* High-quality external placeholder for venue */}
                 <img 
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Venue preview" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-80" />
              </div>

              <a href={mapsLink} target="_blank" rel="noreferrer" className="btn-gold w-full block py-4 rounded-full mb-4 uppercase tracking-widest text-sm">
                Open in Maps
              </a>
              <button onClick={() => setShowVenue(false)} className="w-full py-3 text-sm tracking-widest uppercase text-gold-light/60 hover:text-gold transition-colors">
                Close
              </button>
           </div>
        </div>
      )}

    </div>
  );
}
