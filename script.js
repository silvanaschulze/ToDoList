let todos = [];

// Carrega do localStorage ao abrir
window.addEventListener('load', () => {
    const armazenados = localStorage.getItem('todos');
    if (armazenados) {
        todos = JSON.parse(armazenados);
    }
    renderTodos();
});

// Salva no localStorage sempre que atualizar a lista
function salvarTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const ul = document.getElementById('todoList');
    const ol = document.getElementById('todoListGeordnet');

    ul.innerHTML = '';
    ol.innerHTML = '';

    todos.forEach((todo, index) => {
        // UL
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = todo.texto;
        span.className = 'text';
        if (todo.feito) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#999';
        }

        const actions = document.createElement('div');
        actions.className = 'actions';

        // ✅ botão marcar como feito
        const checkBtn = document.createElement('button');
        checkBtn.className = 'icon-btn';
        checkBtn.innerHTML = '✅';
        checkBtn.addEventListener('click', () => {
            todos[index].feito = !todos[index].feito;
            salvarTodos();
            renderTodos();
        });

        // 🗑️ botão deletar
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'icon-btn';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            salvarTodos();
            renderTodos();
        });

        actions.appendChild(checkBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);
        ul.appendChild(li);

        // OL
        const liOrd = document.createElement('li');
        liOrd.textContent = todo.texto;
        ol.appendChild(liOrd);
    });
}

// Adiciona nova tarefa
document.getElementById('todoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.getElementById('todoInput');
    const value = input.value.trim();
    if (value !== '') {
        todos.push({ texto: value, feito: false });
        input.value = '';
        salvarTodos();
        renderTodos();
    }
});
