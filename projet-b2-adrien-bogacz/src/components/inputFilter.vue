<template>
  <v-text-field
      outlined
      label="Append"
      append-icon="mdi-map-marker"
      v-model="inputValue"
      @input="$emit('input', inputValue); $emit('refreshList')"
  ></v-text-field>
</template>

<script>
export default {
  name: "inputFilter",
  /*props: {
    value: {
      type: String,
      required: false
    }
  },*/
  data() {
    return {
      inputValue: ''
    }
  },
  updated() {
    console.log(this.inputValue)
  }
}
</script>

<style scoped>

</style>