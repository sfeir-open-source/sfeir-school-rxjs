# 05-cuire-la-tarte instructions

## How to run?

```Bash
cd ./steps
npm run 05-cuire-la-tarte
```

## TODO

1. Créer une méthode `bakeApplePie` dans ApplePieBakingService qui prend une tarte dans son plat, une compote, et 64 tranches de pommes en entrée
2. Après 5s (le temps de cuisson), la méthode doit renvoyer une ApplePie
3. Si on n'a pas 64 tranches de pommes on émettra une erreur
4. Si on n'a pas de pâte dans le plat on émettra une erreur
5. Combiner les différents ingrédients pour les cuire ensemble pour obtenir des tartes
6. Bonus : Utiliser un opérateur pour transformer le stream de pommes en multicast pour pouvoir utiliser le même flux de pommes pour les tranches et la compote
