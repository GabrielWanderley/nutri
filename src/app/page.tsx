"use client"


import BarInfo from "@/components/BarInfo/BarInfo";
import CaloryCalculator from "@/components/CaloryCalculator/caloryCalculator";
import Start from "@/components/Start/start";
import CalculatorTbm from "@/components/calculatorTbm/calculatorTbm";


export default function Home() {

  
  return (
    <div>
         <Start/>
         <BarInfo/>
         <CalculatorTbm/>
         <CaloryCalculator/>
     </div>
  )
}
