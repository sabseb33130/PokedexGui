import { useState } from 'react';
import './App.css';
import Pokemon from './components/pokemon';
import ToutPoke from './components/toutpoke';
import CartePokemon from './components/cartePokemon';

function App() {
    const [page, setPage] = useState('');
    return (
        <div className="App">
            <button
                type="button"
                className="btn btn-outline-success me-4"
                onClick={() => setPage('pokemon')}
            >
                Pokemon
            </button>
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setPage('toutPoke')}
            >
                ToutPoke
            </button>
            <button
                type="button"
                className="btn btn-outline-warning"
                onClick={() => setPage('carte Pokemon')}
            >
                Carte Pokemon
            </button>
            {page === 'pokemon' && <Pokemon />}
            {page === 'toutPoke' && <ToutPoke />}
            {page === 'carte Pokemon' && <CartePokemon />}
        </div>
    );
}

export default App;
