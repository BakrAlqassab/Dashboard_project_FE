<template>
  <v-container align="center"  class="fill-height w-full" fill-height>
    <v-row class="d-flex justify-center align-fcenter" justify="center">
      <v-col class="text-center" cols="12" md="6">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        />
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
