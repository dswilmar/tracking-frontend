import { format, parseISO } from 'date-fns';
import { EventProps } from '../../types/event';
import { Container, ResultCard } from './styles';

const Card = (props: EventProps) => {
    return (
        <Container>
            <ResultCard>
                <h2>{format(parseISO(props.eventDate.toString()), 'dd/MM/yyyy HH:mm:ss')}</h2>
                <p>{props.local}</p>
                <p>{props.description}</p>
            </ResultCard>
        </Container>
    )
}

export default Card;