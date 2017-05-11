# Monaco Editor
Monaco Editor est l'éditeur de code utilisé dans [VS Code](https://github.com/Microsoft/vscode).
Une page décrivant bien les fonctionnalitées de l'éditeur est présente [ici](https://code.visualstudio.com/docs/editor/editingevolved).

### Informations inportantes 
> Ne pas oublier d'importer le `DejaMonacoEditorModule`dans les `imports` de votre module concerné !

> Ne pas oublier de modifier votre configuration webpack :

```javascript
var CopyWebpackPlugin = require('copy-webpack-plugin');
// ...
plugins: [
        new CopyWebpackPlugin([{
            from: 'node_modules/monaco-editor/min/vs',
            to: 'vs'
        }])
    ]
```

Si le dossier de sortie doit etre modifié (vs enb l'occurence), il est possible de modifier la path dans le composant via 
l'input : monacoLibPath (Ex: 'mon_path/loader.js')

### Utilisation 
```html
<deja-monaco-editor [(value)]="code" [(valueToCompare)]="codeToCompare" [language]="language"></deja-monaco-editor>
```

```typescript
export class DejaMonacoEditorDemoComponent implements OnInit {
    protected code: string;

    protected language: IEditorLanguage = IEditorLanguage.XML;
    protected languageJson: IEditorLanguage = IEditorLanguage.JSON;

    constructor() {
    }

    public ngOnInit() {
		this.code = `<GROUP ID="GROUP_PROBE_UPSRV">
        <LABEL><![CDATA[UserProfile]]></LABEL>
        <TAG>up upsrv</TAG>
        <PROBE ID="LOG_SLOW_COMPONENT_UPSRV"/>
        <PROBE ID="LOG_ERROR_COMPONENT_UPSRV"/>
        <PROBE ID="LOG_UPSERVER_SQL_PERF"/>
        <PROBE ID="PERF_DATABASE_UPSRV"/>
        <PROBE ID="PING_DATABASE_UPSRV"/>
        <PROBE ID="LOG_PROBLEM_WITH_SERVER_COMPONENT_UPSRV"/>
        <JAVACODE>
            <![CDATA[
			]]>
        </JAVACODE>
    </GROUP>`
    }
}
```

### Propriétés

<table>
<thead>
<tr>
    <th>Nom</th>
    <th>Obligatoire</th>
    <th>Type</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>value</td>
    <td>Oui</td>
    <td>string</td>
    <td>Contenu a afficher dans l'éditeur</td>
</tr>
<tr>
    <td>valueToCompare</td>
    <td>Non</td>    
    <td>string</td>
    <td>Contenu a comparer avec "value" dans l'éditeur</td>
</tr>
<tr>
    <td>language</td>
    <td>Oui</td>    
    <td>IEditorLanguage</td>
    <td>Langage du code affiché (Voir la liste des langages supportés)</td>
</tr>
<tr>
    <td>valueChange</td>
    <td>Non</td>
    <td>Event</td>
    <td>Exécuté lors d'une modification de la valeur de "value"</td>
</tr>
<tr>
    <td>valueToCompareChange</td>
    <td>No</td>
    <td>Event</td>
    <td>Exécuté lors d'une modification de la valeur de "valueToCompare"</td>
</tr>
<tr>
    <td>monacoLibPath</td>
    <td>'vs/loader.js')</td>
    <td>String</td>
    <td>Chemin vers le loader.js situé dans la librairie Monaco Editor. Permet de modifier le path de la lib en fonction de votre configuration Webpack.</td>
</tr>
</tbody>
</table>

Il est également possible de passer au composant l'ensemble des options disponible au composant Monaco ([voir ici](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html#readonly))
```html
<deja-monaco-editor [(value)]="code" [language]="language" [readOnly]="true" [automaticLayout]="true"></deja-monaco-editor>
```

### Langages supportés
La liste des langages disponible est accessible au travers de l'interface IEditorLanguage.
```typescript
    protected language: IEditorLanguage = IEditorLanguage.XML;
```
