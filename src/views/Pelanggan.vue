<template>

  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><b>Data Pelanggan</b></p>
              <p class="card-description float-right">
                <b-button variant="success" v-b-modal.modalPelanggan v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah</b-button>
              </p>
              <div class="table-responsive">
                <b-table striped hover :items="pelanggan" :fields="fields">
                  <!-- <template v-slot:cell(role)="data">
                    <b-badge variant="warning">{{ data.item.role }}</b-badge>
                  </template> -->
                  <template v-slot:cell(Aksi)="data">
                    <b-button size="sm" variant="info" v-on:click="Edit(data.item)" v-b-modal.modalPelanggan><i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah</b-button>&nbsp;
                    <b-button size="sm" variant="danger" v-on:click="Drop(data.item.id)"><i class="mdi mdi-delete btn-icon-prepend"></i> Hapus</b-button>
                  </template>
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination">
                </b-pagination>

                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="success"></b-spinner>
                  <strong class="text-success">Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal 
      id="modalPelanggan"
      @ok="Save"
    >
      <template v-slot:modal-title>
        Form Pelanggan
      </template>
        <form ref="form">
          <div class="form-group">
            <label for="nama" class="col-form-label">Nama Pelanggan</label>
            <input type="text" name="nama_pelanggan" class="form-control" id="nama_pelanggan" placeholder="Nama Pelanggan" v-model="nama_pelanggan">
          </div>
          <div class="form-group">
            <label for="nama" class="col-form-label">Email</label>
            <input type="text" name="email" class="form-control" id="email" placeholder="Email" v-model="email">
          </div>
          <div class="form-group">
            <label for="nama" class="col-form-label">Password</label>
            <input type="text" name="password" class="form-control" id="password" placeholder="Password" v-model="password">
          </div>
          <div class="form-group">
            <label for="nama" class="col-form-label">No Telepon</label>
            <input type="text" name="nomor_telp" class="form-control" id="nomor_telp" placeholder="No Telepon" v-model="nomor_telp">
          </div>
          <div class="form-group">
            <label for="nama" class="col-form-label">No Kwh</label>
            <input type="text" name="nomor_kwh" class="form-control" id="nomor_kwh" placeholder="No Kwh" v-model="nomor_kwh">
          </div>
          <div class="form-group">
            <label for="nama" class="col-form-label">Alamat</label>
            <input type="text" name="alamat" class="form-control" id="alamat" placeholder="Alamat" v-model="alamat">
          </div>
          <div class="form-group">
            <label for="nama" class="col-form-label">Id Tarif</label>
            <input type="number" name="id_tarif" class="form-control" id="id_tarif" placeholder="Id Tarif" v-model="id_tarif">
          </div>
        </form>
    </b-modal>

  </div>
 
</template>

<script>

module.exports = {
  data : function(){
    return {
      search: "",
      id: "",
      nama_pelanggan: "",
      email: "",
      password: "",
      nomor_telp: "",
      nomor_kwh: "",
      alamat: "",
      id_tarif: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      siswa: [],
      fields: ["id", "nama_pelanggan", "email", "password", "nomor_telp", "nomor_kwh", "alamat", "id_tarif", "Aksi"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/pelanggan/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.pelanggan = response.data.pelanggan;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data siswa."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },

    Add : function(){
      this.action = "insert";
      this.nama_pelanggan = "";
      this.email = "";
      this.password = ""; 
      this.nomor_telp = ""; 
      this.nomor_kwh = ""; 
      this.alamat = ""; 
      this.id_tarif = ""; 

    },

    Edit : function(item){
      this.action = "update";
      this.id = item.id;
      this.nama_pelanggan = item.nama_pelanggan;
      this.email = item.email;
      this.password = item.password;
      this.nomor_telp = item.nomor_telp;
      this.nomor_kwh = item.nomor_kwh;
      this.alamat = item.alamat;
      this.id_tarif = item.id_tarif;

    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("nama_pelanggan", this.nama_pelanggan);
        form.append("email", this.email);
        form.append("password", this.password);
        form.append("nomor_telp", this.nomor_telp);
        form.append("nomor_kwh", this.nomor_kwh);
        form.append("alamat", this.alamat);
        form.append("id_tarif", this.id_tarif);


        this.axios.post("/pelanggan", form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        let form = {
          nama_pelanggan: this.nama_pelanggan,
          email: this.email,
          password: this.password,
          nomor_telp: this.nomor_telp,
          nomor_kwh: this.nomor_kwh,
          alamat: this.alamat,
          id_tarif: this.id_tarif,

        }
        this.axios.put("/pelanggan/" + this.id, form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },

    Drop : function(id){
      let conf = { headers: { "Authorization" : "Bearer " + this.key} };
      if(confirm('Apakah anda yakin ingin menghapus data ini?')){
        this.$bvToast.show("loadingToast");
        this.axios.delete("/pelanggan/" + id, conf)
        .then(response => {
            this.getData();
            this.$bvToast.hide("loadingToast");
            this.message = response.data.message;
            this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>