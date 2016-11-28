<template>
    <div>
        <!--<mt-cell title="标题文字"></mt-cell>-->
        <div>{{msg}}</div>
        <a v-link="'/'">返回</a>

    </div>
</template>

<style scoped>
    div{
        background-color:black;
    }
</style>

<script>

    var Cell =require('mint-ui/lib/cell')
//    import Cell from 'mint-ui/lib/cell';
    import 'mint-ui/lib/style.css';

//    import { Toast } from 'mint-ui';
//    Toast('提示信息');

    export default{
        data(){
            return{
                msg:'hello vueaaaaaaaaaaa'
            }
        },
        components:{
            'mtCell':Cell
        }
    }
</script>
