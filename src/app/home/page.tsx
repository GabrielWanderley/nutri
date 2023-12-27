import { useEffect } from "react";



function Me(){
   useEffect(() =>{
    console.log('Me')
   })
  return (
    <>
      <div>
        <h1>home</h1>
      </div>
    </>
  );
};

export default Me;