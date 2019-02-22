# Splitter
The splitter component allows to split horizontally or vertically, a container in N resizable part.

### Important Informations
> Do not forget to import `DejaSplitterModule` in the `imports` section of your module !

### How to use 

Horizontal Splitter
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

Vertical Splitter
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

Multiple Splitter
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

Component **deja-splitter**

| @Input()            | Type   | Default      | Description                                              |
| ------------------- | ----   | ------------ | -------------------------------------------------------- |
| direction           | string | 'horizontal' | Direction of the split. Can be `horizontal` or `vertical`|
| width               | number | 100          | Width in percent of the component                        |
| height              | number | 100          | Width in percent of the component                        |

| @Output()           | Description                                                                      |
| ------------------- | -------------------------------------------------------------------------------- |
| dragStart           | Event triggered when the user start to drag the cursor                           |
| drag                | Event triggered during the cursor's drag                                         |
| dragEnd             | Event triggered when the user stop to drag the cursor                            |

Component **split-area**

| @Input()         | Type   | Default | Description                                                              |
| ---------------- | ------ | ------- | ------------------------------------------------------------------------ |
| size             | number | null    | Size in percent of the area. If null, every area will have the same size |
