# Studio Habitat — mise en ligne et partage

Studio Habitat est une application web installable : vos collègues ouvrent un lien, puis l'ajoutent à l'écran d'accueil de leur téléphone. Elle s'ouvre alors en plein écran, comme une application de l'App Store, et fonctionne même sans réseau. Pas d'App Store, pas de compte Apple développeur, pas d'abonnement.

## 1. Mettre l'application en ligne (gratuit, 10 minutes)

Hébergement conseillé : un « Static Site » sur Render, gratuit (5 Go de trafic par mois inclus, largement assez : l'application pèse environ 1 Mo et reste ensuite dans le téléphone).

1. Créez un dépôt GitHub, par exemple `studio-habitat`, et déposez-y **tous les fichiers de ce dossier** (index.html, sw.js, manifest.webmanifest, les 3 icônes).
2. Sur render.com : **New** → **Static Site** → choisissez le dépôt `studio-habitat`.
3. Réglages : *Build Command* : laisser vide. *Publish Directory* : `.` (un point).
4. Cliquez sur **Create Static Site**. Au bout d'une minute, Render donne une adresse du type `https://studio-habitat.onrender.com`.
5. Facultatif : dans **Settings → Custom Domains**, ajoutez une adresse à vous (par exemple `studio.votre-domaine.fr`).

L'adresse doit être en `https://` : c'est obligatoire pour l'installation et le mode hors ligne. Render le fait automatiquement.

## 2. Installer sur le téléphone

**iPhone (Safari)**
1. Ouvrez le lien dans **Safari** (pas dans Chrome ni dans l'aperçu de WhatsApp).
2. Touchez le bouton **Partager** (carré avec une flèche vers le haut).
3. Choisissez **Sur l'écran d'accueil**, puis **Ajouter**.

**Android (Chrome)**
1. Ouvrez le lien dans Chrome.
2. Touchez **Installer** dans le bandeau vert de l'application, ou menu ⋮ → **Installer l'application**.

## 3. Message à envoyer à vos collègues

> Bonjour, voici l'application gratuite pour faire les photos HDR, les visites 360°, les vidéos et les plans de nos maisons et appartements : [votre lien]. Ouvrez-la dans Safari sur iPhone, touchez Partager puis « Sur l'écran d'accueil ». Vos photos restent sur votre téléphone.

## 4. Mettre à jour l'application

Remplacez le fichier `index.html` dans le dépôt GitHub : Render republie seul. Les téléphones reçoivent la nouvelle version à la prochaine ouverture avec du réseau.

Si vous modifiez aussi `sw.js`, changez le numéro de version en tête du fichier (`studio-habitat-v1` → `studio-habitat-v2`).

## 5. Bon à savoir

- Les photos du reportage, le plan et les champs de la vidéo sont gardés **dans le téléphone de chaque agent**. Rien n'est envoyé sur un serveur. Si l'agent supprime l'application, ces données sont effacées.
- La « mise en scène » propose un aménagement par écrit. L'image meublée nécessite un service payant à l'image (environ 0,20 $), à brancher plus tard si vous le souhaitez.
- La fusion HDR prend quelques secondes sur téléphone : il faut garder l'écran allumé.
