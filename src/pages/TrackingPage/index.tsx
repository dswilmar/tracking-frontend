import { ChangeEvent, FormEvent, useState } from 'react';
import { EventProps } from '../../types/event';
import { toast } from 'react-toastify';
import { Button, Container, Form, FormGroup, Input, Logo, ResultsContainer } from './styles';
import Card from '../../components/Card';
import logo from '../../images/logo.svg';

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
      if (data.length > 0) {
        setEvents(convertedEvents);
      } else {
        setEvents([]);
        toast.warn('Ops! Nada encontrado para este código de rastreamento ainda.');
      }
    } catch (error) {
      toast.error(`Ops! Ocorreu um erro: ${error}`);
      console.log(`Erro ocorrido na aplicação: ${error}`);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmitTracking}>
        <FormGroup>
          <h1>Rastreie sua encomenda</h1>
          <Logo src={logo} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="trackingCode">Digite o código de rastreamento</label>
          <Input type="text" name="trackingCode" onChange={handleInputTracking} placeholder="Digite o código de rastreamento" />
        </FormGroup>
        <FormGroup>
          <Button>Pesquisar</Button>
        </FormGroup>
      </Form>
      <ResultsContainer>
        { events.length > 0 && events.map((event: EventProps, index: number) => (
          <Card key={index} code={event.code} local={event.local} description={event.description} eventDate={event.eventDate} />
        ))}
      </ResultsContainer>
    </Container>
  );
};

export default TrackingPage;
