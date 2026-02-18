// Vercel Serverless Function - Waste Analysis API
import axios from 'axios';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { query } = req.body;
        
        if (!query || !query.trim()) {
            return res.status(400).json({ error: 'Query is required' });
        }

        console.log(`Analyzing: ${query}`);
        const result = await callGroqAPI(query.trim());
        res.json(result);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}

async function callGroqAPI(query) {
    if (!GROQ_API_KEY) {
        return { error: 'GROQ_API_KEY not configured', fallback: true };
    }

    const systemPrompt = `Sei un assistente esperto in raccolta differenziata italiana.
Analizza il rifiuto e restituisci un JSON con:
{
    "name": "Nome del rifiuto",
    "icon": "Emoji",
    "categories": ["plastica"|"carta"|"vetro"|"metallo"|"umido"|"indifferenziata"],
    "subcategory": "Tipo specifico",
    "recyclability": "Descrizione",
    "instructions": ["passo1", "passo2", "passo3", "passo4"],
    "preparationSteps": ["prep1", "prep2"],
    "disposalLocation": "Dove buttarlo",
    "environmentalImpact": "Impatto",
    "tips": "Consiglio",
    "alternativeUses": "Riuso",
    "isMultiMaterial": boolean,
    "requiresSpecialHandling": boolean,
    "specialInstructions": "Istruzioni speciali"
}`;

    const payload = {
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Analizza: "${query}"` }
        ],
        temperature: 0.1,
        max_tokens: 1000,
        response_format: { type: "json_object" }
    };

    try {
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', payload, {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });

        const aiResponse = response.data.choices[0].message.content;
        const parsed = JSON.parse(aiResponse);

        return {
            ...parsed,
            isAiGenerated: true
        };
    } catch (error) {
        console.error('Groq API error:', error.message);
        return { error: error.message, fallback: true };
    }
}
