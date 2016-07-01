describe('toast', function () {
    it('should have $.weui.toast method', function () {
        expect($.weui.toast).to.be.a('function');
    });

    it('should render toast when $.weui.toast is called', function () {
        $.weui.toast();
        var $toast = $('.weui_toast');
        var $toastParent = $toast.parent('div');
        expect($toast.length).not.to.be(0);
        expect($toastParent.length).not.to.be(0);
        $toastParent.remove();
    });

    it('should render a transparent mask when $.weui.toast is called', function () {
        $.weui.toast();
        var $toast = $('.weui_toast');
        var $toastParent = $toast.parent('div');
        var $mask = $toastParent.find('.weui_mask_transparent');
        expect($mask.length).not.to.be(0);
        $toastParent.remove();
    });

    it('should render with a icon when $.weui.toast is called', function () {
        $.weui.toast();
        var $toast = $('.weui_toast');
        var $toastParent = $toast.parent('div');
        var $icon = $toastParent.find('.weui_icon_toast');
        expect($icon.length).not.to.be(0);
        $toastParent.remove();
    });

    it('should render with content when $.weui.toast is called', function () {
        ['content', ''].map(function (content) {
            $.weui.toast(content);
            var $toast = $('.weui_toast');
            var $toastParent = $toast.parent('div');
            var $content = $toastParent.find('.weui_toast_content');
            expect($content.text()).to.equal(content);
            $toastParent.remove();
        });
    });

    it('should close after 100ms  when $.weui.toast is called with duration param', function (done) {
        var duration = 100;
        $.weui.toast('', {duration: duration});
        var $toast = $('.weui_toast');
        expect($toast.length).not.to.be(0);
        setTimeout(function(){
            expect($('.weui_toast').length).to.be(0);
            done();
        }, duration);
    });

});