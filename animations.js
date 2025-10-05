/**
 * Module d'animations
 * Gère toutes les animations de célébration et effets visuels
 */

/**
 * Lance une animation de célébration OPTIMISÉE pour mobile
 */
function lancerAnimationCelebration() {
    // 1. EXPLOSION de l'horloge avec effet WOW
    animerHorlogeExplosion();
    
    // 2. CONFETTIS OPTIMISÉS (moins nombreux)
    lancerConfettisOptimises();
    
    // 3. ÉTOILES OPTIMISÉES (moins nombreuses)
    lancerEtoilesOptimisees();
    
    // 4. EFFET DE SCORE qui monte
    animerScoreMontant();
}

/**
 * Animation explosive de l'horloge
 */
function animerHorlogeExplosion() {
    const canvas = document.getElementById('horlogeExercice');
    canvas.style.animation = 'explode 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    setTimeout(() => {
        canvas.style.animation = '';
    }, 600);
}

/**
 * Lance des confettis OPTIMISÉS depuis le centre
 */
function lancerConfettisOptimises() {
    const couleurs = ['#FFD700', '#FF69B4', '#00CED1', '#FF1493', '#00FF7F', '#FF4500'];
    const nombreConfettis = 25; // Réduit de 100 à 25
    
    for (let i = 0; i < nombreConfettis; i++) {
        setTimeout(() => {
            creerConfettiOptimise(couleurs);
        }, i * 40); // Plus d'espacement pour éviter la surcharge
    }
}

/**
 * Crée un confetti OPTIMISÉ avec CSS animations
 */
function creerConfettiOptimise(couleurs) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = couleurs[Math.floor(Math.random() * couleurs.length)];
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    
    // Position centrale (horloge)
    const horlogeRect = document.getElementById('horlogeExercice').getBoundingClientRect();
    const centreX = horlogeRect.left + horlogeRect.width / 2;
    const centreY = horlogeRect.top + horlogeRect.height / 2;
    
    confetti.style.left = centreX + 'px';
    confetti.style.top = centreY + 'px';
    
    // Forme simple
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    
    // Animation CSS optimisée
    const angle = Math.random() * 360;
    const distance = Math.random() * 200 + 100;
    const duration = Math.random() * 1 + 1.5;
    
    confetti.style.animation = `confettiFall ${duration}s ease-out forwards`;
    confetti.style.setProperty('--angle', angle + 'deg');
    confetti.style.setProperty('--distance', distance + 'px');
    
    document.body.appendChild(confetti);
    
    // Supprimer après l'animation
    setTimeout(() => {
        confetti.remove();
    }, duration * 1000);
}

/**
 * Lance des étoiles OPTIMISÉES
 */
function lancerEtoilesOptimisees() {
    const nombreEtoiles = 8; // Réduit de 30 à 8
    
    for (let i = 0; i < nombreEtoiles; i++) {
        setTimeout(() => {
            creerEtoileOptimisee();
        }, i * 100);
    }
}

/**
 * Crée une étoile OPTIMISÉE
 */
function creerEtoileOptimisee() {
    const etoile = document.createElement('div');
    etoile.innerHTML = '⭐';
    etoile.style.position = 'fixed';
    etoile.style.fontSize = '24px';
    etoile.style.left = Math.random() * window.innerWidth + 'px';
    etoile.style.top = Math.random() * window.innerHeight + 'px';
    etoile.style.zIndex = '9999';
    etoile.style.pointerEvents = 'none';
    etoile.style.animation = 'twinkle 1.5s ease-in-out';
    
    document.body.appendChild(etoile);
    
    setTimeout(() => {
        etoile.remove();
    }, 1500);
}

/**
 * Crée un flash lumineux
 */
function creerFlashLumineux() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    flash.style.zIndex = '9998';
    flash.style.pointerEvents = 'none';
    flash.style.animation = 'flash 0.5s ease-out';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.remove();
    }, 500);
}

/**
 * Lance des particules flottantes
 */
function lancerParticules() {
    const nombreParticules = 40;
    
    for (let i = 0; i < nombreParticules; i++) {
        setTimeout(() => {
            creerParticule();
        }, i * 30);
    }
}

/**
 * Crée une particule flottante
 */
function creerParticule() {
    const particule = document.createElement('div');
    particule.style.position = 'fixed';
    particule.style.width = (Math.random() * 6 + 3) + 'px';
    particule.style.height = (Math.random() * 6 + 3) + 'px';
    particule.style.borderRadius = '50%';
    particule.style.background = `radial-gradient(circle, rgba(255,${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},1) 0%, rgba(255,255,255,0) 70%)`;
    particule.style.left = Math.random() * window.innerWidth + 'px';
    particule.style.top = window.innerHeight + 'px';
    particule.style.zIndex = '9999';
    particule.style.pointerEvents = 'none';
    particule.style.filter = 'blur(1px)';
    
    document.body.appendChild(particule);
    
    // Animation montante
    let y = 0;
    const vitesse = Math.random() * 3 + 2;
    const amplitude = Math.random() * 100 + 50;
    let compteur = 0;
    
    const animation = setInterval(() => {
        y -= vitesse;
        compteur += 0.1;
        const oscillation = Math.sin(compteur) * amplitude;
        
        particule.style.transform = `translate(${oscillation}px, ${y}px)`;
        particule.style.opacity = Math.max(0, 1 + y / 500);
        
        if (y < -window.innerHeight) {
            clearInterval(animation);
            particule.remove();
        }
    }, 16);
}

/**
 * Anime la progression qui monte
 */
function animerScoreMontant() {
    const progressionElement = document.getElementById('progression');
    if (progressionElement) {
        progressionElement.style.animation = 'scorePopup 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            progressionElement.style.animation = '';
        }, 600);
    }
}