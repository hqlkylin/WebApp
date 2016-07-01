describe('loading', function () {
    it('should have $.weui.loading method', function () {
        expect($.weui.loading).to.be.a('function');
    });

    it('should have $.weui.hideLoading method', function () {
        expect($.weui.hideLoading).to.be.a('function');
    });

    it('should render loading when $.weui.loading is called', function () {
        $.weui.loading();
        var $loading = $('.weui_loading_toast');
        expect($loading.length).not.to.be(0);
        $loading.remove();
    });

    it('should render a transparent mask when $.weui.loading is called', function () {
        $.weui.loading();
        var $loading = $('.weui_loading_toast');
        var $mask = $loading.find('.weui_mask_transparent');
        expect($mask.length).not.to.be(0);
        $loading.remove();
    });

    it('should render with a icon when $.weui.loading is called', function () {
        $.weui.loading();
        var $loading = $('.weui_loading_toast');
        var $icon = $loading.find('.weui_loading');
        expect($icon.length).not.to.be(0);
        $loading.remove();
    });

    it('should render with content when $.weui.loading is called', function () {
        ['content', ''].map(function (content) {
            $.weui.loading(content);
            var $loading = $('.weui_loading_toast');
            var $content = $loading.find('.weui_toast_content');
            expect($content.text()).to.equal(content);
            $loading.remove();
        });
    });

    it('should close after when $.weui.hideLoading', function () {
        $.weui.loading();
        var $loading = $('.weui_loading_toast');
        expect($loading.length).not.to.be(0);
        $.weui.hideLoading();
        expect($('.weui_loading_toast').length).to.be(0);
    });

});