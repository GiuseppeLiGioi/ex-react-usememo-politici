/*
📌 Milestone 2: Implementare la ricerca ottimizzata
Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso). Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.
❌ Non usare useEffect per aggiornare l’array filtrato.

Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia.
*/
import { useState, useEffect, useMemo } from "react"

function App() {

  const [politicians, setPoliticians] = useState([]);
  const [value, setValue] = useState('');

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

  
    const derivePoliticians = useMemo(() => {
    return politicians.filter((p) => {
      const Name = p.name.toLowerCase().includes(value.toLowerCase()) 
      const Bio =  p.biography.toLowerCase().includes(value.toLowerCase())
      return Name || Bio
    })
    }, [politicians, value])

    


  useEffect( () => {
   fetchPolitici();
  }, [])


  

  return (
    <>
    <h1 className="title">LISTA DEI POLITICI</h1>
    <input 
    type="text"
    placeholder="Inserisci nome o biografia del politico"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    />
    <div className="container_card">
     {
      derivePoliticians.map((p, index) => (
        
          <div  key={index} className="single_card">
          <h2>{p.name}</h2>
          <img src={p.image} alt={p.name} className="img-card"/> 
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
