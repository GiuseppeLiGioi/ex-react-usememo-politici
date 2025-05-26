/*
📌 Milestone 3: Ottimizzare il rendering delle card con React.memo
Attualmente, ogni volta che l’utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate.
Usa React.memo() per evitare il ri-render delle card quando le loro props non cambiano.
Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario.

Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere renderizzate, mentre le altre rimangono in memoria senza essere ridisegnate.
*/

import React from "react";


export const Card = React.memo(({name, biography, position, image}) => {
  console.log("Card")
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


  const derivePoliticians = useMemo(() => {
    return politicians.filter((p) => {
      const Name = p.name.toLowerCase().includes(value.toLowerCase())
      const Bio = p.biography.toLowerCase().includes(value.toLowerCase())
      return Name || Bio
    })
  }, [politicians, value])




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
