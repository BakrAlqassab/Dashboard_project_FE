<template>
    <v-container >
      <v-row class="d-flex justify-center align-fcenter" justify="center">
        <v-col cols="12" md="4">
        <v-sheet class="elevation-3 pa-4 no-charts-sheet">
          <v-row justify="center" center>
            <v-icon color="blue darken-2" large>mdi-chart-bar</v-icon>
          </v-row>
          <v-row justify="center" center>
            <p>No charts added yet!</p>
          </v-row>
        </v-sheet>
      </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "noCharts",
  };
  </script>
