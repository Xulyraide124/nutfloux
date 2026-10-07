# Guide utilisateur : Nutfloux

Nutfloux est un petit site de vidéos, façon Netflix. Il vous permet d'ajouter
vos propres vidéos, de les retrouver, de les regarder et de les supprimer.

Ce guide vous explique pas à pas comment l'utiliser. Aucune connaissance
technique n'est nécessaire.

## Sommaire

1. [Ouvrir Nutfloux](#1-ouvrir-nutfloux)
2. [Ajouter une vidéo](#2-ajouter-une-vidéo)
3. [Retrouver vos vidéos](#3-retrouver-vos-vidéos)
4. [Regarder une vidéo](#4-regarder-une-vidéo)
5. [Supprimer une vidéo](#5-supprimer-une-vidéo)
6. [Problèmes fréquents](#6-problèmes-fréquents)

---

## 1. Ouvrir Nutfloux

1. Ouvrez votre navigateur internet (Chrome, Firefox, Edge...).
2. Dans la barre d'adresse, tapez : **http://localhost:8080**
3. Appuyez sur la touche **Entrée**.

La page d'accueil s'affiche : c'est là que vous ajoutez vos vidéos.

> **Remarque** : cette adresse fonctionne uniquement si Nutfloux a été lancé
> sur votre ordinateur. Sinon, demandez à la personne qui gère l'application.

---

## 2. Ajouter une vidéo

Depuis la page d'accueil, remplissez le formulaire **« Uploader une vidéo »**.

![Formulaire d'ajout d'une vidéo](screenshots/upload.png)

1. **Vidéo** : cliquez sur le bouton de choix de fichier, puis sélectionnez une
   vidéo sur votre ordinateur.
   **Attention : seules les vidéos au format MP4 sont acceptées.**
2. **Miniature** (facultatif) : choisissez une image qui représentera votre
   vidéo dans la liste. Elle doit être au format **JPG ou PNG**. Si vous n'en
   choisissez pas, une image par défaut sera utilisée.
3. **Titre de la vidéo** : écrivez le nom que vous voulez donner à votre vidéo.
   Ce champ est obligatoire.
4. Cliquez sur le bouton **« Envoyer »**.

Patientez pendant l'envoi (cela peut durer un peu pour une grosse vidéo). Vous
arrivez ensuite automatiquement sur la liste de vos vidéos.

---

## 3. Retrouver vos vidéos

Pour voir toutes vos vidéos, cliquez sur le lien **« Voir les vidéos »** de la
page d'accueil.

![Liste des vidéos](/docs\screenshots\accueil.png)

Chaque vidéo apparaît sous forme d'une carte avec sa miniature, son titre et sa
date d'ajout.

### Rechercher une vidéo

1. Cliquez dans la case **« Rechercher une vidéo... »**.
2. Tapez une partie du titre.
3. Cliquez sur **« Rechercher »**.

Seules les vidéos dont le titre correspond restent affichées. Pour revoir
toutes les vidéos, effacez le texte et cliquez de nouveau sur **« Rechercher »**.

### Trier les vidéos par date

Cliquez sur le bouton **« Trier par date »**. Chaque clic inverse l'ordre :
des plus récentes aux plus anciennes, puis des plus anciennes aux plus
récentes.

---

## 4. Regarder une vidéo

1. Dans la liste, cliquez sur **« ▶ Voir »** sous la vidéo de votre choix.
2. La page de lecture s'ouvre avec la vidéo.



Les boutons situés sous la vidéo vous permettent de :

| Bouton | Ce qu'il fait |
|---|---|
| ▶️ / ⏸️ | Lancer ou mettre en pause la vidéo |
| Barre rouge | Cliquer à un endroit pour aller directement à ce moment de la vidéo |
| Deux chiffres (ex. 0:45 et 3:20) | Temps déjà regardé et durée totale |
| 🔊 / 🔇 | Couper ou remettre le son |
| 0.5x, 1x, 1.5x, 2x | Ralentir ou accélérer la lecture |
| ⛶ | Passer en plein écran (cliquer de nouveau pour sortir) |

Pour revenir à l'accueil, cliquez sur le bouton **« Accueil »** en haut de la
page. Depuis l'accueil, le lien **« Voir les vidéos »** vous ramène à la liste.

---

## 5. Supprimer une vidéo

1. Dans la liste des vidéos, repérez la vidéo à supprimer.
2. Cliquez sur le bouton **« 🗑️ Supprimer »** situé sous la carte.
3. Une fenêtre vous demande : **« Supprimer cette vidéo ? »**
   - Cliquez sur **OK** pour confirmer.
   - Cliquez sur **Annuler** si vous avez changé d'avis.

> **Attention** : la suppression est définitive. La vidéo et sa miniature sont
> effacées et ne peuvent pas être récupérées.

---

## 6. Problèmes fréquents

Lorsqu'un problème survient, un message rouge s'affiche en haut à droite de
l'écran pendant quelques secondes.

| Message ou problème | Cause | Solution |
|---|---|---|
| « Seules les vidéos MP4 sont autorisées » | Votre vidéo n'est pas au format MP4 | Convertissez-la en MP4, puis recommencez |
| « Miniature doit être une image JPG ou PNG » | L'image choisie n'est pas au bon format | Choisissez une image JPG ou PNG, ou n'en choisissez pas |
| « Aucune vidéo téléchargée » | Aucun fichier vidéo n'a été sélectionné | Sélectionnez une vidéo avant de cliquer sur « Envoyer » |
| « Vidéo non trouvée » | La vidéo a déjà été supprimée | Retournez à la liste et actualisez la page |
| La page ne s'ouvre pas | Nutfloux n'est pas lancé sur l'ordinateur | Demandez à la personne qui gère l'application de le démarrer |
| Ma vidéo n'apparaît pas dans la liste | Une recherche est en cours | Effacez le texte de la case de recherche et cliquez sur « Rechercher » |
