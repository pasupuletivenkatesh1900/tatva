// app/components/Header.tsx
import React from "react";

interface HeaderProps {
  name: string;
  logoSrc?: string;
}

const Header: React.FC<HeaderProps> = ({ name, logoSrc }) => (
  <header className="header">
    <div className="header-flex-row">
      {/* Left side: Title */}
      <div className="header-title">
        <h1 className="plan-title">
          <span className="client-name">{name}</span> – <span className="plan-type">Nutrition Plan</span>
        </h1>
        <div className="divider"></div>
      </div>

      {/* Right side: Logo */}
      {logoSrc && (
        <div className="header-logo">
          <img src={logoSrc} alt="Logo" />
        </div>
      )}
    </div>
  </header>
);

export default Header;
