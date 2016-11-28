<template>
    <div>

        <div>this is template body</div>
        <h1>{{msg}}</h1>
    </div>
</template>


<style lang="sass" scoped>
    body {
        background-color: #ff0001;
        h1 {
            color: #00a0e9;
            background:url('../img/20150417091342994.jpg');
        }
    }
</style>

<script>
    require('../css/app.css')
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        created:function () {
            console.log(2);
            $('button').click(function () {
                require(['../js/ck'], function (obj) {
                    var obj = require('../js/ck');
                    const d = obj.ck()
                    console.log(d.a);
                    d.f();
                })
            })
        },
        route: {
            activate: function (transition) {
                transition.next()
            }
        },
        components: {}
    }
</script>
