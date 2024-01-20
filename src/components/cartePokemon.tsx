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
            'HP',
            'Attack',
            'Defense',
            'Vitesse',
            'Defense Spe',
            'Attack Spe',
        ],
        datasets: [
            {
                label: 'Statistique',
                data: [
                    dato?.stats.hp,
                    dato?.stats.atk,
                    dato?.stats.def,
                    dato?.stats.vit,
                    dato?.stats.spe_def,
                    dato?.stats.spe_atk,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],

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
    const determineMaxValue = (stats: any) => {
        const { atk, def, hp, spe_atk, spe_def, vit } = stats;

        switch (true) {
            case atk! >= 300 &&
                def! >= 300 &&
                hp! >= 300 &&
                spe_atk! >= 300 &&
                spe_def! >= 300 &&
                vit! >= 300:
                return 300;
            case atk! >= 250 &&
                def! >= 250 &&
                hp! >= 250 &&
                spe_atk! >= 250 &&
                spe_def! >= 250 &&
                vit! >= 250:
                return 250;
            case atk! >= 200 &&
                def! >= 200 &&
                hp! >= 200 &&
                spe_atk! >= 200 &&
                spe_def! >= 200 &&
                vit! >= 200:
                return 200;
            case atk! >= 150 &&
                def! >= 150 &&
                hp! >= 150 &&
                spe_atk! >= 150 &&
                spe_def! >= 150 &&
                vit! >= 150:
                return 150;
            case atk! >= 100 &&
                def! >= 100 &&
                hp! >= 100 &&
                spe_atk! >= 100 &&
                spe_def! >= 100 &&
                vit! >= 100:
        }
    };
    const max = determineMaxValue(dato?.stats || {});

    const options = {
        scales: {
            r: {
                min: 0,
                max: max,
                stepSize: 50,
            },
        },
    };
    const resistImmunite = dato?.resistances.map((data, i) =>
        data.multiplier === 0 ? (
            <div key={i} className="me-1 col">
                <img
                    style={{ height: 30 }}
                    src={`./${data.name}.png`}
                    alt=""
                    title={data.name}
                />
                <img
                    style={{ height: 30 }}
                    src={`./${data.name}.webp`}
                    alt=""
                    title={data.name}
                />
            </div>
        ) : (
            ''
        ),
    );

    const png = [
        'Eau',
        'Feu',
        'Glace',
        'Insecte',
        'Normal',
        'Plante',
        'Roche',
        'Sol',
        'Spectre',
    ];
    const resistNormal = dato?.resistances.map((data, i) =>
        data.multiplier === 1 ? (
            <div key={i} className="me-1 col">
                {png.includes(data.name) ? (
                    <img
                        className="col"
                        style={{ height: 30 }}
                        src={`./${data.name}.png`}
                        alt=""
                        title={data.name}
                    />
                ) : (
                    <img
                        className="col"
                        style={{ height: 30 }}
                        src={`./${data.name}.webp`}
                        alt=""
                        title={data.name}
                    />
                )}
            </div>
        ) : (
            ''
        ),
    );
    const resistFaiblesse = dato?.resistances.map((data, i) =>
        data.multiplier === 2 ? (
            <div key={i} className="me-1 col ">
                {png.includes(data.name) ? (
                    <img
                        className="col"
                        style={{ height: 30 }}
                        src={`./${data.name}.png`}
                        alt=""
                        title={data.name}
                    />
                ) : (
                    <img
                        className="col"
                        style={{ height: 30 }}
                        src={`./${data.name}.webp`}
                        alt=""
                        title={data.name}
                    />
                )}
            </div>
        ) : (
            ''
        ),
    );
    const resistFaiblesseX1 = dato?.resistances.map((data, i) =>
        data.multiplier === 0.25 ? (
            <div key={i} className="me-1 col ">
                {png.includes(data.name) ? (
                    <img
                        className="col"
                        style={{ height: 30 }}
                        src={`./${data.name}.png`}
                        alt=""
                        title={data.name}
                    />
                ) : (
                    <img
                        className="col"
                        style={{ height: 30 }}
                        src={`./${data.name}.webp`}
                        alt=""
                        title={data.name}
                    />
                )}
            </div>
        ) : (
            ''
        ),
    );
    const resistFaiblesseX2 = dato?.resistances.map((data, i) =>
        data.multiplier === 0.5 ? (
            <div key={i} className="me-1 col ">
                {png.includes(data.name) ? (
                    <img
                        className="col"
                        style={{ height: 30 }}
                        src={`./${data.name}.png`}
                        alt=""
                        title={data.name}
                    />
                ) : (
                    <img
                        className="col"
                        style={{ height: 30 }}
                        src={`./${data.name}.webp`}
                        alt=""
                        title={data.name}
                    />
                )}
            </div>
        ) : (
            ''
        ),
    );
    const resistFaiblesseX3 = dato?.resistances.map((data, i) =>
        data.multiplier === 0.75 ? (
            <div key={i} className="me-1 col ">
                {png.includes(data.name) ? (
                    <img
                        className="col"
                        style={{ height: 30 }}
                        src={`./${data.name}.png`}
                        alt=""
                        title={data.name}
                    />
                ) : (
                    <img
                        className="col"
                        style={{ height: 30 }}
                        src={`./${data.name}.webp`}
                        alt=""
                        title={data.name}
                    />
                )}
            </div>
        ) : (
            ''
        ),
    );

    return (
        <div>
            <div className="container d-flex justify-content-between mb-5">
                <button
                    className="btn btn-outline-primary mx-auto "
                    style={{ width: 50, height: 50 }}
                    onClick={() => {
                        current === 1017
                            ? setCurrent(current)
                            : setCurrent(current + 1);
                    }}
                >
                    +
                </button>
                <button
                    className="btn btn-outline-success mx-auto"
                    style={{ width: 50, height: 50 }}
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
            </div>
            <div className="container d-flex justify-content-between">
                <div
                    className="card"
                    style={{
                        width: 25 + '%',
                        backgroundColor: 'rgba(30,100,200,0.7)',
                    }}
                >
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
                    style={{
                        width: 35 + '%',
                        backgroundColor: 'rgba(30,100,200,0.4)',
                    }}
                >
                    {' '}
                    <h1 className="card-title">Statistique</h1>{' '}
                    <div className="card-body">
                        <div className="card-text">
                            <h4>Génération: {dato?.generation}</h4>

                            <div>
                                {dato?.evolution === null
                                    ? ''
                                    : dato?.evolution.next === null
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
                                {dato?.evolution === null
                                    ? ''
                                    : dato?.evolution.mega === null
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
                                {dato?.evolution === null
                                    ? ''
                                    : dato?.evolution.pre === null
                                    ? ''
                                    : dato?.evolution.pre.map((data) => (
                                          <h4>
                                              Précédente version: {data.name}
                                              <br />
                                          </h4>
                                      ))}
                            </div>
                            <div>
                                <h4>Résistances</h4>
                                <div className="">
                                    <div className="d-flex justify-content-around row gx-5">
                                        {' '}
                                        <p className="col">Immuniser (X0): </p>
                                        <div className="col row gx-5">
                                            {resistImmunite}
                                        </div>
                                    </div>
                                    <br />
                                    <div className="d-flex justify-content-around row gx-5">
                                        <p className="col">Normal (X1): </p>
                                        <div className="col row gx-5">
                                            {' '}
                                            {resistNormal}
                                        </div>
                                    </div>
                                    <br />
                                    <div className="d-flex justify-content-around row gx-5">
                                        <p className="col">Faiblesse (X2): </p>
                                        <div className="col row gx-5">
                                            {' '}
                                            {resistFaiblesse}
                                        </div>
                                    </div>
                                    <br />
                                    <div className="d-flex justify-content-around row gx-5">
                                        <p className="col">
                                            Resistance (X0.25):{' '}
                                        </p>
                                        <div className="col row gx-5">
                                            {' '}
                                            {resistFaiblesseX1}
                                        </div>
                                    </div>
                                    <br />
                                    <div className="d-flex justify-content-around row gx-5">
                                        <p className="col">
                                            Resistance (X0.5):{' '}
                                        </p>
                                        <div className="col row gx-5">
                                            {' '}
                                            {resistFaiblesseX2}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around row gx-5">
                                        <p className="col">
                                            Resistance (X0.75):{' '}
                                        </p>
                                        <div className="col row gx-5">
                                            {' '}
                                            {resistFaiblesseX3}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className=""
                    style={{
                        height: 400,
                        width: 400,
                        backgroundColor: 'rgba(30,100,200,0.4)',
                    }}
                >
                    {' '}
                    <Radar data={data} options={options} />
                </div>
            </div>
        </div>
    );
}
