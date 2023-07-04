import { ChangeEvent, FormEvent, useState } from 'react';
import { EventProps } from '../../types/event';
import { Button, Container, Form, Input } from './styles';
import Card from '../../components/Card';

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
    <Container>
      <h1>Tracking</h1>
      <Form onSubmit={handleSubmitTracking}>
        <Input type="text" onChange={handleInputTracking} placeholder="Digite o código de rastreamento" />        
        <Button>Pesquisar</Button>
      </Form>
              
      { events.length > 0 && events.map((event: EventProps, index: number) => (
        <Card key={index} code={event.code} local={event.local} description={event.description} eventDate={event.eventDate} />
      ))}
      
    </Container>
  );
};

export default TrackingPage;
