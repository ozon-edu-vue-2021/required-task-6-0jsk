const props = {
  rows: {
    type: Array,
    default: () => []
  },
  columnsOptions: {
    type: Object,
    required: true
  }
};

export const VirtualRenderer = {
  props,
};
