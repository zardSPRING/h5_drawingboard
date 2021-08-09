window.addEventListener("DOMContentLoaded", function() {

    var menu = document.querySelector(".menu");
    var aboutBoardBtn = document.querySelector(".about_board_btn");
    var aboutDrawingBoard = document.querySelector(".about_drawing_board");
    var closeInformationBtn = document.querySelector("#close_information_btn");
    var colorBoardBtn = document.querySelector(".color_board_btn");
    var statusBoardBtn = document.querySelector(".status_board_btn");
    var toolBarSection = document.querySelector(".tool_bar_section");
    var penWidthSection = document.querySelector(".pen_width_section");
    var colorBoardSection = document.querySelector(".color_board_section");
    var tools = document.getElementsByClassName("tools");
    var toolBarBtn = document.querySelector(".tool_bar_btn");
    var toolsEraser = document.getElementById("tools_eraser");

    var pen_width_lis = document.querySelector(".pen_width_section").children;
    var myCanvas = document.getElementById("mycanvas");
    var context = myCanvas.getContext("2d");
    context.font = "20px 宋体";
    context.textBaseline = "middle";

    var newFileBtn = document.querySelector(".new_file_btn");
    var openFileInput = document.querySelector("#open_file_input");
    var saveFileBtn = document.querySelector(".save_file_btn");
    var clearFileBtn = document.querySelector(".clear_file_btn");
    var toolsPencil = document.getElementById("tools_pencil");
    var toolsSolidRectange = document.getElementById("tools_solid_rectange");
    var toolsStraightLine = document.getElementById("tools_straight_line");
    var toolsCircle = document.getElementById("tools_circle");
    var canvasImgDataArr = [];
    var restoreFileBtn = document.querySelector(".restore_file_btn");
    var prevActionBtn = document.querySelector("#prev_action_btn");
    var nextActionBtn = document.querySelector("#next_action_btn");

    var colors = document.querySelector(".colors");
    var usingColorOne = document.querySelector(".using_color_one");
    var usingColorTwo = document.querySelector(".using_color_two");
    var start_x;
    var start_y;
    var end_x;
    var end_y;
    var toolBarBtnFlag = true;
    var colorBoardBtnFlag = true;
    var statusBoardBtnFlag = true;
    var canvasImgDataIndex = -1;
    var twoColorsFlag = true;

    var toolsText = document.getElementById("tools_text");
    var textarea = document.getElementById("textarea");
    var textTimer;
    var drawingImgDataArr = [];

    function drawingImgCopy() {
        drawingImgDataArr[drawingImgDataArr.length] = context.getImageData(0, 0, 760, 380);
    }

    function drawingImgPrime() {
        context.putImageData(drawingImgDataArr[drawingImgDataArr.length - 1], 0, 0);
    }

    function canvasCopy() {
        canvasImgDataIndex++;
        canvasImgDataArr[canvasImgDataIndex] = context.getImageData(0, 0, 760, 380);
    }

    function canvasPrevAction() {
        if (canvasImgDataIndex > 1) {
            canvasImgDataIndex--;
            context.putImageData(canvasImgDataArr[canvasImgDataIndex], 0, 0);
            console.log("撤销成功,还能撤销" + (canvasImgDataIndex - 1) + "次操作");
        }
    }

    function canvasNextAction() {
        if (canvasImgDataArr.length - canvasImgDataIndex > 1) {
            canvasImgDataIndex++;
            context.putImageData(canvasImgDataArr[canvasImgDataIndex], 0, 0);
            console.log("恢复成功，还能恢复" + (canvasImgDataArr.length - canvasImgDataIndex - 1) + "次操作");
        }
    }

    canvasCopy();

    for (var i = 0; i < 16; i++) {
        var x = Math.floor(i % 2);
        var y = Math.floor(i / 2);
        x = -x * 24;
        y = -y * 25;
        tools[i].style.backgroundPosition = x + "px " + y + "px";
        tools[i].onclick = function() {
            for (var j = 0; j < 16; j++) {
                tools[j].style.backgroundColor = "";
            }
            myCanvas.onmousedown = null;
            myCanvas.onmousemove = null;
            clearInterval(textTimer);
            textarea.style.display = "none";
            var thisBackgroundColor = document.defaultView.getComputedStyle(this, null).getPropertyValue("background-color");
            if (thisBackgroundColor != "rgb(255, 255, 255)") {
                canvasCopy();
            }

            this.style.backgroundColor = "white";
            myCanvas.style.cursor = "auto";

            var eraserBackgroundColor = document.defaultView.getComputedStyle(toolsEraser, null).getPropertyValue("background-color");
            if (eraserBackgroundColor === "rgb(255, 255, 255)") {
                myCanvas.style.cursor = "url(./images/cursor_eraser.png),auto";
            }

            var toolsPencilBackgroundColor = document.defaultView.getComputedStyle(toolsPencil, null).getPropertyValue("background-color");
            if (toolsPencilBackgroundColor === "rgb(255, 255, 255)") {
                myCanvas.style.cursor = "url(./images/cursor_pencil.png),auto";
            }

        }

    }

    for (var i = 0; i < 5; i++) {
        pen_width_lis[i].onclick = function() {
            for (var j = 0; j < 5; j++) {
                pen_width_lis[j].style.backgroundColor = "rgb(192, 192, 192)";
            }
            this.style.backgroundColor = "rgb(0, 1, 122)";

            var penWidthClassName = this.children[0].className;
            if (penWidthClassName === "pen_width_thinnest") {
                context.lineWidth = 1;
                context.font = "20px 宋体";
            } else if (penWidthClassName === "pen_width_thin") {
                context.lineWidth = 4;
                context.font = "24px 宋体";
            } else if (penWidthClassName === "pen_width_normal") {
                context.lineWidth = 7;
                context.font = "28px 宋体";
            } else if (penWidthClassName = "pen_width_thick") {
                context.lineWidth = 10;
                context.font = "32px 宋体";
            } else if (penWidthClassName = "pen_width_thickest") {
                context.lineWidth = 13;
                context.font = "36px 宋体";
            }
        }
    }

    for (var i = 0; i < 28; i++) {
        colors.children[i].addEventListener("click", function() {
            var backgroundColor = document.defaultView.getComputedStyle(this, null).getPropertyValue("background-color");
            if (twoColorsFlag) {
                context.strokeStyle = backgroundColor;
                usingColorOne.style.backgroundColor = backgroundColor;
            } else {
                usingColorTwo.style.backgroundColor = backgroundColor;
                context.fillStyle = backgroundColor;
            }
        })
    }

    aboutBoardBtn.addEventListener("click", function() {
        aboutDrawingBoard.style.display = "block";
    })

    closeInformationBtn.addEventListener("click", function() {
        aboutDrawingBoard.style.display = "none";
    })

    toolBarBtn.addEventListener("click", function() {
        toolBarBtnFlag = !toolBarBtnFlag;
        if (toolBarBtnFlag) {
            toolBarSection.style.display = "block";
        } else {
            toolBarSection.style.display = "none";
        }
    })

    colorBoardBtn.addEventListener("click", function() {
        colorBoardBtnFlag = !colorBoardBtnFlag;
        if (colorBoardBtnFlag) {
            colorBoardSection.style.display = "block";
        } else {
            colorBoardSection.style.display = "none";
        }
    })

    statusBoardBtn.addEventListener("click", function() {
        statusBoardBtnFlag = !statusBoardBtnFlag;
        if (statusBoardBtnFlag) {
            for (var i = 0; i < penWidthSection.children.length; i++) {
                penWidthSection.children[i].style.display = "block";
            }
        } else {
            for (var i = 0; i < penWidthSection.children.length; i++) {
                penWidthSection.children[i].style.display = "none";
            }
        }

    })

    usingColorOne.addEventListener("click", function() {
        twoColorsFlag = true;
    })

    usingColorTwo.addEventListener("click", function() {
        twoColorsFlag = false;
    })

    newFileBtn.addEventListener("click", function() {
        context.beginPath();
        context.fillStyle = "white";
        context.fillRect(0, 0, 760, 380);
        context.closePath();
        context.lineWidth = 1;
        context.strokeStyle = "black";
        usingColorOne.style.backgroundColor = "black";
        usingColorTwo.style.backgroundColor = "white";
        for (var i = 0; i < 16; i++) {
            tools[i].style.backgroundColor = "";
        }

        for (var i = 1; i < 5; i++) {
            pen_width_lis[i].style.backgroundColor = "rgb(192, 192, 192)";
        }
        pen_width_lis[0].style.backgroundColor = "rgb(0, 1, 122)";


    })

    menu.addEventListener("click", function() {
        textarea.style.display = "none";
    })

    openFileInput.addEventListener("change", function(e) {
        var fileObj = openFileInput.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(fileObj);
        reader.onload = function() {
            var img = new Image();
            img.src = reader.result;
            img.onload = function() {
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
                canvasCopy();
            };
        }
    })

    saveFileBtn.addEventListener("click", function() {
        var strDataURI = myCanvas.toDataURL("image/png");
        var date = new Date();
        var saveHref = document.getElementById("save_href");
        saveHref.download = "canvas_" + date.getFullYear() + "-" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getHours() + "h" + date.getMinutes() + "m" + date.getSeconds() + "s";
        saveHref.href = strDataURI;
    })

    restoreFileBtn.addEventListener("click", function() {
        canvasPrevAction();
    })

    prevActionBtn.addEventListener("click", function() {
        canvasPrevAction();
    })

    nextActionBtn.addEventListener("click", function() {
        canvasNextAction();
    })

    clearFileBtn.addEventListener("click", function() {
        context.beginPath();
        context.fillStyle = "white";
        context.fillRect(0, 0, 760, 380);
        context.closePath();
    })



    myCanvas.addEventListener("mousedown", function(e) {

        drawingImgCopy();
        start_x = e.offsetX;
        start_y = e.offsetY;

        var toolsTextBackgroundColor = document.defaultView.getComputedStyle(toolsText, null).getPropertyValue("background-color");
        if (toolsTextBackgroundColor === "rgb(255, 255, 255)") {
            canvasCopy();
            clearInterval(textTimer);
            textarea.style.left = start_x + "px";
            textarea.style.top = start_y + "px";
            textarea.style.display = "block";
            textarea.value = "";
            textarea.focus();
            var usingColorTwoBackgroundColor = document.defaultView.getComputedStyle(usingColorTwo, null).getPropertyValue("background-color");
            if (usingColorTwoBackgroundColor === "rgb(255, 255, 255)") {
                context.fillStyle = "black";
            }
            textTimer = setInterval(function() {
                context.putImageData(canvasImgDataArr[canvasImgDataIndex], 0, 0);
                context.fillText(textarea.value, start_x, start_y);
            }, 200)
        }

        myCanvas.onmousemove = function(e) {
            move_x = e.offsetX;
            move_y = e.offsetY;

            var toolsPencilBackgroundColor = document.defaultView.getComputedStyle(toolsPencil, null).getPropertyValue("background-color");
            if (toolsPencilBackgroundColor === "rgb(255, 255, 255)") {
                context.beginPath();
                context.moveTo(start_x, start_y);
                context.lineTo(move_x, move_y);
                context.stroke();
                context.closePath();
                start_x = move_x;
                start_y = move_y;
            }

            var toolsEraserBackgroundColor = document.defaultView.getComputedStyle(toolsEraser, null).getPropertyValue("background-color");
            if (toolsEraserBackgroundColor === "rgb(255, 255, 255)") {
                context.beginPath();
                clear_x = e.offsetX;
                clear_y = e.offsetY;
                context.arc(clear_x, clear_y, 4, 0, 2.0 * Math.PI);
                context.fillStyle = "white";
                context.fill();
                context.closePath();
            }

            var toolsSolidRectangeBackgroundColor = document.defaultView.getComputedStyle(toolsSolidRectange, null).getPropertyValue("background-color");
            if (toolsSolidRectangeBackgroundColor === "rgb(255, 255, 255)") {
                drawingImgPrime();
                context.beginPath();
                context.rect(start_x, start_y, move_x - start_x, move_y - start_y);
                var fillStyle = document.defaultView.getComputedStyle(usingColorTwo, null).getPropertyValue("background-color");
                if (fillStyle != "rgb(255, 255, 255)") {
                    context.fillStyle = fillStyle;
                    context.fill();
                }
                context.stroke();
                context.closePath();
            }

            var toolsCircleBackgroundColor = document.defaultView.getComputedStyle(toolsCircle, null).getPropertyValue("background-color");
            if (toolsCircleBackgroundColor === "rgb(255, 255, 255)") {
                drawingImgPrime();
                context.beginPath();
                var circle_x = (start_x + move_x) / 2;
                var circle_y = (start_y + move_y) / 2;
                var circle_r = Math.sqrt((start_x - move_x) * (start_x - move_x) + (start_y - move_y) * (start_y - move_y)) / 2;
                context.arc(circle_x, circle_y, circle_r, 0, 2.0 * Math.PI);
                var fillStyle = document.defaultView.getComputedStyle(usingColorTwo, null).getPropertyValue("background-color");
                if (fillStyle != "rgb(255, 255, 255)") {
                    context.fillStyle = fillStyle;
                    context.fill();
                }
                context.stroke();
                context.closePath();
            }

            var toolsStraightLineBackgroundColor = document.defaultView.getComputedStyle(toolsStraightLine, null).getPropertyValue("background-color");
            if (toolsStraightLineBackgroundColor === "rgb(255, 255, 255)") {
                drawingImgPrime();
                context.beginPath();
                context.moveTo(start_x, start_y);
                context.lineTo(move_x, move_y);
                context.stroke();
                context.closePath();
            }

        }

    })



    myCanvas.addEventListener("mouseup", function(e) {
        end_x = e.offsetX;
        end_y = e.offsetY;
        myCanvas.onmousedown = null;
        myCanvas.onmousemove = null;
        var toolsPencilBackgroundColor = document.defaultView.getComputedStyle(toolsPencil, null).getPropertyValue("background-color");
        if (toolsPencilBackgroundColor === "rgb(255, 255, 255)") {
            clearInterval(textTimer);
            canvasCopy();
        }

        var toolsSolidRectangeBackgroundColor = document.defaultView.getComputedStyle(toolsSolidRectange, null).getPropertyValue("background-color");
        if (toolsSolidRectangeBackgroundColor === "rgb(255, 255, 255)") {
            context.beginPath();
            context.rect(start_x, start_y, end_x - start_x, end_y - start_y);
            var fillStyle = document.defaultView.getComputedStyle(usingColorTwo, null).getPropertyValue("background-color");
            if (fillStyle != "rgb(255, 255, 255)") {
                context.fillStyle = fillStyle;
                context.fill();
            }
            context.stroke();
            context.closePath();
            canvasCopy();
        }


        var toolsStraightLineBackgroundColor = document.defaultView.getComputedStyle(toolsStraightLine, null).getPropertyValue("background-color");
        if (toolsStraightLineBackgroundColor === "rgb(255, 255, 255)") {
            context.beginPath();
            context.moveTo(start_x, start_y);
            context.lineTo(end_x, end_y);
            context.stroke();
            context.closePath();
            canvasCopy();

        }

        var toolsCircleBackgroundColor = document.defaultView.getComputedStyle(toolsCircle, null).getPropertyValue("background-color");
        if (toolsCircleBackgroundColor === "rgb(255, 255, 255)") {
            context.beginPath();
            var circle_x = (start_x + end_x) / 2;
            var circle_y = (start_y + end_y) / 2;
            var circle_r = Math.sqrt((start_x - end_x) * (start_x - end_x) + (start_y - end_y) * (start_y - end_y)) / 2;
            context.arc(circle_x, circle_y, circle_r, 0, 2.0 * Math.PI);
            var fillStyle = document.defaultView.getComputedStyle(usingColorTwo, null).getPropertyValue("background-color");
            if (fillStyle != "rgb(255, 255, 255)") {
                context.fillStyle = fillStyle;
                context.fill();
            }
            context.stroke();
            context.closePath();
            canvasCopy();
        }

        var toolsEraserBackgroundColor = document.defaultView.getComputedStyle(toolsEraser, null).getPropertyValue("background-color");
        if (toolsEraserBackgroundColor === "rgb(255, 255, 255)") {
            canvasCopy();
            var fillStyle = document.defaultView.getComputedStyle(usingColorTwo, null).getPropertyValue("background-color");
            context.fillStyle = fillStyle;
        }

    })

    window.onbeforeunload = function() {
        return "onbeforeunload is work";
    }


})