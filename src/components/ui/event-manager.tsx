/** Adapted from the user-supplied EventManager reference: source events are read-only. */
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Clock3, List, Rows3 } from 'lucide-react';
import { addDays, days, layout, minutes, monday, weekday } from '../../model';
import type { Occurrence, Slot } from '../../model';
export type CalendarEvent=Occurrence & {slot:Slot;selected:boolean};
const HOUR=128;
export type View='month'|'week'|'day'|'list';
export function formatDate(date:string,opts:Intl.DateTimeFormatOptions={day:'numeric',month:'short'}) {return new Date(date+'T12:00:00Z').toLocaleDateString('en-GB',{...opts,timeZone:'UTC'});}
const color=(course:string)=>({gbs:'#087e80',gdb:'#3459b8',its:'#8951b0',ana:'#a95f22'})[course]||'#087e80';
export function EventCard({event,onClick,compact=false}:{event:CalendarEvent;onClick:(e:CalendarEvent)=>void;compact?:boolean}) {
 return <button className={`event-card ${event.selected?'chosen':''} ${event.status==='provisional'?'provisional':''} ${compact?'compact':''}`} style={{'--event-color':color(event.slot.course)} as CSSProperties} onClick={()=>onClick(event)} aria-label={`${event.slot.course.toUpperCase()} ${event.slot.label}, ${event.date}, ${event.start}–${event.end}, ${event.tutor}, ${event.room}`}>
  <span className="event-time">{event.start}–{event.end}{event.selected?' ✓':''}</span><strong>{event.slot.course.toUpperCase()} · {event.slot.label}</strong>{!compact&&<><span>{event.tutor}</span><span className="event-room">{event.room}</span></>}{event.status==='provisional'&&<small>Provisional dates</small>}
 </button>;
}
export function EventManager({events,today,now,onEventClick,initialDate,rangeFrom,rangeTo}:{events:CalendarEvent[];today:string;now:string;onEventClick:(e:CalendarEvent)=>void;initialDate:string;rangeFrom:string;rangeTo:string}){
 const [date,setDate]=useState(initialDate);const [view,setView]=useState<View>(()=>window.matchMedia('(max-width: 700px)').matches?'day':'week');
 useEffect(()=>{setDate(current=>current<rangeFrom?rangeFrom:current>rangeTo?rangeTo:current);},[rangeFrom,rangeTo]);
 const start=monday(date);const dateList=Array.from({length:view==='day'?1:view==='week'?5:7},(_,i)=>view==='day'?date:addDays(start,i));
 const navigate=(direction:number)=>{if(view==='month'){const d=new Date(date.slice(0,7)+'-01T12:00:00Z');d.setUTCMonth(d.getUTCMonth()+direction);setDate(d.toISOString().slice(0,10));}else setDate(addDays(date,direction*(view==='day'?1:7)));};
 const within=events.filter(e=>view==='day'?e.date===date:e.date>=start&&e.date<=addDays(start,6));
 const title=view==='month'?formatDate(date,{month:'long',year:'numeric'}):view==='day'?formatDate(date,{weekday:'long',day:'numeric',month:'long'}):`${formatDate(start)} – ${formatDate(addDays(start,6),{day:'numeric',month:'short',year:'numeric'})}`;
 const monthStart=monday(date.slice(0,7)+'-01');
 const gridDays=dateList.map(d=>({date:d,events:layout(events.filter(e=>e.date===d))}));
 // Each concurrent event keeps at least 172px; dense days scroll rather than hiding tutor/room.
 const cols=gridDays.map(d=>Math.max(190,...d.events.map(e=>e.lanes*172)));
 const gridWidth=64+cols.reduce((a,b)=>a+b,0);
 const scrollRef=useRef<HTMLDivElement>(null);
 const firstTime=within.length?Math.min(...within.map(e=>minutes(e.start))):540;
 useEffect(()=>{if(scrollRef.current)scrollRef.current.scrollTop=Math.max(0,(firstTime-420)*HOUR/60-30);},[date,view,firstTime]);
 return <section className="calendar-panel" aria-label="Study timetable">
 <div className="calendar-toolbar"><div><p className="eyebrow">WINTER 2026 / 27</p><h2>{title}</h2></div><div className="date-nav"><button aria-label="Previous period" onClick={()=>navigate(-1)}><ChevronLeft size={18}/></button><button onClick={()=>setDate(today)}>Today</button><button aria-label="Next period" onClick={()=>navigate(1)}><ChevronRight size={18}/></button></div></div>
 <div className="view-row"><div className="view-switch" aria-label="Calendar view">{([['month',CalendarDays],['week',Rows3],['day',Clock3],['list',List]] as const).map(([v,Icon])=><button key={v} aria-pressed={view===v} onClick={()=>setView(v)}><Icon size={15}/>{v[0].toUpperCase()+v.slice(1)}</button>)}</div><span className="timezone">Europe/Berlin · 24-hour time</span></div>
 {within.length===0&&view!=='month'&&<div className="calendar-empty">No sessions in this period. Choose a course, add a slot, or move to another week.</div>}
 {(view==='week'||view==='day')&&<><p className="scroll-hint">Swipe across to see every day and parallel group. Tap a block for details.</p><div className="time-scroll" ref={scrollRef} tabIndex={0} aria-label="Scrollable timetable"><div className="time-grid" style={{width:`max(100%, ${gridWidth}px)`,gridTemplateColumns:`64px ${cols.map(c=>`minmax(${c}px,1fr)`).join(' ')}`}}>
 <div className="time-heading">TIME</div>{dateList.map(d=><button key={d} className={`day-heading ${d===today?'today':''}`} onClick={()=>{setDate(d);setView('day');}}><span>{days[weekday(d)]}</span><strong>{d.slice(8)}</strong><small>{formatDate(d,{month:'short'})}</small></button>)}
 <div className="hours">{Array.from({length:13},(_,i)=><span key={i} style={{top:i*HOUR}}>{String(i+7).padStart(2,'0')}:00</span>)}</div>
 {gridDays.map(d=><div key={d.date} className={`day-column ${d.date===today?'today-column':''}`}>
 {d.events.map(e=><div key={e.id} className="positioned-event" style={{top:(minutes(e.start)-420)*HOUR/60,height:(minutes(e.end)-minutes(e.start))*HOUR/60-4,left:`calc(${e.lane/e.lanes*100}% + 3px)`,width:`calc(${100/e.lanes}% - 6px)`}}><EventCard event={e} onClick={onEventClick}/></div>)}
 {d.date===today&&minutes(now)>=420&&minutes(now)<1200&&<div className="now-line" data-testid="now-line" style={{top:(minutes(now)-420)*HOUR/60}}><span>{now}</span></div>}
 </div>)}
 </div></div></>}
 {view==='list'&&<div className="agenda">{dateList.map(d=><section key={d}><h3 className={d===today?'today-text':''}>{formatDate(d,{weekday:'long',day:'numeric',month:'short'})}</h3><div className="agenda-cards">{events.filter(e=>e.date===d).sort((a,b)=>a.start.localeCompare(b.start)).map(e=><EventCard key={e.id} event={e} onClick={onEventClick}/>)}{!events.some(e=>e.date===d)&&<p className="muted">No sessions</p>}</div></section>)}</div>}
 {view==='month'&&<div className="month-scroll"><div className="month-grid">{days.map(d=><div className="month-heading" key={d}>{d}</div>)}{Array.from({length:42},(_,i)=>{const d=addDays(monthStart,i);const es=events.filter(e=>e.date===d).sort((a,b)=>a.start.localeCompare(b.start));return <div key={d} className={`month-cell ${d.slice(0,7)!==date.slice(0,7)?'other-month':''}`}><button className={`month-date ${d===today?'today-text':''}`} onClick={()=>{setDate(d);setView('day');}}>{Number(d.slice(8))}</button>{es.slice(0,2).map(e=><EventCard key={e.id} event={e} onClick={onEventClick} compact/>)}{es.length>2&&<button className="more" onClick={()=>{setDate(d);setView('day');}}>+{es.length-2} more · view day</button>}</div>;})}</div></div>}
 </section>;
}
