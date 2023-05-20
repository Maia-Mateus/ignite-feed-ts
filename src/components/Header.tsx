import style from './Header.module.css'
import igniteLogo from '../img/Ignite-simbol.svg'
export function Header(){
    return(
        <header className={style.headerclass}>
             <img src={igniteLogo} alt="logotipo do ignite" />
        </header>
       
    )
}