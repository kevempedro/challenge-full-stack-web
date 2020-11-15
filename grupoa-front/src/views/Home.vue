

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense nav>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Alunos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Escola GrupoA</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <DataTable />
    </v-main>
  </v-app>
</template>

<script>
import DataTable from '../components/DataTable.vue'

export default {
  name: "Home",
    components: {
    DataTable,
  },
  data: () => ({ drawer: null }),
};
</script>
