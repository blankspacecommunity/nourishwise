from flask import Flask, request, Response, jsonify
from ibm_watson_machine_learning.foundation_models import Model
from ibm_watsonx_ai.foundation_models.utils.enums import ModelTypes
from ibm_watson_machine_learning.metanames import GenTextParamsMetaNames as GenParams
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

class GenAI:
    def __init__(self):
        pass

    def textgen(self, prompt: str):
        self.prompt = prompt

        generate_params = {
            GenParams.MAX_NEW_TOKENS: 250
        }

        model = Model(
            model_id='ibm/granite-13b-chat-v2',
            params=generate_params,
            credentials={
                "apikey": os.getenv("APIKEY"),
                "url": "https://us-south.ml.cloud.ibm.com"
            },
            project_id=os.getenv("PROJECT_ID")
        )

        q = prompt

        generated_response = model.generate_text_stream(prompt=q)

        response_chunks = []
        if generated_response:
            for chunk in generated_response:
                response_chunks.append(chunk)
        else:
            response_chunks.append("No response generated")

        return response_chunks

g = GenAI()

@app.route('/generate', methods=['POST'])
def generate_text():
    data = request.json
    prompt = data.get('prompt', '')
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    response_chunks = g.textgen(prompt)
    return jsonify({'response': ''.join(response_chunks)})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
