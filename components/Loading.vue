<template>
  <v-container class="loading-container" fill-height>
    <v-row class="d-flex justdify-center align-fcenter" justify="center">
      <v-col class="text-center" cols="12" md="6">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
        <h2>Loading...</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
  .loading-container {
    text-align: center;
    height: 100vh;
    width: 100%;
  }
</style>
