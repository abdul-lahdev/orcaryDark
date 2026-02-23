"use client";
import React, { useRef, useState, forwardRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import timegridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Shadcn Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CalendarComponent = () => {
  const calendarRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentView, setCurrentView] = useState('dayGridMonth');

  // Events Data with ISO Time (Week view fix ke liye)
  const [events, setEvents] = useState([
    { 
      title: '13:00 (60 min)', 
      description: 'Cardiology Surgery Session with Dr. Marie', 
      start: '2026-02-23T13:00:00', // Time added
      end: '2026-02-23T14:00:00',
      className: 'calendar-event-pill' 
    },
    { 
      title: '09:00 (2 hours)', 
      description: 'Internal Medicine Workshop', 
      start: '2026-02-08T09:00:00', 
      end: '2026-02-08T11:00:00',
      className: 'calendar-event-pill' 
    },
    { 
      title: '13:00 (info here)', 
      description: 'Weekly Lab Review and Data Entry', 
      start: '2026-02-11T13:00:00', 
      end: '2026-02-11T14:30:00',
      className: 'calendar-event-pill' 
    },
  ]);

  const handlePrev = () => calendarRef.current.getApi().prev();
  const handleNext = () => calendarRef.current.getApi().next();
  
  const handleViewChange = (view) => {
    setCurrentView(view);
    calendarRef.current.getApi().changeView(view);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    calendarRef.current.getApi().gotoDate(date);
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setIsModalOpen(true);
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="flex items-center gap-2 text-white font-medium text-sm outline-none" onClick={onClick} ref={ref}>
      {value}
      <ChevronDown size={18} className='cursor-pointer text-(--grey1)'/>
    </button>
  ));

  return (
    <div className="w-full">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-(--grey1) font-bold text-[20px]">Calendar</h1>
          <p className="text-[16px] font-normal text-(--grey3)">All upcoming events are available here.</p>
        </div>

        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => handleViewChange('dayGridMonth')} 
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${currentView === 'dayGridMonth' ? 'bg-(--dark3) text-white' : 'text-white/60 hover:text-white'}`}
          >
            Month
          </button>
          <button 
            onClick={() => handleViewChange('timeGridWeek')} 
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${currentView === 'timeGridWeek' ? 'bg-(--dark3) text-white' : 'text-white/60 hover:text-white'}`}
          >
            Week
          </button>
        </div>
      </div>

      {/* 2. Calendar Container */}
      <div className="calendar-container rounded-xl overflow-hidden border border-(--dark2)">
        <div className='flex justify-center bg-(--grey4) py-5 border-b border-(--dark2)'>
          <div className="flex items-center gap-6">
            <button onClick={handlePrev} className="text-(--grey1) bg-(--dark3) rounded-full p-2 hover:text-white transition-all">
              <ChevronLeft size={20} />
            </button>
            <div className="min-w-[120px] flex justify-center">
              <DatePicker selected={startDate} onChange={handleDateChange} dateFormat="MMMM yyyy" showMonthYearPicker customInput={<CustomInput />} />
            </div>
            <button onClick={handleNext} className="text-(--grey1) bg-(--dark3) rounded-full p-2 hover:text-white transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <FullCalendar
          ref={calendarRef}
          plugins={[daygridPlugin, timegridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          allDaySlot={false} // TimeGrid mein All Day bar hide karne ke liye
          slotMinTime="08:00:00" // Calendar 8 AM se dikhana shuru kare
          slotMaxTime="22:00:00" // Raat 10 PM tak
          dayMaxEvents={2}
          editable={true}
          selectable={true}
          dateClick={handleDateClick}
          events={events}
          eventContent={(eventInfo) => {
            const isWeekView = eventInfo.view.type === 'timeGridWeek';
            return (
              <div className="py-1 px-2 flex flex-col overflow-hidden h-full">
                <span className={`font-normal leading-tight text-black ${isWeekView ? 'text-[13px] font-bold' : 'text-[11px] md:text-[15px]'}`}>
                  {eventInfo.event.title}
                </span>
                {isWeekView && (
                  <span className="text-[11px] text-black/70 leading-tight mt-1 pt-1 border-t border-black/10">
                    {eventInfo.event.extendedProps.description}
                  </span>
                )}
              </div>
            );
          }}
        />
      </div>

      {/* 3. Shadcn Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-(--dark1) border-white/10 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-(--grey1)">Title</label>
              <Input placeholder="e.g. 13:00 (60 min)" className="bg-black/20 border-white/10 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-(--grey1)">Description</label>
              <Input placeholder="Full details..." className="bg-black/20 border-white/10 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-(--grey1)">Date</label>
              <Input value={selectedDate} disabled className="bg-black/40 border-white/10 text-(--grey1)" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)} className="bg-(--blue1) text-white w-full">Save Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 4. Combined Styles */}
      <style jsx global>{`
        .fc { --fc-border-color: rgba(255, 255, 255, 0.05); background: transparent; }
        .fc .fc-col-header-cell-cushion { color: #8A8A8E; background-color: #1e1e22; width: 100%; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 15px 0; }
        .fc .fc-daygrid-day-number { color: #ffffff; font-size: 14px; padding: 12px; opacity: 0.8; font-weight: 500; }
        .fc-theme-standard td, .fc-theme-standard th { border: 1px solid rgba(255, 255, 255, 0.08) !important; }
        .fc .fc-daygrid-day.fc-day-today { background: rgba(35, 165, 231, 0.1) !important; }
        
        /* Event Pill Styling - Month & Week */
        .fc-v-event, .fc-h-event { background-color: white !important; border: none !important; }
        .calendar-event-pill {
          background: #ffffff !important;
          color: #121216 !important;
          border-radius: 6px !important;
          margin: 2px 5px !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        /* TimeGrid (Week View) Fixes */
        .fc-timegrid-event { min-height: 60px !important; border-radius: 8px !important; }
        .fc-timegrid-event-harness { margin: 2px !important; }
        .fc .fc-timegrid-slot-label-cushion { color: #8A8A8E; font-size: 11px; }
        .fc .fc-timegrid-axis-cushion { color: #8A8A8E; }

        /* Hide Default Dots */
        .fc-daygrid-event-dot { display: none !important; }
        
        /* DatePicker Dark Theme */
        .react-datepicker { background-color: #1e1e22; border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 12px; }
        .react-datepicker__header { background-color: #2b2b31; border-bottom: none; }
        .react-datepicker__current-month, .react-datepicker__month-text { color: white; }
        .react-datepicker__month-text:hover { background-color: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
};

export default CalendarComponent;