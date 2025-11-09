import IMAGE from './assets/Visit-hub-ori.svg'
import './Header.css'

const imageStyle = {
    "height": "3rem"
}

const h1Style = {
    "display": "inline-block"
}
function Header(){
    return(
        <header>
            <img src={IMAGE} alt="LOGO" style={imageStyle}/>
            <h1 style={h1Style}>VISIT HUB</h1>
        </header>
    )
}

export default Header;