<script>
import NavBar from '@/components/NavBar.vue'
import { RouterLink } from 'vue-router'

export default{
    name:'Home',
    data(){
        return{

        }
    },
    components:{
        NavBar,
    },
    methods:{
        sendApply(){
            const webhookUrl = 'https://discord.com/api/webhooks/1261648235139694685/CfcBGfsb3GiBBDQ7KnV-yAuCJQBTFnqgtt_QX_rkk--ozIkgTAzpoOtVP3tYRcLpQH2M'
            const user = document.getElementById("userinput").value
            const country = document.getElementById("countryinput").value
            const birthday = document.getElementById("birthinput").value
            const work = document.getElementById("workinput").value
            const languages = document.getElementById("langinput").value
            const price = document.getElementById("priceinput").value
            
            const applyMessage = {
                content: '**طلب جديد:**',
                embeds: [{
                    title: 'تفاصيل الطلب',
                    color: 0x4E40CC,
                    fields: [
                        { name: 'الايدي', value: user },
                        { name: 'النوع', value: birthday },
                        { name: 'تفاصيل الطلب', value: country },
                        { name: 'رقم التواصل او اليوزر', value: work },
                        { name: 'مثال للطلب', value: languages },
                        { name: 'طريقة الدفع', value: price }
                    ]
                }]
            };


            if(user === '' || country === '' || birthday === '' || work === '' || languages === ''){
                alert("Please Complete The Apply Form")
            } else{


                fetch('https://discord.com/api/webhooks/1261648235139694685/CfcBGfsb3GiBBDQ7KnV-yAuCJQBTFnqgtt_QX_rkk--ozIkgTAzpoOtVP3tYRcLpQH2M', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(applyMessage)
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Error, Please Try Again');
                }
                alert('تم الارسال سيتم التواصل معك في الخاص');
                document.getElementById("userinput").value = '';
                document.getElementById("countryinput").value = '';
                document.getElementById("birthinput").value = '';
                document.getElementById("workinput").value = '';
                document.getElementById("langinput").value = '';
                document.getElementById("priceinput").value = '';
            }).catch(error => {
                console.error('حدث خطأ:', error);
                alert('Error, Please Try Again');
                document.getElementById("userinput").value = '';
                document.getElementById("countryinput").value = '';
                document.getElementById("birthinput").value = '';
                document.getElementById("workinput").value = '';
                document.getElementById("langinput").value = '';
                document.getElementById("priceinput").value = '';
            });
            }
        }
    }
}

</script>

<template>
    <div class="main">
        <div class="apply">
            <div class="cont">
                <RouterLink to="/">
                    <img src="https://i.ibb.co/5YZdWRq/C6-FFEB54-BC01-4292-956-F-65-A205-FF3316.png">
                </RouterLink>
                <div class="inp">
                    <label>ايدي الديسكورد حقك</label>
                    <input id="userinput" placeholder="Id" type="number">
                </div>
                <div class="inp">
                    <label>فئة الطلب</label>
                    <input id="countryinput" placeholder="Order Type" type="text">
                </div>
                <div class="inp">
                    <label>تفاصيل الطلب</label>
                    <input id="birthinput" placeholder="Order Info" type="text">
                </div>
                <div class="inp">
                    <label>رقم التواصل او اليوزر حقك</label>
                    <input id="workinput" placeholder="Username" type="text">
                </div>
                <div class="inp">
                    <label>مثال للطلب اذا لم يوجد اكتب نقطة</label>
                    <input id="langinput" placeholder="Example" type="text">
                </div>
                <div class="inp">
                    <label>طريقة الدفع</label>
                    <input id="priceinput" placeholder="Ex: Credit" type="text">
                </div>
                <div class="inp">
                    <label>انتهينا</label>
                    <a class="btn" @click="sendApply">Submit</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.main{
    min-height:100vh;
    background-color:#EA394B;
}

.cont img{
    width:200px;
}

.apply{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
}

.cont{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:80px;
    padding:60px 20px;
    border-radius:6px;
    border-left:4px solid rgb(228, 228, 228);
}

.inp{
    display:flex;
    flex-direction:column;
    gap:20px;
}

.inp label{
    text-transform:uppercase;
    text-align:center;
    width:60vw;
    padding:12px 0;
    color:gray;
    background-color:whitesmoke;
    border-radius:8px;
    border-bottom:4px solid rgb(155, 155, 155);
    cursor:fixed;
}

.inp input{
    border:none;
    text-transform:uppercase;
    padding:12px 22px;
    color:gray;
    background-color:#525359;
    border-radius:8px;
    border-bottom:4px solid black;
}

.btn{
    text-transform:uppercase;
    text-align:center;
    width:60vw;
    padding:12px 0;
    color:gray;
    background-color:whitesmoke;
    border-radius:8px;
    border-bottom:4px solid gray;
    cursor:pointer;
}

.btn:hover{
    border-bottom:2px solid black;
}

@media (max-width:700px) {
    .cont img{
        width:300px;
    }
  }

</style>
