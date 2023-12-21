import '../styles/Header.css';
//import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import waru3 from '../assets/waru3.png';
import BackButton from '../components/BackButton.js';
//import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Header() {

    return(
        <div className="Header">

         {/* <ArrowBackIosNewIcon /> */} 
            <img src={waru3}/> 
            <BackButton />
            {/* <ArrowBackIosIcon /> */}



    
        </div>
    );
    }

export default Header