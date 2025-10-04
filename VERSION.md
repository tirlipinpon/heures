# Système de Versioning

Ce projet utilise le versionnage sémantique (Semantic Versioning).

## Format

`vMAJEUR.MINEUR.CORRECTIF`

## Historique des versions

### v1.1.0 - 2025-10-04

- Amélioration : Horloge agrandie sur toutes les plateformes - Desktop: 450x450px (au lieu de 350x350), Mobile: 330px (au lieu de 300px), rayon ajusté à 145

### v1.0.9 - 2025-10-04

- Amélioration : Horloge agrandie à 300px sur mobile (au lieu de 250px) pour une meilleure lisibilité

### v1.0.8 - 2025-10-04

- Correction : Layout mobile optimisé avec hauteur fixe max (100vh), horloge réduite à 250px, inputs et textes réduits, score-container en bas toujours visible

### v1.0.7 - 2025-10-04

- Correction : Déplacement du numéro de version à l'intérieur du container (position absolute, top-right) pour être toujours visible sur desktop et mobile

### v1.0.6 - 2025-10-04

- Correction : Ajout d'un système anti-doublon pour éviter de générer la même heure deux fois de suite (boucle do-while avec vérification)

### v1.0.5 - 2025-10-04

- Correction : Refonte complète du layout mobile - horloge fixée à 280px, score en bas sans sticky, version déplacée en haut à droite, container avec justify-content: space-between pour éviter les chevauchements

### v1.0.4 - 2025-10-04

- Correction : Affichage mobile amélioré - le score/niveau/progression reste maintenant visible en bas de l'écran (position sticky, réduction taille horloge, suppression min-height)

### v1.0.3 - 2025-10-04

- Correction : Amélioration de la visibilité du numéro de version (opacité augmentée à 50%, ajout z-index et ombre portée)

### v1.0.2 - 2025-10-04

- Correction : Amélioration de la validation quand les minutes sont saisies avant les heures (ajout vérification !isNaN et blocage visuel du champ minutes)

### v1.0.1 - 2025-10-04

- Correction : Validation de l'heure maintenant fonctionnelle quel que soit l'ordre de saisie (minutes puis heures ou heures puis minutes)
- Ajout : Système de versionnage automatique avec affichage discret

### v1.0.0 - Initial

- Horloge interactive avec 7 niveaux de difficulté
- Système de progression automatique
- Affichage conditionnel des minutes
- Animations de célébration

## Instructions de mise à jour

À chaque modification significative :

1. Mettre à jour le numéro dans `index.html` (ligne 41)
2. Ajouter une entrée dans ce fichier avec la date et description
3. Types de changements :
   - **MAJEUR** : Changements incompatibles avec versions précédentes
   - **MINEUR** : Nouvelles fonctionnalités compatibles
   - **CORRECTIF** : Corrections de bugs
