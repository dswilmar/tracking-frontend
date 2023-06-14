import { ChangeEvent, FormEvent, useState } from 'react';
import { EventProps } from '../../types/event';
import { format, parseISO } from 'date-fns';
import styles from './trackingPage.module.css';

const TrackingPage = () => {

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
    <div className={styles.container}>
      <h1>Tracking</h1>
      <form onSubmit={handleSubmitTracking} className={styles.formContainer}>
        <input type="text" onChange={handleInputTracking} placeholder="Digite o código de rastreamento" />
        <button>Pesquisar</button>
      </form>
      { events.length > 0 && events.map((event: EventProps, index: number) => (
        <div key={index} className={styles.resultContainer}>
          <div className={styles.resultCard}>
            <h2>{format(parseISO(event.eventDate.toString()), 'dd/MM/yyyy HH:mm:ss')}</h2>
            <p>{event.local}</p>
            <p>{event.description}</p>            
          </div>
        </div>
      ))}
      { events.length === 0 && (
        <div className={styles.resultError}>
          <p>Ops! Nenhum resultado encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
