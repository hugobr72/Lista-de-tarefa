const tarefa = document.querySelector('.input-tarefa')
const butao = document.querySelector('.btn-tarefa')
const addTarefas = document.querySelector('.tarefas')

butao.addEventListener('click', function () {
    if (!tarefa.value) return;
    criaTarefa(tarefa.value)
})

tarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!tarefa.value) return;
        criaTarefa(tarefa.value)

    }
})

function limpaInput() {
    tarefa.value = '';
    tarefa.focus();
}

function criaTarefa(texto) {
    const li = document.createElement('li');
    li.innerHTML = texto;
    addTarefas.appendChild(li);
    criaBotaoApagar(li);
    limpaInput()
    salvarTarefas()
}

function criaBotaoApagar(li) {
    li.innerHTML += ' '
    const botaoApagar = document.createElement('button');
    botaoApagar.setAttribute('class', 'apagar');
    //botaoApagar.classList.add('apagar');
    botaoApagar.innerText = 'Apagar';
    li.appendChild(botaoApagar)
}

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove(); //parentElement pega o elemento Pai
        salvarTarefas();
    }
})


function salvarTarefas() {
    const liTarefas = addTarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();