<script setup>
    import {ref, onMounted, reactive, watch} from 'vue'

    const passwordShow = ref(false)
    
    const mode = ref('')
    const isValidMessage = ref({
        loginValid:[],
        registerValid:[]
    })

    onMounted(()=>{
        mode.value = 'LOGIN'
    })

    const loginform = ref([
        {
            name: 'Username',
            field: 'username'
        },
        {
            name: 'Password',
            field: 'password'
        }
    ])
    const registerform = ref([
        {
            name: 'Username',
            field: 'username'
        },
        {
            name: 'Password',
            field: 'password'
        },
        {
            name: 'Confirmpassword',
            field: 'confirmpassword'
        }
    ])
    const loginModel  = reactive({
        username:'',
        password:''
    })
    const registerModel  = reactive({
        username:'',
        password:'',
        confirmpassword: ''
    })
    // loginValid
    watch(()=> [loginModel.username, loginModel.password], (newValue) => {
        isValidMessage.value.loginValid = []
        if (!newValue[0]) {
            isValidMessage.value.loginValid[0] = 'กรุณากรอก Username'
        }
        if (!newValue[1]) {
            isValidMessage.value.loginValid[1] = ('กรุณากรอก Password')
            
        }
    },{immediate:true})
    // registerVali
    watch(()=> [registerModel.username, registerModel.password, registerModel.confirmpassword], (newValue) => {
        isValidMessage.value.registerValid = []
        if (!newValue[0]) {
            isValidMessage.value.registerValid[0] = 'กรุณากรอก Username'
        }
        if (!newValue[1]) {
            isValidMessage.value.registerValid[1] = ('กรุณากรอก Password')
            isValidMessage.value.registerValid[2] = ('กรุณากรอก Password ให้ถูกต้อง')
            
        }
        if (newValue[1]){
            if(newValue[1] !== newValue[2]){
                isValidMessage.value.registerValid[2] = ('กรุณากรอก Password ให้ถูกต้อง')
            }
        }
    },{immediate:true})


    const loginHandle = () =>{
        console.log(loginModel)
    }
    const registerHandle = () =>{
        console.log(registerModel)
    }

</script>
<template>
    <Main class="container mx-auto">
        <div class="flex w-full h-screen justify-center items-center">
            <div class="flex flex-col w-full lg:w-6/12 h-6/12 bg-gray-400/30 p-4 items-center rounded-lg shadow-md">
                <p class="text-2xl  font-bold">{{mode}}</p>


                <!-- LoginForm -->
                <label v-if="mode === 'LOGIN'" v-for="form, index in loginform" class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">{{ form.name }}</span>
                    </div>
                    <div class="join">
                        <input :type="passwordShow === true || form.name === 'Username'? 'text': 'password'" 
                                placeholder="Type here" 
                                class="input input-bordered w-full max-w-xs"
                                v-model="loginModel[form.field]"
                                />
                        <button v-if="form.name === 'Password'" 
                                @click="passwordShow = !passwordShow"  
                                class="btn btn-outline"
                                >
                            View
                        </button>
                    </div>
                    <p class="text-red-500">{{ isValidMessage.loginValid[index] }}</p>
                </label>

                
                <!-- RegisterForm -->
                <label v-if="mode === 'REGISTER'" v-for="form, index in registerform" class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">{{ form.name }}</span>
                    </div>
                    <div class="join">
                        <input :type="passwordShow === true || form.name === 'Username'? 'text': 'password'" 
                                placeholder="Type here" 
                                class="input input-bordered w-full max-w-xs"
                                v-model="registerModel[form.field]"
                                />
                        <button v-if="form.name === 'Password'" 
                                @click="passwordShow = !passwordShow" 
                                class="btn btn-outline"
                                >
                            View
                        </button>
                    </div>
                    <p class="text-red-500">{{ isValidMessage.registerValid[index] }}</p>
                </label>
                <div class="flex flex-col items-center w-full my-4 gap-4">

                    <!-- login mode btn -->
                    <button @click="loginHandle()" 
                            v-if="mode === 'LOGIN'" 
                            class="btn btn-primary w-full max-w-xs" 
                            :disabled="isValidMessage.loginValid.length !== 0"
                            >
                        Login
                    </button>
                    <button @click="mode = 'REGISTER'" 
                            v-if="mode === 'LOGIN'" 
                            class="btn btn-outline w-full max-w-xs"
                            >
                        Register
                    </button>

                    
                    <!-- register mode btn -->
                    <button @click="registerHandle()" 
                            v-if="mode === 'REGISTER'" 
                            class="btn btn-primary w-full max-w-xs" 
                            :disabled="isValidMessage.registerValid.length !== 0"
                            >
                        Submit
                    </button>
                    <button @click="mode = 'LOGIN'" 
                            v-if="mode === 'REGISTER'" 
                            class="btn btn-outline w-full max-w-xs"
                            >
                        Back
                    </button>

                </div>
            </div>
        </div>

    </Main>
</template>