/**
 * Created by hanqilin on 16/10/22.
 */

var $=require('jquery');

export function ck() {

    return {
        f(){
            console.log('f meaaa');
            $('title').html('kylin');
        },
        a: 1
    }
}
