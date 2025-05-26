/*
🎯 Bonus: Filtrare anche per posizione politica (position)
Creare un array derivato che contiene tutte le posizioni politiche (position) disponibili, ma senza duplicati.
Aggiungere un <select> sopra la lista che permette di filtrare i politici anche in base alla loro posizione.
Modificare l’array filtrato per tenere conto sia della stringa di ricerca, sia della posizione selezionata.
*/

import React from "react";


export const Card = React.memo(({name, biography, position, image}) => {
  console.log("politico")
  return(

     <div className="single_card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="img-card" />
      <h5>{position}</h5>
      <p>{biography}</p>
    </div>
  )
})



import { useState, useEffect, useMemo } from "react"

function App() {

  const [politicians, setPoliticians] = useState([]);
  const [value, setValue] = useState('');
  const [position, setPosition] = useState('');

  async function fetchPolitici() {
    try {
      const response = await fetch('http://localhost:3333/politicians')
      if (!response) {
        throw new Error("Errore nel fetch dei politici")
      }
      const politicians = await response.json()
      setPoliticians(politicians)
    } catch (error) {
      console.error(error)
    }

  }

const positions = useMemo(() => {
const derivePositions = [];
politicians.forEach((p) => {
  if(!derivePositions.includes(p.position)){
    derivePositions.push(p.position);
  }
})
return derivePositions;
}, [politicians])




  const derivePoliticians = useMemo(() => {
    return politicians.filter((p) => {
      const Name = p.name.toLowerCase().includes(value.toLowerCase())
      const Bio = p.biography.toLowerCase().includes(value.toLowerCase())
      const match1 = Bio || Name;
      const positionMatch = position.toLowerCase() === "" || p.position.toLowerCase().includes(position.toLowerCase())
      return match1 && positionMatch

    })
  }, [politicians, value, position])




  useEffect(() => {
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

      <select
      value={position}
      onChange={(e) => setPosition(e.target.value)}
      >
      {
        positions.map((p, index) => (
          <option key={index} value={p}>{p}</option>   
        ))
      }

      </select>


      <div className="container_card">
        {
          derivePoliticians.map((p, index) => (
            <Card key={index} {...p} />
          ))
        }
      </div>
    </>

  )

}
export default App
