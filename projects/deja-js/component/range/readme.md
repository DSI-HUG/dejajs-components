# Range
Ce composant permet d'ajouter, supprimer et modifier des intervals.
La représentation de ce composant ressemble à celle d'un slider ayant de multiples séparateurs.

## Utilisation
### Sans template
```html
<deja-range [(ngModel)]="ranges">
</deja-range>
```

### Avec template
Il est votre responsabilité d'implémenter la charte graphique en surchargeant les styles prédéfinis dans le composant si vous utiliser cette implémentation. Les styles qui peuvent être modifier par l'utilisateur sont explicitement spécifié en tant que tel. Les styles nécessaire au bon fonctionnement du composant ne doivent être modifié en aucun cas. Si vous devez le faire pour X raison il est votre responsabilité régler les problèmes qui découleront de cette pratique.
```html
<deja-range [(ngModel)]="ranges"
    [readOnly]="false"
    [step]="0.5">
   <ng-template #rangeTemplate
        let-range
        let-index="index"
        let-ranges="ranges">

        <!-- Résentation graphique de l'interval ici, libre à l'utilisateur -->        
        <span class="range">{{range.min}} - {{range.max}}</span>

    </ng-template>
    <ng-template #separatorTemplate
        let-range
        let-index="index"
        let-ranges="ranges">

        <!-- Résentation graphique du séparateur ici, libre à l'utilisateur -->
        <span class="separator">|</span>

    </ng-template>
</deja-range>
```

### Avec template, interpolation logarithmique
```html
<deja-range [(ngModel)]="ranges"
    [readOnly]="false"
    [step]="stepFn"
    (errorFeedback)="errorFeed.emit($event)">
   <ng-template #rangeTemplate
        let-range
        let-index="index"
        let-ranges="ranges">

        <!-- Résentation graphique de l'interval ici, libre à l'utilisateur -->        
        <span class="range">{{range.min}} - {{range.max}}</span>

    </ng-template>
    <ng-template #separatorTemplate
        let-range
        let-index="index"
        let-ranges="ranges">

        <!-- Résentation graphique du séparateur ici, libre à l'utilisateur -->
        <span class="separator">|</span>

    </ng-template>
</deja-range>
```
```js
export class DejaRangeDemoComponent {
    public weights: Weight[];

    @ViewChild('dejaWeight') protected weightRef;


    constructor() {
        this.weights = weights;
    }

    protected stepFn(event: IStepRangeEvent, step: number) {

        const weight = event.ranges[event.index] as IWeight;

        const isLastWeight = event.ranges.length - 1 === event.index;

        const rangeDifference = event.newMax - weight.min;
        const weightDifference = Math.E ** (rangeDifference) / 4;
        let maxWeight = weight.minWeight + weightDifference;

        maxWeight = Math.round(maxWeight);
        maxWeight = Math.max(maxWeight, weight.minWeight + 1);

        if (!isLastWeight) {
            const nextWeight = event.ranges[event.index + 1] as IWeight;
            maxWeight = Math.min(maxWeight, nextWeight.maxWeight - 1);
            nextWeight.minWeight = maxWeight;
            weight.maxWeight = maxWeight;
        }

        const newRangeMax = weight.min + Math.log(4 * (maxWeight - weight.minWeight));

        return newRangeMax;
    }

    private computeRangeFromWeight() {
        let min = 0;

        this.weights = this.weights
            .map((weight: Weight) => {
                const weightDifference = weight.maxWeight - weight.minWeight;
                const rangeDifference = Math.log(4 * weightDifference);

                weight.min = min;
                weight.max = min + rangeDifference;

                min += rangeDifference;

                return weight;
            });
    }

    private remove(index: number) {
        if (weights.length >= 2) {

            const weight = this.weights
                .find((w: Weight, i: number) => index === i);

            const weights = this.weights
                .filter((w: Weight, i: number) => index !== i);

            if (index > 0) {
                weights[index - 1].maxWeight = weight.maxWeight;
            }

            this.weights = weights;

            this.weightRef.selected = 0;
            this.computeRangeFromWeight();
        }
    }

    private add(index: number) {
        const weight = this.weights
            .find((w: Weight, i: number) => index === i);

        const weightDifference = weight.maxWeight - weight.minWeight;
        if (weightDifference >= 2) {

            const leftWeight = new Weight(weight.minWeight, weight.minWeight + weightDifference / 2);

            weight.minWeight = weight.minWeight + weightDifference / 2;
            const leftWeights = index !== 0 ? this.weights.slice(0, index) : [];
            const rightWeights = index < this.weights.length ? this.weights.slice(index + 1) : [];
            this.weights = [...leftWeights, leftWeight, weight, ...rightWeights];

            this.weightRef.selected = 0;
            this.computeRangeFromWeight();
        }
    }

    private increase(): void {
        this.weights[weights.length - 1].maxWeight++;
        this.computeRangeFromWeight();
    }

    private decrease(): void {
        if (this.weights[0].minWeight > 0) {
            this.weights[0].minWeight--;
            this.computeRangeFromWeight();
        }
    }
```

## API
### Propriétés
<table>
<thead>
    <tr>
        <th>Nom</th>
        <th>Obligatoire</th>
        <th>Type</th>
        <th>Genre</th>
        <th>Description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>ngModel</td>
        <td>oui</td>
        <td>IRange[]</td>
        <td>[(ngModel)]</td>
        <td>intervals passés au composant</td>
    </tr>
    <tr>
        <td>readOnly</td>
        <td>non</td>
        <td>boolean</td>
        <td>@Input()</td>
        <td>mode actuel du composant, édition ou consultation</td>
    </tr>
    <tr>
        <td>step</td>
        <td>non</td>
        <td>number | number[] | (x: number) => number</td>
        <td>@Input()</td>
        <td>valeurs acceptées, dans la cas de la fonction, l'implémentation est votre responsabilité, cf démo pour un exemple</td>
    </tr>
    <tr>
        <td>selected</td>
        <td>non</td>
        <td>number</td>
        <td>@Input()</td>
        <td>index de l'interval séléctionné</td>
    </tr>
<tbody>
</table>

### Méthodes
<table>
<thead>
    <tr>
        <th>Nom</th>
        <th>Paramètres</th>
        <th>Type de sortie</th>
        <th>Description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>add</td>
        <td></td>
        <td>void</td>
        <td>découpe l'interval actuellement séléctionné en 2 nouveaux intervals, fonctionne uniquement avec une valeur numérique pour le step, pour la fn / array, vous devez implémenter vous même la fonction</td>
    </tr>
    <tr>
        <td>remove</td>
        <td></td>
        <td>void</td>
        <td>supprime l'interval actuellement séléctionné, fonctionne uniquement avec une valeur numérique pour le step, pour la fn / array, vous devez implémenter vous même la fonction</td>
    </tr>
</tbody>
</table>

### Evénements (@Output())
<table>
<thead>
    <tr>
        <th>Nom</th>
        <th>Paramètres</th>
        <th>Obligatoire</th>        
        <th>Type de sortie</th>
        <th>Description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>errorFeedback</td>
        <td>$event</td>
        <td>oui</td>
        <td>Error</td>
        <td>Si une erreur est produit, retourne l'erreur dans l'objet $event</td>
    </tr>
</tbody>
</table>

