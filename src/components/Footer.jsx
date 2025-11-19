function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer__title">EMPOWERment Inc</p>
        <p>109 N Graham St, Chapel Hill, NC 27516</p>
        <p>919-967-8779 • info@empowermentinc.org</p>
      </div>
      <div className="footer__cta">
        <p>Follow community updates and neighborhood resources.</p>
        <a
          className="cta-button cta-button--secondary"
          href="https://www.empowermentinc.org"
          target="_blank"
          rel="noreferrer"
        >
          Visit current site
        </a>
      </div>
    </footer>
  );
}

export default Footer;
