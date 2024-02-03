"use client"


import BarInfo from "@/components/BarInfo/BarInfo";
import CaloryCalculator from "@/components/CaloryCalculator/caloryCalculator";
import { Footer } from "@/components/Footer/Footer";
import Start from "@/components/Start/start";
import CalculatorTbm from "@/components/calculatorTbm/calculatorTbm";
import{TbmProvider} from '@/context/tbmContext.jsx'

export default function Home() {

  
  return (
    <TbmProvider>
          <Start/>
         <BarInfo/>
         <CalculatorTbm/>
         <CaloryCalculator/>
         <Footer/>
    </TbmProvider>

  )
}
