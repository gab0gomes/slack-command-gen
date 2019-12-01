<template>
  <form>
    <b-field
      v-for="(field, key) in fields"
      :key="key"
      :label="_.capitalize(key)"
      label-position="on-border"
    >
      <component :is="component(field.type)"/>
    </b-field>
  </form>
</template>

<script>
export default {
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    component(type) {
      switch (type) {
        case 'text':
          return 'b-input';
        case 'select':
          return 'b-select';
        case 'date':
          return 'b-datetimepicker';
        default:
          return 'b-input';
      }
    },
  },
};
</script>

<style>

</style>
