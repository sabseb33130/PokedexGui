import { useEffect, useState } from 'react';
import { TypePokemon } from '../types/TypePokemon';
import { Radar } from 'react-chartjs-2';
import { PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
export default function CartePokemon() {
    const [dato, setData] = useState<TypePokemon | undefined>();
    const [current, setCurrent] = useState(1);
    const [donnees, setDonnees] = useState('');
    const [visible, setVisible] = useState(false);
    let vissiblea = visible === true ? 'visible' : 'invisible';
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
    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        ArcElement,
        Filler,
        Tooltip,
        Legend,
    );

    const data = {
        labels: [
            'Attack',
            'Defense',
            'HP',
            'Attack Spe',
            'Defense Spe',
            'Vitesse',
        ],
        datasets: [
            {
                label: 'Statistique',
                data: [
                    dato?.stats.atk,
                    dato?.stats.def,
                    dato?.stats.hp,
                    dato?.stats.spe_atk,
                    dato?.stats.spe_def,
                    dato?.stats.vit,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                //'rgba(30, 99, 200, 0.2)',
                borderColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div>
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
                        : setCurrent(dato?.pokedexId!);
                }}
            >
                -
            </button>
            <div className="container d-flex justify-content-between">
                <div className="card" style={{ width: 20 + '%' }}>
                    {' '}
                    <h1 className="card-title">{dato?.name.fr}</h1>{' '}
                    <h5>Catégorie: {dato?.category}</h5>
                    <img
                        src={`${dato?.sprites.regular}`}
                        className="card-img-top"
                        alt={`${dato?.name.fr}`}
                    />
                    <div className="card-body">
                        <p className="card-text">
                            <p>Génération: {dato?.generation}</p>

                            <p>Groupe: {dato?.egg_groups}</p>
                            <p>
                                <h2> Talents:</h2>
                                {dato?.talents.map((data, i) => (
                                    <div key={i}>{data.name}</div>
                                ))}
                            </p>
                            <p>
                                {dato?.types.map((data) => (
                                    <img src={`${data.image}`} alt="" />
                                ))}
                            </p>
                        </p>
                        <a
                            href="./#"
                            className="btn btn-primary"
                            onClick={() => setVisible(!visible)}
                        >
                            Statistique
                        </a>
                    </div>
                </div>{' '}
                <div
                    className={`card ${vissiblea}`}
                    style={{ width: 20 + '%' }}
                >
                    {' '}
                    <h1 className="card-title">Statistique</h1>{' '}
                    <div className="card-body">
                        <div className="card-text">
                            <h4>Génération: {dato?.generation}</h4>

                            <div>
                                {dato?.evolution.next === null
                                    ? ''
                                    : dato?.evolution.next.map((data) => (
                                          <h4>
                                              Evolution: {data.name}
                                              <br />
                                          </h4>
                                      ))}
                            </div>
                            <br />
                            <div>
                                {dato?.evolution.mega === null
                                    ? ''
                                    : dato?.evolution.mega.map((data) => (
                                          <h4>
                                              mega: {data.name}
                                              {data.pokedexId}
                                              <br />
                                          </h4>
                                      ))}
                            </div>
                            <br />
                            <div>
                                {dato?.evolution.pre === null
                                    ? ''
                                    : dato?.evolution.pre.map((data) => (
                                          <h4>
                                              Précédente version: {data.name}
                                              <br />
                                          </h4>
                                      ))}
                            </div>
                            <div>
                                {dato?.resistances.map((data, i) => (
                                    <>
                                        <p key={i}>
                                            {data.name}
                                            {data.multiplier}
                                        </p>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="" style={{ height: 400, width: 400 }}>
                    {' '}
                    <PolarArea data={data} />
                </div>
            </div>
        </div>
    );
}
