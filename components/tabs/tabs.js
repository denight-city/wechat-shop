Component({
  data: {},
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },
  methods: {
    handleActive(e) {
      const index = e.currentTarget.dataset;
      this.triggerEvent('tabsItemChange', {
        index
      })

    }
  }
})