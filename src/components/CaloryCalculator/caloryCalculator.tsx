import '@/styles/CaloryCalculator.scss'
import { useEffect } from 'react';


export default function CaloryCalculator() {



    return (
        <div className="containerCaloryCalculator">
            <div className='contentCaloryCalculator'>

            <div className='searchCalory'>

                <label ><h3>Descubra as calorias dos alimentos</h3></label>
                <br />
                <input type="text" className='placeholder' placeholder="Digite aqui..." />
                <ul id="results"></ul>

            </div>

            <h1>voce pode consulmir <span>2000</span>  calorias diraias, se quiser imagrecer</h1>
          </div>
        </div>
    )
}