
$(document).ready(function () {

    $('input').on('keyup', function (e) {
        console.log("e", this.value, this.id);
        var str = this.value;
        var idd = this.id;
        console.log("str", str, "idd", idd);
        //$(this).css("outline", "1px solid yellow");
        $.post('/Home/Products?', { search: str, id: idd }, function (data) {
            //alert("hi");
            //console.log("data", data, "search", str);
            
            //  console.log("find", $(data).find('#ul_product').children());
            var ul = $(data).find('#ul_product');
            $("#ul_product").replaceWith(ul);
            //console.log("text", document.getElementById('ul_product').innerHTML.replace(/(str)/g,'<mark>$1</mark>')); 
            //document.getElementById('ul_product').innerHTML = document.getElementById('ul_product').innerHTML.replace(/(str)/g, '<mark>$1</mark>');
            //var position = document.documentElement.innerHTML.indexOf('text to search');

            //var key = str;
            ////var key = key.toLowerCase();
            //console.log("key",key);         
            //var regex = new RegExp(key, 'g');
            //console.log("regex",regex);
            //var text = document.getElementById('ul_product').innerHTML;
            //console.log(text);
            ////var text = text1.toLowerCase();
            //var newText = text.replace(regex, '<mark>' + key + '</mark>');
            //console.log(newText);
            //document.getElementById('ul_product').innerHTML = newText;

            //var searchedText = str;
            //var tex = $("#ul_product");
            //console.log("tex",tex);
            //$("tex:contains('" + searchedText + "')").each(function (i, element) {
            //    console.log("i",i,"element",element);
            //    var content = $(element).text();
            //    console.log("content", content);
            //    content = content.replace(searchedText, '<mark>' + searchedText + '</mark>');
            //    element.html(content);
            //});

            $(function () {
            var $context = $("#ul_product");
            var term = str;
            if (term) {
                $context.mark(term, {
                    done: function () {
                       // $context.not(":has(mark)").hide();
                    }
                });
            }
            });
        });
    });
    //alert("hi");
    /* Search the product*/
    //$(document).on("keyup", "#search", function (e) {  
    //    var str = $('#search').val().trim();
    //    //var tr= $(str).trim();
    //    var idd = $('#search').attr('id');
    //    console.log("idd",idd);
    //    console.log('str', $('#search').val());

    //    $.post('/Home/Products?', { search: str, id:idd }, function (data) {
    //        //alert("hi");
    //        //console.log("data", data);
    //        //  console.log("find", $(data).find('#ul_product').children());
    //        var ul = $(data).find('#ul_product');
    //        $("#ul_product").replaceWith(ul);
    //    });
    //});


    // Create the highchart

    //$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
    //    // Create the chart

    //    var dataObject = {
    //        rangeSelector: {
    //            selected: 1,
    //            inputEnabled: $('#analytics_chart').width() > 480
    //        },

    //        title: {
    //            text: 'Product Search'
    //        },

    //        series: [{
    //            name: 'Product',
    //            data: data,
    //            tooltip: {
    //                valueDecimals: 2
    //            }
    //        }]

    //        ,

    //        chart: {
    //            renderTo: 'analytics_chart'
    //        }

    //    };

    //    var chart = new Highcharts.StockChart(dataObject);
    //    //var chart = $('#container').highcharts('StockChart', dataObject);
    //});


    /*js for mobile view*/
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //alert('load');

        //hide div on click of other part of document 
        $(document).on('click', function (e) {
            //console.log('tar', e.target);
            if ($(e.target).hasClass('navbar-toggle')) {
                //alert('Div Clicked !!');
                // console.log('tar se', $('.navbar-collapse.collapse'));
                $('.navbar-collapse.collapse').addClass('in');
            }
            else {
                $('.navbar-collapse.collapse').removeClass('in');
            }
        });
    }
    /*js for mobile view*/

    //$(document).on("click", ".add_active ", function (e) {
    //    console.log('find', $(".main_container").children(".body-content").find('.right_section'));
    //    //$(".main_container").children(".body-content").find('nav-tabs').load('/Home/addProduct');
    //    $('#Section7').load('/Home/addProduct');
    //    console.log('find', $(".main_container").children(".body-content").find('nav-tabs').load('/Home/addProduct'));
    //    //window.location.href = '/Home/addProduct';
    //    //hideAllOtherSubContainer($(e.target).parents("div[id^='tab']"), "patient_search_container");
    //    //compileGrid($(e.target).parents("div[id^='tab']"), "patient_search_container");
    //});






    //for drop down menu
    //  $("#contact_relative").selectmenu();

    // onload checkbox will be hide
    $(".change_password").hide();

    // change password checkbox
    $('input[type="checkbox"]').click(function () {
        var inputValue = $(this).attr("value");
        $("." + inputValue).toggle();
    });

    // $(".slidingDiv").hide();

    //$('.import').click(function () {
    //    $(".slidingDiv").show();
    //});


    $('#menu_toggle').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    var formSearch = $('#search');
    formSearch.focus(function () {
        $(this).parent().children('p.formLabel').addClass('formSearchTop');
        $(this).parent().children('.form-style').addClass('form_input');
        $(this).siblings().children('.glyphicon-search').hide();
        console.log('gly', $(this).siblings().children('.glyphicon-search'));

        //$('div#formWrapper').addClass('darken-bg');
        // $('div.logo').addClass('logo-active');
    });
    formSearch.focusout(function () {
        if ($.trim($(this).val()).length == 0) {
            $(this).parent().children('p.formLabel').removeClass('formSearchTop');
            $(this).parent().children('.form-style').removeClass('form_input');
            $(this).siblings().children('.glyphicon-search').show();
        }
        //$('div#formWrapper').removeClass('darken-bg');
        // $('div.logo').removeClass('logo-active');
    });
    $('p.formLabel').click(function () {
        $(this).parent().children('.form-style').focus();

    });

    /* For all form feilds except search */
    var formInputs = $('.frm');
    formInputs.focus(function () {
        $(this).parent().children('p.formLabel').addClass('formTop');
        $(this).parent().children('.form-style').addClass('form_input');
        $(this).siblings().children('.glyphicon-search').show();
        console.log('gly', $(this).siblings().children('.glyphicon-search'));

        //$('div#formWrapper').addClass('darken-bg');
        // $('div.logo').addClass('logo-active');
    });
    formInputs.focusout(function () {
        if ($.trim($(this).val()).length == 0) {
            $(this).parent().children('p.formLabel').removeClass('formTop');
            $(this).parent().children('.form-style').removeClass('form_input');
            $(this).siblings().children('.glyphicon-search').show();
        }
        //$('div#formWrapper').removeClass('darken-bg');
        // $('div.logo').removeClass('logo-active');
    });
    $('p.formLabel').click(function () {
        $(this).parent().children('.form-style').focus();

    });
    $('p.formLabel').click(function () {
        $(this).parent().children('.form-style').focus();

    });


    //$('#product_tab').click(function () {
    //    console.log('click', this);
    //    $('.nav-tabs li').removeClass('active');
    //    $('.nav-tabs li').removeClass('in');
    //    $(this).addClass('active');
    //    $(this).addClass('in');
    //    //location.href = 'Url.Action("Products", "Home")';
    //    window.location.href = "/Home/Products";
    //});

    $('#product_tab').click(function (e) {
        e.preventDefault();
        //alert('1st click event');
        window.location.href = "/Home/Products";
    });

    //$('#product_tab').click(function (e) {
    //    e.preventDefault();
    //    alert('2nd click event');
    //    $('.nav-tabs li').removeClass('active');
    //    $('.nav-tabs li').removeClass('in');
    //    $(this).addClass('active');
    //    $(this).addClass('in');
    //});
    //$('#my_product').click(function (e) {
    //    e.preventDefault();
    //    //alert('1st click event');
    //    location.href = "/Home/MyProduct";
    //});
    $("#my_product").bind("click", function () {
        //$('#my_product').click(function (e) {
        //e.preventDefault();
        //alert('2nd click event');
        //$('.nav-tabs li').removeClass('active');

        $(this).addClass('active');

    });
    //add active for clicked tab
    //$('.nav-tabs li').click(function (e) {
    //    console.log('click', this);
    //    alert('1st click event');
    //    e.preventDefault();
    //    $('.nav-tabs li').removeClass('active');
    //    $('.nav-tabs li').removeClass('in');
    //    $(this).addClass('active');
    //    $(this).addClass('in');
    //});



    //open product tab description
    //$('#product1').click(function () {
    //    console.log('click', $('#product1'));
    //    $('#Section2').siblings('.addColumn').show();
    //    $('#product_details2').hide();
    //    $('#product_details1').show();

    //});
    //$('#product2').click(function () {
    //    console.log('click', $('#product2'));
    //    $('#Section2').siblings('.addColumn').show();
    //    $('#product_details1').hide();
    //    $('#product_details2').show();

    //});

    //close product tab description
    $('.close').click(function () {
        //left column
        $('.product_row').parents('.tab-pane').removeClass('col-md-6');
        $('#Section2').removeClass('new_left_col');

        $('.product_row').removeClass('active_product_row');
        $('.product_row').children('.product_img').children().children('img').removeClass('custom_design');
        $('.product_row').children('.product_img').children().removeClass('custom_design');


        //right column
        $('.product_row').parents('.tab-pane').siblings('.addColumn').removeClass('col-md-6');
        $('.product_row').parents('.tab-pane').siblings('.addColumn').removeClass('colDesign');
        $('#Section2').siblings('.addColumn').hide();

    });

    //$('.add_active ').on('click', function (event) {
    //    //alert('Hello!');
    //    console.log('click');
    //    first();
    //    second();
    //    //location.href = "/Home/AddProduct";
    //})

    //    .bind('click', function (event) {
    //        //alert('Hello again!');
    //        $('#sidebar').hide();
    //    })
    //    .bind('click', function (event) {
    //        //alert('Hello yet again!');
    //         //right column
    //    $('.tab-pane ').removeClass('active');
    //    $('.nav-tabs li').removeClass('active');

    //    //hide left sidebar and serch menu
    //    $('.nav-tabs li').css('display', 'none');
    //    $('#strip').addClass('col-md-1');
    //    $('#sidebar').removeClass('col-md-9');
    //    $('.body-content').removeClass('col-md-9');
    //    $('.body-content').addClass('col-md-11');
    //    //$('.body-content').css('margin-left', '32px');
    //    $('.body-content').addClass('setMargin');
    //    });




    //click on top blue bar
    //$('.has_detail').click(function () {
    //    //left sidebar
    //    alert("hasdetails");
    //    $('#sidebar').hide();
    //    $('.has_detail').addClass("lalit");
    //    //right column
    //    $('.tab-pane ').removeClass('active');
    //    $('.nav-tabs li').removeClass('active');

    //    //hide left sidebar and serch menu
    //    $('.nav-tabs li').css('display', 'none');
    //    $('#strip').addClass('col-md-1');
    //    $('#sidebar').removeClass('col-md-9');
    //    $('.body-content').removeClass('col-md-9');
    //    $('.body-content').addClass('col-md-11');
    //    //$('.body-content').css('margin-left', '32px');
    //    $('.body-content').addClass('setMargin');

    //    //show block on click of top bar menu option
    //    console.log('this', this);
    //    if ($(this).hasClass('search_active')) {

    //       //show left sidebar
    //        $('#sidebar').addClass('col-md-2');
    //        $('#sidebar').css('display', 'block');
    //       //show search tab
    //        $('.nav-tabs li').css('display', 'block');

    //       //show body container
    //        $('.body-content').removeClass('col-md-11');
    //        $('.body-content').addClass('col-md-9');
    //        $('.body-content').removeClass('setMargin');
    //        $('.category').addClass('active');
    //        $('#Section1').addClass('active');
    //        //hide active tab
    //        $('#dash_details').css('display', 'none');
    //        $('#dash_details').removeClass('active');
    //        $('#addyour_product').css('display', 'none');
    //        $('#addyour_product').removeClass('active');
    //        $('#analytics_detail').css('display', 'none');
    //        $('#analytics_detail').removeClass('active');

    //    }
    //    if ($(this).hasClass('add_active')) {
    //        alert("addactive");
    //        $('.has_detail').addClass("lalit1");
    //        $('.tab-pane').hide();
    //        $('.Edit_Product').hide();
    //        $('#addyour_product').css('display', 'block');

    //        //$('#Section6').css('display', 'none');
    //        $('#addyour_product').addClass('active');
    //        $('#Section7').addClass('active');
    //        alert("addactive2");
    //    }
    //    if ($(this).hasClass('import_active')) {
    //        $('.tab-pane').hide();
    //        $('#dash_details').css('display', 'block');
    //        $('#dash_details').addClass('active');
    //        $('#Section5').addClass('active');
    //    }
    //    if ($(this).hasClass('analytics_active')) {
    //        $('.tab-pane').hide();
    //        $('#analytics_detail').css('display', 'block');
    //        $('#analytics_detail').addClass('active');
    //        $('#Section6').css('display', 'none');
    //        //$('#analytics').addClass('active');
    //        $('#Section8').addClass('active');
    //    }
    //    if ($(this).hasClass('dash_active')) {
    //        $('.tab-pane').hide();
    //        $('#dash_details').css('display', 'block');
    //        $('#dash_details').addClass('active');
    //        $('#Section5').addClass('active');
    //    }
    //    if ($(this).hasClass('name_active')) {

    //    }



    //});

    //my Product
    $('#my_product').click(function () {
        //left sidebar
        //$('#sidebar').hide();

        ////right column
        //$('.tab-pane ').removeClass('active');
        //$('.nav-tabs li').removeClass('active');
        // $('#right_col').removeClass('col-md-9');
        // $('#right_col').addClass('col-md-11');
        //$('.nav-tabs li').css('display', 'none');
        $('#my_product').css('display', 'block');
        // $('#my_product').addClass('active');
        // $('#Section6').addClass('active');
        //$('#strip').addClass('col-md-1');
        //$('#sidebar').removeClass('col-md-9');
        //$('.body-content').removeClass('col-md-9');
        //$('.body-content').addClass('col-md-11');


    });



    //hide product tab on click of other tab
    $('.nav-tabs li').click(function () {
        //alert('li');
        console.log('this', $(this));
        if ($(this).hasClass('product')) {
            console.log('this1', $(this));
            $('.addColumn').show();
            $('#Section2').show();
        }
        else {
            $('.addColumn').hide();
            $('#Section2').hide();
        }

        if ($(this).hasClass('edit_myproduct')) {
            console.log('this1', $(this));
            $('.Edit_Product').show();
            $('#Section6').show();
        }
        else {
            $('.Edit_Product').hide();
            $('#Section6').hide();
        }


    });


    /*edit my product functionality*/


    ////open edit column 
    //$('#edit_pr1').click(function () {
    //    console.log('click', $('#product1'));
    //    $('#pr_details2').hide();
    //    $('#pr_details1').show();
    //});
    //$('#edit_pr2').click(function () {
    //    console.log('click', $('#product2'));
    //    $('#pr_details1').hide();
    //    $('#pr_details2').show();
    //});

    //close edit tab description
    $('.close_edit').click(function () {
        console.log('close', $('.close_edit'));
        //left column
        $('.edit_pr').show();
        $('.edit_row').removeClass('active_product_row');


        ////left column

        $('.edit_row').parents('.tab-pane').removeClass('col-md-6');
        $('#Section6').removeClass('new_left_col');

        $('.edit_row').children('.product_img').children().children('img').removeClass('custom_design');
        $('.edit_row').children('.product_img').children().removeClass('custom_design');

        //right column
        $(this).parents('.Edit_Product').removeClass('col-md-6');
        $(this).parents('.Edit_Product').removeClass('colDesign');
        $(this).parents('.Edit_Product').hide();

    });


    //select product for edit
    $('.edit_row').click(function () {

        $('.edit_row').removeClass('active_product_row');

        $(this).addClass('active_product_row');

    });

    $('#tar_header').keyup(function (e) {
        // console.log('e',e, e.key);
        //// $('#tar_edit').val('');
        // $('#tar_edit').html($(this).val(e.key));
        if (get_text == "") {
            $('#tar_header').select();
            // $("#tar_edit").text("Video title");
        }

        var get_text = $("#tar_header").text();
        console.log('e', get_text);
        //$("#tar_edit").text(get_text);
        $(this).parents('.Edit_Product').siblings('#Section6').find('#tar_edit').text(get_text);
    });

    $('.tar_by').keyup(function () {
        console.log('e', $(this).val());

        var get_text = $(".tar_by").text();
        console.log('e', get_text);
        $(this).parents('.Edit_Product').siblings('#Section6').find('.by_edit').text(get_text);

        //$(".by_edit").text(get_text);
    });



    $('.tar_about').keyup(function () {
        console.log('e', $(this).val());

        var get_text = $(".tar_about").text();
        console.log('e', get_text);
        //$("#tar_info").text(get_text);
        $(this).parents('.Edit_Product').siblings('#Section6').find('#tar_info').text(get_text);
    });


    /*code for add your product */
    /*old code for dropdown*/
    $(".drp").selectmenu({

    });

    //customized Dropdown design
    customizedSelectBoxDropdownDesign();

    // click event of selectmenu
    $(document).on('click', '.ui-selectmenu-button', function (t) {
        console.log("t target", t, t.target);
        if ($(t.target).is("span")) {
            $(t.target).parent(".ui-selectmenu-button").children(".ui-selectmenu-icon").addClass("focused_icon");
        }
        $(t.target).parents(".c_dropdown").siblings(".input_field_product").children("input").addClass("focused_input");
        $(t.target).parent(".ui-selectmenu-icon").addClass("focused_icon");
    });

    // focusout event of selectmenu
    $(document).on('focusout', '.ui-selectmenu-button', function (t) {
        $('.ui-selectmenu-icon').removeClass("focused_icon");
        $('.ui-selectmenu-button').removeClass("focused_dropdown");
        $(t.target).parents(".c_dropdown").siblings(".input_field_product").children("input").removeClass("focused_input");
    });
    /*old code for dropdown*/

    /*new code for dropdown*/
    $('.editable_drop').editableSelect({
        effects: 'slide',
        duration: 200,
        //appendTo: 'body'
    });

    //numeric field
    $(".number_field").inputmask({
        mask: "9{1,50}",
        placeholder: "",
        selectOnFocus: true,
        rightAlign: false,
        showMaskOnHover: false,
    });


    //Currency field
    $(".currency").inputmask('numeric', {
        radixPoint: ".",
        groupSeparator: ",",
        digits: 2,
        autoGroup: true,
        prefix: '$',
        rightAlign: false,
        showMaskOnHover: false,
        oncleared: function () {
            self.Value('');
        }
    });

    //code for preview
    $('.company').keyup(function () {
        console.log('e', $(this).val());

        console.log('e', $(this).parents('.sec1').siblings('.sec2').find('.by_preview'));
        $(this).parents('.sec1').siblings('.sec2').find('.by_preview').val('by ' + $(this).val());
    });
    $('.productName').keyup(function () {
        console.log('e', $(this).val());

        console.log('e', $(this).parents('.sec1').siblings('.sec2').find('.header_preview').val($(this).val()));
        $(this).parents('.sec1').siblings('.sec2').find('.header_preview').val($(this).val());
    });
    $('.keywords').keyup(function () {
        console.log('e', $(this).val());

        $('.key_preview').val($(this).val());
    });
    $('.pr_descr').keyup(function () {
        console.log('e', $(this).val());
        $(this).parents('.sec1').siblings('.sec2').find('#about_preview').text($(this).val());
    });
    $('.modules').keyup(function () {
        console.log('e', $(this).val());

        $('.mod_preview').val($(this).val());
    });
    $('.meta_tags').keyup(function () {
        console.log('e', $(this).val());

        $('.meta_preview').val($(this).val());
    });
    $('.geo_focus').keyup(function () {
        console.log('e', $(this).val());

        $('.geo_preview').val($(this).val());
    });
    $('.target_job').keyup(function () {
        console.log('e', $(this).val());

        $('.job_preview').val($(this).val());
    });
    $('.revenue').keyup(function () {
        console.log('e', $(this).val());

        $('.rev_preview').val($(this).val());
    });
    $('.emp').keyup(function () {
        console.log('e', $(this).val());

        $('.emp_preview').val($(this).val());
    });
    $('.semantic').keyup(function () {
        console.log('e', $(this).val());

        $('.sem_preview').val($(this).val());
    });
    $('.semantic').keyup(function () {
        console.log('e', $(this).val());

        $('.sem_preview').val($(this).val());
    });
    $('.cognitive').keyup(function () {
        console.log('e', $(this).val());

        $('.cogn_preview').val($(this).val());
    });

    $('.cr_value').keyup(function () {
        console.log('e', $(this).val());

        console.log('e', $(this).parents('.sec1').siblings('.sec2').find('.value_preview').text($(this).val()));
        $(this).parents('.sec1').siblings('.sec2').find('.value_preview').val($(this).val());
    });

    //$(".status").change(function (event) {
    //    //alert("You have Selected  :: " + $(this).val());
    //    //alert($(".status option:selected").text());
    //    console.log('get val', $(this).siblings('.es-list').children('li.selected').val());
    //});
    $('.status').editableSelect().on('select.editable-select', function (e, li) {
        $('.st_preview').html(
            $(li).text()
        );
        console.log('get val', li, $(li).text());
    });


    //cancel for add product
    $('.cancel_submit').click(function () {
        $('.preview ').val('');
        $('.header_preview').val('');
        $('.by_preview').val('');
        $('.upload_preview').attr('src', '');

    });
    /*code for add your product*/

    //code for admin & super admin option visibility

    $('.out_active').click(function () {

        $('#my_product').show();
    });




});

//customized Dropdown design
function customizedSelectBoxDropdownDesign() {
    if ($(".ui-selectmenu-icon").hasClass('ui-icon')) {
        $(".ui-selectmenu-icon").removeClass('ui-icon');
    }
    if ($(".ui-selectmenu-icon").hasClass('ui-icon-triangle-1-s')) {
        $(".ui-selectmenu-icon").removeClass('ui-icon-triangle-1-s');
        $(".ui-selectmenu-icon").html("<i class='fa fa-angle-down dropdown-icon' aria-hidden='true'></i>");
    }

}


function newColumn(target) {
    console.log("target",target);
    //alert('add column');
    $('#Section2').siblings('.addColumn').show();
    var i = $(target).attr("id").split("t")[1];
    console.log("i", i);
    $("div[id^='product_details']").hide();
    $("#product_details" + i).show();
    console.log('active', $('#Section2').hasClass('active'));
    if ($('#Section2').hasClass('active')) {

        $('.product_row').removeClass('active_product_row');
        //left column
        // $('#Section2').toggleClass('col-md-6');
        $(target).parents('.tab-pane').addClass('col-md-6');
        $('#Section2').addClass('new_left_col');

        $(target).addClass('active_product_row');
        $('.product_row').children('.product_img').children().children('img').addClass('custom_design');
        $('.product_row').children('.product_img').children().addClass('custom_design');
        console.log('img', $(target).children('.product_img').children().children('img'));

        //right column

        $(target).parents('.tab-pane').siblings('.addColumn').addClass('col-md-6');
        $(target).parents('.tab-pane').siblings('.addColumn').addClass('colDesign');
        $('.addColumn').css('display', 'block');
    }
    else {
        //alert('else');
        $('.addColumn').css('display', 'none');
    }
}



function EditWindow(target) {

    $('.edit_pr').hide();
    $(target).parents('.tab-pane').addClass("active");
    var i = $(target).parents('.edit_row').attr("id").split("r")[1];
    console.log("find all id",$("div[id^='pr_details']"));
    console.log("target", $(target).parents('.edit_row').attr("id").split("r")[1], $("#pr_details" + i));
    $("div[id^='pr_details']").hide();
    $("#pr_details" + i).show();
    //alert('add column');
    console.log('active', $('#Section6').hasClass('active'));
    if ($('#Section6').hasClass('active')) {
        $('.Edit_Product').show();
        $('.edit_row').removeClass('active_product_row');
        //left column
        // $('#Section2').toggleClass('col-md-6');
        $(target).parents('.tab-pane').addClass('col-md-6');
        $('#Section6').addClass('new_left_col');

        $(target).parents('.edit_row').addClass('active_product_row');
        $('.edit_row').children('.product_img').children().children('img').addClass('custom_design');
        $('.edit_row').children('.product_img').children().addClass('custom_design');
        console.log('img', $(target).children('.product_img').children().children('img'));

        //right column

        $(target).parents('.tab-pane').siblings('.Edit_Product').addClass('col-md-6');
        $(target).parents('.tab-pane').siblings('.Edit_Product').addClass('colDesign');
    }
    else {
        //alert('else');
        $('.Edit_Product').hide();
    }
}


function EditSelect(target) {

    $('.edit_pr').hide();
    //alert('add column');
    console.log('active', $('#Section6').hasClass('active'));
    if ($('#Section6').hasClass('active')) {

        $('.edit_row').removeClass('active_product_row');
        //left column
        // $('#Section2').toggleClass('col-md-6');
        $(target).parents('.tab-pane').addClass('col-md-6');
        $('#Section6').addClass('new_left_col');

        $(target).parents('.edit_row').addClass('active_product_row');
        $('.edit_row').children('.product_img').children().children('img').addClass('custom_design');
        $('.edit_row').children('.product_img').children().addClass('custom_design');
        console.log('img', $(target).children('.product_img').children().children('img'));

        //right column
        // $('#Section2').siblings('.addColumn').toggleClass('col-md-6');
        //$('#Section2').siblings('.addColumn').toggleClass('colDesign');
        $(target).parents('.tab-pane').siblings('.Edit_Product').addClass('col-md-6');
        $(target).parents('.tab-pane').siblings('.Edit_Product').addClass('colDesign');
    }
    else {
        //alert('else');
        $('.Edit_Product').css('display', 'none');
    }
}




//edit functionality

function editable_header(get_btn) {

    var header = $(get_btn).parent().parent().find('#tar_header');
    console.log("header", header);
    $(header).attr("contenteditable", "true");
    $(header).focus();

    var by = $(get_btn).siblings('.tar_by');
    $(by).attr("contenteditable", "true");
    //$(by).focus();
    //show browse file button
    var browse_tar = $(get_btn).parents('.left_cell').siblings('.product_img').children('.uploadImg');
    // console.log('browse_tar', browse_tar);
    //$(browse_tar).append("<input type='file' id='uploadImg'>");
    $(browse_tar).addClass('showBtn');
}
function editableAbout(get_btn) {

    //var tar = $(get_btn).parent().parent().siblings('.tar_about');
    var tar = $(get_btn).parent().parent().parent().children().find('.tar_about');
    console.log("tar", tar);
    console.log('tar', $(get_btn).parent().parent().parent().children().find('.tar_about'));

    $(tar).attr("contenteditable", "true");
    $(tar).focus();
}
function editable_details(get_btn) {

    var tar = $(get_btn).parents('.pr_title').siblings('.pr_info');
    console.log('tar', $(get_btn).parents('.pr_title').siblings('.pr_info'));

    $(tar).attr("contenteditable", "true");
    $(tar).focus();
}
function editable_vendor(get_btn) {

    var tar = $(get_btn).parent().siblings('.edit_ul').children('li');
    console.log('tar', $(get_btn).parent().siblings('.edit_ul').children('li'));
    $(tar).attr("contenteditable", "true");
    $(tar).first().focus();

    //$(tar).each(function () {
    //    console.log('tar this', $(this));
    //    $(this).attr("contenteditable", "true");
    //    $(this).focus();
    //})
}


//upload picture
function readURL(input) {
    console.log('input', input);
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log('reader', reader);
        reader.onload = function (e) {
            $(input).siblings().children('.tar_upload').attr('src', e.target.result);
            console.log('input', $(input).siblings().children('.tar_upload').attr('src', e.target.result));
            $(input).parents('.Edit_Product').siblings('#Section6').find('.tarEdit').attr('src', e.target.result);
            console.log('editimg', $(input).parents('.Edit_Product').siblings('#Section6').find('.tarEdit'));
        }

        reader.readAsDataURL(input.files[0]);
    }
}


//upload picture
function ImgPreview(input) {
    console.log('input', input);
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log('reader', reader);
        reader.onload = function (e) {
            $(input).parents('.sec1').siblings('.sec2').find('.upload_preview').attr('src', e.target.result);
            console.log('input', $(input).parents('.sec1').siblings('.sec2').find('.upload_preview'));
            //$(input).parents('.Edit_Product').siblings('#Section6').find('.tarEdit').attr('src', e.target.result);
            //console.log('editimg', $(input).parents('.Edit_Product').siblings('#Section6').find('.tarEdit'));
        }

        reader.readAsDataURL(input.files[0]);
    }
}
function profPreview(profTar) {
    console.log('profTar', profTar, profTar.files[0]);
    if (profTar.files && profTar.files[0]) {
        var reader = new FileReader();
        console.log('reader', reader);
        reader.onload = function (e) {
            $(profTar).siblings('.profile_img').attr('src', e.target.result);
            console.log('input', $(profTar).siblings('.profile_img'));
            //$(input).parents('.Edit_Product').siblings('#Section6').find('.tarEdit').attr('src', e.target.result);
            //console.log('editimg', $(input).parents('.Edit_Product').siblings('#Section6').find('.tarEdit'));
        }

        reader.readAsDataURL(profTar.files[0]);
    }
}


function activeMyProduct() {
    //trigger click on my product tab
    //$("#my_product").trigger("click");
    //left sidebar
    $('#sidebar').hide();

    //right column
    $('.tab-pane ').removeClass('active');
    $('.nav-tabs li').removeClass('active');
    $('.nav-tabs li').css('display', 'none');
    $('#my_product').css('display', 'block');
    $('#strip').addClass('col-md-1');
    $('#sidebar').removeClass('col-md-9');
    $('.body-content').removeClass('col-md-9');
    $('.body-content').addClass('col-md-11');
}

function first() {
    console.log('first');
    location.href = "/Home/AddProduct";
    return true;
}

function second() {
    console.log('second');
    $('#sidebar').hide();
    return true;
}

//window.onload = toBottom;

//function toBottom() {
//    alert("Scrolling to bottom ...");
//    window.scrollTo(0, document.body.scrollHeight);
//}