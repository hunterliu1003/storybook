# TheDatePicker

## Template

### default

```pug
.container
  TheDatePicker
```

### v-model && onSelect

```pug
.container
  TheDatePicker(
    v-model="date"
    @onSelect="setDate"
  )
```

## Props

| props | type | required | default |
| :---- | :--- | :------: | :------ |
| value | String | false | null |

value 範例為 '2018-09-04'

## Events

@onSelect 會附帶一參數型別為 `string`, 值的格式為 `'2018-09-04'`
