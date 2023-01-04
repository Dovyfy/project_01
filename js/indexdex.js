$(function() {
  
    var flag = true;
    // 1.鏄剧ず闅愯棌鐢垫瀵艰埅
    var toolTop = $(".recom").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        };
    }

    $(window).scroll(function() {
        toggleTool();
        // 3. 椤甸潰婊氬姩鍒版煇涓唴瀹瑰尯鍩燂紝宸︿晶鐢垫瀵艰埅灏弆i鐩稿簲娣诲姞鍜屽垹闄urrent绫诲悕


        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    console.log(i);
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();

                }
            })
        }



    });
    // 2. 鐐瑰嚮鐢垫瀵艰埅椤甸潰鍙互婊氬姩鍒扮浉搴斿唴瀹瑰尯鍩?
    $(".fixedtool li").click(function() {
        flag = false;
        console.log($(this).index());
        // 褰撴垜浠瘡娆＄偣鍑诲皬li 灏遍渶瑕佽绠楀嚭椤甸潰瑕佸幓寰€鐨勪綅缃?
        // 閫夊嚭瀵瑰簲绱㈠紩鍙风殑鍐呭鍖虹殑鐩掑瓙 璁＄畻瀹冪殑.offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 椤甸潰鍔ㄧ敾婊氬姩鏁堟灉
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
        // 鐐瑰嚮涔嬪悗锛岃褰撳墠鐨勫皬li 娣诲姞current 绫诲悕 锛屽濡圭Щ闄urrent绫诲悕
        $(this).addClass("current").siblings().removeClass();
    });
})