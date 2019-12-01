export default {
  command: '/remind',
  params: {
    who: {
      type: 'text',
      order: 1,
    },
    what: {
      type: 'text',
      order: 2,
    },
    when: {
      type: 'date',
      order: 3,
    },
    recurrence: {
      type: 'text',
      order: 4,
    },
  },
};
