<template>
  <div>
  <v-text-field
      outlined
      :label="$t('search-input')"
      append-icon="mdi-magnify"
      v-model="inputValue"
      @input="$emit('input', inputValue)"
  ></v-text-field>

  </div>
</template>

<script>

export default {
  name: "inputFilter",

  data() {
    return {
      inputValue: '',
      label: ''
    }
  },
  updated() {
    console.log(this.inputValue)
  }
}
</script>

<style scoped>


/*.v-text-field.v-text-field--enclosed {
  margin-top: 30px;
  margin-left: 30px
}*/
</style>