import { useState } from 'react'
import cplLogo from './assets/EGV_CPL_logo_bgRemoved.png'
import { useNavigate } from 'react-router-dom'

function Starter() {
    const navigate = useNavigate()
    const goToProfile1 = () => navigate('/profile/1')

    return (
        <>
            <section id="center">
                <div className="hero">
                    <img src={cplLogo} className="logo" />
                    {/* <img src={reactLogo} className="framework" alt="React logo" /> */}
                    {/* <img src={viteLogo} className="vite" alt="Vite logo" /> */}
                </div>
                <h1 className="title">EGV CPL Auction</h1>
                <p className="subtitle">
                    Welcome to the first edition of EGV Chess Premier League
                </p>
                <div className="buttonsContainer">
                    <button className="module-button" onClick={goToProfile1}>
                        Get Started!
                    </button>
                </div>
            </section>

            <section id="spacer"></section>
        </>
    )
}

export default Starter
