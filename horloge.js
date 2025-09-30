/**
 * Module de dessin de l'horloge
 * Gère tout le rendu visuel de l'horloge sur le canvas
 */

// Variable globale pour l'affichage des minutes
let afficherMinutes = false;

/**
 * Dessine une horloge complète avec les aiguilles et les chiffres
 * @param {number} heures - Heure au format 24h (0-23)
 * @param {number} minutes - Minutes (0-59)
 */
function dessinerHorlogeExercice(heures, minutes) {
    const canvasExercice = document.getElementById('horlogeExercice');
    const ctxExercice = canvasExercice.getContext('2d');
    const rayonExercice = 110;
    const centreXExercice = canvasExercice.width / 2;
    const centreYExercice = canvasExercice.height / 2;
    
    // Effacer le canvas
    ctxExercice.clearRect(0, 0, canvasExercice.width, canvasExercice.height);
    
    // Dessiner tous les éléments de l'horloge (ordre important pour la superposition)
    dessinerCadran(ctxExercice, centreXExercice, centreYExercice, rayonExercice);
    dessinerChiffres12h(ctxExercice, centreXExercice, centreYExercice, rayonExercice, heures);
    dessinerChiffres24h(ctxExercice, centreXExercice, centreYExercice, rayonExercice, heures);
    dessinerMarquesMinutes(ctxExercice, centreXExercice, centreYExercice, rayonExercice);
    
    // Dessiner les aiguilles d'abord
    dessinerAiguilles(ctxExercice, centreXExercice, centreYExercice, rayonExercice, heures, minutes);
    dessinerCentre(ctxExercice, centreXExercice, centreYExercice);
    
    // Dessiner les minutes PAR-DESSUS les aiguilles si l'option est activée
    if (afficherMinutes) {
        dessinerChiffresMinutes(ctxExercice, centreXExercice, centreYExercice, rayonExercice);
    }
}

/**
 * Dessine le cadran extérieur de l'horloge
 */
function dessinerCadran(ctx, centreX, centreY, rayon) {
    ctx.beginPath();
    ctx.arc(centreX, centreY, rayon, 0, 2 * Math.PI);
    ctx.fillStyle = '#f8f9fa';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.stroke();
}

/**
 * Dessine les chiffres de 1 à 12 à l'intérieur de l'horloge
 */
function dessinerChiffres12h(ctx, centreX, centreY, rayon, heures) {
    for (let i = 1; i <= 12; i++) {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const x = centreX + Math.cos(angle) * (rayon - 15);
        const y = centreY + Math.sin(angle) * (rayon - 15);
        
        // Si c'est l'après-midi/soir, rendre les heures 1-12 plus pâles
        if (heures >= 13 || heures === 0) {
            ctx.fillStyle = '#999'; // Gris moyen (plus visible que #ccc)
            ctx.font = '14px Arial'; // Moins gras
        } else {
            ctx.fillStyle = '#333'; // Noir
            ctx.font = 'bold 14px Arial';
        }
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i, x, y);
    }
}

/**
 * Dessine les heures au format 24h autour de l'horloge (seulement après-midi/soir)
 */
function dessinerChiffres24h(ctx, centreX, centreY, rayon, heures) {
    // Afficher les heures 24h UNIQUEMENT si après-midi/soir (13h-23h) ou minuit (0h)
    if (heures >= 13 || heures === 0) {
        for (let i = 1; i <= 12; i++) {
            const angle = (i * 30 - 90) * Math.PI / 180;
            // Calcul des heures 24h : position 1→13h, 2→14h, 3→15h ... 12→24h (ou 0h)
            const heure24 = (i === 12) ? (heures === 0 ? 0 : 24) : i + 12;
            
            // Position extérieure RAPPROCHÉE (même distance que les heures intérieures)
            // rayon - 15 pour les heures intérieures, donc rayon + 15 pour l'extérieur (symétrie)
            const x = centreX + Math.cos(angle) * (rayon + 15);
            const y = centreY + Math.sin(angle) * (rayon + 15);
            
            ctx.fillStyle = '#000';
            ctx.font = 'bold 14px Arial'; // Même taille que les heures intérieures
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(heure24.toString(), x, y);
        }
    }
}

/**
 * Dessine les petites marques pour chaque minute
 */
function dessinerMarquesMinutes(ctx, centreX, centreY, rayon) {
    for (let i = 0; i < 60; i++) {
        // Ne pas dessiner sur les marques des heures
        if (i % 5 !== 0) {
            const angle = (i * 6 - 90) * Math.PI / 180;
            const x1 = centreX + Math.cos(angle) * (rayon - 8);
            const y1 = centreY + Math.sin(angle) * (rayon - 8);
            const x2 = centreX + Math.cos(angle) * (rayon - 4);
            const y2 = centreY + Math.sin(angle) * (rayon - 4);
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = '#666';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
}

/**
 * Dessine les aiguilles des heures et des minutes
 */
function dessinerAiguilles(ctx, centreX, centreY, rayon, heures, minutes) {
    // Convertir format 24h vers format 12h pour l'affichage
    const heure12 = heures === 0 ? 12 : (heures > 12 ? heures - 12 : heures);
    const angleHeure = (heure12 * 30 + minutes * 0.5 - 90) * Math.PI / 180;
    const angleMinute = (minutes * 6 - 90) * Math.PI / 180;
    
    // Aiguille des heures (rouge)
    dessinerAiguilleHeures(ctx, centreX, centreY, rayon, angleHeure);
    
    // Aiguille des minutes (bleue foncée)
    dessinerAiguilleMinutes(ctx, centreX, centreY, rayon, angleMinute);
}

/**
 * Dessine l'aiguille des heures
 */
function dessinerAiguilleHeures(ctx, centreX, centreY, rayon, angle) {
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(
        centreX + Math.cos(angle) * (rayon - 35),
        centreY + Math.sin(angle) * (rayon - 35)
    );
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();
}

/**
 * Dessine l'aiguille des minutes
 */
function dessinerAiguilleMinutes(ctx, centreX, centreY, rayon, angle) {
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(
        centreX + Math.cos(angle) * (rayon - 15),
        centreY + Math.sin(angle) * (rayon - 15)
    );
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.stroke();
}

/**
 * Dessine le point central de l'horloge
 */
function dessinerCentre(ctx, centreX, centreY) {
    ctx.beginPath();
    ctx.arc(centreX, centreY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

/**
 * Dessine les chiffres des minutes (par tranche de 5) autour du cadran
 */
function dessinerChiffresMinutes(ctx, centreX, centreY, rayon) {
    for (let i = 0; i < 12; i++) {
        const minutes = i * 5;
        const angle = (i * 30 - 90) * Math.PI / 180;
        
        // Position entre les chiffres des heures et le bord intérieur
        const x = centreX + Math.cos(angle) * (rayon - 35);
        const y = centreY + Math.sin(angle) * (rayon - 35);
        
        // Dessiner le contour blanc pour la lisibilité
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeText(minutes.toString(), x, y);
        
        // Dessiner le texte bleu par-dessus
        ctx.fillStyle = '#2980b9'; // Bleu pour différencier des heures
        ctx.fillText(minutes.toString(), x, y);
    }
}
