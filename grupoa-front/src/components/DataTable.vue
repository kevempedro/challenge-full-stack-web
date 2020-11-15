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
                      v-bind:class="{ disabled: editedIndex ? true : false }"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="dataStudent.name" label="Nome" />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="dataStudent.email" label="E-mail" />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="dataStudent.cpf"
                      label="CPF"
                      v-mask="'###.###.###-##'"
                      v-bind:class="{ disabled: editedIndex ? true : false }"
                    />
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
      <span> Nenhum registro cadastrado! </span>
    </template>
  </v-data-table>
</template>

<script>
import { studentApi } from "../service/students";
import validateEmail from "../shared/utils/validateEmail";
import "./DataTable.css";

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
      idToDelete: 0,
      dataStudent: {
        id: 0,
        academicRecord: "",
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
      this.editedIndex = 1;
      this.dataStudent = Object.assign({}, item);
      this.dialog = true;
    },

    deleteDialog(student) {
      this.idToDelete = student.id;

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteStudent(this.idToDelete);

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.dataStudent = {
          id: 0,
          academicRecord: "",
          name: "",
          email: "",
          cpf: "",
        };
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
      if (!this.dataStudent.academicRecord) {
        alert("Informe o registro acadêmico.");
        return;
      }

      if (!this.dataStudent.name) {
        alert("Informe o nome.");
        return;
      }

      if (!this.dataStudent.email) {
        alert("Informe o email.");
        return;
      }

      if (!this.dataStudent.cpf) {
        alert("Informe o CPF.");
        return;
      }

      if (!validateEmail(this.dataStudent.email)) {
        alert("Informe um e-mail válido.");
        return;
      }

      if (this.editedIndex > 0) {

        console.log('STUDENT -> ', student);
        const data = {
          name: this.dataStudent.name,
          email: this.dataStudent.email,
        };

        this.updateStudent(this.dataStudent.id, data)
      } else {
        const data = {
          academicRecord: Number(this.dataStudent.academicRecord),
          name: this.dataStudent.name,
          email: this.dataStudent.email,
          cpf: this.dataStudent.cpf,
        };

        this.createStudent(data);
      }
    },

    getStudents() {
      studentApi
        .findAllStudents()
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },

    deleteStudent(idStudent) {
      studentApi
        .deleteStudent(idStudent)
        .then((response) => {
          alert(response.data.data);

          this.getStudents();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },

    createStudent(data) {
      studentApi
        .createStudent(data)
        .then((response) => {
          alert(response.data.data);

          this.close();

          this.getStudents();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },

    updateStudent(idStudent, data) {
      studentApi
        .updateStudent(idStudent, data)
        .then((response) => {
          alert(response.data.data);

          this.close();

          this.getStudents();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
