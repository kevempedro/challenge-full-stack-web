<template>
  <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
    :search="search"
    :custom-filter="filter"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Alunos</v-toolbar-title>

        <v-spacer />

        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar..."
            single-line
            hide-details
          >
          </v-text-field>
        </v-card-title>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Cadastrar Aluno
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="dataStudent.academicRecord"
                      label="Registro Acâdemico"
                      type="number"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="dataStudent.name" label="Nome" />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="dataStudent.email" label="E-mail" />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="dataStudent.cpf" label="CPF" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />

              <v-btn color="blue darken-1" text @click="close">Fechar</v-btn>

              <v-btn color="blue darken-1" text @click="save">
                {{ formTitle }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              Você realmente deseja deletar o registro desse aluno?
            </v-card-title>

            <v-card-actions>
              <v-spacer />

              <v-btn color="blue darken-1" text @click="closeDelete">
                Não
              </v-btn>

              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                Sim
              </v-btn>

              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="edit(item)"> mdi-pencil </v-icon>

      <v-icon small @click="deleteDialog(item)"> mdi-delete </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { studentApi } from "../service/students";

export default {
  name: "DataTable",
  mounted() {
    this.getStudents();
  },
  data() {
    return {
      search: "",
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Registro Acadêmico", value: "academicRecord" },
        { text: "Nome", value: "name", align: "start", filterable: true },
        { text: "E-mail", value: "email" },
        { text: "CPF", value: "cpf" },
        { text: "Acões", value: "actions", sortable: false },
      ],
      users: [],
      editedIndex: 0,
      dataStudent: {
        academicRecord: 0,
        name: "",
        email: "",
        cpf: "",
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === 0 ? "Cadastrar Aluno" : "Editar Aluno";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.users = [];
    },

    filter(value, search, item, pagination) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().indexOf(search) !== -1
      );
    },

    edit(item) {
      console.log(item);
      this.editedIndex = 1;
      this.dataStudent = Object.assign({}, item);
      this.dialog = true;
    },

    deleteDialog(student) {
      this.dataStudent = {
        academicRecord: student.academicRecord,
        name: student.name,
        email: student.email,
        cpf: student.cpf,
      };

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log("AQUI -> ", this.dataStudent);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.dataStudent = { academicRecord: "", name: "", email: "", cpf: "" };
        this.editedIndex = 0;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedIndex = 0;
      });
    },

    save() {
      // if (this.editedIndex > 0) {
      //   Object.assign(this.desserts[this.editedIndex], this.dataStudent);
      // } else {
      //   this.desserts.push(this.dataStudent);
      // }
      console.log(this.dataStudent);
      this.close();
    },

    getStudents() {
      studentApi.findAll()
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((err) => {
          console.log("ERROR -> ", err.message);
        });
    },
  },
};
</script>
