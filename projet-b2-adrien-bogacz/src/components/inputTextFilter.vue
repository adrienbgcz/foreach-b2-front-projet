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
  }
}
</script>

<style scoped>

</style>