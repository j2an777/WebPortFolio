// 마우스 휠 1번 구동에 페이지 이동 처리
window.addEventListener("wheel", function(e) {
    e.preventDefault();
}, {passive : false});

var mHtml = $("html");
var page = 1;

mHtml.animate({scrollTop : 0}, 10);

$(window).on("wheel", function(e) {
    if(mHtml.is(":animated")) return;
    if(e.originalEvent.deltaY > 0) {
        if(page == 3) return;
        page++;
    } else if(e.originalEvent.deltaY < 0) {
        if(page == 1) return;
        page--;
    }
    var posTop = (page - 1) * $(window).height();
    mHtml.animate({scrollTop : posTop});
});