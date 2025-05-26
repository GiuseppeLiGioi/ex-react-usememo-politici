/*
📌 Milestone 1: Recuperare e visualizzare i dati
Effettua una chiamata API a
https://boolean-spec-frontend.vercel.app/freetestapi/politicians

Salva la risposta in uno stato React (useState).

Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:

Nome (name)
Immagine (image)
Posizione (position)
Breve biografia (biography)

Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile.
*/
import { useState, useEffect } from "react"

function App() {

  const [politicians, setPoliticians] = useState([]);

  async function fetchPolitici(){
  try{
    const response = await fetch('http://localhost:3333/politicians')  
     if(!response){
      throw new Error("Errore nel fetch dei politici")
     }
     const politicians = await response.json()
    setPoliticians(politicians)
   }catch(error){
    console.error(error)
   }
  
  }

  useEffect( () => {
   fetchPolitici();
  }, [])


  

  return (
    <>
    <h1 className="title">LISTA DEI POLITICI</h1>
    <div className="container_card">
     {
      politicians.map((p, index) => (
        
          <div  key={index} className="single_card">
          <h2>{p.name}</h2>
          <img src={p.image} className="img-card"/> 
          <h5>{p.position}</h5>
          <p>{p.biography}</p>
          </div>
        
      ))
     }
     </div>
    </>
    
  )
}

export default App
