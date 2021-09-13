import './footer.css'
import Logo from '../../assets/img/Logo.png';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer">
            <Link to="/"><img className="logoFooter" src={Logo} alt="logo" /></Link>
            <Link to="contact" className="footerItem"><p> Contact </p></Link> 
            <p>Created By Patricia Vilas</p>
        </div>
    );
}

export default Footer;