from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__)

DATEN_DATEI = 'todos.json'

# Funktion zum Laden der Aufgaben aus der Datei
def lade_todos():
    if not os.path.exists(DATEN_DATEI):
        with open(DATEN_DATEI, 'w') as f:
            json.dump([], f)
    with open(DATEN_DATEI, 'r') as f:
        return json.load(f)

# Funktion zum Speichern der Aufgaben
def speichere_todos(todos):
    with open(DATEN_DATEI, 'w') as f:
        json.dump(todos, f)

# Startseite (Frontend)
@app.route('/')
def index():
    return render_template('index.html')

# API-Endpunkt zum Abrufen der Aufgaben
@app.route('/todos', methods=['GET'])
def get_todos():
    todos = lade_todos()
    return jsonify(todos)

# API-Endpunkt zum Hinzufügen neuer Aufgabe
@app.route('/todos', methods=['POST'])
def add_todo():
    todos = lade_todos()
    daten = request.get_json()
    todos.append(daten['todo'])
    speichere_todos(todos)
    return jsonify({'status': 'erfolgreich'}), 201



# API-Endpunkt zum Löschen einer Aufgabe nach Index
@app.route('/todos/<int:index>', methods=['DELETE'])
def delete_todo(index):
    todos = lade_todos()
    if 0 <= index < len(todos):
        todos.pop(index)
        speichere_todos(todos)
        return jsonify({'status': 'gelöscht'})
    return jsonify({'error': 'Index ungültig'}), 400

if __name__ == '__main__':
    app.run(debug=True)