import { useState } from 'react'

// api
import api from './services/api'

// Estilos
import { BsSearch } from 'react-icons/bs'
import './styles.css'

// Função Principal
function App() {

  /*
   * useState para capturar os dados do input
   * input irá armazenar o valor, setInput fará as alterações e useState('') inicia o input sem valor
   */ 
  const [input, setInput] = useState('')

  /**
   * useState para capturar os dados da api
   * cep pega os valores do json da api que a variável setCep recebeu na função; 
   * o useState({}) está iniciando as variáveis sem nenhum valor pq ainda não foi digitado nenhum CEP
   */
  const [cep, setCep] = useState({})

  // função assincrona que vai lidar com a api
  async function handleSearch() {
    /**
     * Se o input estiver vazio o usuário receberá um alerta
     */
    if (!input) {
      alert('Preencha os campos corretamente')
      return
    }

    /**
     * Função Try/Catch para tratamento de erros
     * 
     * No bloco try é declarado a constante response que vai receber da api as dados
     *        api.get(`${input}/json`)
     * Aqui é adicionado os dados do input e o /json que é um requerimento do viacep para funcionar corretamente
     * 
     * Após isso o setCep armazena o conteúdo de response.data, 
     * o data é do json gerado pela api, onde se encontra os dados
     * Após o êxito da consulta o campo de texto é limpo passando um valor em branco para setInput
     * 
     * No bloco catch é alertado ao usuário, de forma bem genérica, um erro durante a consulta
     * normalmente causado por dados incorretos, e então limpa o campo de input
     */
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
      console.log(response.data)
    } catch {
      alert('Oops...erro ao buscar CEP')
      setInput('')
    }
  }
  // render
  return (
    <div className="wrapper">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={event => setInput(event.target.value)}
          // Qdo o usuário digitar o setInput irá armazenar os valores
        />
        {/* Botão de pesquisar, ao ser clicado irá chamar a função handleSearch */}
        <button className="buttonSearch" onClick={handleSearch}>
          <BsSearch size={25} color={'#fff'} />
        </button>
      </div>
      {/* 
          Aqui é uma condição que vai renderizar a "main" apenas qdo houver uma consulta bem sucedida 
          A condição compara se a variável cep está com algum valor
          Ao renderizar é passado as informações para o campos
          Exemplo: Ao pesquisar na api os dados ela retorna um JSON da seguinte maneira

          "cep": "02236-020",
          "logradouro": "Rua Bom Jesus da Cachoeira",
          "complemento": "",
          "bairro": "Parque Edu Chaves",
          "localidade": "São Paulo",
          "uf": "SP",
          "ibge": "3550308",
          "gia": "1004",
          "ddd": "11",
          "siafi": "7107"

          Então após a função handleSearch capturar os dados e armazenar em cep, basta escolher a chave de cada propriedade
          Como Logradouro para Rua, UF para Estado, localidade para Cidade e Bairro para Bairro
      */}
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>UF: {cep.uf}</span>
        </main>
      )}
    </div>
  )
}

export default App
