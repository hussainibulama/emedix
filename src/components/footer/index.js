import React from "react";
import "./index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Logo from "../../assets/img/e-medix-logo-dark.png";

const Footer =()=> {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <div className="footer">
     <div className="footers">
         <div className="i40">
             <div>
                    <h3><img src={Logo} alt="logo"/></h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.</p>
                    <p>&copy; {year} All right reserved</p>
             </div>
         </div>
         <div className="i20">
             <div>
                 <h3>About us</h3>
                 <ul>
                     <li>Careers</li>
                     <li>About</li>
                     <li>Privacy & Policy</li>
                     <li>Terms & Comdition</li>
                     
                 </ul>
             </div>
         </div>
         <div className="i20">
             <div>
             <h3>Customer Care</h3>
                 <ul>
                     <li>Refund & Returns</li>
                     <li>How to buy</li>
                     <li>Help Center</li>
    
                 </ul>
             </div>
     
         </div>
         <div className="i40">
             <div>
             <h3>Contact us</h3>
             <p>70 Washington Square South, New York, NY 10012, United States</p>
             <p>Email: info@e-medix.ng</p>
             <p>Phone: +234 8136668344</p>
             <p>
                 <span>
                 <FontAwesomeIcon
                  className="fabag"
                  icon={faFacebookF}
                 
                />
                 </span>
                 &nbsp;
                 <span>
                 <FontAwesomeIcon
                  className="fabag"
                  icon={faInstagram}
                 
                />
                 </span>
                 &nbsp;
                 <span >
                 <FontAwesomeIcon
                  className="fabag"
                  icon={faWhatsapp}
                 
                />
                 </span>
                 </p>
             </div>
         </div>
     </div>
    </div>
  );
}
export default Footer;