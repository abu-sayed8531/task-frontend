<script setup>
import { onBeforeMount,ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";
import cogoToast from "cogo-toast";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const email = ref();
const name = ref();
const password = ref();
const password_confirmation = ref();
onBeforeMount(async () => {
   await authStore.getUser();
  
  email.value= user.value.email;
  name.value = user.value.name;
});
async function updateUser(){
    const credentials = {
        name : name.value,
        email : email.value,
        password : password.value,
        password_confirmation: password_confirmation.value,
    }
   const update =   await authStore.updateUser(credentials);
   if(update){
    cogoToast.success('Profile updated.',{
                    position : 'bottom-center',
                });
    email.value = user.value.email;
    name.value = user.value.name;
    password.value ='';
    password_confirmation.value ='';
   }
    
}
</script>

<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-12 animate__animated animate__fadeInUp">
        <div class="card">
          <div class="card-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-6 p-2">
                  <label>Email Address</label
                  ><input
                    placeholder="User Email"
                    class="form-control animated fadeInUp"
                    type="email"
                    v-model = 'email'
                  />
                </div>
                <div class="col-6 p-2">
                  <label>Name</label
                  ><input
                    placeholder="First Name"
                    class="form-control animated fadeInUp"
                    type="text"
                    v-model = 'name'
                  />
                </div>
                 <div class="col-6 p-2">
                  <label>Password</label
                  ><input
                    placeholder="Password"
                    class="form-control animated fadeInUp"
                    type="text"
                    v-model = 'password'
                  />
                </div>
                 <div class="col-6 p-2">
                  <label>Confirm Password</label
                  ><input
                    placeholder="Confirm Password"
                    class="form-control animated fadeInUp"
                    type="text"
                    v-model = 'password_confirmation'
                  />
                </div>
              </div>
              <button @click="updateUser" class="btn float-start btn-success mt-2">
              Update
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
