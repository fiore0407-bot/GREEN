# EcoBuddy Backend Server
# Handles AI waste recognition via Groq API

$PORT = 3001
$GROQ_API_KEY = $env:GROQ_API_KEY

# CORS Headers
$CORS_HEADERS = @{
    "Access-Control-Allow-Origin" = "*"
    "Access-Control-Allow-Methods" = "GET, POST, OPTIONS"
    "Access-Control-Allow-Headers" = "Content-Type"
    "Content-Type" = "application/json"
}

function Write-Log($Message) {
    Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $Message"
}

function Send-Response($Context, $StatusCode, $Body) {
    $response = $Context.Response
    $response.StatusCode = $StatusCode
    
    foreach ($header in $CORS_HEADERS.GetEnumerator()) {
        $response.Headers.Add($header.Key, $header.Value)
    }
    
    $buffer = [System.Text.Encoding]::UTF8.GetBytes(($Body | ConvertTo-Json -Compress))
    $response.ContentLength64 = $buffer.Length
    $response.OutputStream.Write($buffer, 0, $buffer.Length)
    $response.Close()
}

function Call-GroqAPI($Query) {
    if (-not $GROQ_API_KEY) {
        return @{ error = "GROQ_API_KEY not configured"; fallback = $true }
    }

    $systemPrompt = @"
Sei un assistente esperto in raccolta differenziata italiana con conoscenza enciclopedica approfondita.
Analizza il rifiuto e restituisci un JSON con informazioni dettagliate:
{
    `"name`": `"Nome specifico e dettagliato del rifiuto`",
    `"icon`": `"Emoji appropriata`",
    `"categories`": [`"plastica`" OR `"carta`" OR `"vetro`" OR `"metallo`" OR `"umido`" OR `"indifferenziata`"],
    `"subcategory`": `"Sottocategoria specifica (es: PET, HDPE, alluminio, acciaio, cartone ondulato, etc.)`",
    `"recyclability`": `"percentuale o descrizione riciclabilità`",
    `"instructions`": [`"passo dettagliato 1`", `"passo dettagliato 2`", `"passo dettagliato 3`", `"passo dettagliato 4`"],
    `"preparationSteps`": [`"preparazione specifica 1`", `"preparazione specifica 2`"],
    `"disposalLocation`": `"Dove buttarlo specificamente`",
    `"environmentalImpact`": `"Impatto ambientale se non riciclato correttamente`",
    `"tips`": `"Consiglio approfondito`",
    `"alternativeUses`": `"Possibili riusi prima dello smaltimento`",
    `"isMultiMaterial`": true/false,
    `"requiresSpecialHandling`": true/false,
    `"specialInstructions`": `"Istruzioni speciali se applicabili`"
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
- Se incerto su un materiale, indica le possibilità e la scelta più sicura
"@

    $payload = @{
        model = "llama-3.1-8b-instant"
        messages = @(
            @{ role = "system"; content = $systemPrompt }
            @{ role = "user"; content = "Analizza questo oggetto/rifiuto e restituisci SOLO il JSON richiesto, senza altro testo: `"$Query`"" }
        )
        temperature = 0.1
        max_tokens = 1000
        response_format = @{ type = "json_object" }
    } | ConvertTo-Json -Depth 10 -Compress

    try {
        $headers = @{
            "Authorization" = "Bearer $GROQ_API_KEY"
            "Content-Type" = "application/json"
        }

        $response = Invoke-RestMethod -Uri "https://api.groq.com/openai/v1/chat/completions" -Method POST -Headers $headers -Body $payload -TimeoutSec 30
        $aiResponse = $response.choices[0].message.content
        
        # Parse JSON from AI response
        Write-Log "Raw AI response: $aiResponse"
        
        # Try to extract JSON - look for content between triple backticks or curly braces
        $jsonContent = $null
        
        # Try markdown code block first
        if ($aiResponse -match '```(?:json)?\s*([\s\S]*?)\s*```') {
            $jsonContent = $matches[1].Trim()
            Write-Log "Found JSON in code block"
        }
        # Try to find JSON between curly braces
        elseif ($aiResponse -match '(\{[\s\S]*\})') {
            $jsonContent = $matches[1].Trim()
            Write-Log "Found JSON between braces"
        }
        # If response is just the JSON
        elseif ($aiResponse.Trim().StartsWith('{')) {
            $jsonContent = $aiResponse.Trim()
            Write-Log "Response is JSON"
        }
        
        if ($jsonContent) {
            try {
                $parsed = $jsonContent | ConvertFrom-Json
                return @{
                    name = $parsed.name
                    icon = $parsed.icon
                    categories = $parsed.categories
                    subcategory = $parsed.subcategory
                    recyclability = $parsed.recyclability
                    instructions = $parsed.instructions
                    preparationSteps = $parsed.preparationSteps
                    disposalLocation = $parsed.disposalLocation
                    environmentalImpact = $parsed.environmentalImpact
                    tips = $parsed.tips
                    alternativeUses = $parsed.alternativeUses
                    isMultiMaterial = $parsed.isMultiMaterial
                    requiresSpecialHandling = $parsed.requiresSpecialHandling
                    specialInstructions = $parsed.specialInstructions
                    isAiGenerated = $true
                }
            }
            catch {
                Write-Log "JSON parse error: $_"
                Write-Log "Attempted to parse: $jsonContent"
                throw "Failed to parse AI response as JSON: $_"
            }
        } else {
            Write-Log "No JSON found in response. Raw response: $aiResponse"
            throw "No JSON found in AI response"
        }
    }
    catch {
        Write-Log "Groq API error: $_"
        return @{ error = $_.Exception.Message; fallback = $true }
    }
}

# Create HTTP Listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$PORT/")
$listener.Start()

Write-Host "=" * 50
Write-Host "🌱 EcoBuddy Backend Server"
Write-Host "=" * 50
Write-Host "Server running at http://localhost:$PORT"
Write-Host "API endpoint: POST http://localhost:$PORT/api/analyze-waste"
Write-Host "Health check: GET http://localhost:$PORT/health"
Write-Host "=" * 50

if (-not $GROQ_API_KEY) {
    Write-Host "⚠️  WARNING: GROQ_API_KEY not set!"
    Write-Host "   Set it with: `$env:GROQ_API_KEY='your_key_here'"
    Write-Host "   Or the API will return fallback responses"
} else {
    Write-Host "✅ Groq API Key configured ($($GROQ_API_KEY.Length) chars)"
}

Write-Host "=" * 50
Write-Host "Press Ctrl+C to stop the server"
Write-Host ""

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $url = $request.Url

        # Handle CORS preflight
        if ($request.HttpMethod -eq "OPTIONS") {
            Send-Response -Context $context -StatusCode 200 -Body @{}
            continue
        }

        # Health check
        if ($url.PathAndQuery -eq "/health" -and $request.HttpMethod -eq "GET") {
            Send-Response -Context $context -StatusCode 200 -Body @{ status = "ok"; service = "EcoBuddy AI" }
            continue
        }

        # Analyze waste endpoint
        if ($url.PathAndQuery -eq "/api/analyze-waste" -and $request.HttpMethod -eq "POST") {
            try {
                $reader = New-Object System.IO.StreamReader($request.InputStream)
                $body = $reader.ReadToEnd() | ConvertFrom-Json
                $reader.Close()

                $query = $body.query.Trim()
                if (-not $query) {
                    Send-Response -Context $context -StatusCode 400 -Body @{ error = "Query is required" }
                    continue
                }

                Write-Log "Analyzing: $query"
                $result = Call-GroqAPI -Query $query
                Send-Response -Context $context -StatusCode 200 -Body $result
            }
            catch {
                Write-Log "Error: $_"
                Send-Response -Context $context -StatusCode 500 -Body @{ error = "Internal server error" }
            }
            continue
        }

        # 404
        Send-Response -Context $context -StatusCode 404 -Body @{ error = "Not found" }
    }
}
finally {
    $listener.Stop()
    Write-Host "`n🛑 Server stopped"
}
