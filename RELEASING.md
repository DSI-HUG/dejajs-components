# Faire une release de @deja-js/component

Les releases de @deja-js/component se font automatiquement sur Github Actions. 

* Un commit sur la branche develop va automatiquement générer un pré-release. au format x.x.x-develop.x
* Un merge sur la branche master va automatiquement générer une release. 

Le workflow est donc relativement simple, mais doit être respecté à la lettre. 

## Pré-release.

Le merge d'une pull-request sur la branche develop, va automatiquement générer une pré-release. Lors de la génération de cette pré-release, l'étapes test est volontairement sautée. Cette étape est déjà exécutée sur toutes les pull-request, par conséquent le code mergé sur develop est déjà testé. Il est donc impératif avant le merge d'une pull-request de s'assurer que Github à bien terminé sa validation. 

De plus, il est impératif de ne pas tester le dist publié, car l'étape de test va compiler les bundles testés pour IVY, et pas les bundles non testés. On va donc publier un répertoire dist partiellement compilé pour IVY. La compilation IVY doit être déléguée à l'application utilisant la lib avec la version du compilateur qu'elle utilise, et pas à la lib et sa propre version du compilateur.

## Release.

Pour faire une release, il suffit de faire une pull-request de develop sur master et de la merger. Travis va alors automatiquement faire une release. 

**une fois la release effectuée, il est impératif de soummettre un pull-request de master vers develop pour mettre à jour la version et le change log de develop et ne pas désynchroniser le workflow.**

## Next.

Pour releaser les branches next, le worflow est identique, mais develop devient next/x.x.x et master devient release/x.x.x
