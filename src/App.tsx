import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css'

function App() {

  const [trackingCode, setTrackingCode] = useState<string>('');

  const handleInputTracking = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackingCode(e.target.value);
  }

  const handleSubmitTracking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Rastreamento: ${trackingCode}`);
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
    </div>
  )
}

export default App
