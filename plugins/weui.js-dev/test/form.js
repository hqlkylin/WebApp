describe('form', function () {
    var $form, $formSubmitBtn, $emptyTextArea, $notMatchInput,
        error;
    before(function () {
        $('body').append(`
                <form id="form">
                    <div class="weui_cells weui_cells_form">
                        <div id="emptyInputTest" class="weui_cell">
                            <div class="weui_cell_hd"><label class="weui_label">为空测试</label></div>
                            <div class="weui_cell_bd weui_cell_primary">
                                <textarea id="emptyTextArea" class="weui_input" type="tel" required pattern="[0-9]{11}" emptyTips="请输入手机号"></textarea>
                            </div>
                        </div>
                        <div id="notMatchInputTest" class="weui_cell">
                            <div class="weui_cell_hd"><label class="weui_label">不匹配测试</label></div>
                            <div class="weui_cell_bd weui_cell_primary">
                                <input id="notMatchInput" class="weui_input" type="tel" required pattern="[0-9]{11}" tips="请输入正确的手机号">
                            </div>
                        </div>
                    </div>
                    <div class="weui_btn_area">
                        <a id="formSubmitBtn" href="javascript:" class="weui_btn weui_btn_primary">提交</a>
                    </div>
                </form>
                `);

        $form = $("#form");
        $form.form();


        $formSubmitBtn = $("#formSubmitBtn");
        $formSubmitBtn.on("click", function(){
            $form.validate(function(err){
                error = err;
            });
        });

        $emptyTextArea = $("#emptyTextArea");
        $notMatchInput = $("#notMatchInput");
    });

    it('should have $.fn.form method', function () {
        expect($.fn.form).to.be.a('function');
    });

    it('should have $.fn.validate method', function () {
        expect($.fn.validate).to.be.a('function');
    });

    it('test when inputs are empty, show the first error input', function(){
        $formSubmitBtn.click();

        var $topTips = $('.weui_toptips');

        expect($topTips.length).not.to.be(0);
        expect($emptyTextArea[0]).to.equal(error.$dom[0]);
        expect($emptyTextArea.parents(".weui_cell").hasClass("weui_cell_warn")).to.be(true);
        expect($topTips.text()).to.equal("请输入手机号");

        //$topTips.remove();
    });

    it('test when input is empty, not to show error tips', function(){
        $notMatchInput.focus().blur();

        expect($notMatchInput.parents(".weui_cell").hasClass("weui_cell_warn")).to.be(false);
    });

    it('test when input value is not matched, show error tips', function(){
        $notMatchInput.focus().val("1234567890").blur();

        var $topTips = $('.weui_toptips');

        expect($notMatchInput.parents(".weui_cell").hasClass("weui_cell_warn")).to.be(true);
        expect($topTips.text()).to.equal("请输入正确的手机号");

        //$topTips.remove();
    });

    it('test when input value is matched, not to show error tips', function(){
        $notMatchInput.focus().val("12345678910").blur();

        expect($notMatchInput.parents(".weui_cell").hasClass("weui_cell_warn")).to.be(false);
    });

    it('test when inputs are correct, error is null', function(){
        $emptyTextArea.val("12345678910");
        $notMatchInput.val("12345678910");
        $formSubmitBtn.click();

        expect(error).to.equal(null);
    });


    after(function () {
        $form.remove();
    });
});