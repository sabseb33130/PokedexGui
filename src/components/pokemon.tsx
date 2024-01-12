import { useEffect, useState } from 'react';
import { TypePokemon } from '../types/TypePokemon';
import '.././App.css';

export default function Pokemon() {
    const [data, setData] = useState<TypePokemon | undefined>();
    const [current, setCurrent] = useState(1);
    const [donnees, setDonnees] = useState('');
    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        inputPokemon(e);
    };
    const inputPokemon = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;
        console.log(value);

        //setTimeout(() => {
        setDonnees(value);
        //  }, 3000);
    };
    console.log(donnees);
    let testa = donnees === '' ? current : donnees;
    useEffect(() => {
        fetch(`https://tyradex.tech/api/v1/pokemon/${testa}`)
            .then((response) => response.json())
            .then((data) => {
                data.status === 404
                    ? alert(
                          'Impossible de trouver le Pokémon dans la base de données.',
                      )
                    : setData(data);
            })
            .catch((err) => console.error(err));
    }, [testa]);
    console.log(data);

    const resist = data?.resistances.map((data, i) => (
        <div key={i}>
            <h6 className="d-flex justify-content-around">
                {data.name}
                {'        '}
                {data.multiplier}
            </h6>
        </div>
    ));

    return (
        <div className="container-fluid">
            <button
                className="btn btn-outline-primary me-5 p-2"
                onClick={() => {
                    current === 1017
                        ? setCurrent(current)
                        : setCurrent(current + 1);
                }}
            >
                +
            </button>
            <button
                className="btn btn-outline-success p-2"
                onClick={() => {
                    donnees === ''
                        ? current === 1
                            ? setCurrent(current)
                            : setCurrent(current - 1)
                        : setCurrent(data?.pokedexId!);
                }}
            >
                -
            </button>

            <input type="text" onClick={(e) => inputPokemon(e)} />

            <div>
                {' '}
                <h2>{data?.name.fr}</h2>
            </div>

            <div className="container ">
                {data?.sprites.gmax === null ? (
                    <>
                        <label>Regular</label>
                        <img
                            style={{ height: 200, width: 200 }}
                            src={`${data?.sprites.regular}`}
                            alt=""
                        />
                        <label>Shiny</label>
                        <img
                            style={{ height: 200, width: 200 }}
                            src={`${data?.sprites.shiny}`}
                            alt=""
                        />
                    </>
                ) : (
                    <>
                        <img
                            style={{ height: 200, width: 200 }}
                            src={`${data?.sprites.regular}`}
                            alt=""
                        />
                        <img
                            style={{ height: 200, width: 200 }}
                            src={`${data?.sprites.shiny}`}
                            alt=""
                        />
                        <img
                            style={{ height: 200, width: 200 }}
                            src={`${data?.sprites.gmax.regular}`}
                            alt=""
                        />
                        <img
                            style={{ height: 200, width: 200 }}
                            src={`${data?.sprites.gmax.shiny}`}
                            alt=""
                        />
                    </>
                )}{' '}
            </div>
            {data?.types.map((data, i) => (
                <div key={i} className="d-flex justify-content-center">
                    <img
                        src={`${data.image}`}
                        style={{ height: 20, width: 20 }}
                        alt={data.name}
                        title={data.name}
                    />
                </div>
            ))}

            {/*   {data?.egg_groups}
           <h5>Resistances</h5>
            {resist}*/}
        </div>
    );
}
