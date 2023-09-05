const OpenAI = require("openai");
const uuid = require("uuid")
const uuidv4 = uuid.v4

module.exports = class ChatGPTHelper{
    _openai = null

    constructor (OPEN_AI_KEY){
        this._openai = new OpenAI({apiKey: OPEN_AI_KEY})
        console.log("ChatGPTHelper")
    }

    async _getCompletion(prompt){
        const completion = await this._openai.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          //model: 'gpt-3.5-turbo',
          model: 'text-davinci-003'
        })
        console.log("AWAITED")
        console.log(completion.choices)
    }

    /**
     * 
     * @param text - text to be processed
     * 
     * @returns number of nonspace characters (according to ChatGPT) 
     */
    getCount = function(text){
        console.log("chatGPTHelper.getCount(...)")
    }

    async getInfo (text, wc = 10, wmax = 250) {
        const anuuid = uuidv4();
        const prompt = `Analyze following text and return following information:
        - number of non-space, non-intepruction, and non-special charaters
        - number of words
        - number of sentences
        - number of paragraphs
        - list of top ${wc} words with frequencies
        - list of keywords
        - list of topics
        - summary with max ${wmax} words
        
        Text is provided below "===${anuuid}===" marker.
        
        Response should be in JSON format with fields: characterCount, wordCount, sentenceCount, paragraphCount, topNwords, keywords, topics, and summary.
        If field consists of more results, than ist should be in a form of a JSON array.
        
        ===${anuuid}===
        ${text}
        `

        console.log(prompt)
 
        try{
          // trigger OpenAI completion
          this._getCompletion(prompt)
          console.log("================")
        } catch (error) {
            console.log(error.message)
        }

    }
}