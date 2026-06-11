# Dina Nejar — Accompagnement parental et familial

Site vitrine premium (statique) pour Dina Nejar, accompagnante parentale et familiale à Yerres et à distance : approche Shefer, coaching parental, lecture nourrie par les valeurs juives.

## Pages

- `index.html` — Accueil
- `accompagnement.html` — L'accompagnement
- `approche-shefer.html` — L'approche Shefer
- `valeurs-juives.html` — Coaching & valeurs juives
- `dina-nejar.html` — Dina Nejar
- `faq.html` — Questions fréquentes
- `contact.html` — Contact

## Structure

```
.
├── index.html + 6 pages internes
└── assets/
    ├── css/styles.css   — design system (palette, typographie, animations)
    └── js/main.js        — header compact, reveals, parallax, FAQ, formulaire
```

## Développement local

Site 100 % statique, aucune dépendance ni étape de build. Ouvrir `index.html`
dans un navigateur, ou servir le dossier :

```bash
npx serve .
# ou
python3 -m http.server 8000
```

## Déploiement

Aucune configuration requise sur Vercel ou Netlify : le dossier racine est
servi tel quel comme site statique.

## Médias

Les vraies photos de Dina et Tsipora sont intégrées (`assets/img/`, optimisées
pour le web) : hero accueil (`dina-hero.webp`), portrait (`dina-portrait.jpg`),
bibliothèque (`dina-bibliotheque.jpg`), Tsipora (`tsipora.jpg`). Les sources
originales restent dans `Public/photos-a-ajouter/`.

Quelques blocs d'ambiance (cuisine, carnet, pièce de consultation, courbe
Shefer) restent des compositions en dégradés, repérables par leurs classes
`scene-*` — remplaçables par des photos de détails du lieu (voir V6-direction.md).

Note : `dina-hero.webp` ne fait que 473 px de large — suffisant mais un peu
juste sur écran Retina. À remplacer par une version plus grande si disponible.

## Formulaire de contact

⚠️ **Le formulaire est BLOQUÉ tant que l'endpoint n'est pas configuré.**
Tant que l'attribut `action` de `contact.html` contient `VOTRE_ID`, le bouton
d'envoi est désactivé et une notice « formulaire pas encore en service »
s'affiche. Aucun message de succès ne peut apparaître sans une réponse HTTP
positive de l'endpoint.

**Pour l'activer** : créer un formulaire sur [Formspree](https://formspree.io)
(gratuit) et remplacer `VOTRE_ID` dans l'action du `<form>`. Compléter aussi le
téléphone/email dans la notice `.form__notice`.

## À confirmer avant mise en ligne

- Domaine : `https://coaching-5.vercel.app` **confirmé** (canonical / og:url /
  sitemap / robots déjà alignés). À mettre à jour partout si un domaine
  personnalisé est ajouté plus tard.
- **Canal de contact actuel : téléphone uniquement** (06 27 17 50 59, affiché
  sur la page Contact — notice + aside — et dans le footer de toutes les pages).
  Le formulaire reste bloqué (bouton désactivé + notice) tant que `VOTRE_ID`
  n'est pas remplacé par un identifiant Formspree réel dans `contact.html`.
  Aucun email de contact n'est disponible à ce jour.
- Remplacer les placeholders visuels par de vraies photos.
