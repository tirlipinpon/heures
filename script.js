/**
 * Module de logique d'exercice
 * Gère la génération des questions, la validation des réponses et le score
 */

// Variables globales pour l'exercice
let score = 0;
let totalQuestions = 0;
let heureActuelle = null;

/**
 * Génère une heure aléatoire avec des heures importantes privilégiées
 * @returns {Object} Objet avec {heures, minutes}
 */
function genererHeureAleatoire() {
    let heures = Math.floor(Math.random() * 24);
    let minutes;
    
    // 70% de chance d'avoir des heures importantes ou des quarts
    if (Math.random() < 0.7) {
        // 50% de chance d'avoir des heures importantes
        if (Math.random() < 0.5) {
            const heuresImportantes = [6, 9, 12, 14, 15, 18, 21, 24];
            heures = heuresImportantes[Math.floor(Math.random() * heuresImportantes.length)];
            // Pour l'heure 24, on utilise 0 (minuit)
            if (heures === 24) heures = 0;
        }
        
        // Privilégier les quarts d'heure
        const quarts = [0, 15, 30, 45];
        minutes = quarts[Math.floor(Math.random() * quarts.length)];
    } else {
        // 30% de chance d'avoir des minutes aléatoires
        minutes = Math.floor(Math.random() * 60);
    }
    
    return { heures, minutes };
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
        
        // Mettre à jour le score
        mettreAJourScore(true);
        
        // Afficher le feedback de succès
        afficherFeedback('PARFAIT ! 🎉', 'correct');
        
        // Lancer l'animation de célébration SPECTACULAIRE
        lancerAnimationCelebration();
        
        // Proposer une nouvelle question après 4 secondes
        setTimeout(() => {
            nouvelleQuestion();
        }, 4000);
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
            
            // Passer aux minutes
            setTimeout(() => {
                inputMinutes.focus();
                inputMinutes.select();
            }, 100);
        } else {
            // Indiquer que c'est incorrect
            inputHeures.style.backgroundColor = '#ffcccc';
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
                }, 300);
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
 * Toggle l'affichage des minutes sur l'horloge
 */
function toggleAffichageMinutes() {
    // Toggle la variable globale dans horloge.js
    afficherMinutes = !afficherMinutes;
    
    // Mettre à jour le texte du bouton
    const bouton = document.getElementById('toggleMinutes');
    if (afficherMinutes) {
        bouton.textContent = '🙈 Masquer les minutes';
    } else {
        bouton.textContent = '👁️ Afficher les minutes';
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
    nouvelleQuestion();
}

// Démarrer l'exercice quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initialiserExercice);