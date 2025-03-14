$(document).ready(function () {
    $(".draggable").draggable({
        helper: "clone"
    });

    $(".playground").droppable({
        accept: ".draggable",
        drop: function (event, ui) {
            let type = ui.helper.data("type");
            let element;

            if (type === "text") {
                element = $('<div class="dropped-element text" contenteditable="true">Edit Me</div>');
            } else if (type === "image") {
                element = $(`
                    <div class="dropped-element resizable">
                        <img src="https://via.placeholder.com/100" width="100" height="100">
                    </div>
                `);
            } else if (type === "shape") {
                element = $(`
                    <div class="dropped-element resizable">
                        <svg width="100" height="100">
                            <rect width="100" height="100" style="fill:blue;"></rect>
                        </svg>
                    </div>
                `);
            }

            element.css({
                position: "absolute",
                top: event.clientY - $(this).offset().top,
                left: event.clientX - $(this).offset().left
            });

            $(this).append(element);
            makeDraggable(element);
            makeResizable(element);
            element.click(() => showProperties(element, type));
        }
    });

    function makeDraggable(element) {
        element.draggable({
            containment: ".playground"
        });
    }

    function makeResizable(element) {
        element.resizable();
    }

   
    function showProperties(element, type) {
        $(".dropped-element").removeClass("selected");
        element.addClass("selected");
    
        let propertiesHTML = `<p>Type: ${type}</p>`;
    
        if (type === "text") {
            propertiesHTML += `
                <label>Font Size:</label>
                <input type="number" id="fontSize" value="${parseInt(element.css("font-size"))}">
                <div style="display: flex; gap: 5px;">
                    <button id="boldBtn">Bold</button>
                    <button id="italicBtn">Italic</button>
                    <button id="underlineBtn">Underline</button>
                </div>
            `;
        } else if (type === "image") {
            propertiesHTML += `
                <label>Image URL:</label>
                <input type="text" id="imgSrc" value="${element.find('img').attr('src')}">
            `;
        } else if (type === "shape") {
            propertiesHTML += `
                <label>SVG Path:</label>
                <input type="text" id="svgPath" value="<rect width='100' height='100' style='fill:blue;'></rect>">
            `;
        }
    
        propertiesHTML += `
            <label>Width:</label>
            <input type="number" id="width" value="${element.width()}">
            <label>Height:</label>
            <input type="number" id="height" value="${element.height()}">
        `;
    
        $("#properties-content").html(propertiesHTML);
    
        $("#fontSize").on("input", function () {
            element.css("font-size", $(this).val() + "px");
        });
    
        $("#boldBtn").click(function () {
            element.css("font-weight", element.css("font-weight") === "bold" ? "normal" : "bold");
        });
    
        $("#italicBtn").click(function () {
            element.css("font-style", element.css("font-style") === "italic" ? "normal" : "italic");
        });
    
        $("#underlineBtn").click(function () {
            element.css("text-decoration", element.css("text-decoration") === "underline" ? "none" : "underline");
        });
    
        $("#imgSrc").on("input", function () {
            element.find('img').attr("src", $(this).val());
        });
    
        $("#width").on("input", function () {
            element.width($(this).val());
        });
    
        $("#height").on("input", function () {
            element.height($(this).val());
        });
    
        $("#svgPath").on("input", function () {
            element.find('svg').html($(this).val());
        });
    }
    
});
