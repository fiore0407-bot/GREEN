// ===== EcoBuddy App =====
// Waste Recognition & Gamification System

// ===== Data: Waste Database =====
// Database esteso per fallback offline - copre i rifiuti più comuni in Italia
const wasteDatabase = {
    // ===== PLASTICA =====
    'bottiglia plastica': {
        name: 'Bottiglia di plastica',
        icon: '🥤',
        categories: ['plastica'],
        subcategory: 'PET (Polietilene tereftalato)',
        recyclability: '100% riciclabile',
        instructions: ['Svuota completamente', 'Rimuovi il tappo', 'Schiaccia per ridurre volume', 'Getta nel contenitore plastica'],
        preparationSteps: ['Sciacqua brevemente se sporca', 'Togli etichette se possibile'],
        disposalLocation: 'Contenitore raccolta plastica (generalmente giallo o blu)',
        environmentalImpact: 'Una bottiglia PET impiega 450 anni per degradarsi in natura',
        tips: 'Le bottiglie PET possono essere riciclate infinite volte!',
        alternativeUses: 'Puoi riutilizzarla come vaso, portapenne, o contenitore per semi'
    },
    'sacchetto plastica': {
        name: 'Sacchetto di plastica',
        icon: '🛍️',
        categories: ['plastica'],
        subcategory: 'LDPE (Polietilene bassa densità)',
        recyclability: 'Riciclabile ma spesso non accettato',
        instructions: ['Assicurati sia vuoto e pulito', 'Ripiegalo', 'Getta nel contenitore plastica'],
        preparationSteps: ['Pulisci da residui di cibo', 'Nodo al sacchetto per evitare voli'],
        disposalLocation: 'Contenitore plastica o raccolta specifica sacchetti',
        environmentalImpact: 'Gli sacchetti di plastica sono tra i rifiuti più inquinanti negli oceani',
        tips: 'Preferisci sempre sacchetti riutilizzabili in tessuto!',
        alternativeUses: 'Usa come sacchetto per i rifiuti dell\'umido'
    },
    'tappo plastica': {
        name: 'Tappo di plastica',
        icon: '🔘',
        categories: ['plastica'],
        subcategory: 'PP (Polipropilene) o HDPE',
        recyclability: 'Riciclabile',
        instructions: ['Raccogli i tappi in un contenitore', 'Getta nel contenitore plastica'],
        preparationSteps: ['Pulisci dai residui', 'Alcuni comuni hanno raccolte dedicate'],
        disposalLocation: 'Contenitore plastica',
        environmentalImpact: 'I tappi sono piccoli ma si accumulano facilmente nell\'ambiente',
        tips: 'Alcune associazioni raccolgono tappi per beneficenza!',
        alternativeUses: 'Usali per creare giochi per bambini o decorazioni'
    },
    'contenitore yogurt': {
        name: 'Contenitore di yogurt',
        icon: '🥣',
        categories: ['plastica'],
        subcategory: 'PS (Polistirene) o PP',
        recyclability: 'Riciclabile se pulito',
        instructions: ['Svuota completamente', 'Sciacqua i residui', 'Getta nel contenitore plastica'],
        preparationSteps: ['Rimuovi residui di yogurt', 'Sciacqua con acqua fredda'],
        disposalLocation: 'Contenitore plastica',
        environmentalImpact: 'Il polistirene è difficile da riciclare e persistente',
        tips: 'I contenitori sporchi non sono riciclabili: sciacquali sempre!',
        alternativeUses: 'Usa come vasetti per semine o organizer per piccoli oggetti'
    },
    'flacone detersivo': {
        name: 'Flacone di detersivo',
        icon: '🧴',
        categories: ['plastica'],
        subcategory: 'HDPE (Polietilene alta densità)',
        recyclability: '100% riciclabile',
        instructions: ['Svuota completamente', 'Sciacqua brevemente', 'Getta nel contenitore plastica'],
        preparationSteps: ['Diluisci residui con acqua', 'Sciacqua più volte'],
        disposalLocation: 'Contenitore plastica',
        environmentalImpact: 'Gli HDPE sono tra le plastiche più riciclate al mondo',
        tips: 'Preferisci detersivi concentrati per ridurre la plastica.',
        alternativeUses: 'Taglia la parte superiore per fare annaffiatoi o contenitori'
    },
    'busta patatine': {
        name: 'Busta di patatine',
        icon: '🥔',
        categories: ['indifferenziata'],
        subcategory: 'Multi-strato (plastica + alluminio)',
        recyclability: 'Non riciclabile',
        instructions: ['Svuota completamente', 'Getta nel contenitore indifferenziata'],
        preparationSteps: ['Non necessaria'],
        disposalLocation: 'Contenitore indifferenziata',
        environmentalImpact: 'Le buste multi-strato non si degradano e inquinano a lungo termine',
        tips: 'Queste buste sono spesso multi-strato: verifica le regole del tuo comune.',
        alternativeUses: 'Nessun riuso consigliato'
    },
    
    // ===== CARTA =====
    'scatola cartone': {
        name: 'Scatola di cartone',
        icon: '📦',
        categories: ['carta'],
        subcategory: 'Cartone ondulato',
        recyclability: '100% riciclabile',
        instructions: ['Rimuovi nastri adesivi', 'Appiattisci', 'Getta nel contenitore carta'],
        preparationSteps: ['Togli etichette adesive', 'Spezza scatole grandi'],
        disposalLocation: 'Contenitore raccolta carta (generalmente blu o marrone)',
        environmentalImpact: 'Riciclare 1 tonnellata di carta salva 17 alberi',
        tips: 'Le scatole sporche di cibo vanno nell\'indifferenziata.',
        alternativeUses: 'Usa per imballaggi, craft, o compostaggio come "browns"'
    },
    'foglio carta': {
        name: 'Foglio di carta',
        icon: '📄',
        categories: ['carta'],
        subcategory: 'Carta comune',
        recyclability: '100% riciclabile',
        instructions: ['Assicurati sia pulita', 'Getta nel contenitore carta'],
        preparationSteps: ['Rimuovi graffette', 'Separala da plastifiche'],
        disposalLocation: 'Contenitore carta',
        environmentalImpact: 'La carta riciclata riduce l\'inquinamento dell\'aria del 74%',
        tips: 'La carta macchiata o unta non è riciclabile.',
        alternativeUses: 'Usa come carta da pacco o per appunti'
    },
    'giornale': {
        name: 'Giornale',
        icon: '📰',
        categories: ['carta'],
        subcategory: 'Carta da giornale',
        recyclability: '100% riciclabile',
        instructions: ['Rimuovi elastici', 'Getta nel contenitore carta'],
        preparationSteps: ['Togli eventuali inserti in plastica'],
        disposalLocation: 'Contenitore carta',
        environmentalImpact: 'I giornali si degradano in 6 settimane ma occupano spazio in discarica',
        tips: 'Preferisci la versione digitale per ridurre i rifiuti.',
        alternativeUses: 'Ottimo per pulire vetri, imballare oggetti fragili, o compostaggio'
    },
    'rivista': {
        name: 'Rivista',
        icon: '📖',
        categories: ['carta'],
        subcategory: 'Carta patinata lucida',
        recyclability: 'Riciclabile',
        instructions: ['Rimuovi eventuali gadget', 'Getta nel contenitore carta'],
        preparationSteps: ['Togli campioni incollati', 'Rimuovi elastici'],
        disposalLocation: 'Contenitore carta',
        environmentalImpact: 'La carta patinata richiede processi di riciclo più complessi',
        tips: 'Le riviste lucidate sono riciclabili come la carta normale.',
        alternativeUses: 'Dona a biblioteche, medici, o usa per collage'
    },
    'carta sporca': {
        name: 'Carta sporca',
        icon: '🚫',
        categories: ['indifferenziata'],
        subcategory: 'Carta contaminata',
        recyclability: 'Non riciclabile',
        instructions: ['Getta nel contenitore indifferenziata'],
        preparationSteps: ['Non pulire'],
        disposalLocation: 'Contenitore indifferenziata',
        environmentalImpact: 'La carta sporca contamina altri materiali riciclabili',
        tips: 'La carta unta o sporca di cibo non è riciclabile!',
        alternativeUses: 'Compostaggio domestico se solo organica (no grassi)'
    },
    
    // ===== VETRO =====
    'bottiglia vetro': {
        name: 'Bottiglia di vetro',
        icon: '🍾',
        categories: ['vetro'],
        subcategory: 'Vetro trasparente o colorato',
        recyclability: 'Infinitamente riciclabile',
        instructions: ['Svuota completamente', 'Rimuovi tappi', 'Sciacqua', 'Getta nel contenitore vetro'],
        preparationSteps: ['Togli etichette se facilmente rimovibili', 'Non rompere'],
        disposalLocation: 'Campana vetro (generalmente verde)',
        environmentalImpact: 'Il vetro impiega 4000 anni per degradarsi se non riciclato',
        tips: 'Il vetro è infinitamente riciclabile senza perdita di qualità!',
        alternativeUses: 'Vaso, portacandele, contenitore per liquidi fatti in casa'
    },
    'barattolo vetro': {
        name: 'Barattolo di vetro',
        icon: '🫙',
        categories: ['vetro'],
        subcategory: 'Vetro alimentare',
        recyclability: 'Infinitamente riciclabile',
        instructions: ['Svuota completamente', 'Rimuovi coperchio', 'Sciacqua', 'Getta nel contenitore vetro'],
        preparationSteps: ['Togli etichette', 'Rimuovi residui di cibo'],
        disposalLocation: 'Campana vetro',
        environmentalImpact: 'Riciclare il vetro riduce le emissioni di CO2 del 20%',
        tips: 'I barattoli sono ottimi per conservare cibi fatti in casa!',
        alternativeUses: 'Barattoli per conserve, organizer, vasi per piante grasse'
    },
    'bicchiere rotto': {
        name: 'Bicchiere rotto',
        icon: '💔',
        categories: ['indifferenziata'],
        subcategory: 'Vetro rotto',
        recyclability: 'Non riciclabile nel vetro comune',
        instructions: ['Avvolgi in carta o giornale', 'Getta nel contenitore indifferenziata'],
        preparationSteps: ['Avvolgi bene per evitare tagli', 'Segnala "VETRO" sul pacchetto'],
        disposalLocation: 'Contenitore indifferenziata (o discarica)',
        environmentalImpact: 'Il vetro rotto può ferire lavoratori della raccolta',
        tips: 'Il vetro rotto NON va nel vetro riciclabile!',
        alternativeUses: 'Mosaici, decorazioni (con cautela)'
    },
    'specchio': {
        name: 'Specchio rotto',
        icon: '🪞',
        categories: ['indifferenziata'],
        subcategory: 'Vetro specchiato (con rivestimento metallico)',
        recyclability: 'Non riciclabile',
        instructions: ['Avvolgi bene in carta', 'Getta nel contenitore indifferenziata'],
        preparationSteps: ['Proteggi con cartone o giornali', 'Nastro adesivo per tenere insieme'],
        disposalLocation: 'Contenitore indifferenziata o discarica',
        environmentalImpact: 'Gli specchi contengono rivestimenti chimici (argento/alluminio)',
        tips: 'Gli specchi hanno rivestimenti chimici e non sono riciclabili.',
        alternativeUses: 'Arte mosaico, decorazioni giardino'
    },
    
    // ===== METALLO =====
    'lattina': {
        name: 'Lattina',
        icon: '🥫',
        categories: ['metallo'],
        subcategory: 'Alluminio o acciaio (latta)',
        recyclability: 'Infinitamente riciclabile',
        instructions: ['Svuota completamente', 'Sciacqua', 'Schiaccia', 'Getta nel contenitore metalli'],
        preparationSteps: ['Rimuovi etichette se facile', 'Schiaccia per risparmiare spazio'],
        disposalLocation: 'Contenitore metalli o multimateriale',
        environmentalImpact: 'Riciclare una lattina risparmia energia per produrne 20 nuove!',
        tips: 'Le lattine sono riciclabili all\'infinito!',
        alternativeUses: 'Portapenne, vasi, decorazioni, accessori craft'
    },
    'bottiglia alluminio': {
        name: 'Bottiglia di alluminio',
        icon: '🥤',
        categories: ['metallo'],
        subcategory: 'Alluminio',
        recyclability: '100% riciclabile',
        instructions: ['Svuota e sciacqua', 'Schiaccia', 'Getta nel contenitore metalli'],
        preparationSteps: ['Pulisci internamente', 'Schiaccia per ridurre volume'],
        disposalLocation: 'Contenitore metalli',
        environmentalImpact: 'L\'alluminio riciclato richiede solo il 5% dell\'energia della produzione nuova',
        tips: 'L\'alluminio non perde qualità nel riciclo.',
        alternativeUses: 'Portafiori, decorazioni, contenitori piccoli'
    },
    'coperchio metallo': {
        name: 'Coperchio di metallo',
        icon: '🔩',
        categories: ['metallo'],
        subcategory: 'Acciaio o alluminio',
        recyclability: 'Riciclabile',
        instructions: ['Raccogli in un barattolo', 'Getta nel contenitore metalli'],
        preparationSteps: ['Pulisci da residui', 'Raccogli tanti prima di buttarli'],
        disposalLocation: 'Contenitore metalli',
        environmentalImpact: 'Anche i piccoli pezzi di metallo sono preziosi per il riciclo',
        tips: 'Anche i piccoli pezzi di metallo sono riciclabili.',
        alternativeUses: 'Decorazioni, giochi magnetici'
    },
    'alluminio': {
        name: 'Foglio di alluminio',
        icon: '🥧',
        categories: ['metallo'],
        subcategory: 'Alluminio',
        recyclability: 'Riciclabile se pulito',
        instructions: ['Pulisci dai residui', 'Strizza in palla', 'Getta nel contenitore metalli'],
        preparationSteps: ['Lava da grassi e cibo', 'Forma una palla grande (almeno 5cm)'],
        disposalLocation: 'Contenitore metalli',
        environmentalImpact: 'L\'alluminio sporco contamina il processo di riciclo',
        tips: 'L\'alluminio sporco va nell\'indifferenziata.',
        alternativeUses: 'Pulizia ferro da stiro, lucidatura metalli'
    },
    'batteria': {
        name: 'Pila o batteria',
        icon: '🔋',
        categories: ['indifferenziata'],
        subcategory: 'Pile alcaline o batterie',
        recyclability: 'Recupero metalli in centri specializzati',
        instructions: ['Porta in centro di raccolta o negozio', 'NON gettare nei bidoni'],
        preparationSteps: ['Conserva in scatola sicura', 'Porta a centri RAEE o negozi elettronica'],
        disposalLocation: 'Centro raccolta RAEE, negozi elettronica, supermercati (isole ecologiche)',
        environmentalImpact: 'Le pile contengono metalli pesanti tossici (mercurio, piombo, cadmio)',
        tips: 'Le pile contengono metalli pesanti: usa i punti di raccolta specifici!',
        alternativeUses: 'Nessuno - smaltimento obbligatorio in centri specializzati'
    },
    
    // ===== UMIDO/ORGANICO =====
    'bucce frutta': {
        name: 'Bucce di frutta',
        icon: '🍎',
        categories: ['umido'],
        subcategory: 'Rifiuto organico',
        recyclability: '100% compostabile',
        instructions: ['Getta nel contenitore umido'],
        preparationSteps: ['Nessuna preparazione necessaria'],
        disposalLocation: 'Contenitore umido/organico (generalmente marrone)',
        environmentalImpact: 'In discarica produce metano, un gas serra potente',
        tips: 'Le bucce sono ottime per il compost!',
        alternativeUses: 'Compostaggio domestico, brodo vegetale, decotti naturali'
    },
    'scarti verdura': {
        name: 'Scarti di verdura',
        icon: '🥕',
        categories: ['umido'],
        subcategory: 'Rifiuto organico',
        recyclability: '100% compostabile',
        instructions: ['Rimuovi imballaggi', 'Getta nel contenitore umido'],
        preparationSteps: ['Separa da sacchetti', 'Taglia pezzi grandi'],
        disposalLocation: 'Contenitore umido',
        environmentalImpact: 'Gli scarti organici in discarica generano lixivi inquinanti',
        tips: 'Le bucce di verdura sono ricche di nutrienti per il compost.',
        alternativeUses: 'Brodo vegetale, compostaggio, brodo per piante'
    },
    'gusci uovo': {
        name: 'Gusci d\'uovo',
        icon: '🥚',
        categories: ['umido'],
        subcategory: 'Rifiuto organico (calcio)',
        recyclability: '100% compostabile',
        instructions: ['Schiaccia i gusci', 'Getta nel contenitore umido'],
        preparationSteps: ['Schiaccia per velocizzare decomposizione'],
        disposalLocation: 'Contenitore umido',
        environmentalImpact: 'I gusci si degradano facilmente ma in discarica sprecano nutrienti',
        tips: 'I gusci d\'uovo sono ricchi di calcio per il compost!',
        alternativeUses: 'Concime naturale per piante, deterrente per lumache'
    },
    'fondi caffe': {
        name: 'Fondi di caffè',
        icon: '☕',
        categories: ['umido'],
        subcategory: 'Rifiuto organico (azoto)',
        recyclability: '100% compostabile',
        instructions: ['Getta nel contenitore umido'],
        preparationSteps: ['Filtra bene', 'Rimuovi filtri di carta (vanno nell\'umido)'],
        disposalLocation: 'Contenitore umido',
        environmentalImpact: 'I fondi di caffè sono eccellenti per il suolo se compostati',
        tips: 'I fondi di caffè sono eccellenti fertilizzanti naturali!',
        alternativeUses: 'Esfoliante naturale, deodorante frigo, concime piante acidofile'
    },
    'cibo avanzato': {
        name: 'Avanzi di cibo',
        icon: '🍽️',
        categories: ['umido'],
        subcategory: 'Rifiuto organico',
        recyclability: '100% compostabile',
        instructions: ['Rimuovi posate e imballaggi', 'Getta nel contenitore umido'],
        preparationSteps: ['Separa ossi grandi (alcuni non compostabili)', 'Togli imballaggi'],
        disposalLocation: 'Contenitore umido',
        environmentalImpact: 'Lo spreco alimentare è responsabile dell\'8% delle emissioni globali',
        tips: 'Cerca di ridurre gli sprechi alimentari!',
        alternativeUses: 'Compostaggio, brodo (se ancora buono), doggy bag'
    },
    
    // ===== INDIFFERENZIATA =====
    'pannolino': {
        name: 'Pannolino usato',
        icon: '👶',
        categories: ['indifferenziata'],
        subcategory: 'Rifiuto sanitario',
        recyclability: 'Non riciclabile',
        instructions: ['Chiudi il pannolino', 'Getta nel contenitore indifferenziata'],
        preparationSteps: ['Avvolgi su se stesso', 'Nastro adesivo per chiudere'],
        disposalLocation: 'Contenitore indifferenziata (generalmente grigio o nero)',
        environmentalImpact: 'Un pannolino impiega 450 anni per degradarsi',
        tips: 'Considera i pannolini lavabili per ridurre l\'impatto!',
        alternativeUses: 'Nessuno - usa pannolini lavabili per ridurre rifiuti'
    },
    'assorbente': {
        name: 'Assorbente igienico',
        icon: '🩸',
        categories: ['indifferenziata'],
        subcategory: 'Rifiuto sanitario',
        recyclability: 'Non riciclabile',
        instructions: ['Avvolgi in carta igienica', 'Getta nel contenitore indifferenziata'],
        preparationSteps: ['Avvolgi bene', 'Non gettare nel water'],
        disposalLocation: 'Contenitore indifferenziata',
        environmentalImpact: 'Gli assorbenti contengono plastica e sostanze chimiche',
        tips: 'Gli assorbenti sono rifiuti igienici non riciclabili.',
        alternativeUses: 'Considera coppetta mestruale o assorbenti lavabili'
    },
    'cerotti': {
        name: 'Cerotti',
        icon: '🩹',
        categories: ['indifferenziata'],
        subcategory: 'Rifiuto sanitario',
        recyclability: 'Non riciclabile',
        instructions: ['Getta nel contenitore indifferenziata'],
        preparationSteps: ['Nessuna'],
        disposalLocation: 'Contenitore indifferenziata',
        environmentalImpact: 'I cerotti sono multi-materiale (tessuto, plastica, adesivo)',
        tips: 'I cerotti sono rifiuti sanitari.',
        alternativeUses: 'Nessuno'
    },
    'posate plastica': {
        name: 'Posate di plastica',
        icon: '🍴',
        categories: ['indifferenziata'],
        subcategory: 'Plastica mista',
        recyclability: 'Non riciclabile',
        instructions: ['Pulisci dai residui', 'Getta nel contenitore indifferenziata'],
        preparationSteps: ['Lava se sporche'],
        disposalLocation: 'Contenitore indifferenziata',
        environmentalImpact: 'Le posate monouso sono tra i rifiuti più comuni su spiagge e mari',
        tips: 'Preferisci sempre posate riutilizzabili!',
        alternativeUses: 'Nessuno - usa posate riutilizzabili'
    },
    'penna': {
        name: 'Penna',
        icon: '✒️',
        categories: ['indifferenziata'],
        subcategory: 'Multi-materiale (plastica, metallo, inchiostro)',
        recyclability: 'Non riciclabile',
        instructions: ['Getta nel contenitore indifferenziata'],
        preparationSteps: ['Nessuna'],
        disposalLocation: 'Contenitore indifferenziata',
        environmentalImpact: 'Le penne contengono inchiostro chimico e componenti misti',
        tips: 'Le penne sono plastica, metallo e inchiostro: non riciclabili.',
        alternativeUses: 'Considera penne ricaricabili o stilografiche'
    },
    
    // ===== RIFIUTI SPECIALI =====
    'farmaci': {
        name: 'Farmaci scaduti',
        icon: '💊',
        categories: ['indifferenziata'],
        subcategory: 'Rifiuto sanitario speciale',
        recyclability: 'Recupero in farmacia',
        instructions: ['Porta in farmacia', 'NON gettare nel water o bidoni'],
        preparationSteps: ['Conserva nella confezione originale', 'Rimuovi etichette personali'],
        disposalLocation: 'Qualsiasi farmacia (raccolta gratuita)',
        environmentalImpact: 'I farmaci inquinano gravemente falde acquifere e ecosistemi acquatici',
        tips: 'I farmaci scaduti vanno sempre in farmacia, mai nel water o bidoni!',
        alternativeUses: 'Nessuno - mai riutilizzare farmaci scaduti'
    },
    'siringa': {
        name: 'Siringa',
        icon: '💉',
        categories: ['indifferenziata'],
        subcategory: 'Rifiuto sanitario pericoloso',
        recyclability: 'Smaltimento speciale',
        instructions: ['Porta in farmacia o centro sanitario', 'NON gettare nei bidoni'],
        preparationSteps: ['Non ricappucciare l\'ago', 'Usa contenitore rigido per trasporto'],
        disposalLocation: 'Farmacia, centro sanitario, ospedale',
        environmentalImpact: 'Rischio infezioni e contaminazione ambientale grave',
        tips: 'Le siringhe sono rifiuti sanitari pericolosi.',
        alternativeUses: 'Nessuno'
    },
    'vernice': {
        name: 'Vernice o solvente',
        icon: '🎨',
        categories: ['indifferenziata'],
        subcategory: 'Rifiuto pericoloso',
        recyclability: 'Smaltimento speciale',
        instructions: ['Porta in centro di raccolta rifiuti pericolosi', 'NON gettare nei bidoni o scarico'],
        preparationSteps: ['Lascia indurire residui secchi', 'Chiudi bene barattoli'],
        disposalLocation: 'Centro raccolta rifiuti pericolosi (isola ecologica)',
        environmentalImpact: 'Tossicità acuta per acqua, suolo e organismi',
        tips: 'Le vernici sono rifiuti speciali: non gettarle mai nei bidoni normali!',
        alternativeUses: 'Nessuno - smaltimento obbligatorio in centri specializzati'
    },
    'olio motore': {
        name: 'Olio motore esausto',
        icon: '🛢️',
        categories: ['indifferenziata'],
        subcategory: 'Rifiuto pericoloso',
        recyclability: 'Rigenerazione in centri autorizzati',
        instructions: ['Porta in autofficina o centro di raccolta', 'NON gettare mai nell\'ambiente'],
        preparationSteps: ['Conserva in contenitore chiuso', 'Non mescolare con altri oli'],
        disposalLocation: 'Autofficina, centro raccolta oli, isola ecologica',
        environmentalImpact: '1 litro di olio motore inquina 1 milione di litri d\'acqua!',
        tips: 'L\'olio motore è pericoloso per l\'ambiente: mai nel lavandino o terra!',
        alternativeUses: 'Nessuno - rigenerazione industriale obbligatoria'
    },
    'elettronica': {
        name: 'Rifiuto elettronico (RAEE)',
        icon: '📱',
        categories: ['indifferenziata'],
        subcategory: 'Apparecchiature elettriche/elettroniche',
        recyclability: 'Recupero componenti in centri specializzati',
        instructions: ['Porta in centro RAEE o negozio (1 contro 1)', 'NON gettare nei bidoni'],
        preparationSteps: ['Cancella dati personali', 'Rimuovi batterie se possibile'],
        disposalLocation: 'Centro raccolta RAEE, negozi elettronica (con acquisto nuovo)',
        environmentalImpact: 'I RAEE contengono metalli pesanti e sostanze tossiche (piombo, mercurio, cadmio)',
        tips: 'L\'elettronica va nei centri RAEE: recupera metalli preziosi e riduce inquinamento!',
        alternativeUses: 'Dona se funzionante, ripara, rivendi'
    },
    
    // ===== MULTI-MATERIALE =====
    'tetra pak': {
        name: 'Tetra Pak (brik)',
        icon: '🧃',
        categories: ['plastica', 'carta'],
        subcategory: 'Multi-strato (carta 75%, plastica 20%, alluminio 5%)',
        recyclability: 'Riciclabile in impianti specializzati',
        instructions: ['Svuota completamente', 'Sciacqua', 'Schiaccia', 'Getta nel contenitore indicato dal comune'],
        preparationSteps: ['Pulisci bene', 'Appiattisci per risparmiare spazio'],
        disposalLocation: 'Verifica il tuo comune: plastica, carta, o multimateriale',
        environmentalImpact: 'Il riciclo del Tetra Pak recupera cellulosa e alluminio',
        tips: 'I Tetra Pak sono carta, plastica e alluminio: verifica dove buttarli nel tuo comune!',
        alternativeUses: 'Portapenne, vasi, organizer (tagliando lateralmente)'
    },
    'brik latte': {
        name: 'Brik del latte',
        icon: '🥛',
        categories: ['plastica', 'carta'],
        subcategory: 'Multi-strato carta/plastica/alluminio',
        recyclability: 'Riciclabile in impianti specializzati',
        instructions: ['Svuota completamente', 'Sciacqua', 'Schiaccia', 'Getta nel contenitore indicato'],
        preparationSteps: ['Taglia e pulisci interno', 'Appiattisci'],
        disposalLocation: 'Verifica regole comune: plastica o carta',
        environmentalImpact: 'Stesso impatto del Tetra Pak',
        tips: 'I brik sono multi-materiale: verifica dove buttarli nel tuo comune.',
        alternativeUses: 'Vasi per semine, contenitori piccoli'
    }
};

// ===== Data: Badges =====
const badges = [
    {
        id: 'plastic_master',
        name: 'Maestro della Plastica',
        description: 'Smaltisci 10 oggetti di plastica',
        icon: '🥤',
        condition: (stats) => stats.plasticCount >= 10
    },
    {
        id: 'wet_expert',
        name: 'Esperto dell\'Umido',
        description: 'Smaltisci 10 oggetti nell\'umido',
        icon: '🍎',
        condition: (stats) => stats.wetCount >= 10
    },
    {
        id: 'perfect_separator',
        name: 'Separatore Perfetto',
        description: 'Smaltisci correttamente 20 rifiuti',
        icon: '♻️',
        condition: (stats) => stats.correctDisposals >= 20
    },
    {
        id: 'eco_aware',
        name: 'Eco Consapevole',
        description: 'Raggiungi 100 punti',
        icon: '🌱',
        condition: (stats) => stats.totalPoints >= 100
    },
    {
        id: 'eco_master',
        name: 'Eco Master',
        description: 'Raggiungi 500 punti',
        icon: '👑',
        condition: (stats) => stats.totalPoints >= 500
    },
    {
        id: 'multi_material',
        name: 'Separatore Multi',
        description: 'Smaltisci 5 rifiuti multi-materiale',
        icon: '🔀',
        condition: (stats) => stats.multiMaterialCount >= 5
    }
];

// ===== Data: Levels =====
const levels = [
    { name: 'Eco Novizio', minPoints: 0 },
    { name: 'Eco Principiante', minPoints: 50 },
    { name: 'Eco Apprendista', minPoints: 150 },
    { name: 'Eco Esperto', minPoints: 300 },
    { name: 'Eco Maestro', minPoints: 500 },
    { name: 'Eco Campione', minPoints: 1000 }
];

// ===== App State =====
let appState = {
    currentUser: null,
    comune: '',
    points: 0,
    searches: 0,
    correctDisposals: 0,
    plasticCount: 0,
    wetCount: 0,
    multiMaterialCount: 0,
    history: [],
    unlockedBadges: [],
    notifications: true,
    sound: true,
    groqApiKey: ''
};

// ===== DOM Elements =====
let screens = {};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize screens after DOM is loaded
    screens = {
        onboarding: document.getElementById('onboarding-screen'),
        auth: document.getElementById('auth-screen'),
        main: document.getElementById('main-screen')
    };
    
    loadState();
    initEventListeners();
    showCorrectScreen();
});

function loadState() {
    const saved = localStorage.getItem('ecobuddy_state');
    if (saved) {
        appState = { ...appState, ...JSON.parse(saved) };
    }
}

function saveState() {
    localStorage.setItem('ecobuddy_state', JSON.stringify(appState));
}

function showCorrectScreen() {
    if (!appState.comune) {
        showScreen('onboarding');
    } else if (!appState.currentUser) {
        showScreen('auth');
    } else {
        showScreen('main');
        updateUI();
    }
}

function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// ===== Event Listeners =====
function initEventListeners() {
    // Onboarding
    const comuneSelect = document.getElementById('comune-select');
    const startBtn = document.getElementById('start-btn');
    
    if (comuneSelect && startBtn) {
        comuneSelect.addEventListener('change', (e) => {
            appState.comune = e.target.value;
            startBtn.disabled = !appState.comune;
        });
        
        startBtn.addEventListener('click', () => {
            saveState();
            showScreen('auth');
        });
    }

    // Auth Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            btn.classList.add('active');
            const formEl = document.getElementById(`${tab}-form`);
            if (formEl) formEl.classList.add('active');
        });
    });

    // Login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const email = document.getElementById('login-email')?.value;
            const password = document.getElementById('login-password')?.value;
            if (email && password) {
                appState.currentUser = { email, name: email.split('@')[0] };
                saveState();
                showScreen('main');
                updateUI();
                showNotification('🏆', 'Benvenuto!', `Ciao ${appState.currentUser.name}, pronto a salvare il pianeta?`);
            }
        });
    }

    // Register
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            const name = document.getElementById('register-name')?.value;
            const email = document.getElementById('register-email')?.value;
            const password = document.getElementById('register-password')?.value;
            if (name && email && password) {
                appState.currentUser = { email, name };
                saveState();
                showScreen('main');
                updateUI();
                showNotification('🌱', 'Account creato!', 'Benvenuto in EcoBuddy! Inizia a smaltire i rifiuti correttamente.');
            }
        });
    }

    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const pageEl = document.getElementById(`${page}-page`);
            if (pageEl) pageEl.classList.add('active');
            
            if (page === 'dashboard') updateDashboard();
            if (page === 'history') updateHistory();
        });
    });

    // Search
    const searchBtn = document.getElementById('search-btn');
    const wasteInput = document.getElementById('waste-input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    if (wasteInput) {
        wasteInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Quick tags
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            if (wasteInput) {
                wasteInput.value = tag.dataset.waste;
                performSearch();
            }
        });
    });

    // Settings
    const settingsComune = document.getElementById('settings-comune');
    if (settingsComune) {
        settingsComune.value = appState.comune;
        settingsComune.addEventListener('change', (e) => {
            appState.comune = e.target.value;
            saveState();
        });
    }

    const notificationsToggle = document.getElementById('notifications-toggle');
    if (notificationsToggle) {
        notificationsToggle.addEventListener('change', (e) => {
            appState.notifications = e.target.checked;
            saveState();
        });
    }

    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('change', (e) => {
            appState.sound = e.target.checked;
            saveState();
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            appState.currentUser = null;
            saveState();
            showScreen('auth');
        });
    }

    // Backend status check
    checkBackendStatus();
}

async function checkBackendStatus() {
    const statusEl = document.getElementById('backend-status');
    if (!statusEl) return;
    
    try {
        const response = await fetch('/api/health', { method: 'GET' });
        if (response.ok) {
            statusEl.textContent = '✅ Connesso';
            statusEl.className = 'backend-status connected';
            console.log('✅ Backend connesso');
        } else {
            throw new Error('Backend not ok');
        }
    } catch (error) {
        statusEl.textContent = '❌ Offline';
        statusEl.className = 'backend-status disconnected';
        console.log('⚠️ Backend non disponibile, verrà usato l\'algoritmo locale');
    }
}

// ===== Search & AI Logic =====
let currentSearchResult = null;

async function performSearch() {
    const query = document.getElementById('waste-input').value.toLowerCase().trim();
    if (!query) return;

    appState.searches++;
    saveState();

    // Show processing indicator
    showProcessingIndicator();

    let result;
    
    // Try backend API first (AI-powered recognition)
    try {
        result = await callBackendAPI(query);
    } catch (error) {
        console.error('Backend API error:', error);
        // Show error message - AI is required
        hideProcessingIndicator();
        showOfflineError();
        return;
    }
    
    currentSearchResult = result;
    hideProcessingIndicator();
    displayResult(result);
}

function showOfflineError() {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = `
        <div class="result-card error-card">
            <div class="result-header">
                <span class="result-icon">❌</span>
                <h3>Servizio AI non disponibile</h3>
            </div>
            <div class="error-message">
                <p><strong>Impossibile analizzare il rifiuto.</strong></p>
                <p>Il sistema di riconoscimento AI è attualmente offline.</p>
                <br>
                <p><strong>Per risolvere:</strong></p>
                <ol>
                    <li>Verifica che il backend sia avviato:</li>
                    <code>cd ecobuddy/backend && .\start.bat GROQ_API_KEY</code>
                    <li>Controlla che il server sia in esecuzione su porta 3001</li>
                    <li>Verifica la connessione internet</li>
                </ol>
                <br>
                <p class="error-note">⚠️ L'app richiede la connessione all'AI per il riconoscimento accurato dei rifiuti.</p>
            </div>
        </div>
    `;
}

function showProcessingIndicator() {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = `
        <div class="ai-processing">
            <span class="ai-processing-icon">🤖</span>
            <p class="ai-processing-text">L'AI sta analizzando il tuo rifiuto...</p>
        </div>
    `;
    resultsContainer.classList.remove('hidden');
}

function hideProcessingIndicator() {
    // Will be replaced by actual results
}

async function callBackendAPI(query) {
    // Use relative URL for Vercel (same domain)
    const response = await fetch('/api/analyze-waste', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        throw new Error(`Backend API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if fallback is needed
    if (data.fallback || data.error) {
        console.log('Backend returned fallback, using local algorithm');
        return findWasteMatch(query);
    }
    
    return {
        name: data.name || query,
        icon: data.icon || '♻️',
        categories: data.categories || ['indifferenziata'],
        subcategory: data.subcategory || '',
        recyclability: data.recyclability || '',
        instructions: data.instructions || ['Consulta il regolamento del tuo comune'],
        preparationSteps: data.preparationSteps || [],
        disposalLocation: data.disposalLocation || '',
        environmentalImpact: data.environmentalImpact || '',
        tips: data.tips || 'Verifica sempre le regole specifiche del tuo comune.',
        alternativeUses: data.alternativeUses || '',
        isMultiMaterial: data.isMultiMaterial || false,
        requiresSpecialHandling: data.requiresSpecialHandling || false,
        specialInstructions: data.specialInstructions || '',
        isAiGenerated: data.isAiGenerated || false
    };
}

function findWasteMatch(query) {
    // Direct match
    if (wasteDatabase[query]) {
        return wasteDatabase[query];
    }

    // Partial match
    for (const [key, value] of Object.entries(wasteDatabase)) {
        if (query.includes(key) || key.includes(query)) {
            return value;
        }
    }

    // Word-by-word matching
    const words = query.split(' ');
    for (const word of words) {
        if (word.length > 3) {
            for (const [key, value] of Object.entries(wasteDatabase)) {
                if (key.includes(word) || word.includes(key)) {
                    return value;
                }
            }
        }
    }

    // Category inference based on keywords
    return inferCategory(query);
}

function inferCategory(query) {
    const keywords = {
        plastica: ['plastica', 'bottiglia', 'sacchetto', 'sacca', 'busta', 'contenitore', 'vaso', 'tappo'],
        carta: ['carta', 'foglio', 'giornale', 'rivista', 'scatola', 'cartone', 'quaderno', 'libro'],
        vetro: ['vetro', 'bottiglia vetro', 'barattolo vetro', 'bicchiere', 'vaso vetro'],
        metallo: ['lattina', 'alluminio', 'metallo', 'ferro', 'acciaio', 'coperchio metallo'],
        umido: ['cibo', 'pizza', 'pasta', 'frutta', 'verdura', 'bucce', 'gusci', 'caffè', 'umido', 'organico'],
        indifferenziata: ['pannolino', 'cerotto', 'fazzoletto', 'carta sporca', 'posata plastica']
    };

    for (const [category, words] of Object.entries(keywords)) {
        for (const word of words) {
            if (query.includes(word)) {
                return createGenericResult(category, query);
            }
        }
    }

    // Default fallback - risposta completa anche per rifiuti sconosciuti
    return {
        name: query.charAt(0).toUpperCase() + query.slice(1) || 'Rifiuto non classificato',
        icon: '🔍',
        categories: ['indifferenziata'],
        subcategory: 'Rifiuto non presente nel database locale',
        recyclability: 'Da verificare - connettiti online per analisi AI completa',
        instructions: [
            'Verifica la composizione materica dell\'oggetto',
            'Controlla eventuali simboli di riciclabilità',
            'Consulta il regolamento del tuo comune',
            'Quando in dubbio, getta nell\'indifferenziata'
        ],
        preparationSteps: ['Ispeziona l\'oggetto per identificare i materiali', 'Rimuovi parti diverse se separabili'],
        disposalLocation: 'Contenitore indifferenziata (in attesa di verifica) o centro raccolta per consulenza',
        environmentalImpact: 'Rifiuti non correttamente classificati possono finire in discarica o contaminare altri flussi di riciclo',
        tips: 'Questo rifiuto non è nel database locale. Connettiti online per un\'analisi accurata con l\'AI che identificherà il materiale specifico e le istruzioni corrette!',
        alternativeUses: 'Verifica se l\'oggetto può essere riutilizzato, riparato o donato prima dello smaltimento',
        isOfflineResult: true,
        isUnknownWaste: true
    };
}

function createGenericResult(category, query) {
    const categoryInfo = {
        plastica: { 
            icon: '🥤', 
            name: 'Plastica', 
            instructions: ['Svuota e sciacqua il contenitore', 'Rimuovi tappi e coperchi', 'Schiaccia per ridurre volume', 'Getta nel contenitore della plastica'],
            subcategory: 'Plastica generica',
            recyclability: 'Dipende dal tipo specifico di plastica',
            preparationSteps: ['Pulisci dai residui di cibo', 'Rimuovi etichette se possibile'],
            disposalLocation: 'Contenitore raccolta plastica (generalmente giallo o blu)',
            environmentalImpact: 'La plastica non riciclata impiega centinaia di anni per degradarsi',
            alternativeUses: 'Verifica se riutilizzabile prima di buttare'
        },
        carta: { 
            icon: '📄', 
            name: 'Carta', 
            instructions: ['Assicurati sia pulita e non unta', 'Rimuovi graffette e nastri', 'Piegala per risparmiare spazio', 'Getta nel contenitore della carta'],
            subcategory: 'Carta generica',
            recyclability: '100% riciclabile se pulita',
            preparationSteps: ['Separa da altri materiali', 'Verifica non sia plastificata'],
            disposalLocation: 'Contenitore raccolta carta (generalmente blu)',
            environmentalImpact: 'Riciclare la carta salva alberi e riduce l\'inquinamento dell\'aria',
            alternativeUses: 'Usa come carta da pacco o per appunti'
        },
        vetro: { 
            icon: '🍾', 
            name: 'Vetro', 
            instructions: ['Svuota completamente', 'Rimuovi tappi e coperchi', 'Sciacqua brevemente', 'Getta nel contenitore del vetro'],
            subcategory: 'Vetro generico',
            recyclability: 'Infinitamente riciclabile',
            preparationSteps: ['Rimuovi etichette se facile', 'Non rompere il vetro'],
            disposalLocation: 'Campana vetro (generalmente verde)',
            environmentalImpact: 'Il vetro non riciclato impiega 4000 anni per degradarsi',
            alternativeUses: 'Ottimo per riutilizzo come contenitori o vasi'
        },
        metallo: { 
            icon: '🥫', 
            name: 'Metallo', 
            instructions: ['Svuota e sciacqua', 'Rimuovi etichette se possibile', 'Schiaccia per risparmiare spazio', 'Getta nel contenitore dei metalli'],
            subcategory: 'Metallo generico',
            recyclability: 'Infinitamente riciclabile',
            preparationSteps: ['Pulisci dai residui', 'Raccogli pezzi piccoli in un barattolo'],
            disposalLocation: 'Contenitore metalli o multimateriale',
            environmentalImpact: 'Riciclare il metallo riduce drasticamente l\'inquinamento minerario',
            alternativeUses: 'Molti oggetti metallici possono essere riparati o riutilizzati'
        },
        umido: { 
            icon: '🍎', 
            name: 'Umido', 
            instructions: ['Rimuovi imballaggi e sacchetti', 'Taglia pezzi grandi', 'Getta nel contenitore dell\'umido'],
            subcategory: 'Rifiuto organico',
            recyclability: '100% compostabile',
            preparationSteps: ['Separa da plastica e metallo', 'Secco: tovaglioli di carta possono andare nell\'umido'],
            disposalLocation: 'Contenitore umido/organico (generalmente marrone)',
            environmentalImpact: 'Gli scarti organici in discarica producono metano, gas serra potente',
            alternativeUses: 'Compostaggio domestico per fertilizzante naturale'
        },
        indifferenziata: { 
            icon: '🗑️', 
            name: 'Indifferenziata', 
            instructions: ['Verifica non sia riciclabile', 'Se multi-materiale, separa se possibile', 'Getta nel contenitore dell\'indifferenziata'],
            subcategory: 'Rifiuto non riciclabile',
            recyclability: 'Non riciclabile',
            preparationSteps: ['Controlla se esistono alternative di smaltimento speciali'],
            disposalLocation: 'Contenitore indifferenziata (generalmente grigio o nero)',
            environmentalImpact: 'Finisce in discarica o inceneritore, inquina a lungo termine',
            alternativeUses: 'Verifica sempre se riutilizzabile o riparabile'
        }
    };

    const info = categoryInfo[category];
    return {
        name: query.charAt(0).toUpperCase() + query.slice(1),
        icon: info.icon,
        categories: [category],
        subcategory: info.subcategory,
        recyclability: info.recyclability,
        instructions: info.instructions,
        preparationSteps: info.preparationSteps,
        disposalLocation: info.disposalLocation,
        environmentalImpact: info.environmentalImpact,
        tips: `Questo oggetto sembra essere di ${info.name}. Verifica sempre le regole del tuo comune!`,
        alternativeUses: info.alternativeUses,
        isOfflineResult: true
    };
}

function displayResult(result) {
    const resultsContainer = document.getElementById('search-results');
    
    // Calculate points
    const isMultiMaterial = result.categories.length > 1 || result.isMultiMaterial;
    const points = isMultiMaterial ? 30 : 10;
    
    // Build detailed result card with all new fields
    let detailedInfoHTML = '';
    
    // Subcategory info
    if (result.subcategory) {
        detailedInfoHTML += `
            <div class="detail-section">
                <h4>🔬 Materiale specifico:</h4>
                <p class="detail-text">${result.subcategory}</p>
            </div>
        `;
    }
    
    // Recyclability
    if (result.recyclability) {
        detailedInfoHTML += `
            <div class="detail-section">
                <h4>♻️ Riciclabilità:</h4>
                <p class="detail-text">${result.recyclability}</p>
            </div>
        `;
    }
    
    // Preparation steps
    if (result.preparationSteps && result.preparationSteps.length > 0) {
        detailedInfoHTML += `
            <div class="detail-section">
                <h4>🧹 Preparazione:</h4>
                <ul class="detail-list">
                    ${result.preparationSteps.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Disposal location
    if (result.disposalLocation) {
        detailedInfoHTML += `
            <div class="detail-section">
                <h4>📍 Dove buttarlo:</h4>
                <p class="detail-text highlight">${result.disposalLocation}</p>
            </div>
        `;
    }
    
    // Environmental impact
    if (result.environmentalImpact) {
        detailedInfoHTML += `
            <div class="detail-section impact-section">
                <h4>🌍 Impatto ambientale:</h4>
                <p class="detail-text">${result.environmentalImpact}</p>
            </div>
        `;
    }
    
    // Alternative uses
    if (result.alternativeUses) {
        detailedInfoHTML += `
            <div class="detail-section reuse-section">
                <h4>🔄 Riuso possibile:</h4>
                <p class="detail-text">${result.alternativeUses}</p>
            </div>
        `;
    }
    
    // Special handling warning
    if (result.requiresSpecialHandling) {
        detailedInfoHTML += `
            <div class="detail-section warning-section">
                <h4>⚠️ Attenzione speciale:</h4>
                <p class="detail-text warning">${result.specialInstructions || 'Questo rifiuto richiede gestione speciale'}</p>
            </div>
        `;
    }
    
    // Offline mode warning
    const offlineWarning = result.isOfflineResult ? `
        <div class="detail-section warning-section">
            <h4>⚠️ Modalità Offline:</h4>
            <p class="detail-text warning">
                ${result.isUnknownWaste 
                    ? 'Questo rifiuto non è nel database locale. Avvia il backend per un\'analisi AI completa e accurata!' 
                    : 'Stai usando il database locale. Per risultati più accurati con analisi AI dettagliata, avvia il backend.'}
            </p>
        </div>
    ` : '';
    
    // Restore original result card structure
    resultsContainer.innerHTML = `
        <div class="result-card">
            <div class="auto-points-badge" id="auto-points-badge">
                <span>⭐ +${points} punti aggiunti automaticamente!</span>
            </div>
            <div class="result-header">
                <span id="result-icon" class="result-icon">${result.icon}</span>
                <h3 id="result-title">${result.name} ${result.isAiGenerated ? '<span class="ai-badge">🤖 AI</span>' : (result.isOfflineResult ? '<span class="offline-badge">📴 Offline</span>' : '')}</h3>
            </div>
            <div class="result-categories" id="result-categories"></div>
            <div class="result-instructions">
                <h4>📋 Istruzioni per lo smaltimento:</h4>
                <ul id="result-steps"></ul>
            </div>
            ${detailedInfoHTML}
            ${offlineWarning}
            <div class="result-tips">
                <h4>💡 Consiglio utile:</h4>
                <p id="result-tips-text"></p>
            </div>
        </div>
    `;
    
    // Categories
    const categoriesContainer = document.getElementById('result-categories');
    categoriesContainer.innerHTML = result.categories.map(cat => 
        `<span class="category-badge category-${cat}">${cat.toUpperCase()}</span>`
    ).join('');
    
    // Multi-material bonus
    if (isMultiMaterial) {
        categoriesContainer.innerHTML += `
            <div class="multi-bonus">
                <span class="multi-bonus-text">🎉 Bonus Multi-Materiale! (+20 punti extra)</span>
            </div>
        `;
    }
    
    // Instructions
    const stepsContainer = document.getElementById('result-steps');
    stepsContainer.innerHTML = result.instructions.map(step => 
        `<li>${step}</li>`
    ).join('');
    
    // Tips
    document.getElementById('result-tips-text').textContent = result.tips;
    
    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Auto-assign points
    autoAssignPoints(result, points);
}

// ===== Gamification =====
function autoAssignPoints(result, points) {
    const isMultiMaterial = result.categories.length > 1 || result.isMultiMaterial;
    
    // Update stats
    appState.points += points;
    appState.correctDisposals++;
    
    // Category counters
    if (result.categories.includes('plastica')) {
        appState.plasticCount++;
    }
    if (result.categories.includes('umido')) {
        appState.wetCount++;
    }
    if (isMultiMaterial) {
        appState.multiMaterialCount++;
    }
    
    // Add to history
    appState.history.unshift({
        name: result.name,
        icon: result.icon,
        categories: result.categories,
        points: points,
        date: new Date().toISOString()
    });
    
    // Keep only last 50 items
    if (appState.history.length > 50) {
        appState.history = appState.history.slice(0, 50);
    }
    
    saveState();
    updateUI();
    
    // Check for new badges
    checkNewBadges();
    
    // Show notification
    showNotification('⭐', `+${points} punti!`, `Hai analizzato: ${result.name}`);
}

function checkNewBadges() {
    const stats = {
        totalPoints: appState.points,
        correctDisposals: appState.correctDisposals,
        plasticCount: appState.plasticCount,
        wetCount: appState.wetCount,
        multiMaterialCount: appState.multiMaterialCount
    };
    
    badges.forEach(badge => {
        if (!appState.unlockedBadges.includes(badge.id) && badge.condition(stats)) {
            appState.unlockedBadges.push(badge.id);
            saveState();
            showNotification('🏆', 'Nuovo Badge!', `Hai sbloccato: ${badge.name}`);
        }
    });
}

function getCurrentLevel() {
    for (let i = levels.length - 1; i >= 0; i--) {
        if (appState.points >= levels[i].minPoints) {
            return levels[i];
        }
    }
    return levels[0];
}

function getNextLevel() {
    const currentLevel = getCurrentLevel();
    const currentIndex = levels.findIndex(l => l.name === currentLevel.name);
    return levels[currentIndex + 1] || null;
}

function getLevelProgress() {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    
    if (!nextLevel) return 100;
    
    const range = nextLevel.minPoints - currentLevel.minPoints;
    const progress = appState.points - currentLevel.minPoints;
    return Math.min(100, Math.round((progress / range) * 100));
}

// ===== UI Updates =====
function updateUI() {
    // Header stats
    document.getElementById('user-points').textContent = appState.points;
    document.getElementById('user-level').textContent = getCurrentLevel().name;
    
    updateDashboard();
}

function updateDashboard() {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    const progress = getLevelProgress();
    
    document.getElementById('profile-name').textContent = appState.currentUser?.name || 'Eco Utente';
    document.getElementById('profile-level-text').textContent = currentLevel.name;
    document.getElementById('level-progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = nextLevel 
        ? `${appState.points}/${nextLevel.minPoints} punti`
        : 'Livello massimo raggiunto!';
    
    document.getElementById('total-points').textContent = appState.points;
    document.getElementById('total-searches').textContent = appState.searches;
    document.getElementById('correct-disposals').textContent = appState.correctDisposals;
    
    // Badges
    const badgesContainer = document.getElementById('badges-container');
    const stats = {
        totalPoints: appState.points,
        correctDisposals: appState.correctDisposals,
        plasticCount: appState.plasticCount,
        wetCount: appState.wetCount,
        multiMaterialCount: appState.multiMaterialCount
    };
    
    badgesContainer.innerHTML = badges.map(badge => {
        const unlocked = appState.unlockedBadges.includes(badge.id);
        const canUnlock = badge.condition(stats);
        return `
            <div class="badge-item ${unlocked ? 'unlocked' : 'locked'}">
                <span class="badge-icon">${badge.icon}</span>
                <span class="badge-name">${badge.name}</span>
                <span class="badge-desc">${badge.description}</span>
            </div>
        `;
    }).join('');
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    
    if (appState.history.length === 0) {
        historyList.innerHTML = `
            <div class="empty-history">
                <div class="empty-history-icon">📜</div>
                <p>Nessuna ricerca ancora</p>
                <p>Inizia a smaltire i rifiuti!</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = appState.history.map(item => {
        const date = new Date(item.date);
        const dateStr = date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' });
        return `
            <div class="history-item">
                <span class="history-icon">${item.icon}</span>
                <div class="history-info">
                    <span class="history-name">${item.name}</span>
                    <span class="history-category">${item.categories.join(', ')} - ${dateStr}</span>
                </div>
                <span class="history-points">+${item.points}</span>
            </div>
        `;
    }).join('');
}

// ===== Notifications =====
function showNotification(icon, title, message) {
    if (!appState.notifications) return;
    
    const toast = document.getElementById('notification-toast');
    document.getElementById('notification-icon').textContent = icon;
    document.getElementById('notification-title').textContent = title;
    document.getElementById('notification-message').textContent = message;
    
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}
