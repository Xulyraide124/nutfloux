# ADR 0001 : Stockage des métadonnées des vidéos dans un fichier JSON

- **Statut** : Accepté
- **Date** : 2026-10-07
- **Auteur** : Ulysse ([@Xulyraide124](https://github.com/Xulyraide124))

## Contexte

Nutfloux (Mini-Netflix) permet d'uploader, lister, rechercher, trier, lire et
supprimer des vidéos. Pour chaque vidéo, l'application doit conserver :

- le nom du fichier stocké sur le serveur,
- le titre saisi par l'utilisateur,
- la date d'ajout,
- le nom de la miniature (facultative).

Les fichiers eux-mêmes (vidéos MP4, miniatures JPG/PNG) sont enregistrés sur
disque par `multer` dans les dossiers `uploads/` et `thumbnails/`. Il restait à
choisir **où stocker les informations qui décrivent ces fichiers**.

Contraintes du projet :

- projet de TP, de petite taille, avec un volume de données faible ;
- un seul serveur Express, pas d'accès concurrent important ;
- le projet doit pouvoir être cloné et lancé avec un minimum d'étapes
  (`npm install` puis `node app.js`).

## Décision

Les métadonnées sont stockées dans un fichier `videos.json` à la racine du
projet, sous forme d'un tableau d'objets :

```json
{
  "filename": "1749374424135-222270057.mp4",
  "title": "Titre de la vidéo",
  "uploadedAt": "2026-10-07T10:00:00.000Z",
  "thumbnail": "1749374424135-222270057.png"
}
```

L'accès au fichier est centralisé dans deux fonctions de `app.js` :
`loadVideos()` (lecture) et `saveVideos()` (écriture). La recherche par titre et
le tri par date sont réalisés en mémoire dans la route `GET /videos`.

## Alternatives envisagées

| Option | Avantages | Inconvénients |
|---|---|---|
| **Fichier JSON (retenue)** | Aucune installation, lisible et modifiable à la main, très peu de code | Pas de requêtes avancées, pas de gestion de la concurrence |
| SQLite | Vraies requêtes SQL, stockage dans un seul fichier | Dépendance supplémentaire, schéma et code d'accès plus lourds |
| MongoDB / PostgreSQL | Robuste, adapté à la montée en charge | Serveur de base de données à installer et configurer, disproportionné pour le besoin |

## Conséquences

**Positives**

- Le projet démarre sans configuration de base de données.
- Le format est simple à lire, à déboguer et à vérifier.
- L'accès aux données étant isolé dans `loadVideos()` et `saveVideos()`, un
  changement de stockage ne toucherait qu'une petite partie du code.

**Négatives**

- Le fichier entier est lu puis réécrit de façon synchrone
  (`readFileSync` / `writeFileSync`) à chaque opération : cela ne passe pas à
  l'échelle.
- Deux écritures simultanées peuvent entraîner une perte de données.
- Le JSON et les fichiers sur disque peuvent se désynchroniser (par exemple si
  un fichier est supprimé à la main dans `uploads/`).
- La recherche et le tri se font en parcourant toute la liste en mémoire.

**Évolution possible**

Si le projet grandit (plusieurs utilisateurs, beaucoup de vidéos), migrer vers
SQLite puis vers une base de données serveur. Le code d'accès étant centralisé,
cette migration serait limitée.
