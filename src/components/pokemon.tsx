import { useEffect, useState } from 'react';
import { TypePokemon } from '../types/TypePokemon';
import '.././App.css';

export default function Pokemon() {
    const [data, setData] = useState<TypePokemon | undefined>();
    const [current, setCurrent] = useState(1);
    useEffect(() => {
        fetch(`https://tyradex.vercel.app/api/v1/pokemon/${current}`)
            .then((response) => response.json())
            .then((data) => {
                data.status == 404
                    ? alert(
                          'Impossible de trouver le Pokémon dans la base de données.',
                      )
                    : setData(data);
            })
            .catch((err) => console.error(err));
    }, [current]);
    console.log(data);

    console.log(current);

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
                    current === 1
                        ? setCurrent(current)
                        : setCurrent(current - 1);
                }}
            >
                -
            </button>

            <div>
                {' '}
                <h2>{data?.name.fr}</h2>
            </div>

            <div className="d-flex justify-content-beween">
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
                {data?.sprites.gmax === null ? (
                    ''
                ) : (
                    <img
                        style={{ height: 200, width: 200 }}
                        src={`${data?.sprites.gmax}`}
                        alt=""
                    />
                )}{' '}
            </div>
            {data?.types.map((data, i) => (
                <div key={i} className="d-flex justify-content-center">
                    <p className="fs-6 align-middle">{data.name}</p>

                    <img
                        src={`${data.image}`}
                        style={{ height: 20, width: 20 }}
                    />
                </div>
            ))}

            {data?.egg_groups}
            <h5>Resistances</h5>
            {resist}
        </div>
    );
}
