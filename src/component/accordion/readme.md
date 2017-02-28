# Accordion V2
Cr&eacute;e une liste d'&eacute;l&eacute;ments, permettant au contenu de chaque &eacute;l&eacute;ment d'&ecirc;tre agrandi et r&eacute;duit en cliquant sur son header.
Note V2 : La version 2 rend plus flexible et g&eacute;n&eacute;rique l'utilisation du composant. Celui-ci n'utilise plus de propri&eacute;t&eacute;s et est donc totalement personnalisable.

### Utilisation
> Ne pas oublier d'importer le `DejaAccordionModule` dans les `imports` de votre module concern&eacute; !

Ensuite utiliser le composant comme ceci dans votre template :

 - impl&eacute;mentation :

```html
<deja-accordion>
    <deja-accordion-group> <!-- loop here -->
        <deja-accordion-header></deja-accordion-header>
        <deja-accordion-body></deja-accordion-body>
    </deja-accordion-group>
</deja-accordion>
```

####Note :
 - Vous pouvez ajouter la proprt&eacute;t&eacute; `secondary` pour que le header soit en bleu foncé (*#428BCA*) :

```html
<deja-accordion-header secondary></deja-accordion-header>
```
