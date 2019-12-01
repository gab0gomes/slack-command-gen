<template>
  <div>
      <section class="hero is-medium is-primary is-bold">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Slack Command Generator
            </h1>
            <h2 class="subtitle">
              A simple native and plugins-based command generator to Slack
            </h2>
            <b-taglist attached>
              <b-tag type="is-dark">Status</b-tag>
              <b-tag type="is-info">under development</b-tag>
            </b-taglist>
          </div>
        </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <b-field
              label="Plugin"
              label-position="on-border"
            >
              <b-select
                v-model="selectedPlugin"
                placeholder="Select a plugin"
                expanded
              >
                  <option
                      v-for="plugin in plugins"
                      :value="plugin"
                      :key="plugin">
                      {{ plugin }}
                  </option>
              </b-select>
            </b-field>
            </div>
          <div class="column is-one-quarter">
            <b-field
              label="Action"
              label-position="on-border"
            >
                <b-select
                  v-model="selectedAction"
                  :placeholder="(!selectedPlugin ? 'Select a plugin first' : 'Select an action')"
                  :disabled="(!selectedPlugin)"
                  expanded
                >
                    <option
                        v-for="action in actions"
                        :value="action"
                        :key="action">
                        {{ action }}
                    </option>
                </b-select>
            </b-field>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="content">
              <form-generator
                v-if="!_.isEmpty(fields)"
                :fields="fields"
              />
              <b-message
                v-else
              >
                No action selected
              </b-message>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import commands from '../constants/commands';
import FormGenerator from '../components/formGenerator.vue';

export default {
  name: 'home',
  components: {
    FormGenerator,
  },

  data() {
    return {
      selectedAction: null,
      selectedPlugin: null,
    };
  },

  computed: {
    plugins() {
      return this._.keys(commands);
    },

    actions() {
      return !this._.isEmpty(this.selectedPlugin)
        ? this._.keys(commands[this.selectedPlugin].commands)
        : [];
    },

    fields() {
      return !this._.isEmpty(this.selectedAction)
        ? commands[this.selectedPlugin].commands[this.selectedAction].params
        : null;
    },
  },
};
</script>
