# Système de Versioning

Ce projet utilise le versionnage sémantique (Semantic Versioning).

## Format

`vMAJEUR.MINEUR.CORRECTIF`

## Historique des versions

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
