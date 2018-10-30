var optionOpen = false
curFieldName = "";

function hint(text) {
    var $hint = $("<div class='hint'>" + text + "</div>");
    $("body").append($hint);
    $hint.addClass("shown");

    setTimeout(function(){
        $hint.addClass('fade');
        setTimeout(function(){
            $hint.remove();
        }, 2000)
    }, 2000)
}

function refreshFolders() {
    var curData = "action=get-folders";

    $.ajax({
        type: "POST",
        url: "ajax.php",
        data: curData,
        dataType: "json",
        success: function(data){
            $("[data-select-options-parent]").html("");
            data.forEach(function(item){
                $("[data-select-options-parent]").append("" +
                    "                        <div class=\"select-options__option\" data-select-value>\n" +
                    "                            <div class=\"select-options__option_text choosen\" data-select-value-text>" + item + "</div>\n" +
                    "                        </div>");
            })
        }
    });
}

function addField(form) {
    var curData = form.serialize() + "&action=add-field",
        fieldName = form.find('[name=field-name]').val(),
        folderName = form.find('[name=folder-name]').val() ? form.find('[name=folder-name]').val() : 'common';

    $.ajax({
        type: "POST",
        url: "ajax.php",
        data: curData,
        dataType: "json",
        success: function(data){
            if(data.status == "success") {
                form.find('[name=field-name]').val("");
                form.find('[name=field-text]').val("");
                log("Поле <span class='hover-trigger'>" + fieldName + "<span class='hover-trigger-target'><? __field('" + fieldName + "', '" + folderName + "'); ?></span></span> добавлено");
                highlight(form, 'success');
                curFieldName = fieldName;
            } else {
                highlight(form.find('[name=field-name]'), 'error');
                log('Поле с таким именем уже существует в данной группе');
            }
        }
    });
}

function addFolder(form) {
    var curData = form.serialize() + "&action=add-folder",
        folderName = form.find('[name=new-folder-name]').val();

    $.ajax({
        type: "POST",
        url: "ajax.php",
        data: curData,
        dataType: "json",
        success: function(data){
            if(data.status == "success") {
                form.find('[name=new-folder-name]').val("");
                highlight(form, 'success');
                log("Группа " + folderName + " создана");
                setTimeout(function(){
                    $(".add-folder").slideToggle();
                }, 1000)
            } else {
                highlight(form.find('[name=new-folder-name]'), 'error');
                log('Данная группа уже существует');
            }
        }
    });
}

function highlight(item, cssClass, timeOut = 1000) {
    item.addClass(cssClass);
    setTimeout(function(){
        item.removeClass(cssClass);
    }, timeOut);
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

function log(message) {
    $(".text-output").append("<div class='text-output-line'>" + message + "</div>");
}

function incrementField(fieldName) {
    var num = "",
        newFieldName = "";
    if(length = fieldName.length) {
        for(i = 0; i < length; i++) {
            if ("" + parseInt(fieldName[i]) != "NaN") {
                num += fieldName[i];
            } else {
                num = "";
            }
        }
    }

    if(num) {
        newFieldName = fieldName.slice(0, num.length * (-1)) + (parseInt(num) + 1);
    } else {
        newFieldName = fieldName + 1;
    }

    return newFieldName;
}

$(document).ready(function () {

    refreshFolders();

    setInterval(refreshFolders, 10000);

    $(".add-field").submit(function(e) {
        e.preventDefault();

        var form = $(this);

        addField(form);
    });

    $(".add-folder").submit(function(e) {
        e.preventDefault();

        addFolder($(this));
    });

    $("[data-add-folder-trigger]").click(function(){
        $(".add-folder").slideToggle();
    });

    $("body").on("click", ".hover-trigger-target", function(){
        copyToClipboard($(this));
        hint('Скопировано в буфер обмена');
    });

    $("[data-select-input]").click(function () {
        $(this).blur();
    });

    $("[data-select-container]").on("click", function (e) {
        if(!$(this).is(".triggered")) {
            if (!optionOpen) {
                $(this).find("[data-select-options-parent]").slideToggle("", function () {
                    optionOpen = !optionOpen;
                });
                $(this).toggleClass('triggered');
            }
        } else {
            if (!$(e.target).is(".disabled")) {
                $(this).find("[data-select-options-parent]").slideToggle("", function () {
                    optionOpen = !optionOpen;
                });
                $(this).toggleClass('triggered');
            }
        }
    });

    $("body").on("click", "[data-select-value-text]", function(e){
        if(!$(this).is(".disabled")) {
            $(this).closest("[data-select-container]").find("[data-select-input]").val($(this).text());
            $(this).closest("[data-select-container]").find("[data-select-value-text]").removeClass("choosen");
            $(this).addClass('choosen');
        }
    });

    $(document).click(function(e){
        if(optionOpen) {
            if (!$(e.target).is(".triggered") && !$(e.target).is(".disabled")) {
                $(".triggered").find("[data-select-options-parent]").slideToggle("", function () {
                    optionOpen = !optionOpen;
                });
                $(".triggered").toggleClass('triggered');
            }
        }
    });

    $("[data-incerement-field-trigger]").click(function(){
        curFieldName = incrementField(curFieldName);
        $('[name=field-name]').val(curFieldName);
    });
});