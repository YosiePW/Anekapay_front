<template>
<div class="container-fluid page-body-wrapper">
                <div class="page-container">
        <!-- sidebar menu area start -->
        <div class="sidebar-menu">
            <div class="sidebar-header">
                <div class="logo">
                    <a href="index.html"><img src="assets/images/icon/logo.png" alt="logo"></a>
                </div>
            </div>
            <div class="main-menu">
                <div>
                   
                        <ul class="metismenu" id="menu">
                            <li class="active">
                                <a href="/admin" aria-expanded="true"><i class="ti-dashboard"></i><span>Dashboard</span></a>
                            </li>
                            <li>
                                 <a href="/profil" aria-expanded="true"><i class="ti-layout-sidebar-left"></i><span>Profil</span></a>
                            </li>
                            <li>
                                <a href="/user" aria-expanded="true"><i class="ti-pie-chart"></i><span>User</span></a>
                            </li>
                            <li>
                                <a href="/pelanggan" aria-expanded="true"><i class="ti-palette"></i><span>Pelanggan</span></a>
                            </li>
                            <li>
                                <a href="/tarif" aria-expanded="true"><i class="fa fa-table"></i><span>Tarif</span></a>
                            </li>
                            <li>
                                <a @click="logout" aria-expanded="true"><i class="ti-layers-alt"></i><span>logout</span></a>
                            </li>
                            
                        </ul>
                    
                </div>
            </div>
        </div>
        <!-- sidebar menu area end -->
        <!-- main content area start -->
        <div class="main-content">
            <!-- header area start -->
            <div class="header-area">
                <div class="row align-items-center">
                    <!-- nav and search button -->
                    <div class="col-md-6 col-sm-8 clearfix">
                        <div class="search-box pull-left">
                            <form action="#">
                                <input type="text" name="search" placeholder="Search..." required>
                                <i class="ti-search"></i>
                            </form>
                        </div>
                    </div>
                    <!-- profile info & task notification -->
                </div>
            </div>
            <!-- header area end -->
            <!-- page title area start -->
            <div class="page-title-area">
                <div class="row align-items-center">
                    <div class="col-sm-6">
                        <div class="breadcrumbs-area clearfix">
                            <h4 class="page-title pull-left">Dashboard</h4>
                            <ul class="breadcrumbs pull-left">
                                <li><a href="index.html">Home</a></li>
                                <li><span>Dashboard</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-6 clearfix">
                        <div class="user-profile pull-right">
                            <img class="avatar user-thumb" src="assets/images/author/avatar.png" alt="avatar">
                            <h4 class="user-name dropdown-toggle" data-toggle="dropdown">Admin<i class="fa fa-angle-down"></i></h4>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Message</a>
                                <a class="dropdown-item" href="#">Settings</a>
                                <a @click="logout" href="#">Log Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- page title area end -->
            <div class="main-content-inner">
                <!-- sales report area start -->
                <div class="col-12 mt-5">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="header-title float-left">Data Pelanggan</h4>
                                <p class="card-description float-right">
                                       <b-button variant="success" v-b-modal.modalPelanggan v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah</b-button>
                                     </p>
                                <div class="single-table">
                                    <div class="table-responsive">
                                        <table class="table table-hover progress-table text-center">
                                            <!-- <thead class="text-uppercase">
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Nama</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Password</th>
                                                    <th scope="col">No KWH</th>
                                                    <th scope="col">No Telp</th>
                                                    <th scope="col">Alamat</th>
                                                    <th scope="col">Id Tarif</th>
                                                    <th scope="col">Aksi</th>

                                                </tr>
                                            </thead> -->
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
                                            <!-- <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>09 / 07 / 2018</td>
                                                    <td>
                                                        <div class="progress" style="height: 8px;">
                                                            <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td><span class="status-p bg-primary">pending</span></td>
                                                    <td>
                                                        <ul class="d-flex justify-content-center">
                                                            <li class="mr-3"><a href="#" class="text-secondary"><i class="fa fa-edit"></i></a></li>
                                                            <li><a href="#" class="text-danger"><i class="ti-trash"></i></a></li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Mark</td>
                                                    <td>09 / 07 / 2018</td>
                                                    <td>
                                                        <div class="progress" style="height: 8px;">
                                                            <div class="progress-bar bg-warning" role="progressbar" style="width: 80%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td><span class="status-p bg-warning">pending</span></td>
                                                    <td>
                                                        <ul class="d-flex justify-content-center">
                                                            <li class="mr-3"><a href="#" class="text-secondary"><i class="fa fa-edit"></i></a></li>
                                                            <li><a href="#" class="text-danger"><i class="ti-trash"></i></a></li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Mark</td>
                                                    <td>09 / 07 / 2018</td>
                                                    <td>
                                                        <div class="progress" style="height: 8px;">
                                                            <div class="progress-bar bg-success" role="progressbar" style="width: 100%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td><span class="status-p bg-success">complate</span></td>
                                                    <td>
                                                        <ul class="d-flex justify-content-center">
                                                            <li class="mr-3"><a href="#" class="text-secondary"><i class="fa fa-edit"></i></a></li>
                                                            <li><a href="#" class="text-danger"><i class="ti-trash"></i></a></li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">4</th>
                                                    <td>Mark</td>
                                                    <td>09 / 07 / 2018</td>
                                                    <td>
                                                        <div class="progress" style="height: 8px;">
                                                            <div class="progress-bar bg-warning" role="progressbar" style="width: 85%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td><span class="status-p bg-warning">panding</span></td>
                                                    <td>
                                                        <ul class="d-flex justify-content-center">
                                                            <li class="mr-3"><a href="#" class="text-secondary"><i class="fa fa-edit"></i></a></li>
                                                            <li><a href="#" class="text-danger"><i class="ti-trash"></i></a></li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody> -->

                                            <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                                               <b-spinner label="Spinning" variant="success"></b-spinner>
                                               <strong class="text-success">Loading...</strong>
                                             </b-toast>

                                             <!-- toast untuk tampilan message box -->
                                             <b-toast id="message" title="Message">
                                               <strong class="text-success">{{ message }}</strong>
                                             </b-toast>
                                        </table>
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
                                 <input type="text" name="nama_pelanggan" class="form-control" id="nama_pelanggan" placeholder="Nama Pelanggan" v-model="nama_pelanggan">
                               </div>
                               <div class="form-group">
                                 <input type="text" name="email" class="form-control" id="email" placeholder="Email" v-model="email">
                               </div>
                               <div class="form-group">
                                 <input type="text" name="password" class="form-control" id="password" placeholder="Password" v-model="password">
                               </div>
                               <div class="form-group">
                                 <input type="text" name="nomor_telp" class="form-control" id="nomor_telp" placeholder="No Telepon" v-model="nomor_telp">
                               </div>
                               <div class="form-group">
                                 <input type="text" name="nomor_kwh" class="form-control" id="nomor_kwh" placeholder="No Kwh" v-model="nomor_kwh">
                               </div>
                               <div class="form-group">
                                 <input type="text" name="alamat" class="form-control" id="alamat" placeholder="Alamat" v-model="alamat">
                               </div>
                               <div class="form-group">
                                 <input type="number" name="id_tarif" class="form-control" id="id_tarif" placeholder="Id Tarif" v-model="id_tarif">
                               </div>
                             </form>
                         </b-modal>


                    </div>
                <!-- sales report area end -->
                <!-- overview area start -->
                
        <!-- main content area end -->
        <!-- footer area start-->
        <!-- footer area end-->

         
    </div>
    <!-- page container area end -->
    <!-- offset area start -->

    </div>
     </div>
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

  computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },

  methods: {
    methods:{
      logout:function(){
          let conf = { headers : {"Authorization" : "Bearer " + localStorage.getItem("Authorization")} };
          let form = new FormData();
          this.axios.post('/logout', form, conf).then(response => {
            if (response.data.logged === false || response.data.status === 0) {
                this.$store.commit('logout')
                localStorage.removeItem("Authorization")
                this.$router.push({name: 'login'})
            }
          }).catch(error => {

        });
      },
  },

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