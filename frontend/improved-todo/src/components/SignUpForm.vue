<script>
import { axios_utils } from '../axios_utils'

export default {
    data() {
        return {
            username: null,
            password: null,
            passwordAgain: null,
            error: null
        }
    },
    
    methods: {
        returnToApp(sessionID) {
            this.$emit('submit', {
                sessionID: sessionID
            })
        },

        tryToSignUp() {
            this.error = null
            if (this.password !== this.passwordAgain) {
                this.error = "passwords not equals"
                return
            }
            axios_utils.signUp(this.username, this.password).then(
                result => {
                    let sessionID = result.data.sessionID
                    this.returnToApp(sessionID)
                },
                error => {
                    this.error = "such user already registered"
                    console.log(error)
                }
            )
        }
    }
}

</script>

<template>
<div class="log-in-form-back">
    <div>
        <div class="log-in-form">
            <label class="form-label">Sign up to planerus</label>
            <div class="form-div">
                <label class="form-username form-item">Username</label>
                <input class="form-item form-input" type="text" v-model="username">

                <label class="form-password form-item">Password</label>
                <input class="form-item form-input" type="password" v-model="password">

                <label class="form-password form-item">Password (again)</label>
                <input class="form-item form-input" type="password" v-model="passwordAgain">

                <div class="buttons-container">
                <button class="sub-btn form-item" @click="tryToSignUp()">Sign up</button>
                <button class="cancel-btn form-item" @click="returnToApp(null)">Cancel</button>
                </div>
                <label v-if="this.error" class="form-error">{{error}}</label>
            </div>
            
        </div>
    </div>
    
</div>

</template>

<style>

.form-div {
    background: var(--black_color);
    border: none;
    border-radius: 20px;
    margin-top: 10px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 20px;
    padding-right: 20px;


    text-align:left;
}

.log-in-form-back {
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
}

.log-in-form {
    background: white;
    border-radius: 20px;
    margin-top: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;

    text-align: center;
}

.form-item {
    margin-bottom: 10px;
    display: block;
    border-radius: 5px;
    color: var(--gray_color);
}

.sub-btn {
    color: white;
    background: var(--blue_color);
    border-style: solid;
    border-width: 3px;
    border-color: var(--blue_color);
}

.sub-btn:hover {
    color: var(--blue_color);
    background: white;
    border-style: solid;
    border-color: var(--blue_color);
}

.form-input {
    color: var(--gray_color);
    background-color: black;
    border-width: 1px;
    border-style: solid;
}

.form-error {
    font-size: 13px;
    color: var(--red_color);
    margin-bottom: 10px;
    display: block;
}

.buttons-container {
    display: flex;
}

.cancel-btn {
    color: white;
    background: var(--black_color);
    border-style: solid;
    border-width: 3px;
    border-color: white;
    margin-left: 10px;
}

.cancel-btn:hover {
    color: var(--black_color);
    background: white;
}

</style>