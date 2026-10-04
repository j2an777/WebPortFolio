// 메뉴 페이지 이동하기 위한 토글 버튼 구현 및 사이드바 구현
$(document).ready(function () {
    var count = 0;

    $('.toggle').click(function() {
        if (count == 0) {
            count = 1;
            $(".toggle").css({
                background: "#000 url('/img/close.png')",
                backgroundSize: "30px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            });

            $(".sidebar").css({
                right: "0"
            });


        }
        else {
            count = 0;
            $(".toggle").css({
                background: "#000 url('/img/hamburger.png')",
                backgroundSize: "30px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            });

            $(".sidebar").css({
                right: "-100%"
            });

        }
    });
});


