# Système de Versioning

Ce projet utilise le versionnage sémantique (Semantic Versioning).

## Format

`vMAJEUR.MINEUR.CORRECTIF`

## Historique des versions

### v1.3.0 - 2025-10-05

- Amélioration : Système de progression stricte - en cas d'erreur, le compteur de succès consécutifs est remis à 0 et une nouvelle question est générée
- Amélioration : L'utilisateur doit maintenant réussir 5 heures sans erreur pour passer au niveau suivant (au lieu de simplement faire 5 questions)

### v1.2.1 - 2025-10-05

- Correction : Bug corrigé lors de la saisie de "15" pour 15 minutes - délai d'attente ajouté pour les chiffres ambigus 0-5 dans les minutes (comme pour les heures)

### v1.2.0 - 2025-10-05

- Amélioration : Placeholders des inputs changés de "0" à "x" pour plus de clarté
- Amélioration : Auto-vidage des inputs erronés au focus pour faciliter la correction
- Amélioration : Refocus automatique sur les heures quand elles sont vides/incorrectes mais les minutes correctes
- Amélioration : Limitation de la saisie à 2 caractères maximum dans les inputs
- Amélioration : Amélioration visuelle du focus des inputs (bordure dorée, animation pulsante, agrandissement)
- Amélioration : Animation d'erreur (shake + flash) puis reset automatique des valeurs incorrectes
- Correction : Bug corrigé lors de la saisie de "07" pour 7 heures (délai d'attente pour les chiffres ambigus 0, 1, 2)

### v1.1.4 - 2025-10-04

- Correction : Modification de l'animation pour animer la 'progression' au lieu du 'score' supprimé (animations.js ligne 201)

### v1.1.3 - 2025-10-04

- Correction : Suppression des références aux éléments HTML 'score' et 'total' dans script.js pour corriger l'erreur JavaScript

### v1.1.2 - 2025-10-04

- Amélioration : Remplacement de "Score : X/Y" par "Progression : X/5" - affichage simplifié et plus pertinent pour suivre la progression vers le prochain niveau

### v1.1.1 - 2025-10-04

- Amélioration : Horloge encore plus grande sur mobile (360px au lieu de 330px) et chiffres agrandis pour meilleure lisibilité (18px pour heures, 14px pour minutes)

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
