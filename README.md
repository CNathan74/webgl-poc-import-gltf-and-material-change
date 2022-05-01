# Ajout GLTF scene + changement material
Le but est de charger un GLTF dans une scène avec 2 lumières.
Également il fallait changer le matériel car WebGL nous fournit un matériel par défaut qui est très gourmant et qui a besoins d'un hdri

## Tester
Pour le tester, il est déployé sur https://cars.nathan-charvin.fr/

Si vous voulez l'exécuter en local, il vous suffit d'exécuter ces 2 commandes :
  ```sh
  npm install
  ```
  ```sh
  webpack watch
  ```
Ensuite lancer un serveur local est aller dans le dossier dist (automatiquement générer par webpack)