/**
 *
 * A biblioteca axios serve para tratar dados com api
 *          npm install axios
 * Após a instalação basta importá-la ao arquivo
 *          impor axios from 'axios'
 *
 * O endereço completo da api
 *
 * https://viacep.com.br/ws/02236020/json
 *
 * Após o ws segue o CEP, que será fornecido pelo usuário, e o /json que será adicionado na função
 *
 */
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://viacep.com.br/ws'
})

export default api
