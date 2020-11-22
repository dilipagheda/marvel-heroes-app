import React from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import '../styles/Footer.scss'

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-container-inner">
        <div className="line1">Enjoying Marvel Heros App ?</div>
        <div className="line2">Please send your feedback to Dilip Agheda</div>
        <div className="line3">
          <MailOutlineIcon />
          <a href="mailto:dilip_agheda@yahoo.com">dilip_agheda@yahoo.com</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
