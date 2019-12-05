<template>
  <form @submit.prevent="$emit('submit', form)">
    <b-field
      v-for="(field, key) in fields"
      :key="key"
      :label="_.capitalize(key)"
      label-position="on-border"
    >
      <component
        v-model="form[key]"
        :is="component(field.type)"
        v-bind="extraProps(field.type)"
      />
    </b-field>
    <b-button
      type="is-primary"
      native-type="submit"
    >
      Generate
    </b-button>
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

  data() {
    return {
      form: {},
    };
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
    extraProps(type) {
      switch (type) {
        case 'text':
          return {
            required: true,
          };
        case 'select':
          return {};
        case 'date':
          return {
            required: true,
            'min-datetime': new Date(),
            position: 'is-top-right',
          };
        default:
          return {};
      }
    },
  },
};
</script>

<style>

</style>
