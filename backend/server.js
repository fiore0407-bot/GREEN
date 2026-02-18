const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'EcoBuddy AI' });
});

// Analyze waste endpoint
app.post('/api/analyze-waste', async (req, res) => {
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
});

async function callGroqAPI(query) {
    if (!GROQ_API_KEY) {
        return { error: 'GROQ_API_KEY not configured', fallback: true };
    }

    const systemPrompt = `Sei un assistente esperto in raccolta differenziata italiana con conoscenza enciclopedica approfondita.
Analizza il rifiuto e restituisci un JSON con informazioni dettagliate:
{
    "name": "Nome specifico e dettagliato del rifiuto",
    "icon": "Emoji appropriata",
    "categories": ["plastica" OR "carta" OR "vetro" OR "metallo" OR "umido" OR "indifferenziata"],
    "subcategory": "Sottocategoria specifica (es: PET, HDPE, alluminio, acciaio, cartone ondulato, etc.)",
    "recyclability": "percentuale o descrizione riciclabilità",
    "instructions": ["passo dettagliato 1", "passo dettagliato 2", "passo dettagliato 3", "passo dettagliato 4"],
    "preparationSteps": ["preparazione specifica 1", "preparazione specifica 2"],
    "disposalLocation": "Dove buttarlo specificamente",
    "environmentalImpact": "Impatto ambientale se non riciclato correttamente",
    "tips": "Consiglio approfondito",
    "alternativeUses": "Possibili riusi prima dello smaltimento",
    "isMultiMaterial": true/false,
    "requiresSpecialHandling": true/false,
    "specialInstructions": "Istruzioni speciali se applicabili"
}

CATEGORIE RIFIUTI DA RICONOSCERE (usa sempre la più specifica):

PLASTICA:
- PET (bottiglie acqua, soda) → plastica
- HDPE (bottiglie detersivo, flaconi) → plastica  
- PVC (tubi, finestre, pellicole) → indifferenziata
- LDPE (sacchetti, pellicole stretch) → plastica
- PP (tappi, contenitori yogurt, vassoi) → plastica
- PS (polistirolo, vassoi, contenitori) → indifferenziata
- Altri plastiche (toys, elettronica) → indifferenziata

CARTA:
- Carta comune (stampa, giornali) → carta
- Cartone ondulato (scatole) → carta
- Carta patinata (riviste, volantini) → carta
- Carta igienica/velina usata → indifferenziata
- Carta sporca/unta → indifferenziata
- Tetra Pak → plastica/carta (multi)

VETRO:
- Vetro trasparente (bottiglie, barattoli) → vetro
- Vetro colorato → vetro
- Ceramica/porcellana → indifferenziata
- Vetro specchio → indifferenziata
- Vetro Pyrex → indifferenziata
- Vetro rotto (avvolto) → indifferenziata

METALLO:
- Alluminio (lattine, fogli) → metallo
- Acciaio (barattoli, scatole) → metallo
- Latta (conserve) → metallo
- Rame → metallo
- Ottone/bronzo → metallo
- Metalli misti piccoli → metallo
- Batterie/pile → indifferenziata (RAEE)

UMIDO/ORGANICO:
- Scarti cucina crudi → umido
- Cotti (pasta, riso, pane) → umido
- Carne e pesce → umido
- Latticini → umido
- Bucce e scarti frutta/verdura → umido
- Fondi caffè/tè → umido
- Gusci uova → umido
- Fiori/piante → umido
- Lettiere animali (no) → indifferenziata

INDIFFERENZIATA (con specifica destinazione):
- Rifiuti sanitari (pannolini, assorbenti, cerotti) → indifferenziata
- Farmaci → farmacia
- Elettronica (RAEE) → centro RAEE
- Pile/batterie → centro raccolta
- Vernici/solventi → centro rifiuti pericolosi
- Oli minerali → centro raccolta
- Amianto → discarica autorizzata speciale
- Inerti (mattoni, cemento) → discarica inerti
- Tessili usati → contenitore tessile o indifferenziata
- Legno trattato/vernicato → indifferenziata
- Gomma (pneumatici) → centro raccolta

REGOLE FONDAMENTALI:
1. Sii SEMPRE specifico: non usare termini generici
2. Identifica il materiale ESATTO (tipo di plastica, metallo, etc.)
3. Fornisci 4 istruzioni dettagliate passo-passo
4. Indica SEMPRE la destinazione corretta (quale contenitore/centro)
5. Spiega l'impatto ambientale concretamente
6. Suggerisci riusi pratici prima dello smaltimento
7. Per rifiuti pericolosi, indica chiaramente il centro di raccolta specifico
8. NON usare mai risposte generiche: analizza nel dettaglio

REGOLA CRITICA - ANALISI OBBLIGATORIA:
- NON importa se il rifiuto non è nella lista sopra
- NON importa se è un oggetto raro, esotico o sconosciuto
- NON importa se è un materiale composito o ibrido
- NON importa se è un oggetto artigianale, vintage o di dubbia origine
- NON importa se è un rifiuto industriale, medico, agricolo o militare
- ANALIZZA SEMPRE l'oggetto basandoti sulle sue caratteristiche fisiche e materiali
- IDENTIFICA i componenti principali (plastica, metallo, vetro, carta, tessuto, legno, ceramica, etc.)
- DETERMINA la categoria in base al materiale prevalente o più problematico
- Se multi-materiale, elenca TUTTI i materiali e spiega come separarli
- Se non riciclabile, spiega ESATTAMENTE perché e dove buttarlo
- Fornisci SEMPRE informazioni complete come per qualsiasi altro rifiuto

ESEMPI DI ANALISI OBBLIGATORIA:
- "statuetta di porcellana" → analizza: ceramica, indifferenziata, possibile riuso decorativo
- "batteria auto" → analizza: piombo/acido, pericolosa, centro raccolta specifico
- "tappeto persiano" → analizza: lana/cotone/seta, indifferenziata o raccolta tessile
- "maschera antigas" → analizza: gomma/vetro/metallo, indifferenziata, componenti separabili
- "pannello solare rotto" → analizza: silicio/vetro/alluminio, RAEE, pericoloso
- "protesi dentaria" → analizza: ceramica/metallo/plastica, indifferenziata o centri speciali
- "bambola antica" → analizza: porcellana/capelli sintetici/vestiti, separa componenti
- "strumento chirurgico" → analizza: acciaio inox, sterilizzabile, metallo o sanitario
- "proiettile spento" → analizza: ottone/piombo, pericoloso, caserma/centro specializzato
- "microchip" → analizza: silicio/oro/plastica, RAEE, recupero metalli preziosi

COMPORTAMENTO RICHIESTO:
- Rispondi come esperto di materiali e smaltimento
- Analizza la composizione chimica e fisica
- Considera normative italiane ed europee sui rifiuti
- Suggerisci alternative di smaltimento anche non convenzionali
- Se incerto su un materiale, indica le possibilità e la scelta più sicura`;

    const payload = {
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Analizza questo oggetto/rifiuto e restituisci SOLO il JSON richiesto, senza altro testo: "${query}"` }
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
        console.log('Raw AI response:', aiResponse);

        // Parse JSON response
        let parsed;
        try {
            parsed = JSON.parse(aiResponse);
        } catch (parseError) {
            // Try to extract JSON from markdown code block
            const codeBlockMatch = aiResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            if (codeBlockMatch) {
                parsed = JSON.parse(codeBlockMatch[1].trim());
            } else {
                throw new Error('Failed to parse AI response as JSON');
            }
        }

        return {
            name: parsed.name,
            icon: parsed.icon,
            categories: parsed.categories,
            subcategory: parsed.subcategory,
            recyclability: parsed.recyclability,
            instructions: parsed.instructions,
            preparationSteps: parsed.preparationSteps,
            disposalLocation: parsed.disposalLocation,
            environmentalImpact: parsed.environmentalImpact,
            tips: parsed.tips,
            alternativeUses: parsed.alternativeUses,
            isMultiMaterial: parsed.isMultiMaterial,
            requiresSpecialHandling: parsed.requiresSpecialHandling,
            specialInstructions: parsed.specialInstructions,
            isAiGenerated: true
        };
    } catch (error) {
        console.error('Groq API error:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        return { error: error.message, fallback: true };
    }
}

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🌱 EcoBuddy Backend Server');
    console.log('='.repeat(50));
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API endpoint: POST http://localhost:${PORT}/api/analyze-waste`);
    console.log('='.repeat(50));
    
    if (!GROQ_API_KEY) {
        console.log('⚠️  WARNING: GROQ_API_KEY not set!');
        console.log('   Set it as environment variable: GROQ_API_KEY=your_key');
    } else {
        console.log(`✅ Groq API Key configured (${GROQ_API_KEY.length} chars)`);
    }
    console.log('='.repeat(50));
});
