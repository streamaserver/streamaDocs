//hello
$('#toc-vis').click(function () {
    console.log("click")
    if($('#toc').is(":visible")){
        $('#toc').hide();
        $('#toc-vis-hide').hide();
        $('#toc-vis-show').show();
    }else {
        $('#toc').show();
        $('#toc-vis-show').hide();
        $('#toc-vis-hide').show();
    }
})