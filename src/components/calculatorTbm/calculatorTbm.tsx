import '@/styles/CalculatorTbm.scss'
import Image from 'next/image'
import feij from '@/assets/top-view-brazilian-food-with-copy-space.jpg'

export default function CalculatorTbm(){
    return(
        <div className='containerCalculatorTbm'>
            <div className='contentImageCalculator'>
                <Image src={feij} alt='food' className='ImageCalculatorTbm'/>
                <div className='contentTextCalculator'>
                <h1>vamos calcular seu <br/> TBM</h1>
                <p>
                    TBM É a quantidade de energia necessária para manter as funções básicas do organismo, para calcularmos isso  pegaremos alguns dados seus  
                </p>
                </div>
            </div>
            <div className='calculatorInputs'>
                <h1>Vamos fazer seu calculo <span>TBM</span></h1>
                <form>
        <div className='caculatorInputsDisplay'>
            
        <label>
          Sexo:
          <select name="gender" >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </label>

        <label>
          Peso (kg):
          <input type="number" name="weight"  />
        </label>
        <br/>
        <label>
          Altura (cm):
          <input type="number" name="height"  className='inputMarginRight'/>
        </label>

        <label>
          Idade:
          <input type="number" name="age"  />
        </label>
        <br/>
           <button>Enviar</button>

           </div>
        </form>
  
       
            </div>
      
        </div>
    )
}