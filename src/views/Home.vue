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
        <div class="columns">
          <div class="column">
            <div class="card">
              <div class="card-content">
                <form-generator
                  v-if="!_.isEmpty(fields)"
                  :fields="fields"
                  @submit="generateCommand"
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
        <div
          v-if="command"
          class="card">
          <div class="card-content">
            <b-message
              title="Success! Copy the command and paste in a Slack text box."
              type="is-success"
              aria-close-label="Close message"
              @close="command = null"
            >
              {{ command }}
            </b-message>
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
      command: null,
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

  methods: {
    generateCommand(form) {
      let generatedCommand = `/${
        commands[this.selectedPlugin]
          .commands[this.selectedAction]
          .command
      }`;

      this._.forEach(
        this._.orderBy(this.fields, ['order']),
        (field) => {
          const fieldData = form[this._.findKey(this.fields, ['order', field.order])];
          if (field.type === 'date') {
            generatedCommand += ` ${this.moment(fieldData).format('[on] MM/DD/YYYY [at] HH:mm')}`;
          } else if (field.quoted) {
            generatedCommand += ` "${fieldData}"`;
          } else {
            generatedCommand += ` ${fieldData}`;
          }
        },
      );

      this.command = generatedCommand;
    },
  },
};
</script>
