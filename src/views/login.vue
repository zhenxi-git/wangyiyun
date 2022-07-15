<template>
    <div class="login_box">
        <div class="login_top">
            <svg class="icon" aria-hidden="true" @click="goBack">
                <use xlink:href="#icon-fanhui"></use>
            </svg>
            <div class="title">
                登录♥
            </div>
        </div>
        <div class="input_box">
            <Form @submit="onSubmit">
                <CellGroup inset>
                    <Field v-model="username" name="用户名" label="用户名" placeholder="用户名" 
                        :rules="[{ required: true, message: '请填写用户名' }]" />
                    <Field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                </CellGroup>
                <div style="margin: 16px;">
                    <Button block type="primary" size="normal" native-type="submit">
                        提交
                    </Button>
                </div>
            </Form>

        </div>
        <div class="buttom" @click="openM">
            二维码登录
        </div>
        <Popup v-model:show="show" :style="{ height: '28%', width: '50%' }" @close="goClose">
            <img :src="erWeiMaUrl" alt="" style="{width:100%,height:100%}" />
        </Popup>
    </div>
</template>
<script setup>
import { Form, Field, CellGroup, Button, Toast, Popup } from 'vant';
import { ref } from "vue"
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { musicKey, musicCreateKey, musicCreateCheck,userDetail} from "../api/login"
const username = ref('');
const password = ref('');
const store = useStore()
const router = useRouter()
const show = ref(false)
const uniKey = ref('')
const erWeiMaUrl = ref('')
const timer = ref()
const onSubmit = async () => {
    let res = await store.dispatch("loginPhone", { password: password.value, phone: username.value })
    console.log('submit', res);
    if (res.data.code == 200) {
        store.commit("updateToken",res.data.token)
        store.commit("changeLogin", true) //先改变登录状态，在跳转
         const result=await userDetail({
             uid:res.data.account.id
         })
         store.commit("updateId",res.data.account.id)
         console.log("用户详情",result)
         let user=result.data.profile
         user.level=result.data.level
         store.commit("updateUser",user)
        router.push({
            path: '/infoUser'
        })

    } else {
        Toast('用户名或密码错误');
    }

};
const openM = async () => {
    show.value = true
    const res = await musicKey()
    console.log("key", res)
    uniKey.value = res.data.data.unikey
    //生成二维码
    if (uniKey.value) {
        const data = await musicCreateKey({
            key: uniKey.value,
            qrimg: true
        })
        console.log("二维码", data)
        erWeiMaUrl.value = data.data.data.qrimg

        if (show.value) {
            timer.value = setInterval(async () => {
                const res1 = await musicCreateCheck({
                    key: uniKey.value,
                })
                console.log(res1.data.code)
                if (res1.data.code == 803) { //授权成功
                    store.commit("changeLogin", true) //先改变登录状态，在跳转
                    goClose()
                    router.push({
                        path: '/infoUser'
                    })

                } else if (res1.data.code == 800) {
                    Toast("二维码已失效")
                }
            }, 1000)
        }
    }

}
const goBack = () => {
    router.go(-1)
}
const goClose = () => {
    show.value = false
    if (timer.value) {
        clearInterval(timer.value)
    }
}
</script>
<style lang="less" scoped>
.login_box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 100vh;

    .login_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 1rem;

        .icon {
            width: 0.4rem;
            height: 0.4rem;
            margin-left: .2rem;
            position: relative;
            z-index: 5;
        }

        .title {
            flex: 1;
            font-size: .4rem;
            font-weight: 600;
            margin-left: -0.5rem;
        }
    }

    .input_box {
        width: 100%;
        height: 8rem;
    }

    .buttom {}
}
</style>
