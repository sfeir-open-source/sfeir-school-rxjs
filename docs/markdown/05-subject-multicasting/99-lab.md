<!-- .slide: class="exercice" -->

# Cuisons nos tartes !

## Lab 5

<br>

1. Créer une méthode `bakeApplePie` dans ApplePieBakingService qui prend une tarte dans son plat, une compote, et 64 tranches de pommes en entrée
2. Après 5s (le temps de cuisson), la méthode doit renvoyer une ApplePie
3. Si on a pas 64 tranches de pommes on émettra une erreur

<br>

### npm run start:05

##==##

<!-- .slide: class="exercice" -->

# Cuisons nos tartes !

## Lab 5

<br>

4. Si on a pas de pâte dans le plat on émettra une erreur
5. combiner les différents ingrédients pour les cuire ensemble pour obtenir des tartes
6. Bonus : Utiliser un opérateur pour transformer le stream de pomme en multicast pour pouvoir utiliser le même flux de pomme pour les tranches et la compote

<br>

### npm run start:05

Notes:

- hint: utiliser `tap` pour visualiser le fait qu'un ingrédient est prêt
- Bonus : utilisation de `share`
