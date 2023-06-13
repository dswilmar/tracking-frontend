import { ChangeEvent, FormEvent, useState } from 'react';
import { EventProps } from './types/event';
import './App.css'
import { format, parseISO } from 'date-fns';

function App() {

  const [trackingCode, setTrackingCode] = useState<string>('');
  const [events, setEvents] = useState<EventProps[]>([]);

  const handleInputTracking = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackingCode(e.target.value);
  }

  const handleSubmitTracking = async(e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await fetch(`http://localhost:3000/events/${trackingCode}`);
      const data = await response.json();
      const convertedEvents : EventProps[] = data.map((item: any) => {
        const {code, eventDate, local, description} = item;
        return {code, eventDate, local, description};
      });
      setEvents(convertedEvents);
    } catch (error) {
      console.log(`Erro ocorrido na aplicação: ${error}`);
    }
  }

  return (
    <div>
      <h2>Rastreamento de encomendas</h2>
      <form onSubmit={handleSubmitTracking}>
        <input type="text" style={{
          marginRight: 10,
          padding: 10
        }}
        onChange={handleInputTracking}
          />
        <button type="submit">Rastrear</button>
      </form>
      <div>
      {events.map((event: EventProps, index: number) => (
        <div key={index}>
          <p>{format(parseISO(event.eventDate.toString()), 'dd/MM/yyyy HH:mm:ss')}</p>
          <p>{event.local}</p>
          <p>{event.description}</p>
          <hr />
        </div>
      ))}
    </div>
    </div>
  )
}

export default App
