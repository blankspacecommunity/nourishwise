
class genai:

    def __init__(self):
        pass

    def textgen(self,prompt:str):
        
        from ibm_watson_machine_learning.foundation_models import Model
        from ibm_watsonx_ai.foundation_models.utils.enums import ModelTypes
        from ibm_watson_machine_learning.foundation_models import Model
        from ibm_watson_machine_learning.metanames import GenTextParamsMetaNames as GenParams
        from ibm_watson_machine_learning.foundation_models.utils.enums import ModelTypes

        self.prompt=prompt

        generate_params = {
            GenParams.MAX_NEW_TOKENS: 250
        }

        model = Model(
            model_id=ModelTypes.GRANITE_13B_CHAT_V2,
            params=generate_params,
            credentials={
                "apikey": "ckaoFIl5WTxfMdCnFWpK25Gp7SgnLDD8cAC9X6Jlz55m",
                "url": "https://us-south.ml.cloud.ibm.com"
            },
            project_id="c58260f1-1c7b-4554-a35c-1db6ace6bc97"
        )

        q = prompt

        generated_response = model.generate_text_stream(prompt=q)

        if generated_response:
            for chunk in generated_response:
                print(chunk, end='')
        else:
            print("No response generated")

g=genai()
g.textgen("can you recommend restaurants in kochi?")