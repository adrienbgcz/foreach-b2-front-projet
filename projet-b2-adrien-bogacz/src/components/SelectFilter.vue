<template>
  <v-select
    :items="items"
    :label="label"
    v-model="choosenItem"
    @change="$emit('change', choosenItem)"
    outlined
  ></v-select>
</template>

<script>
export default {
  name: "selectFilter",
  props: {
    itemsList: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
    },
  },
  mounted() {
    this.items = this.itemsList;
  },
  data: () => ({
    items: [],
    choosenItem: "",
  }),
};
</script>

<style scoped></style>
