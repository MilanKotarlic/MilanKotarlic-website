import React from 'react'
import './Home.scss'

const Home = () => {
  return (
    <div className="home">
      {/* Navbar */}
      <header className="home__navbar">
        <div className="home__logo">Logo</div>
        <nav className="home__nav">Menu</nav>
      </header>

      {/* Hero Section */}
      <section className="home__hero">
        <h1>Hero Section</h1>
      </section>

      {/* Container Section */}
      <section className="home__container">
        <h2>Container Section</h2>
      </section>

      {/* Services Section */}
      <section className="home__services">
        <h2>Services Section</h2>
      </section>

      {/* Why Choose Section */}
      <section className="home__why-choose">
        <h2>Why Choose Us</h2>
      </section>

      {/* Contact Section */}
      <section className="home__contact">
        <h2>Contact Section</h2>
      </section>

      {/* Footer */}
      <footer className="home__footer">
        <p>Footer Section</p>
      </footer>
    </div>
  )
}

export default Home