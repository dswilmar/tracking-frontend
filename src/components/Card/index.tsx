import { format, parseISO } from 'date-fns';
import { EventProps } from '../../types/event';
import { ResultCard } from './styles';

const Card = (props: EventProps) => {
    return (
        <ResultCard aria-label="Resultado encontrado">
            <h2>{format(parseISO(props.eventDate.toString()), 'dd/MM/yyyy HH:mm:ss')}</h2>
            <p>{props.local}</p>
            <p>{props.description}</p>
        </ResultCard>
    )
}

export default Card;