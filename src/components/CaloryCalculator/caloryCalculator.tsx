import React, { useState, useEffect } from 'react';
import '@/styles/CaloryCalculator.scss';
import { App_Id, Api_Key } from '../../../apiconfig.js';
import Image from 'next/image'
import feij from '@/assets/top-view-brazilian-food-with-copy-space.jpg'


export default function CaloryCalculator() {
  const [foodQuery, setFoodQuery] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);

        if (foodQuery.trim() === '') {
          setResult(null);
          return;
        }

        console.log('Enviando requisição para a Nutritionix API...');

        const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': App_Id,
            'x-app-key': Api_Key,
          },
          body: JSON.stringify({
            query: foodQuery,
          }),
        });

        console.log('Resposta da Nutritionix API:', response);

        if (!response.ok) {
          throw new Error('Erro ao buscar dados de nutrição.');
        }

        const data = await response.json();
        console.log('Dados brutos recebidos da Nutritionix:', data);

        const translatedResult = await translateNutritionData(data);
        console.log('Dados traduzidos:', translatedResult);

        setResult(translatedResult);
      } catch (error) {
        console.error(error);
        setError('Erro ao processar a tradução dos dados.');
      }
    };

    fetchData();
  }, [foodQuery]);

  const translateNutritionData = async (data: any) => {
    const translationMap: Record<string, string> = {
      item_name: 'Nome do Item',
      brand_name: 'Marca',
      nf_calories: 'Calorias',
      serving_weight_grams: 'Peso do Alimento (g)',
      // Adicione outros rótulos e traduções conforme necessário
    };

    const translatedData: Record<string, any> = {};

    if (data.foods && data.foods.length > 0) {
      const food = data.foods[0];

      for (const key in food) {
        if (food.hasOwnProperty(key) && translationMap[key]) {
          const translatedValue = await translateText(food[key]);
          translatedData[translationMap[key]] = translatedValue;
        }
      }
    }

    return translatedData;
  };

  const translateText = async (text: string) => {
    try {
      const response = await fetch('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=pt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'SUA_CHAVE_DE_API_AQUI',
        },
        body: JSON.stringify([{ text }]),
      });

      console.log('Resposta da API de tradução:', response);

      if (!response.ok) {
        throw new Error('Erro na tradução do texto.');
      }

      const translation = await response.json();
      console.log('Tradução recebida:', translation);

      return translation[0]?.translations[0]?.text || text;
    } catch (error) {
      console.error(error);
      return text;
    }
  };

  return (
    <div className="containerCaloryCalculator">
      <div className="contentCaloryCalculator">
        <div className="searchCalory">
          <label>
            <h3>Descubra as calorias dos alimentos</h3>
          </label>
          <br />
          <input
            type="text"
            className="placeholder"
            placeholder="Digite aqui..."
            value={foodQuery}
            onChange={(e) => setFoodQuery(e.target.value)}
          />
          {result && (
            <div className='searchResult'>
              {result.photo && (
                <>
                  <Image src={result.photo.highres} alt="Imagem em alta resolução do alimento" className='searchImage' />
                </>
              )}
                  <h3>{result['Nome do Item']}</h3>
                  <p>peso : {result['Peso do Alimento (g)']}</p>
                  <p>calorias: {result['Calorias']}</p>
                  <button>adicionar</button>
            </div>
          )}

        </div>

        <h1>voce pode consulmir <span>2000</span> calorias diraias, se quiser imagrecer</h1>
        <div className='contentDadosSearchCalory'>
          
          <div className='ItemDadosSearch'>
          <Image src={feij} alt='feijão' className='contentDadosSearchImage'/>
          
          <h1>banana</h1>
          <p>peso: <span>200g</span></p>
          <p>calorias: <span>300</span></p> 
          <button>remove</button>
          </div>

          <div className='lastDadosCalory'>
           <h1> Sua refeição tem <span>3000</span> calorias </h1>
          </div>

        </div>
      </div>
    </div>
  );
}


