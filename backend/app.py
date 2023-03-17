from flask import Flask, request, jsonify
from flask_cors import CORS
import tiktoken

app = Flask(__name__)
CORS(app)

@app.route('/count_tokens', methods=['POST'])
def count_tokens():
    text = request.json.get('text')
    model = request.json.get('model', 'gpt-4')

    if not text:
        return jsonify({'error': 'Text is required'}), 400

    try:
        enc = tiktoken.encoding_for_model(model)
    except KeyError:
        enc = tiktoken.get_encoding("cl100k_base")

    token_count = len(enc.encode(text))
    return jsonify({'token_count': token_count})

if __name__ == '__main__':
    app.run()
