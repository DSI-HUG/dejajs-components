### Important Informations
> Do not forget to import `DejaMonacoEditorModule` in the `imports` section of your module !

> Do not forget to edit your webpack configuration :

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

### How to use
```html
<deja-monaco-editor [(value)]="code" [(valueToCompare)]="codeToCompare" language="xml"></deja-monaco-editor>
```

```typescript
export class DejaMonacoEditorDemoComponent implements OnInit {
    protected code: string;

    public constructor() {
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

You can pass in param every options coming from monaco editor ([see here](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html#readonly))
```html
<deja-monaco-editor [(value)]="code" language="json" [readOnly]="true" [automaticLayout]="true"></deja-monaco-editor>
```

### Supported language
```typescript
    @Input() public language: 'bat' | 'c' | 'cpp' | 'csharp' | 'css' | 'dockerfile' | 'fsharp' | 'go' | 'graphql' | 'handlebars' | 'html' | 'ini' | 'jade' | 'javascript' | 'json' | 'less' | 'lua' | 'markdown' | 'objective-c' | 'php' | 'csharp' | 'plaintext' | 'postiats' | 'powershell' | 'python' | 'r' | 'razor' | 'ruby' | 'scss' | 'sql' | 'swift' | 'typescript' | 'vb' | 'xml' | 'yaml';
```
