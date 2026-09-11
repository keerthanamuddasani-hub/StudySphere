import { useEffect, useMemo, useState } from "react";
import { BookOpen, CalendarDays, Check, ChevronRight, Clock3, Flame, LayoutDashboard, Menu, Play, Plus, Search, Target, TimerReset, Trophy, X } from "lucide-react";

const subjects = [
  { name: "Discrete Mathematics", code: "DM", progress: 68, color: "#8b5cf6", topics: "17 / 25 topics" },
  { name: "Computer Networks", code: "CN", progress: 54, color: "#22d3ee", topics: "13 / 24 topics" },
  { name: "Operating Systems", code: "OS", progress: 41, color: "#a3e635", topics: "9 / 22 topics" },
  { name: "Algorithms", code: "AL", progress: 32, color: "#fb923c", topics: "7 / 21 topics" },
];

const initialTasks = [
  { id: 1, title: "Solve 15 CN PYQs", subject: "Computer Networks", time: "45 min", priority: "High", done: false },
  { id: 2, title: "Revise relations & functions", subject: "Discrete Mathematics", time: "30 min", priority: "Medium", done: true },
  { id: 3, title: "Java loops practice", subject: "Placement prep", time: "40 min", priority: "High", done: false },
  { id: 4, title: "Read OS process scheduling", subject: "Operating Systems", time: "35 min", priority: "Low", done: false },
];

const nav = [
  ["Overview", LayoutDashboard], ["My subjects", BookOpen], ["Study plan", CalendarDays],
  ["Focus room", Clock3], ["Goals", Target], ["PYQ tracker", Check],
  ["Exams", CalendarDays], ["Notes", BookOpen], ["Analytics", Trophy],
  ["Habit tracker", Flame], ["Resources", BookOpen], ["Placement prep", Target],
  ["Weekly schedule", CalendarDays], ["Profile", LayoutDashboard], ["Settings", TimerReset],
];

export default function Home() {
  const [tasks, setTasks] = useState(initialTasks);
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [running, seconds]);

  const filtered = useMemo(() => tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase())), [tasks, query]);
  const complete = tasks.filter((task) => task.done).length;
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  function toggleTask(id) {
    setTasks((items) => items.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  }

  function addTask(event) {
    event.preventDefault();
    if (!newTask.trim()) return;
    setTasks((items) => [...items, { id: Date.now(), title: newTask.trim(), subject: "General study", time: "30 min", priority: "Medium", done: false }]);
    setNewTask("");
    setShowAdd(false);
  }

  return (
    <main className="app-shell">
      <div className="signal-bar"><span className="live-dot" /> STUDY SIGNAL <strong>GATE 2027 · Consistency beats intensity</strong><span>Next mock test · Sunday</span></div>
      <header className="topbar">
        <button className="menu-button" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={21}/></button>
        <div className="brand"><div className="brand-mark">S</div><span>STUDY<span>SPHERE</span></span><em>COMMAND</em></div>
        <div className="search"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search today's tasks..." /></div>
        <div className="streak"><Flame size={18}/> <strong>12</strong><span>day streak</span></div>
        <div className="avatar">KM</div>
      </header>

      <div className="workspace">
        <aside className={mobileNav ? "sidebar sidebar--open" : "sidebar"}>
          <button className="close-menu" onClick={() => setMobileNav(false)} aria-label="Close menu"><X/></button>
          <p className="nav-label">WORKSPACE</p>
          <nav>{nav.map(([label, Icon]) => <button key={label} className={active === label ? "nav-item active" : "nav-item"} onClick={() => { setActive(label); setMobileNav(false); }}><Icon size={19}/>{label}{label === "Study plan" && <span className="nav-badge">4</span>}</button>)}</nav>
          <div className="exam-card"><p>GATE CSE 2027</p><strong>148</strong><span>days remaining</span><div className="exam-track"><i /></div><small>32% syllabus completed</small></div>
          <div className="sidebar-quote">“Small progress is still progress.”</div>
        </aside>

        <section className="content">
          <div className="welcome-row">
            <div><span className="eyebrow">FRIDAY · SEPTEMBER 11</span><h1>Ready to make today count?</h1><p>You have 3 focused tasks left. Start with your highest-priority goal.</p></div>
            <button className="primary-btn" onClick={() => setShowAdd(true)}><Plus size={18}/> Add task</button>
          </div>

          {active !== "Overview" ? <SectionView active={active} subjects={subjects} tasks={tasks} setActive={setActive} /> : <>
          <div className="stat-grid">
            <article className="stat-card"><div className="stat-icon purple"><Clock3/></div><div><span>FOCUS TIME</span><strong>3h 20m</strong><small>+42 min from yesterday</small></div></article>
            <article className="stat-card"><div className="stat-icon cyan"><Check/></div><div><span>TASKS DONE</span><strong>{complete} / {tasks.length}</strong><small>{Math.round((complete/tasks.length)*100)}% daily progress</small></div></article>
            <article className="stat-card"><div className="stat-icon lime"><Trophy/></div><div><span>WEEKLY SCORE</span><strong>82%</strong><small>Top 18% this week</small></div></article>
          </div>

          <div className="main-grid">
            <section className="panel today-panel">
              <div className="panel-head"><div><span className="eyebrow">YOUR PLAN</span><h2>Today’s focus</h2></div><button onClick={() => setActive("Study plan")}>View all <ChevronRight size={16}/></button></div>
              <div className="task-list">{filtered.map((task) => <div className={task.done ? "task done" : "task"} key={task.id}>
                <button className="task-check" onClick={() => toggleTask(task.id)} aria-label={`Mark ${task.title} complete`}>{task.done && <Check size={15}/>}</button>
                <div className="task-copy"><strong>{task.title}</strong><span>{task.subject} · {task.time}</span></div>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>)}</div>
            </section>

            <aside className="panel focus-panel">
              <div className="focus-orbit"><span>{minutes}:{secs}</span><small>FOCUS SESSION</small></div>
              <h2>Deep focus</h2><p>Put distractions away and finish one meaningful task.</p>
              <div className="timer-actions"><button className="play" onClick={() => setRunning(!running)}><Play size={18} fill="currentColor"/>{running ? "Pause" : "Start focus"}</button><button className="reset" onClick={() => { setRunning(false); setSeconds(25*60); }} aria-label="Reset timer"><TimerReset size={18}/></button></div>
            </aside>
          </div>

          <section className="subjects-section">
            <div className="section-title"><div><span className="eyebrow">SYLLABUS TRACKER</span><h2>Your subjects</h2></div><button onClick={() => setActive("My subjects")}>Manage subjects <ChevronRight size={16}/></button></div>
            <div className="subject-grid">{subjects.map((subject) => <article className="subject-card" key={subject.code} style={{"--subject": subject.color}}>
              <div className="subject-top"><span>{subject.code}</span><small>{subject.progress}%</small></div><h3>{subject.name}</h3><p>{subject.topics}</p><div className="progress"><i style={{width: `${subject.progress}%`}}/></div><button>Continue studying <ChevronRight size={16}/></button>
              </article>)}</div>
          </section>
          </>}
        </section>
      </div>

      {showAdd && <div className="modal-layer" onMouseDown={() => setShowAdd(false)}>
        <div className="task-dialog" onMouseDown={(event) => event.stopPropagation()}>
          <button className="modal-close" onClick={() => setShowAdd(false)} aria-label="Close"><X size={18}/></button>
          <h2>Add a study task</h2><p>Create one clear task for your study plan.</p>
          <form onSubmit={addTask} className="task-form">
            <label>Task name<input autoFocus value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="e.g. Solve 20 OS PYQs" /></label>
            <button type="submit" className="primary-btn">Add to plan</button>
          </form>
        </div>
      </div>}
    </main>
  );
}

function SectionView({ active, subjects, tasks, setActive }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const platformSections = {
    "PYQ tracker": { eyebrow: "QUESTION BANK", title: "Previous-year questions", text: "Measure practice by subject and revisit mistakes.", cards: [
      { title: "Discrete Mathematics", meta: "54 solved · 11 bookmarked", status: "72% accuracy" }, { title: "Computer Networks", meta: "38 solved · 8 bookmarked", status: "68% accuracy" }, { title: "Operating Systems", meta: "27 solved · 6 bookmarked", status: "63% accuracy" }]},
    "Exams": { eyebrow: "UPCOMING", title: "Exams & deadlines", text: "Keep every assessment and revision deadline in one place.", cards: [
      { title: "GATE CSE Mock Test 04", meta: "Sunday · 9:00 AM", status: "2 days left" }, { title: "Computer Networks Unit Test", meta: "Units 1–2 · 40 marks", status: "Revision due" }, { title: "Java Internal", meta: "Conditions, loops & arrays", status: "Practice ready" }]},
    "Notes": { eyebrow: "KNOWLEDGE VAULT", title: "Study notes", text: "Quickly return to your important concepts and revision sheets.", cards: [
      { title: "OSI layers — one-page revision", meta: "Computer Networks · Updated today", status: "12 key points" }, { title: "Relations & functions", meta: "Discrete Mathematics · Yesterday", status: "8 examples" }, { title: "CPU scheduling formulas", meta: "Operating Systems · Sep 8", status: "6 formulas" }]},
    "Analytics": { eyebrow: "PERFORMANCE", title: "Study analytics", text: "See where your time goes and what is improving.", cards: [
      { title: "21h 40m focused", meta: "This week · +14% vs last week", status: "Strong week" }, { title: "Tuesday is your best day", meta: "Average 4h 12m focused", status: "Peak output" }, { title: "CN needs attention", meta: "Lowest recent quiz accuracy", status: "Priority" }]},
    "Habit tracker": { eyebrow: "CONSISTENCY", title: "Habit tracker", text: "Build the small routines that protect your study momentum.", cards: [
      { title: "Morning revision", meta: "6 of 7 days completed", status: "86%" }, { title: "Daily PYQs", meta: "5 of 7 days completed", status: "71%" }, { title: "No-phone focus block", meta: "4 of 7 days completed", status: "57%" }]},
    "Resources": { eyebrow: "LIBRARY", title: "Learning resources", text: "Organize the courses, playlists, books, and sheets you trust.", cards: [
      { title: "GO Classes — Engineering Maths", meta: "Course · 18 lessons saved", status: "Continue" }, { title: "RBR — Computer Networks", meta: "Playlist · 24 videos", status: "In progress" }, { title: "GATE Overflow PYQs", meta: "Question bank · 2010–2026", status: "Open resource" }]},
    "Placement prep": { eyebrow: "CAREER TRACK", title: "Placement preparation", text: "Balance coding, projects, resume work, and interview practice.", cards: [
      { title: "Java foundations", meta: "Loops complete · Arrays next", status: "42%" }, { title: "DSA roadmap", meta: "0 of 12 modules complete", status: "Start next" }, { title: "Portfolio projects", meta: "2 deployed · 1 in progress", status: "StudySphere" }]},
    "Weekly schedule": { eyebrow: "TIME BLOCKS", title: "Weekly schedule", text: "A realistic plan around college, GATE, coding, and recovery.", cards: [
      { title: "Monday", meta: "CN revision · Java practice", status: "3h planned" }, { title: "Tuesday", meta: "DM concepts · CN PYQs", status: "2h 30m planned" }, { title: "Wednesday", meta: "OS lecture · Coding practice", status: "3h planned" }]},
    "Profile": { eyebrow: "STUDENT PROFILE", title: "Keerthana’s workspace", text: "Your goals and progress across StudySphere.", cards: [
      { title: "B.Tech CSE · 3rd year", meta: "SRM University", status: "Student" }, { title: "GATE CSE 2027", meta: "Target score: 40–50 marks", status: "Primary goal" }, { title: "Frontend development", meta: "React · JavaScript · GitHub", status: "Building" }]},
    "Settings": { eyebrow: "PREFERENCES", title: "Workspace settings", text: "Control your focus timer, reminders, and daily targets.", cards: [
      { title: "Focus duration", meta: "25 minutes per session", status: "Edit" }, { title: "Daily study target", meta: "6 focused hours", status: "Edit" }, { title: "Theme", meta: "Midnight blue", status: "Active" }]},
  };
  const content = {
    "My subjects": { eyebrow: "SYLLABUS", title: "My subjects", text: "Track every subject and continue from where you stopped." },
    "Study plan": { eyebrow: "WEEKLY PLAN", title: "Study plan", text: "Your complete task queue, ordered for focused progress." },
    "Focus room": { eyebrow: "DEEP WORK", title: "Focus room", text: "Choose a subject, remove distractions, and start a timed session." },
    "Goals": { eyebrow: "MILESTONES", title: "Goals", text: "Keep the outcomes that matter visible every day." },
  }[active] ?? platformSections[active] ?? { eyebrow: "WORKSPACE", title: active, text: "Your StudySphere workspace.", cards: [] };

  return <section className="section-view">
    <button className="back-btn" onClick={() => setActive("Overview")}>← Back to overview</button>
    <span className="eyebrow">{content.eyebrow}</span><h2>{content.title}</h2><p>{content.text}</p>
    {active === "My subjects" && <div className="view-grid">{subjects.map((s) => <article className="detail-card" key={s.code}><span style={{ color: s.color }}>{s.code}</span><h3>{s.name}</h3><p>{s.topics}</p><div className="progress"><i style={{ width: `${s.progress}%`, background: s.color }}/></div><strong>{s.progress}% complete</strong></article>)}</div>}
    {active === "Study plan" && <div className="plan-list">{tasks.map((t) => <article className="detail-card" key={t.id}><span>{t.priority} priority</span><h3>{t.title}</h3><p>{t.subject} · {t.time}</p><strong>{t.done ? "Completed" : "Ready to start"}</strong></article>)}</div>}
    {active === "Focus room" && <div className="detail-card focus-room"><Clock3 size={38}/><h3>25-minute focus session</h3><p>Pick your first task from today’s plan, silence notifications, and begin.</p><button className="primary-btn" onClick={() => setActive("Overview")}>Open focus timer</button></div>}
    {active === "Goals" && <div className="view-grid"><article className="detail-card"><Target/><h3>Complete core GATE subjects</h3><p>Target date: December 2026</p><strong>48% complete</strong></article><article className="detail-card"><Trophy/><h3>Reach a 30-day streak</h3><p>Current streak: 12 days</p><strong>18 days to go</strong></article><article className="detail-card"><BookOpen/><h3>Solve 500 PYQs</h3><p>Completed: 184 questions</p><strong>37% complete</strong></article></div>}
    {platformSections[active] && <div className="view-grid">{platformSections[active].cards.map((card) => <article className="detail-card" key={card.title}><span>{platformSections[active].eyebrow}</span><h3>{card.title}</h3><p>{card.meta}</p><strong>{card.status}</strong><button className="card-action" onClick={() => setSelectedCard(card)}>Open <ChevronRight size={15}/></button></article>)}</div>}
    {selectedCard && <div className="modal-layer" onMouseDown={() => setSelectedCard(null)}><div className="task-dialog" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedCard(null)} aria-label="Close"><X size={18}/></button><h2>{selectedCard.title}</h2><p>{selectedCard.meta}</p><div className="opened-detail"><span>Status</span><strong>{selectedCard.status}</strong><p>This item is ready inside your {active.toLowerCase()} workspace.</p></div></div></div>}
  </section>;
}
