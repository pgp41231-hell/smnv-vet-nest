import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, Bell, CalendarDays, Check, ChevronRight,
  Clock3, Heart, Home, MessageCircle, PawPrint, Search, ShieldCheck,
  Sparkles, Star, Stethoscope, UserRound, Video, X, Scissors,
  Syringe, FlaskConical, Bone, MapPin, Phone as PhoneCall, Navigation, Award,
  CheckCircle2, ClipboardCheck, Activity, CircleDot, BadgeCheck
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

const services = [
  { id: 1, name: 'At-home vet visit', short: 'Vet care at your doorstep', price: 899, duration: '45 min', Icon: Home, tone: 'green', popular: true, includes: ['Full physical examination', 'Treatment recommendation', 'Digital visit summary'] },
  { id: 2, name: 'Vaccination', short: 'Core & annual vaccines', price: 1299, duration: '30 min', Icon: Syringe, tone: 'coral', popular: true, includes: ['Vaccine consultation', 'Vaccine administration', 'Digital vaccination record'] },
  { id: 3, name: 'Full grooming', short: 'Bath, trim & tidy-up', price: 799, duration: '90 min', Icon: Scissors, tone: 'purple', includes: ['Breed-appropriate bath', 'Haircut and blow dry', 'Nail and ear cleaning'] },
  { id: 4, name: 'Diagnostic tests', short: 'Blood, urine & health panels', price: 499, duration: '20 min', Icon: FlaskConical, tone: 'blue', popular: true, includes: ['At-home sample collection', 'NABL-accredited lab', 'Digital report in 24 hours'] },
  { id: 5, name: 'Pet physiotherapy', short: 'Mobility & recovery support', price: 999, duration: '60 min', Icon: Activity, tone: 'green', includes: ['Mobility assessment', 'Guided therapy session', 'At-home exercise plan'] },
  { id: 6, name: 'Nutrition consult', short: 'A diet plan made for Bruno', price: 599, duration: '40 min', Icon: Bone, tone: 'gold', includes: ['Diet and lifestyle review', 'Personalised meal plan', 'Two-week follow-up'] },
  { id: 7, name: 'Dental cleaning', short: 'Fresh breath & oral care', price: 1499, duration: '75 min', Icon: Sparkles, tone: 'blue', includes: ['Oral health assessment', 'Plaque and tartar cleaning', 'Dental care guidance'] },
  { id: 8, name: 'Tick & flea care', short: 'Treatment and prevention', price: 699, duration: '35 min', Icon: ShieldCheck, tone: 'coral', includes: ['Skin and coat check', 'Anti-parasite treatment', 'Prevention schedule'] },
  { id: 9, name: 'Nail trimming', short: 'Quick, gentle paw care', price: 299, duration: '20 min', Icon: Scissors, tone: 'gold', includes: ['Stress-free handling', 'Safe nail trimming', 'Paw balm finish'] },
  { id: 10, name: 'Post-op care', short: 'Recovery checks at home', price: 1099, duration: '45 min', Icon: ClipboardCheck, tone: 'purple', includes: ['Wound and vitals check', 'Medication review', 'Recovery progress report'] },
  { id: 11, name: 'Pet training', short: 'Good habits, happier homes', price: 899, duration: '60 min', Icon: Award, tone: 'green', includes: ['Behaviour assessment', 'One-on-one training', 'Practice plan for parents'] },
];

const professionals = [
  { name: 'Aarav Menon', role: 'Senior Pet Care Specialist', rating: '4.92', jobs: 684, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=85' },
  { name: 'Meera Joshi', role: 'Certified Veterinary Nurse', rating: '4.96', jobs: 512, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=85' },
  { name: 'Kabir Anand', role: 'Pet Wellness Expert', rating: '4.88', jobs: 429, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=85' },
  { name: 'Ishita Rao', role: 'Grooming & Hygiene Expert', rating: '4.94', jobs: 731, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=85' },
  { name: 'Rohan Khanna', role: 'Animal Care Technician', rating: '4.89', jobs: 356, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=85' },
  { name: 'Tara Sen', role: 'Pet Behaviour Specialist', rating: '4.97', jobs: 608, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=85' },
  { name: 'Neil D’Souza', role: 'Home Care Specialist', rating: '4.91', jobs: 477, image: 'https://images.unsplash.com/photo-1527980965255-d3b416f882f9?auto=format&fit=crop&w=240&q=85' },
  { name: 'Sanya Kapoor', role: 'Pet Health Assistant', rating: '4.95', jobs: 543, image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=240&q=85' },
];

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
  const [selectedService, setSelectedService] = useState(services[0]);
  const [serviceJob, setServiceJob] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState('6:30 PM');
  const [reason, setReason] = useState('Not eating / low appetite');

  const openDoctor = (doc) => { setDoctor(doc); setScreen('doctor'); };
  const openService = (service) => { setSelectedService(service); setSelectedDate(0); setSelectedTime('10:30 AM'); setScreen('service-detail'); };
  const confirmService = () => {
    const professional = professionals[Math.floor(Math.random() * professionals.length)];
    setServiceJob({
      id: `VN${Math.floor(100000 + Math.random() * 900000)}`,
      service: selectedService,
      professional,
      date: dates[selectedDate],
      time: selectedTime,
      status: 'assigned',
    });
    setScreen('service-success');
  };
  const confirm = () => {
    onBook({ doctor, date: dates[selectedDate], time: selectedTime, reason });
    setScreen('success');
  };

  if (screen === 'services') return <ServicesScreen onBack={() => setScreen('home')} onSelect={openService} />;

  if (screen === 'service-detail') return <ServiceBookingScreen
    service={selectedService}
    selectedDate={selectedDate}
    selectedTime={selectedTime}
    onDate={setSelectedDate}
    onTime={setSelectedTime}
    onBack={() => setScreen('services')}
    onConfirm={confirmService}
  />;

  if (screen === 'service-success') return <ServiceSuccess job={serviceJob} onView={() => setScreen('job')} onHome={() => setScreen('home')} />;

  if (screen === 'job') return <JobScreen job={serviceJob} onBack={() => setScreen('home')} />;

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
      {serviceJob && <ServiceJobCard job={serviceJob} onClick={() => setScreen('job')} />}
      {appointment && <AppointmentCard appointment={appointment} />}
      <div className="search-box"><Search size={18}/><span>Search vets, services, concerns...</span></div>
      <div className="quick-title"><div><p className="eyebrow">CARE, WHEN YOU NEED IT</p><h2>How can we help?</h2></div><button onClick={() => setScreen('services')}>View all</button></div>
      <div className="service-grid">
        <button className="service-card primary"><span className="service-icon"><Video/></span><strong>Video consult</strong><small>Talk to a vet now</small><ArrowRight size={16}/></button>
        <button className="service-card" onClick={() => openService(services[0])}><span className="service-icon mint"><Stethoscope/></span><strong>At-home care</strong><small>Vet at your door</small></button>
        <button className="service-card" onClick={() => setScreen('services')}><span className="service-icon peach"><Scissors/></span><strong>Pet services</strong><small>Grooming & more</small></button>
        <button className="service-card" onClick={() => openService(services[3])}><span className="service-icon purple"><FlaskConical/></span><strong>Diagnostics</strong><small>Tests & health checks</small></button>
      </div>
      <div className="section-heading"><div><p className="eyebrow">TOP-RATED EXPERTS</p><h2>Available veterinarians</h2></div><button>See all</button></div>
      <div className="doctor-list">{doctors.map(doc => <DoctorCard key={doc.id} doctor={doc} onClick={() => openDoctor(doc)} />)}</div>
    </div>
    <ClientNav active={appointment ? 'bookings' : 'home'} />
  </ClientFrame>;
}

function ServicesScreen({ onBack, onSelect }) {
  const [category, setCategory] = useState('All');
  const visible = category === 'Popular' ? services.filter(service => service.popular) : services;
  return <ClientFrame>
    <Header title="Services & diagnostics" onBack={onBack} />
    <div className="scroll-content services-content">
      <div className="services-hero">
        <p className="eyebrow">EVERYDAY PET CARE</p>
        <h2>Care that comes<br/>to Bruno.</h2>
        <p>Trusted experts, transparent prices, one simple booking.</p>
        <div className="service-search"><Search size={16}/><span>What does Bruno need?</span></div>
      </div>
      <div className="category-tabs">
        {['All', 'Popular'].map(item => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
        <button onClick={() => setCategory('All')}>At home</button>
        <button onClick={() => setCategory('All')}>Wellness</button>
      </div>
      <div className="services-list-head"><div><p className="eyebrow">SERVICES + TESTS</p><h3>{visible.length} services available</h3></div><span>Prices incl. taxes</span></div>
      <div className="services-list">
        {visible.map(service => <button key={service.id} className="service-list-card" onClick={() => onSelect(service)}>
          <span className={`service-list-icon ${service.tone}`}><service.Icon size={20}/></span>
          <span className="service-list-copy"><strong>{service.name}</strong><small>{service.short}</small><em>{service.duration} · from ₹{service.price}</em></span>
          {service.popular && <span className="popular-tag">POPULAR</span>}
          <ChevronRight size={17}/>
        </button>)}
      </div>
      <div className="care-promise"><ShieldCheck size={20}/><div><strong>VetNest Care Promise</strong><span>Verified professionals · support on every job</span></div></div>
    </div>
    <ClientNav active="services" />
  </ClientFrame>;
}

function ServiceBookingScreen({ service, selectedDate, selectedTime, onDate, onTime, onBack, onConfirm }) {
  const Icon = service.Icon;
  return <ClientFrame>
    <Header title="Book service" onBack={onBack} />
    <div className="scroll-content service-booking-content">
      <div className={`service-detail-hero ${service.tone}`}>
        <span><Icon size={28}/></span>
        <p className="eyebrow">VETNEST VERIFIED</p>
        <h2>{service.name}</h2>
        <p>{service.short}</p>
        <div><span><Clock3 size={14}/>{service.duration}</span><span><Star size={14} fill="currentColor"/>4.9 average</span></div>
      </div>
      <SectionTitle title="What’s included" />
      <div className="included-list">{service.includes.map(item => <div key={item}><CheckCircle2 size={15}/><span>{item}</span></div>)}</div>
      <SectionTitle title="Choose a date" />
      <div className="date-row">{dates.map((d, i) => <button key={d.date} onClick={() => onDate(i)} className={`date-card ${selectedDate === i ? 'selected' : ''}`}><small>{d.day}</small><strong>{d.date}</strong><span>{d.month}</span></button>)}</div>
      <SectionTitle title="Choose arrival time" caption="IST" />
      <div className="slot-grid">{slots.map(time => <button key={time} onClick={() => onTime(time)} className={selectedTime === time ? 'selected' : ''}>{time}</button>)}</div>
      <SectionTitle title="Service address" />
      <div className="address-card"><span><MapPin size={17}/></span><div><strong>Home</strong><p>12, Palm Grove, Indiranagar<br/>Bengaluru, Karnataka 560038</p></div><button>Change</button></div>
      <div className="consult-note"><ShieldCheck size={17}/><span>Your professional will be assigned instantly after booking.</span></div>
    </div>
    <div className="sticky-cta"><div><small>Total</small><strong>₹{service.price}</strong></div><button onClick={onConfirm}>Confirm booking <ArrowRight size={17}/></button></div>
  </ClientFrame>;
}

function ServiceSuccess({ job, onView, onHome }) {
  return <ClientFrame>
    <div className="service-success-screen">
      <div className="success-confetti"><i/><i/><i/><i/><i/></div>
      <div className="success-mark"><Check size={32}/></div>
      <p className="eyebrow">BOOKING CONFIRMED</p>
      <h2>You’re all set!</h2>
      <p>{job.professional.name} has been assigned<br/>to take care of Bruno.</p>
      <div className="assigned-preview">
        <div className="assigned-banner">PROFESSIONAL ASSIGNED <BadgeCheck/></div>
        <img src={job.professional.image} alt={job.professional.name}/>
        <h3>{job.professional.name}</h3>
        <span>{job.professional.role}</span>
        <div><strong><Star size={13} fill="currentColor"/> {job.professional.rating}</strong><i/><span>{job.professional.jobs} jobs completed</span></div>
        <div className="assignment-time"><CalendarDays size={16}/><span><small>{job.date.day}, {job.date.date} August</small>{job.time} · {job.service.duration}</span></div>
      </div>
      <button className="join-btn" onClick={onView}>View job details <ArrowRight size={17}/></button>
      <button className="text-btn" onClick={onHome}>Back to home</button>
    </div>
  </ClientFrame>;
}

function JobScreen({ job, onBack }) {
  return <ClientFrame>
    <Header title="Job details" onBack={onBack} />
    <div className="scroll-content job-content">
      <div className="job-status-card">
        <div className="job-status-top"><span><i/> PROFESSIONAL ASSIGNED</span><small>Booking ID {job.id}</small></div>
        <h2>{job.service.name}</h2>
        <p>Everything is confirmed. We’ll notify you when your professional is on the way.</p>
        <div className="job-progress"><span className="done"><Check/></span><i/><span className="current"><CircleDot/></span><i/><span><Home/></span></div>
        <div className="job-progress-labels"><span>Booked</span><span>Assigned</span><span>Service</span></div>
      </div>
      <p className="job-label">YOUR PET CARE PROFESSIONAL</p>
      <div className="pro-card">
        <div className="pro-main"><div className="pro-photo"><img src={job.professional.image} alt={job.professional.name}/><BadgeCheck size={17}/></div><div><h3>{job.professional.name}</h3><p>{job.professional.role}</p><span><Star size={12} fill="currentColor"/> {job.professional.rating} <i/> {job.professional.jobs} jobs</span></div></div>
        <div className="pro-actions"><button><MessageCircle size={16}/> Message</button><button><PhoneCall size={16}/> Call</button></div>
      </div>
      <div className="job-info-card">
        <div><span><CalendarDays size={17}/></span><p><small>DATE & ARRIVAL</small><strong>{job.date.day}, {job.date.date} August · {job.time}</strong><em>Expected duration: {job.service.duration}</em></p></div>
        <div><span><MapPin size={17}/></span><p><small>SERVICE ADDRESS</small><strong>12, Palm Grove, Indiranagar</strong><em>Bengaluru, Karnataka 560038</em></p></div>
        <div><span><PawPrint size={17}/></span><p><small>PET</small><strong>Bruno · Golden Retriever</strong><em>4 years · Male</em></p></div>
      </div>
      <div className="payment-row"><div><small>PAYMENT SUMMARY</small><strong>{job.service.name}</strong></div><span>₹{job.service.price}</span></div>
      <button className="help-row"><ShieldCheck size={17}/><span><strong>Need help with this booking?</strong><small>VetNest support is available 24/7</small></span><ChevronRight size={17}/></button>
    </div>
    <div className="job-bottom"><button><Navigation size={17}/> Track professional</button></div>
  </ClientFrame>;
}

function ServiceJobCard({ job, onClick }) {
  return <button className="home-job-card" onClick={onClick}>
    <div className="home-job-head"><span><i/> UPCOMING SERVICE</span><small>View job <ChevronRight size={11}/></small></div>
    <div className="home-job-body"><img src={job.professional.image} alt=""/><div><strong>{job.service.name}</strong><span>{job.professional.name} · {job.time}</span></div><span className="assigned-pill">Assigned</span></div>
  </button>;
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
  const [demoSession, setDemoSession] = useState(0);
  const [events, setEvents] = useState([{id: 1, type: 'vet', text: 'Vet is online'}]);
  const addEvent = (type, text) => setEvents(prev => [...prev, {id: Date.now(), type, text}]);
  const book = data => { const appt = {...data, status: 'pending'}; setAppointment(appt); addEvent('client', 'Booking requested'); };
  const approve = () => { setAppointment(a => ({...a, status: 'approved'})); addEvent('vet', 'Request accepted'); };
  const ready = () => { setAppointment(a => ({...a, status: 'ready'})); setPrompt(true); addEvent('vet', 'Consultation started'); };
  const reset = () => {
    setAppointment(null);
    setPrompt(false);
    setEvents([{id: Date.now(), type: 'vet', text: 'Vet is online'}]);
    setDemoSession(session => session + 1);
  };

  return <main className="demo-shell">
    <header className="desktop-header"><div className="desktop-brand"><div className="brand-mark"><PawPrint size={21}/></div><div><strong>VetNest</strong><span>Connected care, demonstrated.</span></div></div><div className="demo-chip"><span/> INTERACTIVE PRODUCT DEMO</div></header>
    <section className="phones-stage">
      <Phone label="PET PARENT APP" tone="client"><ClientApp key={demoSession} appointment={appointment} onBook={book}/>{prompt && <ReadyPrompt appointment={appointment} onClose={() => setPrompt(false)}/>}</Phone>
      <ActivityRail events={events} onReset={reset}/>
      <Phone label="VETERINARIAN APP" tone="vet"><VetApp appointment={appointment} onApprove={approve} onReady={ready}/></Phone>
    </section>
    <footer><span>Tip: Explore services, book diagnostics, or start a teleconsultation on the pet parent app.</span><span>VetNest Demo · Care flows both ways</span></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
