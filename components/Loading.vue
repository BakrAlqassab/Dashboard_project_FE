<template>
  <v-container class="loading-container" fill-height>
    <v-layout  > 
      <v-flex  class="ma-4 pa-4 text-center d-flex justify-center align-center">
        <v-progress-circular indeterminate color="primary"  size="64"></v-progress-circular>
        <h2>Loading...</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style scoped>
.loading-container {
  text-align: center;
  height: 100vh;
}
</style>
