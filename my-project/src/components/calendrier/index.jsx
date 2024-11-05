import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEventModal from './edt';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddEvent = () => {
    setEvents([...events, {
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
    }]);
    closeModal();  // Fermer la modale après l'ajout
    setNewEvent({ title: '', start: '', end: '' });
  };

  return (
    <div className="h-screen p-4 bg-gray-100 dark:bg-gray-900">
      {/* Bouton pour ouvrir la modale */}
      <button
        onClick={openModal}
        className="mb-4 px-4 py-2 bg-blue-950 text-white rounded-md shadow hover:bg-gray-600"
      >
       <i className='fa fa-plus'></i> Ajouter un emplois du temps
      </button>

      {/* Modale d'ajout d'événements */}
      <AddEventModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleAddEvent={handleAddEvent}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
      />

      {/* Calendrier */}
      <div className="h-screen">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow"
        />
      </div>
    </div>
  );
};

export default MyCalendar;
