import '@/styles/Footer.scss'
import { BiWorld } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";


export function Footer(){
    return (
       
       <div className="containerFooter">
        <div className="contentFooter">
            <div>
                <input type="text" placeholder="nome"/>
                <input type="text" placeholder="email"/>
                <br/>
                <input type="text" placeholder="telefone" className='inputBigFooter'/>
                <br/>
                <input type="text" placeholder="mensagem" className='inputBigFooter'/>
                <br/>
                <button>Enviar</button>
            </div>      
        </div>
            <div className="FooterInfos">
                <div className='infoFooter'>
                <BiWorld  
                size={60}
                color="#E00056"
                style={{ marginTop:'15px' }}
                />
                  <h2>Localização</h2>
                  <p>clique e seja redirecionado</p>
                </div>
                <div className='infoFooter'>
                <MdAlternateEmail                
                size={60}
                color="#E00056"
                style={{ marginTop:'15px' }}/>
                <h2>Email</h2>
                  <p>gasfafd@gmail.com</p>
                </div>
                <div className='infoFooter'>
                <FaPhoneAlt                 
                size={60}
                color="#E00056"
                style={{ marginTop:'15px' }}
                />
                <h2>Telefone</h2>
                  <p>812848927347</p>
                </div>
                <div className='infoFooter'>
                <GrInstagram                 
                size={60}
                color="#E00056"
                style={{ marginTop:'15px' }}
                />
                <h2>instagram</h2>
                  <p>Nutri Vida</p>
                </div>
            </div>
  
       </div>


    )
}