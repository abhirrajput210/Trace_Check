import React from 'react'
import '../../styles/navbar/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="/">
          Logo
        </a>
        <div className="d-flex"> {/* Wrap menu items and Connect Wallet button */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                ABOUT US
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                CONTACT
              </a>
            </li>
            <li className="nav-item">
            <a href="/connect-wallet" className="btn btn-primary connect-wallet-button">
                Connect Wallet
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar