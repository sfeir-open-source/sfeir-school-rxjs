<!-- .slide: class="exercice" -->

# Préparons nos pâtes !

## Lab 2

<br>

1. Prendre les boites de pâtes à tarte une par une
2. Si une boite est vide (une erreur est émise), retenter de s'abonner au stream de boites de pâtes
3. Prendre le nombre de pâte à tarte qu'il faut pour le nombre de commande qu'on doit traiter

<br>

### npm run start:02

Notes:

- dans ce lab, on chercher à montrer l'utilisation des operateurs mergeMap, retry

##==##

<!-- .slide: class="exercice" -->

# Préparons nos pommes !

## Lab 3

<br>

1. Retirer les pommes pourries ("rot apples")
2. Couper les pommes non pourries en tranche
3. On doit avoir à la fin un stream de tranche de pomme
4. Bonus : cuire les pommes pourries en compote pour un stream avec des portions de compote (4 pommes = 1 compote)

<br>

### npm run start:03

Notes:

- dans ce lab, on chercher à pousser à l'utilisation de plusieurs opérateurs et les enchaîners
- la compote permet de montrer le fait qu'on consomme à nouveau le stream de pomme entier si on est naif dans l'approche
- l'obligation d'avoir 4 pommes pour faire 1 portion de compote oblige à chercher l'opérateur `bufferCount`
