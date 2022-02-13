<template>
  <v-footer dark padless>
    <v-card
      flat
      tile
      color="hsl(231, 30%, 54%)"
      class="flex lighten-1 white--text text-center"
    >
      <v-card-text class="white--text">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0"> </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>jeong-project</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
};
</script>