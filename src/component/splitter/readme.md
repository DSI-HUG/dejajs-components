# Splitter
Le composant splitter permet de découper horizontalement ou verticalement, un container en N partie redimensionnable.

### Informations inportantes
> Ne pas oublier d'importer le `DejaSplitterModule` dans les `imports` de votre module concerné !

### Utilisation 

####Splitter horizontal
```html
<deja-splitter [direction]="'horizontal'">
    <split-area [size]="50">
        <p>Lorem ipsum dolor sit amet...</p>
    </split-area>
    <split-area [size]="50">
        <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
    </split-area>
</deja-splitter>
```

####Splitter vertical
```html
<deja-splitter [direction]="'vertical'">
    <split-area [size]="25">
        <p>Lorem ipsum dolor sit amet...</p>
    </split-area>
    <split-area [size]="75">
        <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
    </split-area>
</deja-splitter>
```

####Splitter multiple
```html
<deja-splitter [direction]="'horizontal'">
    <split-area [size]="40">
        <deja-splitter [direction]="'vertical'">
            <split-area [size]="30">
                <p>Lorem ipsum dolor sit amet...</p>
            </split-area>
            <split-area [size]="40">
                <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
            </split-area>
            <split-area [size]="30">
                <p>Lorem ipsum dolor sit amet...</p>
            </split-area>
        </deja-splitter>
    </split-area>
    <split-area [size]="60">
        <deja-splitter [direction]="'vertical'">
            <split-area [size]="50">
                <p>Lorem ipsum dolor sit amet...</p>
            </split-area>
            <split-area [size]="50">
                <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
            </split-area>
        </deja-splitter>
    </split-area>
</deja-splitter>
```

### Propriétés

#### Composant **deja-splitter**
<table>
    <thead>
    <tr>
        <th>@Input()</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>direction</td>
        <td>string</td>
        <td>'horizontal'</td>
        <td>Spécifi la direction du splitter ('horizontal' ou 'vertical')</td>
    </tr>
    <tr>
        <td>width</td>
        <td>number</td>
        <td>null</td>
        <td>Specifi la valeur de la largeur en pixel. Si null, prendra toute la place disponible</td>
    </tr>
    <tr>
        <td>height</td>
        <td>number</td>
        <td>null</td>
        <td>Specifi la valeur de la hauteur en pixel. Si null, prendra toute la place disponible</td>
    </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th>@Output()</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>dragStart</td>
            <td>Exécuté au démarrage du drag</td>
        </tr>
        <tr>
            <td>drag</td>
            <td>Exécuté lors du drag</td>
        </tr>
        <tr>
            <td>dragEnd</td>
            <td>Exécuté quand drag est stoppé</td>
        </tr>
    </tbody>
</table>

#### Composant **split-area**
<table>
    <thead>
        <tr>
            <th>@Input()</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>size</td>
            <td>number</td>
            <td>null</td>
            <td>Pourcentage de la zone. Si null, chaque <split-area> aura la meme taille.</td>
        </tr>
    </tbody>
</table>
