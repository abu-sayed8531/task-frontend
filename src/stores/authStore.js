import {defineStore} from 'pinia';
import {useRouter} from 'vue-router';
import apiClient from '../services/axiosClient';
import {ref ,computed } from 'vue';
import cogoToast from 'cogo-toast'

export const useAuthStore = defineStore('auth',()=>{
    const router = useRouter();
    const token = ref(localStorage.getItem('token')|| null);
    const isAuthenticated = computed(()=>{

      return  token.value !== null;
    }) 
    const user = ref({});
    const register = async (credentials)=>{
        try{
             const res = await apiClient.post('/register',credentials);
             
             cogoToast.success('Registration Successful',{
                        position: 'bottom-center',
                      })
             
             if(res.data.success){
                setTimeout(()=>{
                    router.push('/login');  
             },1000)
             }
             return true;
        }
        catch(error){
       
             if(error.response?.data.errors){
                let errors = error.response.data.errors;
                for( let field in errors){
                    cogoToast.error(errors[field],{
                        position: 'bottom-center',
                    });
                }
             }
             else if(error.response?.data.message){
                cogoToast.error(error.response.data.message,{
                    position : 'bottom-center',
                })
             }
             else if(error.code === 'ERR_NETWORK'){
                    cogoToast.error('Network error',{
                    position : 'bottom-center',
                })
             }
             else{
                cogoToast.error('There is something wrong',{
                    position : 'bottom-center',
                }
                
                )
             }
        }
    }
    const login = async (credentials)=>{
        try{
             const res = await apiClient.post('/login',credentials);
             if(res.data.success){
                token.value = res.data.data.token;
                user.value = res.data.data.user;
                
                localStorage.setItem('token', token.value);
                cogoToast.success('Logged in successfully',{
                    position : 'bottom-center',
                })
                setTimeout(()=>{
                     router.push('/dashboard');
                },1000);
             }
             return true;
        }
        catch(error){
         
             if(error.response?.data.errors){
                let errors = error.response.data.errors;
                for( let field in errors){
                    cogoToast.error(errors[field],{
                        position: 'bottom-center',
                    });
                }
             }
             else if(error.response?.data.message){
                cogoToast.error(error.response.data.message,{
                    position : 'bottom-center',
                })
             }
             else if(error.code === 'ERR_NETWORK'){
                    cogoToast.error('Network error',{
                    position : 'bottom-center',
                })
             }
             else{
                cogoToast.error('There is something wrong',{
                    position : 'bottom-center',
                }
                
                )
             }
        }
    }
    const logout = async ()=>{
        try{
            
             const res = await apiClient.get('/logout');
             token.value = null;
             localStorage.removeItem('token');
             router.push('/login');
        }
        catch(error){
            console.log(error);
             if(error.response?.data.message){
                
                cogoToast.error(error.response.data.message,{
                    position : 'bottom-center',
                })
             }
             else if(error.code === 'ERR_NETWORK'){
                    cogoToast.error('Network error',{
                    position : 'bottom-center',
                })
             }
             else{
                cogoToast.error('There is something wrong',{
                    position : 'bottom-center',
                }
                
                )
             }
        }
        
    }
    const getUser = async()=>{
        try{
                const res = await apiClient.get('/me');
                
                user.value = res.data.data;
                
                return true;
        }
        catch(error){
            if(error.response?.data.message){
                
                cogoToast.error(error.response.data.message,{
                    position : 'bottom-center',
                })
             }
             else if(error.code === 'ERR_NETWORK'){
                    cogoToast.error('Network error',{
                    position : 'bottom-center',
                })
             }
             else{
                cogoToast.error('There is something wrong',{
                    position : 'bottom-center',
                }
                
                )
             }
        }
    }
    const updateUser = async(credentials)=>{
        try{
              user.value = {};
              const res = await apiClient.put('/update-profile', credentials);
              user.value = res.data.data;
              return true;
        }
        catch(error){
            console.log(error);
              if(error.response?.data.errors){
                let errors = error.response.data.errors;
                for( let field in errors){
                    cogoToast.error(errors[field],{
                        position: 'bottom-center',
                    });
                }
             }
             else if(error.response?.data.message){
                cogoToast.error(error.response.data.message,{
                    position : 'bottom-center',
                })
             }
             else if(error.code === 'ERR_NETWORK'){
                    cogoToast.error('Network error',{
                    position : 'bottom-center',
                })
             }
             else{
                cogoToast.error('There is something wrong',{
                    position : 'bottom-center',
                }
                
                )
             }
        }
    }
    return {register, login ,logout,getUser,updateUser,user,isAuthenticated }
});