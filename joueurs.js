/**
 * Module de gestion des joueurs
 * Gère l'authentification, la progression et le stockage des données des joueurs
 */

// Clés pour le localStorage
const CLE_JOUEURS = 'horloge_joueurs';
const CLE_JOUEUR_ACTUEL = 'horloge_joueur_actuel';

/**
 * Structure d'un joueur :
 * {
 *   nom: string,
 *   niveau: number,
 *   succesConsecutifs: number,
 *   questionsNiveau7: number,
 *   scoreTotal: number,
 *   questionsTotal: number,
 *   dateCreation: timestamp,
 *   dernierAcces: timestamp
 * }
 */

/**
 * Charge tous les joueurs depuis le localStorage
 * @returns {Object} Objet avec les joueurs (nom => données)
 */
function chargerJoueurs() {
    const donnees = localStorage.getItem(CLE_JOUEURS);
    return donnees ? JSON.parse(donnees) : {};
}

/**
 * Sauvegarde les joueurs dans le localStorage
 * @param {Object} joueurs - Objet avec les joueurs
 */
function sauvegarderJoueurs(joueurs) {
    localStorage.setItem(CLE_JOUEURS, JSON.stringify(joueurs));
}

/**
 * Récupère le nom du joueur actuellement connecté
 * @returns {string|null} Nom du joueur ou null
 */
function obtenirJoueurActuel() {
    return localStorage.getItem(CLE_JOUEUR_ACTUEL);
}

/**
 * Définit le joueur actuel
 * @param {string} nom - Nom du joueur
 */
function definirJoueurActuel(nom) {
    localStorage.setItem(CLE_JOUEUR_ACTUEL, nom);
}

/**
 * Déconnexion du joueur actuel
 */
function deconnecterJoueur() {
    localStorage.removeItem(CLE_JOUEUR_ACTUEL);
}

/**
 * Crée un nouveau joueur
 * @param {string} nom - Nom du joueur
 * @returns {Object} Les données du nouveau joueur
 */
function creerJoueur(nom) {
    const maintenant = Date.now();
    return {
        nom: nom,
        niveau: 1,
        succesConsecutifs: 0,
        questionsNiveau7: 0,
        scoreTotal: 0,
        questionsTotal: 0,
        dateCreation: maintenant,
        dernierAcces: maintenant
    };
}

/**
 * Ajoute ou met à jour un joueur
 * @param {string} nom - Nom du joueur
 * @param {Object} donnees - Données du joueur (optionnel pour création)
 */
function ajouterJoueur(nom, donnees = null) {
    const joueurs = chargerJoueurs();
    
    if (donnees) {
        joueurs[nom] = donnees;
    } else {
        joueurs[nom] = creerJoueur(nom);
    }
    
    sauvegarderJoueurs(joueurs);
    return joueurs[nom];
}

/**
 * Récupère les données d'un joueur
 * @param {string} nom - Nom du joueur
 * @returns {Object|null} Données du joueur ou null
 */
function obtenirDonneesJoueur(nom) {
    const joueurs = chargerJoueurs();
    const joueur = joueurs[nom];
    
    if (joueur) {
        // Mettre à jour le dernier accès
        joueur.dernierAcces = Date.now();
        joueurs[nom] = joueur;
        sauvegarderJoueurs(joueurs);
        return joueur;
    }
    
    return null;
}

/**
 * Sauvegarde la progression d'un joueur
 * @param {string} nom - Nom du joueur
 * @param {Object} progression - Objet contenant niveau, succesConsecutifs, questionsNiveau7, scoreTotal, questionsTotal
 */
function sauvegarderProgression(nom, progression) {
    const joueurs = chargerJoueurs();
    
    if (joueurs[nom]) {
        joueurs[nom].niveau = progression.niveau;
        joueurs[nom].succesConsecutifs = progression.succesConsecutifs;
        joueurs[nom].questionsNiveau7 = progression.questionsNiveau7;
        joueurs[nom].scoreTotal = progression.scoreTotal;
        joueurs[nom].questionsTotal = progression.questionsTotal;
        joueurs[nom].dernierAcces = Date.now();
        
        sauvegarderJoueurs(joueurs);
    }
}

/**
 * Supprime un joueur
 * @param {string} nom - Nom du joueur
 */
function supprimerJoueur(nom) {
    const joueurs = chargerJoueurs();
    delete joueurs[nom];
    sauvegarderJoueurs(joueurs);
    
    // Si c'était le joueur actuel, le déconnecter
    if (obtenirJoueurActuel() === nom) {
        deconnecterJoueur();
    }
}

/**
 * Obtient la liste de tous les joueurs triés par dernier accès
 * @returns {Array} Tableau de joueurs triés
 */
function obtenirListeJoueurs() {
    const joueurs = chargerJoueurs();
    return Object.values(joueurs).sort((a, b) => b.dernierAcces - a.dernierAcces);
}

/**
 * Ouvre le popup de connexion
 */
function ouvrirPopupConnexion() {
    document.getElementById('popupConnexion').style.display = 'flex';
    afficherListeJoueurs();
}

/**
 * Ferme le popup de connexion
 */
function fermerPopupConnexion(event) {
    // Si event existe et que c'est un click sur le fond, ou si pas d'event (bouton X)
    if (!event || event.target.id === 'popupConnexion') {
        document.getElementById('popupConnexion').style.display = 'none';
    }
}

/**
 * Passe en mode invité et ferme le popup
 */
function passerEnModeInvite() {
    jouerSansCompte();
    fermerPopupConnexion();
}

/**
 * Affiche la liste des joueurs existants dans le popup
 */
function afficherListeJoueurs() {
    const listeJoueurs = obtenirListeJoueurs();
    const container = document.getElementById('listeJoueurs');
    
    if (listeJoueurs.length === 0) {
        container.innerHTML = '<p class="aucun-joueur-popup">Aucun compte enregistré</p>';
        return;
    }
    
    container.innerHTML = listeJoueurs.map(joueur => {
        const pourcentage = joueur.questionsTotal > 0 
            ? Math.round((joueur.scoreTotal / joueur.questionsTotal) * 100) 
            : 0;
        
        return `
            <div class="carte-joueur-popup" onclick="selectionnerJoueur('${joueur.nom}')">
                <div class="info-joueur-popup">
                    <div class="nom-joueur-popup">${joueur.nom}</div>
                    <div class="stats-joueur-popup">Niveau ${joueur.niveau} • ${pourcentage}%</div>
                </div>
                <button class="btn-supprimer-popup" onclick="event.stopPropagation(); confirmerSuppression('${joueur.nom}')">🗑️</button>
            </div>
        `;
    }).join('');
}

/**
 * Sélectionne un joueur existant
 * @param {string} nom - Nom du joueur
 */
function selectionnerJoueur(nom) {
    const donnees = obtenirDonneesJoueur(nom);
    
    if (donnees) {
        definirJoueurActuel(nom);
        chargerProgressionJoueur(donnees);
        afficherNomJoueurActuel();
        fermerPopupConnexion();
        
        // Réinitialiser et démarrer une nouvelle question
        nouvelleQuestion();
    }
}

/**
 * Crée un nouveau joueur avec le nom saisi
 */
function creerNouveauJoueur() {
    const inputNom = document.getElementById('inputNouveauJoueur');
    const nom = inputNom.value.trim();
    
    if (nom === '') {
        alert('Veuillez entrer un nom.');
        return;
    }
    
    const joueurs = chargerJoueurs();
    if (joueurs[nom]) {
        alert('Ce nom existe déjà. Choisissez-en un autre ou sélectionnez le joueur existant.');
        return;
    }
    
    // Créer le nouveau joueur
    const nouveauJoueur = ajouterJoueur(nom);
    definirJoueurActuel(nom);
    
    // Charger sa progression (niveau 1 par défaut)
    chargerProgressionJoueur(nouveauJoueur);
    
    // Fermer le popup
    fermerPopupConnexion();
    afficherNomJoueurActuel();
    
    // Vider l'input
    inputNom.value = '';
    
    // Démarrer une nouvelle question
    nouvelleQuestion();
}

/**
 * Charge la progression d'un joueur dans les variables globales
 * @param {Object} donnees - Données du joueur
 */
function chargerProgressionJoueur(donnees) {
    niveauActuel = donnees.niveau;
    succesConsecutifs = donnees.succesConsecutifs;
    questionsNiveau7 = donnees.questionsNiveau7;
    score = donnees.scoreTotal;
    totalQuestions = donnees.questionsTotal;
    
    mettreAJourAffichageProgression();
}

/**
 * Sauvegarde la progression actuelle
 */
function sauvegarderProgressionActuelle() {
    const nomJoueur = obtenirJoueurActuel();
    
    // Ne pas sauvegarder si mode invité
    if (nomJoueur && !estModeInvite()) {
        sauvegarderProgression(nomJoueur, {
            niveau: niveauActuel,
            succesConsecutifs: succesConsecutifs,
            questionsNiveau7: questionsNiveau7,
            scoreTotal: score,
            questionsTotal: totalQuestions
        });
    }
}

/**
 * Affiche le nom du joueur actuel dans l'interface
 */
function afficherNomJoueurActuel() {
    const nom = obtenirJoueurActuel();
    const element = document.getElementById('nomJoueurActuel');
    
    if (nom && element) {
        element.textContent = nom;
    }
}


/**
 * Confirme la suppression d'un joueur
 * @param {string} nom - Nom du joueur
 */
function confirmerSuppression(nom) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le joueur "${nom}" et toute sa progression ?`)) {
        supprimerJoueur(nom);
        afficherListeJoueurs();
    }
}

/**
 * Gère la touche Entrée dans l'input de nouveau joueur
 * @param {Event} event - Événement clavier
 */
function gererEntreeNouveauJoueur(event) {
    if (event.key === 'Enter') {
        creerNouveauJoueur();
    }
}

/**
 * Joue sans compte (mode invité)
 */
function jouerSansCompte() {
    // Définir un joueur invité spécial
    definirJoueurActuel('__INVITE__');
    
    // Réinitialiser les variables du jeu (niveau 1)
    niveauActuel = 1;
    succesConsecutifs = 0;
    questionsNiveau7 = 0;
    score = 0;
    totalQuestions = 0;
    
    // Afficher "Invité" au lieu du nom
    const element = document.getElementById('nomJoueurActuel');
    if (element) {
        element.textContent = 'Invité';
    }
    
    // Démarrer une nouvelle question
    mettreAJourAffichageProgression();
    nouvelleQuestion();
}

/**
 * Vérifie si on est en mode invité
 * @returns {boolean} true si mode invité
 */
function estModeInvite() {
    return obtenirJoueurActuel() === '__INVITE__';
}

/**
 * Initialise le système de joueurs au chargement
 */
function initialiserJoueurs() {
    const joueurActuel = obtenirJoueurActuel();
    
    if (joueurActuel && !estModeInvite()) {
        // Un joueur est connecté, charger sa progression
        const donnees = obtenirDonneesJoueur(joueurActuel);
        
        if (donnees) {
            chargerProgressionJoueur(donnees);
            afficherNomJoueurActuel();
            return true; // Joueur chargé avec succès
        } else {
            // Le joueur n'existe plus, passer en mode invité
            deconnecterJoueur();
        }
    }
    
    // Démarrer en mode invité par défaut
    jouerSansCompte();
    return true;
}


