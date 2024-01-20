/* eslint-disable jsx-a11y/anchor-has-content */
import { useState, useEffect } from 'react';
import { TypePokemon } from '../types/TypePokemon';
import '.././App.css';
export default function ToutPoke() {
    const [data, setData] = useState<TypePokemon[] | undefined>();
    const [nomPoke, setNomPoke] = useState('');

    useEffect(() => {
        fetch(`https://tyradex.vercel.app/api/v1/pokemon`)
            .then((response) => response.json())
            .then((data) => {
                data.status === 404
                    ? alert(
                          'Impossible de trouver le Pokémon dans la base de données.',
                      )
                    : setData(data);
            })
            .catch((err) => console.error(err));
    }, []);
    const listPoke = data?.map((data, i) => (
        <li key={i}>
            <a
                className="dropdown-item"
                href="./#"
                onClick={() => setNomPoke(data.name.fr)}
            >
                {data.name.fr}
            </a>
        </li>
    ));

    const affPoke = data?.map((data, i) =>
        nomPoke === data.name.fr ? (
            <div key={i}>
                <div
                    className="container d-flex justify-content-center border border-primary rounded p-2"
                    style={{ width: 530 }}
                >
                    <div>
                        {' '}
                        <h1>{data.name.fr}</h1>
                        <img
                            src={`${data.sprites.regular}`}
                            style={{
                                height: 240,
                                width: 240,
                                backgroundColor: 'rgba(110, 30, 120, 1)',
                            }}
                            alt=""
                        />
                    </div>
                    <div
                        className="border border-primary-emphasis rounded p-2"
                        style={{
                            width: 100,
                            backgroundColor: 'rgba(50, 130, 250,1)',
                            color: 'white',
                        }}
                    >
                        <p>
                            Taille: {data.height}
                            <br />
                            Poids:{data.weight}
                            <br />
                            catch rate: {data.catch_rate}
                            <br />
                            <p>category:{data.category}</p>
                            <br />
                            <p> groupe: {data.egg_groups}</p>
                            <br />
                            {data.evolution.mega === null
                                ? ''
                                : data.evolution.mega.map((data) => data.name)}
                            <br />
                            forme:{data.forme}
                        </p>
                    </div>
                    <div
                        className="border border-primary rounded p-2"
                        style={{
                            backgroundColor: 'rgba(50, 130, 220,1)',
                            color: 'white',
                        }}
                    >
                        <p>
                            <br />
                            generation:{data.generation}
                            <br />
                            level_100:{data.level_100}
                            <br />
                            Id:{data.pokedexId}
                            <br />
                            Female:{data.sexe.female}
                            <br />
                            Male: {data.sexe.male}
                            <br />
                        </p>
                    </div>
                    <div
                        className="border border-primary-emphasis rounded p-2"
                        style={{
                            backgroundColor: 'rgba(50, 130, 120,1)',
                            color: 'white',
                        }}
                    >
                        <p>
                            HP: {data.stats.hp}
                            <br />
                            Attack: {data.stats.atk} <br />
                            Defense: {data.stats.def}
                            <br />
                            Attack Spé: {data.stats.spe_atk}
                            <br />
                            Defense Spé: {data.stats.spe_def}
                            <br />
                            Vitesse: {data.stats.vit}
                            <br />
                            <br />
                            Talents: {data.talents.map((data) => data.name)}
                            <br />
                            <br />
                            {data.types.map((data) => (
                                <img
                                    className="border border-info rounded "
                                    src={`${data.image}`}
                                    alt={`${data.name}`}
                                    title={`${data.name}`}
                                />
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            ''
        ),
    );

    const resist =
        data === null
            ? ''
            : data?.map((data) =>
                  nomPoke === data.name.fr
                      ? data.resistances.map((data, j) => (
                            <table className="table text-center">
                                <thead key={j}></thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {' '}
                                            {data.name}
                                            <td>{data.multiplier}</td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ))
                      : '',
              );

    const imagei = data?.map((data) =>
        nomPoke === data.name.fr ? (
            <img
                src={`${data.sprites.regular}`}
                className="card-img "
                alt=""
                style={{
                    height: 550,
                    width: 800,
                    backgroundColor: 'rgba(110, 30, 120, 1)',
                }}
            />
        ) : (
            ''
        ),
    );
    const defPoke = data?.map((data) =>
        nomPoke === data.name.fr ? (
            <div>
                <p>
                    Taille: {data.height} -- Poids: {data.weight} -- Categories:{' '}
                    {data.category}
                </p>

                <p></p>
            </div>
        ) : (
            ''
        ),
    );
    const test = data?.map((data) =>
        nomPoke === data.name.fr &&
        data.evolution.pre !== null &&
        data.evolution.mega !== null &&
        data.evolution.next
            ? data.evolution.pre.map((data) => data.name)
            : '',
    );
    console.log(test);

    return (
        <div>
            <div className="dropdown text-start ms-2">
                <a
                    className="btn btn-secondary dropdown-toggle"
                    href="./#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Pokemon
                </a>

                <ul className="dropdown-menu">{listPoke} </ul>

              //  {affPoke}
            </div>
            <div className="card text-white ">
                {imagei}
                <div
                    className="card-img-overlay "
                    style={{ width: 200, height: 150 }}
                >
                    <h5 className="card-title">{nomPoke}</h5>
                    <p className="card-text">{defPoke}</p>
                    <p className="card-text">
                        <small>
                            Groupe:{' '}
                            {data?.map((data) =>
                                nomPoke === data.name.fr ? (
                                    <>
                                        {data.egg_groups}
                                        <br /> HP:{data.stats.hp!} <br />
                                        Attack: {data.stats.atk} <br />
                                        Defense: {data.stats.def}
                                        <br />
                                        Attack Spé: {data.stats.spe_atk}
                                        <br />
                                        Defense Spé: {data.stats.spe_def}
                                        <br />
                                        Vitesse: {data.stats.vit}
                                        <br />
                                        Talents:{' '}
                                        {data.talents.map((data) => data.name)}
                                        <br />
                                        {data.types.map((data) => (
                                            <img
                                                className="border border-info rounded "
                                                src={`${data.image}`}
                                                alt={`${data.name}`}
                                                title={`${data.name}`}
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                }}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    ''
                                ),
                            )}
                        </small>
                    </p>
                </div>
            </div>
            <div className="container" style={{ width: 150, height: 100 }}>
                {resist}
            </div>
        </div>
    );
}
