<!-- <template>
    <div>
      <v-chart v-for="chart in charts" :key="chart.id" :type="chart.type" :data="chart.data"></v-chart>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { chartsStore } from '~/utils/store-accessor';
  
  export default defineComponent({
    setup() {
      const charts = ref([]);
  
      onMounted(async () => {
        charts.value = await chartsStore.fetchCharts();
      });
  
      return {
        charts
      };
    }
  });
  </script>
   -->