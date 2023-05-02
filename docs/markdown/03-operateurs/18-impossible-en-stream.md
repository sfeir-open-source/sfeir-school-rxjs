<!-- .slide: class="quote-slide" -->

<blockquote>
<cite>
  Certains traitement sont impossibles à faire sur des streams !
</cite>
</blockquote>

Notes:

- par exemple : le tri est impossible à faire sur des streams car on ne connait pas tous les éléments
- on peut obtenir quelque chose d'équivalent avec scan ou reduce par exemple, mais on doit soit s'attendre à un état qui évolue dans le temps, soit attendre que le stream complète
- plus généralement toutes les opérations qui attendent l'ensemble des valeurs sont concernées par cette limitation
