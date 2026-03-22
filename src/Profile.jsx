import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import playerAlias from './data/playerAlias.json'
import matches from './data/matches.json'
import tournament1 from './data/tournament1.json'
import tournament2 from './data/tournament2.json'
import tournament3 from './data/tournament3.json'

export default function Profile() {
    const params = useParams()
    const id = params.id ?? 1

    const navigate = useNavigate()

    const onNext = () => {
        if (id < 50) navigate(`/profile/${Number(id) + 1}`)
    }
    const onPrevious = () => navigate(`/profile/${Number(id) - 1}`)

    const { name, alias, ageGrp } = playerAlias[id - 1]

    const handleKeyDown = (ev) => {
        if (ev.key === 'Enter' || ev.key === 'ArrowRight') onNext()
        else if (ev.key === 'Backspace' || ev.key === 'ArrowLeft')
            if (Number(id) > 1) onPrevious()
    }
    document.addEventListener('keydown', handleKeyDown)

    const filteredGames = matches.filter(
        (game) => game.White === alias || game.Black === alias,
    )

    const getResult = (game) => {
        if (game.White === alias) {
            if (game.scoreWhite > game.scoreBlack) return 'win'
            if (game.scoreWhite < game.scoreBlack) return 'loss'
            return 'draw'
        } else {
            if (game.scoreBlack > game.scoreWhite) return 'win'
            if (game.scoreBlack < game.scoreWhite) return 'loss'
            return 'draw'
        }
    }

    const getRowStyle = (result) => {
        if (result === 'win') return { backgroundColor: '#d4edda' } // light green
        if (result === 'loss') return { backgroundColor: '#f8d7da' } // light red
        return {}
    }

    const rank1 = tournament1.findIndex((p) => p.alias === alias)
    const rank2 = tournament2.findIndex((p) => p.alias === alias)
    const rank3 = tournament3.findIndex((p) => p.alias === alias)

    const getRank = (num) => {
        if (num % 100 >= 11 && num % 100 <= 13) {
            return num + 'th'
        }

        switch (num % 10) {
            case 1:
                return num + 'st'
            case 2:
                return num + 'nd'
            case 3:
                return num + 'rd'
            default:
                return num + 'th'
        }
    }

    return (
        <>
            <section id="center2">
                <div className="hero">
                    {/* <img src={cplLogo} className="logo" /> */}
                    {/* <img src={reactLogo} className="framework" alt="React logo" /> */}
                    {/* <img src={viteLogo} className="vite" alt="Vite logo" /> */}
                </div>
                <h1 className="title">{name}</h1>
                <p className="subtitle">{`lichess ID: ${alias},  age: ${ageGrp}`}</p>

                <div>
                    <h2>Stats</h2>
                    {rank1 !== -1 && (
                        <p className="subtitle">
                            <span className="rank">
                                {`${getRank(Number(rank1) + 1)} `}
                            </span>
                            in the Ranker's Tournament 1{' '}
                            {`(Perf: ${tournament1[rank1].performance})`}
                        </p>
                    )}
                    {rank2 !== -1 && (
                        <p className="subtitle">
                            <span className="rank">
                                {`${getRank(Number(rank2) + 1)} `}
                            </span>
                            in the Ranker's Tournament 2{' '}
                            {`(Perf: ${tournament2[rank2].performance})`}
                        </p>
                    )}
                    {rank3 !== -1 && (
                        <p className="subtitle">
                            <span className="rank">
                                {`${getRank(Number(rank3) + 1)} `}
                            </span>
                            in the Ranker's Tournament 3{' '}
                            {`(Perf: ${tournament3[rank3].performance})`}
                        </p>
                    )}
                </div>

                <div className="tableContainer">
                    <h2>Games</h2>
                    <table
                        className="styled-table"
                        border="1"
                        cellPadding="10"
                        style={{ marginTop: 10 }}
                    >
                        <thead>
                            <tr>
                                <th>White</th>
                                <th>Score</th>
                                <th>Black</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGames.map((g, i) => {
                                const result = getResult(g)
                                return (
                                    <tr key={i} style={getRowStyle(result)}>
                                        <td>{g.White}</td>
                                        <td>
                                            {g.scoreWhite} - {g.scoreBlack}
                                        </td>
                                        <td>{g.Black}</td>
                                        <td className="result-text">
                                            {result}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="buttonsContainer">
                    <button className="module-button" onClick={onNext}>
                        Next!
                    </button>
                </div>
            </section>

            <section id="spacer"></section>
        </>
    )
}
