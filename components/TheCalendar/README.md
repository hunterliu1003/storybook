# TheCalendar Component

## Template

### default

```pug
div
  TheCalendar
```

### v-model && onSelect

```pug
div
  TheCalendar(
    v-model="date"
    @onSelect="setDate"
  )
```

## Props

| props | type | required | default |
| :---- | :--- | :------: | :------ |
| value | String | false | null |

value 範例為 '2018-9-4'

## Events

@onSelect 會附帶一參數型別為 `string`, 值的格式為 `'2018-9-4'`
