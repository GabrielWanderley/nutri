import '@/styles/CalculatorTbm.scss'
import Image from 'next/image'
import feij from '@/assets/top-view-brazilian-food-with-copy-space.jpg'
import { useState, useEffect } from 'react';
import { useTbmContext } from '../../context/tbmContext.jsx';

export default function CalculatorTbm(){
  const { setTbm } = useTbmContext();

  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [tbmResult, setTbmResult] = useState<string | null>(null);

  useEffect(() => {
    // Carrega o valor de tbmResult do localStorage quando a página é montada
    const savedTbmResult = localStorage.getItem('tbmResult');
    if (savedTbmResult) {
      setTbmResult(savedTbmResult);
    }
  }, []);

  const calculateTbm = () => {
    // Verifica se todos os campos necessários foram preenchidos
    if (!gender || !weight || !height || !age) {
      alert('Preencha todos os campos para calcular o TBM.');
      return;
    }

    // Converte as strings de peso, altura e idade para números
    const numericWeight = parseFloat(weight);
    const numericHeight = parseFloat(height);
    const numericAge = parseFloat(age);

    // Verifica se as conversões foram bem-sucedidas
    if (isNaN(numericWeight) || isNaN(numericHeight) || isNaN(numericAge)) {
      alert('Certifique-se de inserir números válidos para peso, altura e idade.');
      return;
    }

    // Fórmula de Harris-Benedict para homens e mulheres
    const tbm =
      gender === 'male'
        ? 88.362 + 13.397 * numericWeight + 4.799 * numericHeight - 5.677 * numericAge
        : 447.593 + 9.247 * numericWeight + 3.098 * numericHeight - 4.330 * numericAge;

    setTbmResult(tbm.toFixed(2));
    localStorage.setItem('tbmResult', tbm.toFixed(2));


  
  };
  setTbm(tbmResult);
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
          <select name='gender' value={gender} onChange={(e) => setGender(e.target.value)} >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </label>

        <label>
          Peso (kg):
          <input type="number"  name='weight' value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <br/>
        <label>
          Altura (cm):
          <input type="number" name="height"  value={height} onChange={(e) => setHeight(e.target.value)}className='inputMarginRight'/>
        </label>

        <label>
          Idade:
          <input type="number" name="age"  value={age} onChange={(e) => setAge(e.target.value)}  />
        </label>
        <br/>
           <button type='button' onClick={calculateTbm}>
            Enviar
            </button>
        {/* Exibe o resultado do TBM se estiver disponível */}
        {tbmResult && (
          <div className='tbmResult'>
            <h2>Seu TBM é: <span>{tbmResult}</span> calorias por dia.</h2>
          </div>
        )}
           </div>
        </form>
  
       
            </div>
      
        </div>
    )
}