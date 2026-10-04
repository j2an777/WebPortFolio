// 원 포인트가 마우스커서 움직임에 따라 같이 따라다니게 하기 구현
$(document).ready(function () {
    const circle = document.querySelector(".circle");
    document.addEventListener("mousemove", (e) => { // mousemove이벤트를 이용해 움
        // 마우스의 좌표는 clientX와 clientY를 이용해 알수 있다. -> 브라우저 window의 좌표값 위치를 전달한다.
        // pageX, pageY와는 다름.
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        circle.style.left = mouseX + 'px';
        circle.style.top = mouseY + 'px';
    });
});


