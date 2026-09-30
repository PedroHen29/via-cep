import { useState } from 'react'
import './App.css'

function App() {
  const [cep, setCep] = useState(null)
  const [loading, setLoading] = useState(false)

  async function buscarCep(){
    const cepDigitado = document.getElementById("cep").value
    if(cepDigitado === ""){
      alert('Você precisa digitart um CEP')
    }
    setLoading(true)

    try{
      const resposta = await fetch(
        `https://viacep.com.br/ws/${cepDigitado}/json/`
      )
      const dados = await resposta.json()
      setCep(dados)
      console.log(dados)
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
          <h1 >CEP:</h1>
          <p>Logradouro: {cep.logradouro}</p>
          <p>Bairro: {cep.bairro}</p>
          <p>Localidade: {cep.localidade}</p>
          <p>Estado: {cep.estado}</p>
          <p>Regiao: {cep.regiao}</p>
        </div>
      )}
    </div>
    
  )
}

export default App
