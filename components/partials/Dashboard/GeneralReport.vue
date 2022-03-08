<template>
  <div class="p-4">
    <div class="flex justify-end text-gray-100 mb-2 space-x-4 text-gray-500">
      <div
        v-for="item in date_units" :key="item.value"
        class="cursor-pointer"
        :class="{'text-white': filter.date_unit === item.value}"
        @click="filter.date_unit = item.value"
      >{{ item.title }}
      </div>
    </div>
    <div class="flex space-x-4 items-end h-40">
      <template v-for="i in Object.keys(report)">
        <div
          :key="i"
          class="flex-1 bg-white chart-elm bg-opacity-20 hover:bg-opacity-100 hover:text-black duration-200"
          :style="{minHeight: '26px',height: `${report[i].token * 100 / maxLength}%`}">
          <span>{{ report[i].token }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneralReport",
  data() {
    return {
      date_units: [{
        title: "Today",
        value: "d"
      }, {
        title: "Week",
        value: "w"
      }, {
        title: "Month",
        value: "m"
      }],
      filter: {
        date_unit: 'd'
      },
      report: {}
    }
  },
  methods: {
    async loadData() {
      this.report = await this.$axios.$get('/report', {
        params: {
          ...this.filter,
        }
      })
    },
  },
  computed: {
    maxLength() {
      const values = Object.values(this.report).map(x => x.token)
      if (values.length) {
        return Math.max(...values) * 1.2
      }
      return 1
    }
  },
  mounted() {
    this.loadData()
  },
  watch: {
    filter: {
      deep: true,
      handler: function () {
        this.loadData();
      }
    }
  },
}
</script>

<style scoped>

</style>
