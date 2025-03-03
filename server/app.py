from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import uuid
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize database
def init_db():
    conn = sqlite3.connect('nooks.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS nooks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    conn.commit()
    conn.close()

# Initialize the database when the app starts
init_db()

# API route to create a new nook
@app.route('/api/nooks', methods=['POST'])
def create_nook():
    data = request.json
    
    if not data or 'title' not in data or 'url' not in data:
        return jsonify({'error': 'Title and URL are required'}), 400
    
    nook_id = str(uuid.uuid4())
    
    conn = sqlite3.connect('nooks.db')
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO nooks (id, title, url) VALUES (?, ?, ?)',
        (nook_id, data['title'], data['url'])
    )
    conn.commit()
    conn.close()
    
    return jsonify({
        'id': nook_id,
        'title': data['title'],
        'url': data['url']
    }), 201

# API route to get all nooks
@app.route('/api/nooks', methods=['GET'])
def get_nooks():
    conn = sqlite3.connect('nooks.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT id, title, url FROM nooks ORDER BY created_at DESC')
    nooks = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return jsonify(nooks)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
