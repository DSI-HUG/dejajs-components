# Combo List
Dual List Items Selector.  
Select items moving them to the "Selected" List 

### HowTo 
> Don't forget to import `DejaComboListModule` into your app module!

### Properties

<table>
<thead>
<tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>disabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>Disable all actions.</td>
</tr>
<tr>
    <td>disableFastActions</td>
    <td>boolean</td>
    <td>false</td>
    <td>Disable only the fast actions.</td>
</tr>
<tr>
    <td>itemsToSelect</td>
    <td>T[]</td>
    <td>[]</td>
    <td>The array of items of any type that are not yet selected.</td>
</tr>
<tr>
    <td>itemsSelected</td>
    <td>T[]</td>
    <td>[]</td>
    <td>The array of items of any type that are already selected.</td>
</tr>
<tr>
    <td>labelFieldName</td>
    <td>string</td>
    <td>`label`</td>
    <td>The field name of choice to be displayed in the lists.</td>
</tr>
<tr>
    <td>sortDirection</td>
    <td>string</td>
    <td>null</td>
    <td>The direction of the sorting algo. Can be null, 'asc' or 'desc'. (null = no sort)</td>
</tr>
</tbody>
</table>

### Events

<table>
<thead>
<tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>action</td>
    <td>IDejaComboListAction</td>
    <td>Emitted for each selection/deselection event.</td>
</tr>
</tbody>
</table>

#### Note
 - All properties are optional.
