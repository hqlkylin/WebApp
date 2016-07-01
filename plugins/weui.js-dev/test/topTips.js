describe('topTips', function () {
    it('should have $.weui.topTips method', function () {
        expect($.weui.topTips).to.be.a('function');
    });

    it('should render topTips when $.weui.topTips is called', function () {
        $.weui.topTips();
        var $topTips = $('.weui_toptips');
        expect($topTips.length).not.to.be(0);
        expect($topTips.hasClass('weui_warn')).to.be(true);
        $topTips.remove();
    });

    it('should render topTips with `.weui_warn` class  when $.weui.topTips is called', function(){
        $.weui.topTips();
        var $topTips = $('.weui_toptips');
        expect($topTips.hasClass('weui_warn')).to.be(true);
        $topTips.remove();
    });

    it('should render topTips with text when $.weui.topTips is called with one param', function(){
        ['this is topTips', ''].map(function(text){
            $.weui.topTips(text);
            var $topTips = $('.weui_toptips');
            expect($topTips.text()).to.equal(text);
            $topTips.remove();
        });
    });

    it('should close after 100ms when $.weui.topTips is called with `duration` param', function(done){
        var duration = 100;
        $.weui.topTips('this is topTips', {duration: duration});
        var $topTips = $('.weui_toptips');
        expect($topTips.length).not.to.be(0);
        setTimeout(function(){
            expect($('.weui_toptips').length).to.be(0);
            done();
        }, duration + 1000); // waiting for slideUp
    });
});