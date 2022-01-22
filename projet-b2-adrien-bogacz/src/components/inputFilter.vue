<template>
  <v-text-field
      outlined
      label="Rechercher"
      append-icon="mdi-map-marker"
      v-model="inputValue"
      @input="$emit('input', inputValue)"
  ></v-text-field>
</template>

<script>

export default {
  name: "inputFilter",

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
.v-input {
  width: 300px;

}

.v-text-field.v-text-field--enclosed {
  margin-top: 30px;
  margin-left: 30px
}
</style>