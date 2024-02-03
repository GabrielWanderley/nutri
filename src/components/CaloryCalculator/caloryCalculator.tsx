import React, { useState, useEffect } from 'react';
import '@/styles/CaloryCalculator.scss';
import { App_Id, Api_Key } from '../../../apiconfig.js';
import Image from 'next/image';

import { useTbmContext } from '@/context/tbmContext.jsx';

export default function CaloryCalculator() {
  const [foodQuery, setFoodQuery] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const { tbmResult } = useTbmContext();


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
      food_name: 'Nome do Item',
      brand_name: 'Marca',
      nf_calories: 'Calorias',
      serving_weight_grams: 'Peso do Alimento (g)',
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
      // Adicione a tradução para a propriedade da imagem
      if (food.photo && food.photo.highres) {
        const translatedImgValue = await translateText(food.photo.highres);
        translatedData.photo = {
          ...food.photo,
          highres: translatedImgValue,
        };
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
          'Ocp-Apim-Subscription-Key': Api_Key,
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

  const handleAddFood = () => {
    if (result) {
      const newSelectedFoods = [...selectedFoods, result];
      const newTotalCalories = newSelectedFoods.reduce((total, food) => total + food.Calorias, 0);
      setSelectedFoods(newSelectedFoods);
      setTotalCalories(newTotalCalories);
    }
    
  };

  const handleRemoveFood = (index: number) => {
    const updatedFoods = [...selectedFoods];
    const removedFood = updatedFoods.splice(index, 1)[0];
    setSelectedFoods(updatedFoods);
    setTotalCalories((prevTotal) => prevTotal - removedFood.Calorias);
    if(selectedFoods.length <= 1) {
      setTotalCalories(0);
  };
}

    const resultadoHTML = tbmResult !== null ? (
      <h1 dangerouslySetInnerHTML={{ __html: `você pode consumir: <span>${tbmResult}</span> calorias por dia.` }} />
    ) : (
      'Ainda não calculado.'
    );
  

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
                <Image
                  src={result.photo.highres}
                  alt="Imagem em alta resolução do alimento"
                  width={200}  // Adicione os atributos width e height
                  height={200}
                  className='searchImage'
                />
                </>
              )}
                  <h3>{result['Nome do Item']}</h3>
                  <p>peso : {result['Peso do Alimento (g)']}</p>
                  <p>calorias: {result['Calorias']}</p>
                  <button onClick={handleAddFood}>adicionar</button>
            </div>
          )}
          
        </div>
        <div className='h1results'>
                  <h1>{resultadoHTML}</h1>
        </div>
        <div className='contentDadosSearchCalory'>
        <div className='itensDisplay'>
          {selectedFoods.map((food, index) => (
            <div className='ItemDadosSearch' key={index}>
              {food.photo && (
                <>
                  <Image src={food.photo.highres} alt={`Imagem em alta resolução de ${food['Nome do Item']}`} 
                                    width={200}  // Adicione os atributos width e height
                                    height={200}
                  className='contentDadosSearchImage' />
                </>
              )}
              <h1>{food['Nome do Item']}</h1>
              <p>peso: <span>{food['Peso do Alimento (g)']}</span></p>
              <p>calorias: <span>{food['Calorias']}</span></p> 
              <button onClick={() => handleRemoveFood(index)}>remover</button>
            </div>
          ))}
         </div>
          <div className='lastDadosCalory'>
            <h1> Sua refeição tem <span>{totalCalories}</span> calorias </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
