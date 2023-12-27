import '@/styles/BarInfo.scss';

import salad from '@/assets/salads.png'
import Image from 'next/image';



export default function BarInfo(){
    return(
        <div className='ContainerBarInfo'>

            <div className='contentBarInfo'>
                
                <h3>Oque fornecemos ?</h3>
                <p>Alcance a perda de peso de forma saudável, mantendo uma alimentação equilibrada, Descubra o seu gasto calórico através do cálculo personalizado de calorias.</p>
                <button>faça seu calculo</button>
            </div>
            <div className='imageOneBarInfo'>
             <Image src={salad} alt='salad' className='barInfoImageTwo'/>

            </div>

        </div>
    )
}