// Lädt alle Aufgaben von der API
function ladeTodos() {
    fetch('/todos')
        .then(response => response.json())
        .then(todos => {
            const ulListe = document.getElementById('todoList');
            const olListe = document.getElementById('todoListGeordnet');
            ulListe.innerHTML = '';
            olListe.innerHTML = '';

            todos.forEach((todo, index) => {
                // UL
                const ulItem = document.createElement('li');

                const span = document.createElement('span');
                span.textContent = todo;
                span.className = "text";

                const aktionen = document.createElement('div');
                aktionen.className = "actions";

                const checkBtn = document.createElement('button');
                checkBtn.className = "icon-btn";
                checkBtn.innerHTML = "✅";

                const deleteBtn = document.createElement('button');
                deleteBtn.className = "icon-btn";
                deleteBtn.innerHTML = "🗑️";

                deleteBtn.addEventListener('click', () => {
                    fetch(`/todos/${index}`, { method: 'DELETE' })
                        .then(() => ladeTodos());
                });

                aktionen.appendChild(checkBtn);
                aktionen.appendChild(deleteBtn);

                ulItem.appendChild(span);
                ulItem.appendChild(aktionen);
                ulListe.appendChild(ulItem);

                // OL
                const olItem = document.createElement('li');
                olItem.textContent = todo;
                olListe.appendChild(olItem);
            });
        });
}

document.getElementById('todoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const eingabe = document.getElementById('todoInput').value;

    fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: eingabe })
    })
    .then(response => response.json())
    .then(() => {
        ladeTodos();
        document.getElementById('todoInput').value = '';
    });
});

window.addEventListener("load", ladeTodos);
