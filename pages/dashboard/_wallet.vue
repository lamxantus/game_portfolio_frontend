<template>
  <dashboard-multiple v-if="!$route.params.wallet"/>
  <dashboard-single v-else/>
</template>

<script>
import DashboardMultiple from "../../components/partials/Dashboard/Multiple";
import DashboardSingle from "../../components/partials/Dashboard/Single";
export default {
  name: "_wallet",
  components: {DashboardSingle, DashboardMultiple}
}
</script>

<style scoped>

</style>
