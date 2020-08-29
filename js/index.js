const btnClear = $('#btn-limpar');
const btnAdd = $('#btn-adicionar');
const inputVocab = $('#inputadc');
const listaPalavras = $('#lista-palavras');
const txtVocab = $('#txt-vocab');
const tabelaVocab = $('#tabela-vocabulario');
const inputValidate = $('#validate-analitc');

let palavras = [];
let countValores = 0;
let iteracao = [0];
let table = [];
let valores = [[]];
let cInput = true;

inputVocab.focus( () => {
  inputVocab.removeClass('error');
});

inputVocab.keyup( event =>{
  if(event.key === 'Enter'){
    montarTabela();
  }
});

btnAdd.click(event => {
  montarTabela();
});

btnClear.click(event => {
  inputVocab.val("");
  $('#inputanalisar').remove();
  cInput = true;
  txtVocab.html('');
  palavras = [];
  let inputadc = palavras[event];
  let aux = [];
  palavras = [];
  palavras = aux;
  aux = [];
  listaPalavras.empty();
  tabelaVocab.children().remove();
  for (i = 0; i < palavras.length; i++) {
    let td = criarColunaMeioTabela(`palavra${i}`, 'list-group-item', palavras[i]);
    listaPalavras.append(td);
  }
});

const zerarGlobals = () => {
  valores = [[]];
  countValores = 0;
  iteracao = [0];
  table = [];
}

const criarEstadoTabela = () => {
  zerarGlobals();
  montarEstado();
  
  table = gerarLinhasTabela();
  tableInsertDados(table);
}

const montarTabela = () => {
  let value = inputVocab.val().toLowerCase();
  if(value === ""){
    inputVocab.addClass('error');
  } else {
    if(cInput){
      let input = criarInput('inputanalisar', '', 'Analisar' );
      input.keyup(event => {
        if(table.length > 0){
          validarPalavra(event);
        }
      });
      inputValidate.append(input);
      cInput = false;
    }
    value = value.split(" ");
    let number = palavras.length;
    
    if(value.length > 1){
      for (i = 0; i < value.length; i++) {
        let existe = false;
        number = palavras.length;
        if(value[i] !== ""){
          
          for (j = 0; j < palavras.length; j++) {
            if(value[i] === palavras[j]){
              existe = true;
            }
          }
          
          if(!existe){
            let td = criarColunaMeioTabela(`palavra${number}`, 'edit-table-palav', value[i]);
            listaPalavras.append(td);
            palavras.push(value[i]);
          }
        }
      }
    } else {
      let existe = false;
      for (j = 0; j < palavras.length; j++) {
        if(value[0] === palavras[j]){
          existe = true;
        }
      }
      
      if(!existe){
        txtVocab.html('Vocabulário:')
        let td = criarColunaMeioTabela(`palavra${number}`, 'edit-table-palav', value[0]);
        listaPalavras.append(td);
        palavras.push(value[0]);
      }
    }
    inputVocab.val("");
    tabelaVocab.empty();
    criarEstadoTabela();
  }
}

const montarEstado = () => {
  for (let i = 0; i < palavras.length; i++) {
    let estadoAtual = 0;
    let inputadc = palavras[i];

    for(let j = 0; j < inputadc.length; j++){
      if(typeof valores[estadoAtual][inputadc[j]] === 'undefined'){
        let novoEstado = countValores + 1;
        valores[estadoAtual][inputadc[j]] = novoEstado;
        valores[novoEstado] = [];
        countValores = estadoAtual = novoEstado;
      } else {
        estadoAtual = valores[estadoAtual][inputadc[j]];
      }
      if(j == inputadc.length - 1){
        valores[estadoAtual]['final'] = true;
      }
    }
  }
}

const gerarLinhasTabela = () =>{
  let arrayValores = [];
  for (let i = 0; i < valores.length; i++) {
    let aux = [];
    aux['estado'] = i;
    let first = 'a';
    let last = 'z';
    for (let j = first.charCodeAt(0); j <= last.charCodeAt(0); j++) {
      let letra = String.fromCharCode(j);
      if(typeof valores[i][letra] === 'undefined'){
        aux[letra] = '-'
      } else {
        aux[letra] = valores[i][letra]
      }
    }
    if(typeof valores[i]['final'] !== 'undefined'){
      aux['final'] = true;
    }
    arrayValores.push(aux);
  };
  return arrayValores;
}

const tableInsertDados = arrayValores => {
  let tableFront = tabelaVocab;
  tableFront.html('');
  let tr =  criarLinhaTabela('', '');
  let th = criarColunaTabela('', '', '');
  tr.append(th);

  let first = 'a';
  let last = 'z';
  for (let j = first.charCodeAt(0); j <= last.charCodeAt(0); j++) {
    th = criarColunaTabela('', '', String.fromCharCode(j));
    tr.append(th);
  }
  tableFront.append(tr);

  for(let i = 0; i < arrayValores.length; i++){
    let tr = criarLinhaTabela('', `tr-${arrayValores[i]['estado']}`);
    let td = criarColunaMeioTabela('', 'text-td-q', '');
    if(arrayValores[i]['final']){
      td.html(`q${arrayValores[i]['estado']}*`);
    } else {
      td.html(`q${arrayValores[i]['estado']}`);
    }
    tr.append(td);
    let first = 'a';
    let last = 'z';
    
    for (let j = first.charCodeAt(0); j <= last.charCodeAt(0); j++) {
      let letra = String.fromCharCode(j);
      let td = criarColunaMeioTabela('', `td-letra-${letra}`, '');
      
      if(arrayValores[i][letra] != '-'){
        td.html(`q${arrayValores[i][letra]}`);
      } else {
        td.html('-');
      }
      tr.append(td);
    }
    tableFront.append(tr);
  }
}
