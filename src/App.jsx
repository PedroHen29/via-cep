import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [cep, setCep] = useState(null)
  const [loading, setLoading] = useState(false)

  async function buscarCep(){
    const cep = document.getElementById("cep").value

    setLoading(true)

    try{
      const resposta = await fetch(
        `viacep.com.br/ws/${cep}/json/`
      )

      setCep(resposta)

    }catch(err){
      console.log("Ocorreu um erro", err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Digite um CEP</h1>
      <input id='cep' type="text" placeholder='CEP'/>
      <button onClick={buscarCep}>Pesquisar</button>

      {loading && <p>Carregando...</p>}

      {cep && !loading && (
        <div>
          <h2>{cep.bairro}</h2>
        </div>
      )}
    </div>
    
  )
}

export default App
