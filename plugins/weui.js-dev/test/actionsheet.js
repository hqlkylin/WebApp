describe('ActionSheet', function () {
    it('should have $.weui.actionSheet method', function () {
        expect($.weui.actionSheet).to.be.a('function');
    });

    it('should have $.weui.hideActionSheet method', function () {
        expect($.weui.hideActionSheet).to.be.a('function');
    });

    it('should render actionSheet when $.weui.actionSheet is called', function () {
        $.weui.actionSheet();
        var $actionSheet = $('.weui_actionsheet');
        var $actionSheetWrapper = $actionSheet.parent('div');
        expect($('.weui_actionsheet').length).not.to.be(0);
        expect($actionSheet.hasClass('weui_actionsheet_toggle')).to.be(true);
        expect($('.weui_actionsheet').parent('div').length).not.to.be(0);
        $actionSheetWrapper.remove();
    });

    it('should render alert with mask when $.weui.actionSheet is called', function () {
        $.weui.actionSheet();
        var $actionSheet = $('.weui_actionsheet');
        var $actionSheetWrapper = $actionSheet.parent('div');
        var $mask = $actionSheetWrapper.find('.weui_mask_transition');
        expect($mask.length).not.to.be(0);
        expect($mask.hasClass('weui_fade_toggle')).to.be(true);
        $actionSheetWrapper.remove();
    });

    it('should render with menu and action when $.weui.actionSheet is called with params', function () {
        var items = [{
            label: '示例菜单1',
            onClick: sinon.spy()
        }, {
            label: '示例菜单2',
            onClick: sinon.spy()
        }, {
            label: '示例菜单3',
            onClick: sinon.spy()
        }];
        $.weui.actionSheet(items);
        var $actionSheet = $('.weui_actionsheet');
        var $actionSheetWrapper = $actionSheet.parent('div');
        var $menus = $actionSheetWrapper.find('.weui_actionsheet_menu .weui_actionsheet_cell');
        $menus.each(function (index, item) {
            expect($(item).text()).to.equal(items[index].label);
        });
        $actionSheetWrapper.remove();
    });

    it('should close when mask is clicked when $.weui.actionSheet is called', function () {
        $.weui.actionSheet();
        var $actionSheet = $('.weui_actionsheet');
        var $actionSheetWrapper = $actionSheet.parent('div');
        var $mask = $actionSheetWrapper.find('.weui_mask_transition');
        expect($('.weui_actionsheet').length).not.to.be(0);
        $mask.trigger('click');
        expect($mask.hasClass('weui_fade_toggle')).to.be(false);
        expect($actionSheet.hasClass('weui_actionsheet_toggle')).to.be(false);
        $actionSheetWrapper.remove();
    });

    it('should execute callback and close actionsheet when menu item is clicked', function(){
        var items = [{
            label: '示例菜单1',
            onClick: sinon.spy()
        }];
        $.weui.actionSheet(items);
        var $actionSheet = $('.weui_actionsheet');
        var $actionSheetWrapper = $actionSheet.parent('div');
        var $menus = $actionSheetWrapper.find('.weui_actionsheet_menu .weui_actionsheet_cell');
        var $mask = $actionSheetWrapper.find('.weui_mask_transition');

        expect($('.weui_actionsheet').length).not.to.be(0);
        $menus.eq(0).trigger('click');
        expect(items[0].onClick.called).to.be(true);
        expect($mask.hasClass('weui_fade_toggle')).to.be(false);
        expect($actionSheet.hasClass('weui_actionsheet_toggle')).to.be(false);
        $actionSheetWrapper.remove();
    });

    it('should execute callback and close actionsheet when action item is clicked', function(){
        var actions = [{
            label: '取消',
            onClick: sinon.spy()
        }];
        $.weui.actionSheet([], actions);
        var $actionSheet = $('.weui_actionsheet');
        var $actionSheetWrapper = $actionSheet.parent('div');
        var $actions = $actionSheetWrapper.find('.weui_actionsheet_action .weui_actionsheet_cell');
        var $mask = $actionSheetWrapper.find('.weui_mask_transition');

        expect($('.weui_actionsheet').length).not.to.be(0);
        $actions.eq(0).trigger('click');
        expect(actions[0].onClick.called).to.be(true);
        expect($mask.hasClass('weui_fade_toggle')).to.be(false);
        expect($actionSheet.hasClass('weui_actionsheet_toggle')).to.be(false);
        $actionSheetWrapper.remove();
    });

    it('should close actionsheet when $.weui.hideActionSheet is called', function(){
        $.weui.actionSheet();
        var $actionSheet = $('.weui_actionsheet');
        var $actionSheetWrapper = $actionSheet.parent('div');
        var $mask = $actionSheetWrapper.find('.weui_mask_transition');

        expect($actionSheet.length).not.to.be(0);
        expect($actionSheetWrapper.length).not.to.be(0);

        $.weui.hideActionSheet();
        expect($mask.hasClass('weui_fade_toggle')).to.be(false);
        expect($actionSheet.hasClass('weui_actionsheet_toggle')).to.be(false);

        $actionSheetWrapper.remove();
    });
});