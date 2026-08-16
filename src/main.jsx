import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, Bell, CalendarDays, Check, ChevronRight,
  Clock3, Heart, Home, MessageCircle, PawPrint, Search, ShieldCheck,
  Sparkles, Star, Stethoscope, UserRound, Video, X
} from 'lucide-react';
import './styles.css';

const doctors = [
  {
    id: 1,
    name: 'Dr. Maya Kapoor',
    specialty: 'Small Animal Specialist',
    experience: '8 yrs experience',
    rating: '4.9',
    reviews: '248',
    price: 699,
    next: 'Today, 6:30 PM',
    color: '#e8a87c',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=320&q=85',
  },
  {
    id: 2,
    name: 'Dr. Arjun Mehta',
    specialty: 'General Veterinarian',
    experience: '6 yrs experience',
    rating: '4.8',
    reviews: '186',
    price: 599,
    next: 'Today, 7:00 PM',
    color: '#96bdac',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=320&q=85',
  },
  {
    id: 3,
    name: 'Dr. Riya Nair',
    specialty: 'Dermatology & Nutrition',
    experience: '10 yrs experience',
    rating: '5.0',
    reviews: '312',
    price: 799,
    next: 'Tomorrow, 10:30 AM',
    color: '#b6a1cf',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=320&q=85',
  },
];

const dates = [
  { day: 'Today', date: '16', month: 'Aug' },
  { day: 'Mon', date: '17', month: 'Aug' },
  { day: 'Tue', date: '18', month: 'Aug' },
  { day: 'Wed', date: '19', month: 'Aug' },
];
const slots = ['10:30 AM', '12:00 PM', '3:30 PM', '5:00 PM', '6:30 PM', '7:00 PM'];

function StatusBar({ light = false }) {
  return <div className={`status-bar ${light ? 'light' : ''}`}><span>9:41</span><div className="island"/><div className="status-icons"><span>▮▮▮</span><span>⌁</span><span className="battery"/></div></div>;
}

function Phone({ label, tone, children }) {
  return <div className="phone-wrap">
    <div className={`phone-label ${tone}`}><span className="dot" />{label}</div>
    <div className="phone">{children}</div>
  </div>;
}

function ClientNav({ active = 'home' }) {
  return <div className="bottom-nav">
    <NavIcon Icon={Home} label="Home" active={active === 'home'} />
    <NavIcon Icon={CalendarDays} label="Bookings" active={active === 'bookings'} />
    <div className="nav-paw"><PawPrint size={20}/></div>
    <NavIcon Icon={MessageCircle} label="Chat" />
    <NavIcon Icon={UserRound} label="Profile" />
  </div>;
}

function NavIcon({ Icon, label, active }) {
  return <div className={`nav-icon ${active ? 'active' : ''}`}><Icon size={18}/><span>{label}</span></div>;
}

function ClientApp({ appointment, onBook }) {
  const [screen, setScreen] = useState('home');
  const [doctor, setDoctor] = useState(doctors[0]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState('6:30 PM');
  const [reason, setReason] = useState('Not eating / low appetite');

  const openDoctor = (doc) => { setDoctor(doc); setScreen('doctor'); };
  const confirm = () => {
    onBook({ doctor, date: dates[selectedDate], time: selectedTime, reason });
    setScreen('success');
  };

  if (screen === 'doctor') return <ClientFrame>
    <Header title="Choose a slot" onBack={() => setScreen('home')} />
    <div className="scroll-content booking-content">
      <div className="selected-doctor">
        <img src={doctor.image} alt="" />
        <div><h3>{doctor.name}</h3><p>{doctor.specialty}</p><span><Star size={12} fill="currentColor"/> {doctor.rating} · {doctor.experience}</span></div>
      </div>
      <SectionTitle title="Select date" />
      <div className="date-row">{dates.map((d, i) => <button key={d.date} onClick={() => setSelectedDate(i)} className={`date-card ${selectedDate === i ? 'selected' : ''}`}><small>{d.day}</small><strong>{d.date}</strong><span>{d.month}</span></button>)}</div>
      <SectionTitle title="Available times" caption="IST" />
      <div className="slot-grid">{slots.map(s => <button key={s} onClick={() => setSelectedTime(s)} className={selectedTime === s ? 'selected' : ''}>{s}</button>)}</div>
      <SectionTitle title="What can we help with?" />
      <div className="reason-list">
        {['Not eating / low appetite', 'Skin or coat concern', 'Vomiting or digestion', 'Something else'].map(r => <button key={r} onClick={() => setReason(r)} className={reason === r ? 'selected' : ''}><span>{r}</span>{reason === r && <Check size={15}/>}</button>)}
      </div>
      <div className="consult-note"><ShieldCheck size={17}/><span>Your video consultation is private and secure.</span></div>
    </div>
    <div className="sticky-cta"><div><small>Consultation fee</small><strong>₹{doctor.price}</strong></div><button onClick={confirm}>Book consultation <ArrowRight size={17}/></button></div>
  </ClientFrame>;

  if (screen === 'success') return <ClientFrame>
    <div className="success-screen">
      <div className="success-mark"><Check size={32}/></div>
      <p className="eyebrow">REQUEST SENT</p>
      <h2>Your appointment<br/>is on its way!</h2>
      <p>We’ll let you know as soon as<br/>{appointment?.doctor.name || doctor.name} confirms.</p>
      <div className="ticket">
        <div className="ticket-top"><img src={doctor.image} alt=""/><div><strong>{doctor.name}</strong><span>Video consultation</span></div><Video size={20}/></div>
        <div className="ticket-dash"/>
        <div className="ticket-meta"><div><CalendarDays size={16}/><span><small>Date</small>{dates[selectedDate].day}, {dates[selectedDate].date} Aug</span></div><div><Clock3 size={16}/><span><small>Time</small>{selectedTime}</span></div></div>
      </div>
      <button className="outline-btn" onClick={() => setScreen('home')}>Back to home</button>
    </div>
  </ClientFrame>;

  return <ClientFrame>
    <div className="client-hero">
      <div className="top-row"><div><p>Good evening,</p><h2>Hi, Ananya <span>👋</span></h2></div><button className="icon-button"><Bell size={20}/><i/></button></div>
      <div className="pet-switcher"><div className="pet-avatar">🐶</div><div><small>CARE FOR</small><strong>Bruno <span>· Golden Retriever</span></strong></div><ChevronRight size={17}/></div>
    </div>
    <div className="scroll-content home-content">
      {appointment && <AppointmentCard appointment={appointment} />}
      <div className="search-box"><Search size={18}/><span>Search vets, services, concerns...</span></div>
      <div className="quick-title"><div><p className="eyebrow">CARE, WHEN YOU NEED IT</p><h2>How can we help?</h2></div><button>View all</button></div>
      <div className="service-grid">
        <button className="service-card primary"><span className="service-icon"><Video/></span><strong>Video consult</strong><small>Talk to a vet now</small><ArrowRight size={16}/></button>
        <button className="service-card"><span className="service-icon mint"><Stethoscope/></span><strong>Clinic visit</strong><small>Book nearby care</small></button>
        <button className="service-card"><span className="service-icon peach"><Home/></span><strong>At-home care</strong><small>Vet at your door</small></button>
        <button className="service-card"><span className="service-icon purple"><Sparkles/></span><strong>Diagnostics</strong><small>Tests & health checks</small></button>
      </div>
      <div className="section-heading"><div><p className="eyebrow">TOP-RATED EXPERTS</p><h2>Available veterinarians</h2></div><button>See all</button></div>
      <div className="doctor-list">{doctors.map(doc => <DoctorCard key={doc.id} doctor={doc} onClick={() => openDoctor(doc)} />)}</div>
    </div>
    <ClientNav active={appointment ? 'bookings' : 'home'} />
  </ClientFrame>;
}

function ClientFrame({ children }) { return <div className="phone-screen client-screen"><StatusBar/>{children}</div>; }

function Header({ title, onBack }) { return <div className="mobile-header"><button onClick={onBack}><ArrowLeft size={20}/></button><h3>{title}</h3><button className="more">•••</button></div>; }
function SectionTitle({ title, caption }) { return <div className="section-title"><h3>{title}</h3>{caption && <span>{caption}</span>}</div>; }

function DoctorCard({ doctor, onClick }) {
  return <button className="doctor-card" onClick={onClick}>
    <div className="doctor-photo" style={{background: doctor.color}}><img src={doctor.image} alt={doctor.name}/><span className="online-dot"/></div>
    <div className="doctor-info"><h3>{doctor.name}</h3><p>{doctor.specialty}</p><div className="doctor-stats"><span><Star size={12} fill="currentColor"/> {doctor.rating}</span><i/> <span>{doctor.experience}</span></div><div className="next-slot"><Clock3 size={12}/><span>Next: {doctor.next}</span></div></div>
    <div className="doctor-end"><Heart size={17}/><strong>₹{doctor.price}</strong><span>/ consult</span><div className="mini-arrow"><ChevronRight size={15}/></div></div>
  </button>;
}

function AppointmentCard({ appointment }) {
  const status = appointment.status;
  return <div className={`client-appt ${status}`}>
    <div className="appt-head"><span>{status === 'pending' ? 'Awaiting confirmation' : status === 'approved' ? 'Appointment confirmed' : 'Your vet is ready'}</span><span className="pulse-dot"/></div>
    <div className="appt-body"><img src={appointment.doctor.image} alt=""/><div><strong>{appointment.doctor.name}</strong><span>{appointment.date.day}, {appointment.date.date} Aug · {appointment.time}</span></div>{status === 'ready' ? <button><Video size={15}/> Join</button> : <ChevronRight size={18}/>}</div>
  </div>;
}

function VetApp({ appointment, onApprove, onReady }) {
  return <div className="phone-screen vet-screen">
    <StatusBar light/>
    <div className="vet-header"><div className="vet-brand"><div className="brand-mark"><PawPrint size={18}/></div><span>VetNest<small>PRO</small></span></div><button><Bell size={20}/>{appointment && appointment.status === 'pending' && <i/>}</button></div>
    <div className="vet-scroll">
      <div className="vet-welcome"><p>Sunday, 16 August</p><h1>Good evening,<br/><em>Dr. Maya.</em></h1><div className="availability"><span><i/> Available for consults</span><div className="toggle"><b/></div></div></div>
      <div className="vet-stats"><div><span className="stat-icon coral"><CalendarDays/></span><strong>{appointment ? '1' : '0'}</strong><small>Today’s<br/>appointments</small></div><div><span className="stat-icon green"><Video/></span><strong>{appointment?.status === 'ready' ? '1' : '0'}</strong><small>Ready to<br/>consult</small></div><div><span className="stat-icon gold"><Star/></span><strong>4.9</strong><small>Patient<br/>rating</small></div></div>
      <div className="vet-section-head"><div><p className="vet-eyebrow">YOUR DAY</p><h2>Appointments</h2></div>{appointment && <span>1 scheduled</span>}</div>
      {!appointment ? <div className="empty-state"><div><CalendarDays size={28}/></div><h3>No appointments yet</h3><p>New teleconsultation requests<br/>will appear here automatically.</p></div> : <VetAppointment appointment={appointment} onApprove={onApprove} onReady={onReady}/>} 
      <div className="insight-card"><div className="insight-icon"><Sparkles size={18}/></div><div><span>DAILY INSIGHT</span><strong>You’ve helped 14 pets this week</strong><p>That’s 3 more happy tails than last week.</p></div><ChevronRight size={17}/></div>
    </div>
    <div className="vet-nav"><NavIcon Icon={Home} label="Overview" active/><NavIcon Icon={CalendarDays} label="Schedule"/><div className="vet-main-action"><Video/></div><NavIcon Icon={MessageCircle} label="Messages"/><NavIcon Icon={UserRound} label="Profile"/></div>
  </div>;
}

function VetAppointment({ appointment, onApprove, onReady }) {
  const pending = appointment.status === 'pending';
  const approved = appointment.status === 'approved';
  return <div className={`vet-appt-card ${appointment.status}`}>
    <div className="vet-appt-status"><span><i/>{pending ? 'NEW REQUEST' : approved ? 'CONFIRMED' : 'CLIENT NOTIFIED'}</span><small>2 min ago</small></div>
    <div className="vet-appt-time"><div><Clock3 size={19}/><span><strong>{appointment.time}</strong><small>{appointment.date.day}, {appointment.date.date} August</small></span></div><span className="video-chip"><Video size={13}/> Video</span></div>
    <div className="patient-info"><div className="dog-photo">🐶</div><div><strong>Bruno</strong><span>Golden Retriever · 4 years</span><p><em>Parent</em> Ananya Sharma</p></div><button><MessageCircle size={17}/></button></div>
    <div className="concern"><small>REASON FOR CONSULTATION</small><p>“{appointment.reason}”</p></div>
    {pending && <div className="vet-actions"><button className="decline"><X size={16}/> Decline</button><button onClick={onApprove}><Check size={16}/> Accept request</button></div>}
    {approved && <div className="vet-actions single"><button onClick={onReady}><Video size={17}/> Start consultation</button></div>}
    {appointment.status === 'ready' && <div className="live-ready"><span><i/> Meeting room is live</span><button><Video size={16}/> Enter room</button></div>}
  </div>;
}

function ActivityRail({ events, onReset }) {
  return <div className="activity-rail">
    <div className="rail-line"/>
    <div className="sync-badge"><span className="sync-rings"><i/><i/><i/></span><strong>LIVE SYNC</strong><small>Both apps connected</small></div>
    <div className="event-stack">
      {events.slice(-3).reverse().map((e, i) => <div className={`event-pill ${e.type}`} key={e.id} style={{opacity: 1 - i * .24}}><span>{e.type === 'client' ? <UserRound size={13}/> : <Stethoscope size={13}/>}</span><div><small>{e.type === 'client' ? 'CLIENT' : 'VETERINARIAN'}</small><strong>{e.text}</strong></div></div>)}
    </div>
    <button className="reset-link" onClick={onReset}>↻ Reset demo</button>
  </div>;
}

function ReadyPrompt({ appointment, onClose }) {
  return <div className="prompt-backdrop"><div className="ready-prompt"><button className="prompt-close" onClick={onClose}><X size={18}/></button><div className="ready-avatar"><img src={appointment.doctor.image} alt=""/><span><Video size={14}/></span></div><p className="eyebrow">YOUR VET IS HERE</p><h2>{appointment.doctor.name}<br/>is ready for you</h2><p>Bruno’s private consultation room is now open.</p><button className="join-btn"><Video size={18}/> Join consultation</button><small>Secure, encrypted video call</small></div></div>;
}

function App() {
  const [appointment, setAppointment] = useState(null);
  const [prompt, setPrompt] = useState(false);
  const [events, setEvents] = useState([{id: 1, type: 'vet', text: 'Vet is online'}]);
  const addEvent = (type, text) => setEvents(prev => [...prev, {id: Date.now(), type, text}]);
  const book = data => { const appt = {...data, status: 'pending'}; setAppointment(appt); addEvent('client', 'Booking requested'); };
  const approve = () => { setAppointment(a => ({...a, status: 'approved'})); addEvent('vet', 'Request accepted'); };
  const ready = () => { setAppointment(a => ({...a, status: 'ready'})); setPrompt(true); addEvent('vet', 'Consultation started'); };
  const reset = () => { setAppointment(null); setPrompt(false); setEvents([{id: Date.now(), type: 'vet', text: 'Vet is online'}]); };

  return <main className="demo-shell">
    <header className="desktop-header"><div className="desktop-brand"><div className="brand-mark"><PawPrint size={21}/></div><div><strong>VetNest</strong><span>Connected care, demonstrated.</span></div></div><div className="demo-chip"><span/> INTERACTIVE PRODUCT DEMO</div></header>
    <section className="phones-stage">
      <Phone label="PET PARENT APP" tone="client"><ClientApp appointment={appointment} onBook={book}/>{prompt && <ReadyPrompt appointment={appointment} onClose={() => setPrompt(false)}/>}</Phone>
      <ActivityRail events={events} onReset={reset}/>
      <Phone label="VETERINARIAN APP" tone="vet"><VetApp appointment={appointment} onApprove={approve} onReady={ready}/></Phone>
    </section>
    <footer><span>Tip: Book a consultation on the left, then accept it on the right.</span><span>VetNest Demo · Care flows both ways</span></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
