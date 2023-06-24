$(document).ready(function () {
    // 지정된 영역으로 자동 스크롤
    $(".scroll_move").click(function(event){
        console.log(".scroll_move");         
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 100);
    });

    // section5 영역 send 버튼 클릭시 팝업창 구현
    $('.sdBtn').click(function(event) {
        event.preventDefault();

        $("#popup").css({
            top : '50%',
            visibility: 'visible',
            transform : 'translate(-50%, -50%) scale(1)'
        });
    });

    // 팝업창 확인 버튼 누를시 초기화 구현
    $('.chBtn').click(function() {
        $("#popup").css({
            top : '0',
            visibility: 'hidden',
            transform : 'translate(-50%, -50%) scale(0.1)'
        });

        $('#inn1').val('');
        $('#inn2').val('');
        $('#inn3').val('');
        $('#inn4').val('');
        $('#inn5').val('');
    });
});


