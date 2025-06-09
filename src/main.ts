import './style.css';

const cep = document.querySelector<HTMLInputElement>('#cep')!
const logradouro = document.querySelector<HTMLInputElement>('#logradouro')!
const bairro = document.querySelector<HTMLInputElement>('#bairro')!
const cidade = document.querySelector<HTMLSelectElement>('#cidade')!
const estado = document.querySelector<HTMLSelectElement>('#estado')!
const numero = document.querySelector<HTMLInputElement>('#numero')!

cep.addEventListener('blur', async() => {
  const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep.value}`);
  const data = await response.json();

  bairro.value = data.neighborhood || '';
  cidade.value = data.city || '';
  estado.value = data.state || '';
  logradouro.value = data.street || '';

  numero.focus();
})

estado.addEventListener('blur', async() => {
  const uf = estado.value;

  if(uf) {
    const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`)
    const cidades = await response.json();

    cidades.forEach((cidadeObj: {nome: string}) => {
      const option = document.createElement('option')
      option.value = cidadeObj.nome
      option.textContent = cidadeObj.nome
      cidade.appendChild(option)
    })
  }
  else {
    cidade.innerHTML = "<option value = ''>Selecione um estado</option>"
  }
})





