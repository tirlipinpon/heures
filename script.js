/**
 * Module de logique d'exercice
 * Gère la génération des questions, la validation des réponses et le score
 */

// Variables globales pour l'exercice
let score = 0;
let totalQuestions = 0;
let heureActuelle = null;

// Variables pour le système de niveaux
let niveauActuel = 1;
let succesConsecutifs = 0;
let questionsNiveau7 = 0;
const NIVEAUX = {
    1: { nom: "Heures du matin", heures: [6,7,8,9,10,11,12], minutes: [0] },
    2: { nom: "Quarts du matin", heures: [6,7,8,9,10,11,12], minutes: [0,15,30,45] },
    3: { nom: "Toutes minutes du matin", heures: [6,7,8,9,10,11,12], minutes: "toutes" },
    4: { nom: "Heures de l'après-midi", heures: [13,14,15,16,17,18,19,20,21,22,23,0], minutes: [0] },
    5: { nom: "Quarts de l'après-midi", heures: [13,14,15,16,17,18,19,20,21,22,23,0], minutes: [0,15,30,45] },
    6: { nom: "Toutes minutes après-midi", heures: [13,14,15,16,17,18,19,20,21,22,23,0], minutes: "toutes" },
    7: { nom: "Maîtrise complète", heures: "alternance", minutes: "toutes" }
};

/**
 * Génère une heure selon le niveau actuel (différente de la précédente)
 * @returns {Object} Objet avec {heures, minutes}
 */
function genererHeureAleatoire() {
    const configNiveau = NIVEAUX[niveauActuel];
    let nouvelleHeure;
    let tentatives = 0;
    const maxTentatives = 50;
    
    // Générer une nouvelle heure différente de la précédente
    do {
        // Choisir une heure selon le niveau
        let heures;
        if (configNiveau.heures === "alternance") {
            // Niveau 7: alternance entre matin et après-midi
            const isMatin = Math.random() < 0.5;
            if (isMatin) {
                heures = [6,7,8,9,10,11,12][Math.floor(Math.random() * 7)];
            } else {
                heures = [13,14,15,16,17,18,19,20,21,22,23,0][Math.floor(Math.random() * 12)];
            }
        } else {
            heures = configNiveau.heures[Math.floor(Math.random() * configNiveau.heures.length)];
        }
        
        // Choisir les minutes selon le niveau
        let minutes;
        if (configNiveau.minutes === "toutes") {
            minutes = Math.floor(Math.random() * 60);
        } else {
            minutes = configNiveau.minutes[Math.floor(Math.random() * configNiveau.minutes.length)];
        }
        
        nouvelleHeure = { heures, minutes };
        tentatives++;
        
    } while (
        heureActuelle !== null && 
        nouvelleHeure.heures === heureActuelle.heures && 
        nouvelleHeure.minutes === heureActuelle.minutes &&
        tentatives < maxTentatives
    );
    
    return nouvelleHeure;
}

/**
 * Vérifie la réponse complète et lance l'animation (appelé seulement si tout est correct)
 */
function verifierReponse() {
    const inputHeures = document.getElementById('inputHeures');
    const inputMinutes = document.getElementById('inputMinutes');
    
    const heuresReponse = parseInt(inputHeures.value);
    const minutesReponse = parseInt(inputMinutes.value);
    
    // Vérifier que tout est correct
    const estCorrect = heuresReponse === heureActuelle.heures && minutesReponse === heureActuelle.minutes;
    
    // Si tout est correct
    if (estCorrect) {
        // S'assurer que tout est bien bloqué
        inputHeures.disabled = true;
        inputMinutes.disabled = true;
        inputHeures.style.pointerEvents = 'none';
        inputMinutes.style.pointerEvents = 'none';
        
        // Mettre à jour le score et gérer la progression
        mettreAJourScore(true);
        gererProgressionNiveau();
        
        // Afficher le feedback de succès
        afficherFeedback('PARFAIT ! 🎉', 'correct');
        
        // Lancer l'animation de célébration SPECTACULAIRE
        lancerAnimationCelebration();
        
        // Proposer une nouvelle question après 1.5 secondes
        setTimeout(() => {
            nouvelleQuestion();
        }, 1500);
    }
}

/**
 * Valide les entrées de l'utilisateur
 * @param {number} heures - Les heures entrées
 * @param {number} minutes - Les minutes entrées
 * @returns {boolean} true si les entrées sont valides
 */
function validerEntrees(heures, minutes) {
    return !isNaN(heures) && !isNaN(minutes) && 
           heures >= 0 && heures <= 23 && 
           minutes >= 0 && minutes <= 59;
}

/**
 * Met à jour le score et l'affichage
 * @param {boolean} estCorrect - true si la réponse est correcte
 */
function mettreAJourScore(estCorrect) {
    if (estCorrect) {
        score++;
    }
    totalQuestions++;
    
    // Mettre à jour l'affichage
    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = totalQuestions;
}

/**
 * Gère la progression entre les niveaux
 */
function gererProgressionNiveau() {
    succesConsecutifs++;
    
    // Vérifier si on peut passer au niveau suivant
    if (succesConsecutifs >= 5 && niveauActuel < 7) {
        niveauActuel++;
        succesConsecutifs = 0;
        
        // Message de félicitation pour le nouveau niveau
        const nomNiveau = NIVEAUX[niveauActuel].nom;
        setTimeout(() => {
            afficherFeedback(`🎉 Niveau ${niveauActuel} : ${nomNiveau} !`, 'correct');
        }, 1000);
    }
    
    // Au niveau 7, compter les questions pour montrer la progression
    if (niveauActuel === 7) {
        questionsNiveau7++;
    }
    
    mettreAJourAffichageProgression();
}

/**
 * Met à jour l'affichage de la progression
 */
function mettreAJourAffichageProgression() {
    const nomNiveau = NIVEAUX[niveauActuel].nom;
    const progression = niveauActuel < 7 ? `${succesConsecutifs}/5` : `${questionsNiveau7} questions`;
    
    document.getElementById('titreNiveau').textContent = `Niveau ${niveauActuel} : ${nomNiveau}`;
    document.getElementById('progression').textContent = progression;
}

/**
 * Affiche un message de feedback à l'utilisateur
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type de feedback ('correct' ou 'incorrect')
 */
function afficherFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    feedback.style.display = 'block';
    
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 2000);
}

/**
 * Génère et affiche une nouvelle question
 */
function nouvelleQuestion() {
    // Générer une nouvelle heure aléatoire
    heureActuelle = genererHeureAleatoire();
    
    // Masquer les minutes par défaut (sauf si heure pile ou niveau 7)
    afficherMinutes = false;
    
    // Dessiner l'horloge avec la nouvelle heure
    dessinerHorlogeExercice(heureActuelle.heures, heureActuelle.minutes);
    
    // Réinitialiser les contrôles
    const inputHeures = document.getElementById('inputHeures');
    const inputMinutes = document.getElementById('inputMinutes');
    
    reinitialiserInputs(inputHeures, inputMinutes);
    
    // Réinitialiser complètement les styles
    inputHeures.style.backgroundColor = '';
    inputMinutes.style.backgroundColor = '';
    inputHeures.style.border = '';
    inputMinutes.style.border = '';
    inputHeures.style.pointerEvents = '';
    inputMinutes.style.pointerEvents = '';
    
    // Réactiver les inputs
    inputHeures.disabled = false;
    inputMinutes.disabled = false;
    
    // Focus sur le premier input
    inputHeures.focus();
}

/**
 * Réinitialise les champs de saisie
 */
function reinitialiserInputs(inputHeures, inputMinutes) {
    inputHeures.value = '';
    inputMinutes.value = '';
}

// Variable pour gérer le délai de vérification
let timeoutVerification = null;

/**
 * Gère la navigation automatique du champ heures vers minutes
 */
function gererNavigationHeures() {
    const inputHeures = document.getElementById('inputHeures');
    const inputMinutes = document.getElementById('inputMinutes');
    
    // Annuler toute vérification en attente
    if (timeoutVerification) {
        clearTimeout(timeoutVerification);
        timeoutVerification = null;
    }
    
    const valeur = parseInt(inputHeures.value);
    
    // Vérifier si les heures sont correctes
    if (!isNaN(valeur) && valeur >= 0 && valeur <= 23) {
        if (valeur === heureActuelle.heures) {
            // BLOQUER IMMÉDIATEMENT les heures si correctes
            inputHeures.style.backgroundColor = '#d4edda';
            inputHeures.style.border = '3px solid #28a745';
            inputHeures.disabled = true;
            inputHeures.style.pointerEvents = 'none';
            
    // Afficher automatiquement les minutes si ce n'est pas l'heure pile (sauf niveau 7)
    if (heureActuelle.minutes !== 0 && niveauActuel !== 7) {
        afficherMinutes = true;
        dessinerHorlogeExercice(heureActuelle.heures, heureActuelle.minutes);
    }
            
            // Vérifier si les minutes sont déjà correctes (cas où on remplit les heures après les minutes)
            const minutes = parseInt(inputMinutes.value);
            if (!isNaN(minutes) && minutes === heureActuelle.minutes) {
                // Les deux champs sont corrects, bloquer aussi les minutes visuellement
                inputMinutes.style.backgroundColor = '#d4edda';
                inputMinutes.style.border = '3px solid #28a745';
                inputMinutes.disabled = true;
                inputMinutes.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    verifierReponse();
                }, 200);
            } else {
                // Passer aux minutes
                setTimeout(() => {
                    inputMinutes.focus();
                    inputMinutes.select();
                }, 100);
            }
        } else {
            // Indiquer que c'est incorrect et masquer les minutes
            inputHeures.style.backgroundColor = '#ffcccc';
            afficherMinutes = false;
            dessinerHorlogeExercice(heureActuelle.heures, heureActuelle.minutes);
        }
        
        // Si l'heure a 2 chiffres, passer aux minutes même si incorrect
        if (inputHeures.value.length >= 2) {
            setTimeout(() => {
                inputMinutes.focus();
                inputMinutes.select();
            }, 300);
        }
    }
}

/**
 * Gère la saisie des minutes et vérifie immédiatement si correctes
 */
function gererNavigationMinutes() {
    const inputHeures = document.getElementById('inputHeures');
    const inputMinutes = document.getElementById('inputMinutes');
    
    // Annuler toute vérification en attente
    if (timeoutVerification) {
        clearTimeout(timeoutVerification);
        timeoutVerification = null;
    }
    
    const minutes = parseInt(inputMinutes.value);
    
    // Vérifier si les minutes sont correctes
    if (!isNaN(minutes) && minutes >= 0 && minutes <= 59) {
        if (minutes === heureActuelle.minutes) {
            // BLOQUER IMMÉDIATEMENT les minutes si correctes
            inputMinutes.style.backgroundColor = '#d4edda';
            inputMinutes.style.border = '3px solid #28a745';
            inputMinutes.disabled = true;
            inputMinutes.style.pointerEvents = 'none';
            
                // Si les DEUX sont corrects, lancer l'animation
                const heures = parseInt(inputHeures.value);
                if (heures === heureActuelle.heures) {
                    setTimeout(() => {
                        verifierReponse();
                    }, 200);
                }
        } else {
            // Indiquer que c'est incorrect
            inputMinutes.style.backgroundColor = '#ffcccc';
        }
    }
}

/**
 * Permet de vérifier en appuyant sur Entrée
 */
function gererToucheEntree(event) {
    if (event.key === 'Enter') {
        // Annuler le timeout si on appuie sur Entrée
        if (timeoutVerification) {
            clearTimeout(timeoutVerification);
            timeoutVerification = null;
        }
        verifierReponse();
    }
}

/**
 * Toggle l'affichage des minutes sur l'horloge (seulement si manuel)
 */
function toggleAffichageMinutes() {
    // Vérifier si les heures sont correctes et les minutes ne sont pas 0
    const inputHeures = document.getElementById('inputHeures');
    const heuresCorrectes = parseInt(inputHeures.value) === heureActuelle.heures;
    
    // Si les heures sont correctes et ce n'est pas l'heure pile, les minutes sont déjà affichées (sauf niveau 7)
    if (heuresCorrectes && heureActuelle.minutes !== 0 && niveauActuel !== 7) {
        return; // Ne rien faire, les minutes sont déjà affichées automatiquement
    }
    
    // Toggle la variable globale dans horloge.js
    afficherMinutes = !afficherMinutes;
    
    // Mettre à jour l'icône du bouton
    const bouton = document.getElementById('toggleMinutes');
    if (afficherMinutes) {
        bouton.textContent = '🙈';
    } else {
        bouton.textContent = '👁️';
    }
    
    // Redessiner l'horloge avec ou sans les minutes
    if (heureActuelle) {
        dessinerHorlogeExercice(heureActuelle.heures, heureActuelle.minutes);
    }
}

/**
 * Initialise l'exercice au chargement de la page
 */
function initialiserExercice() {
    mettreAJourAffichageProgression();
    nouvelleQuestion();
}

// Démarrer l'exercice quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initialiserExercice);