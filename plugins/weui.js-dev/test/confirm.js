describe('confirm', function () {
    it('should have $.weui.confirm method', function () {
        expect($.weui.confirm).to.be.a('function');
    });

    it('should render confirm when $.weui.confirm is called', function () {
        $.weui.confirm();
        var $confirm = $('.weui_dialog_confirm');
        expect($confirm.length).not.to.be(0);
        $confirm.remove();
    });

    it('should render confirm with mask when $.weui.confirm is called', function () {
        $.weui.confirm();
        var $confirm = $('.weui_dialog_confirm');
        var $mask = $confirm.find('.weui_mask');
        expect($mask.length).not.to.be(0);
        $confirm.remove();
    });

    ['this is content'].map(function (content) {
        it('should render with content when $.weui.confirm is called with one param', function () {
            $.weui.confirm(content);
            var $confirm = $('.weui_dialog_confirm');
            var $content = $confirm.find('.weui_dialog_bd');
            expect($content.html().trim()).to.equal(content);
            $confirm.remove();
        });
    });

    ['this is title'].map(function (title) {
        it('should render with title when $.weui.confirm is called with two params', function () {
            $.weui.confirm('content', {title: title});
            var $confirm = $('.weui_dialog_confirm');
            var $title = $confirm.find('.weui_dialog_title');
            expect($title.text().trim()).to.equal(title);
            $confirm.remove();
        });
    });

    ['className'].map(function (className) {
        it('should render with className when $.weui.confirm is called with two params', function () {
            $.weui.confirm('content', {className: className});
            var $confirm = $('.weui_dialog_confirm');
            expect($confirm.hasClass(className)).to.be.ok();
            $confirm.remove();
        });
    });

    it('should have two button when $.weui.confirm is called', function(){
        $.weui.confirm('this is content');
        var $confirm = $('.weui_dialog_confirm');
        var $buttons = $confirm.find('.weui_dialog_ft .weui_btn_dialog');
        expect($buttons.length).to.be(2);
        $confirm.remove();
    });

    it('should close dialog and execute callback when click button', function(done){
        var yes = sinon.spy();
        var no = sinon.spy();
        $.weui.confirm('this is content', yes, no);
        var $confirm = $('.weui_dialog_confirm');
        expect($confirm.length).not.to.be(0);
        var $buttons = $confirm.find('.weui_dialog_ft .weui_btn_dialog');
        // waiting for dialog fading out
        $buttons.filter('.primary').trigger('click');
        setTimeout(() => {
            expect($('.weui_dialog_confirm').length).to.be(0);
            expect(yes.called).to.be(true);
            expect(no.called).not.to.be(true);
            done();
        }, 1000);
    });

    it('should close dialog and execute callback when click button', function(done){
        var yes = sinon.spy();
        var no = sinon.spy();
        $.weui.confirm('this is content', yes, no);
        var $confirm = $('.weui_dialog_confirm');
        expect($confirm.length).not.to.be(0);
        var $buttons = $confirm.find('.weui_dialog_ft .weui_btn_dialog');
        $buttons.filter('.default').trigger('click');
        // waiting for dialog fading out
        setTimeout(() => {
            expect($('.weui_dialog_confirm').length).to.be(0);
            expect(yes.called).not.to.be(true);
            expect(no.called).to.be(true);
            done();
        }, 1000);
    });
});