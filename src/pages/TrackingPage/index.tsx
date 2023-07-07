import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { EventProps } from '../../types/event';
import { toast } from 'react-toastify';
import { Button, Container, Form, FormGroup, Input, Logo, ResultsContainer } from './styles';
import Card from '../../components/Card';
import logo from '../../images/logo.svg';
import * as Sentry from '@sentry/react';

const TrackingPage = () => {

  const [trackingCode, setTrackingCode] = useState<string>('');
  const [events, setEvents] = useState<EventProps[]>([]);

  const trackingInputRef = useRef<HTMLInputElement>(null);

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
        toast.success(`Opa! Foram encontrados ${data.length} resultados!`, {
          role: "alert"
        });
        setEvents(convertedEvents);
      } else {
        setEvents([]);
        toast.warn('Ops! Nada encontrado para este código de rastreamento ainda.');
        setTrackingCode('');
        if (trackingInputRef.current) {
          trackingInputRef.current.focus();
        }
      }
    } catch (error) {
      toast.error(`Ops! Ocorreu um erro: ${error}`);
      Sentry.captureException(`Erro ao efetuar rastreamento: ${error}`);      
      setTrackingCode('');
      if (trackingInputRef.current) {
        trackingInputRef.current.focus();
      }
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmitTracking} role="search">
        <FormGroup>
          <h1>Rastreie sua encomenda</h1>
          <Logo src={logo} alt="Logotipo da página" />
        </FormGroup>
        <FormGroup>          
          <Input type="text" name="trackingCode" value={trackingCode} ref={trackingInputRef} onChange={handleInputTracking} placeholder="Digite o código de rastreamento" aria-required="true" required />
        </FormGroup>
        <FormGroup>
          <Button>Pesquisar</Button>
        </FormGroup>
      </Form>
      <ResultsContainer aria-live="assertive">
        { events.length > 0 && events.map((event: EventProps, index: number) => (
          <Card key={index} code={event.code} local={event.local} description={event.description} eventDate={event.eventDate} />
        ))}
      </ResultsContainer>
    </Container>
  );
};

export default TrackingPage;
