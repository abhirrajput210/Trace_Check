import React from "react";
import "../../styles/navbar/Navbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="/">
          The Proof
        </a>
        <div className="d-flex align-items-center justify-content-center">
          <ul className="navbar-nav d-flex align-items-center justify-content-center">
            {/* <li className="nav-item">
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
            </li> */}
            <li className="nav-item">
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
              />
            </li>
          </ul>
        </div>
      </div>

      {/* <MetaMaskButton theme={"light"} color="white"></MetaMaskButton> */}
    </nav>
  );
}

export default Navbar;
