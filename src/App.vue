<template>
  <v-app  style="background-color: hsla(0, 0%, 0%, 0)">
    <v-toolbar dark color="#FF4141" title="Menu">
      <div class="text-center">
        <v-menu  offset-y>
          <template v-slot:activator="{ on, attrs }">

            <v-app-bar-nav-icon v-bind="attrs" v-on="on">
            </v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
 
      <v-toolbar-title>E-Sportify</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field hide-details single-line prepend-icon="mdi-magnify">
        <v-tooltip text="Tooltip">
          <template v-slot:activator="{ props }">

          </template>
        </v-tooltip>
      </v-text-field>

      <v-spacer></v-spacer>


      <v-btn icon title="Home">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon title="Estatísticas">
        <v-icon>mdi-chart-line</v-icon>
      </v-btn>

      <v-btn icon title="Ver mais">
        <v-icon>mdi-more</v-icon>
      </v-btn>
      <v-btn icon title="Logout">
        <v-icon>mdi-account-arrow-right</v-icon>
      </v-btn>
    </v-toolbar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>


<style>
.v-toolbar {
flex: none;
}

</style> 




<script>

export default {
  name: 'App',

  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  })
};
</script>






