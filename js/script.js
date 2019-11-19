$(document).ready(function () {
    let main = "html\\main.html";
    $("#content").load(main);

    $("a.menuButton").click(function (e) {
        e.preventDefault();

        let link = $(this).attr("href");
        $("#content").load(link);
        $(".active").removeClass("active");
        $(this).addClass("active");
    });

});

function submitManufacturer() {
    let form = $("#manufacturers");

    form.submit(function f(event) {
        event.preventDefault();
    });

    let post_url = form.attr("action");
    let form_data = form.serializeArray();
    let data = {};
    $.each(form_data, function (key, value) {
        data[value.name] = value.value;
        console.log(data);
    });

    data.founded = formatData(data.founded);

    $.post(post_url, data);

    $("#content")
        .load($(".active")
            .attr("href"));
}

function submitCar() {

    let form = $("#cars");

    form.submit(function f(event) {
        event.preventDefault();
    });

    let post_url = form.attr("action");
    let form_data = form.serializeArray();
    let data = {};
    $.each(form_data, function (key, value) {
        data[value.name] = value.value;
        console.log(data);
    });

    data.consumption += "l/100km";

    $.post(post_url, data);

    $("#content")
        .load($(".active")
            .attr("href"));
}

function loadManufacturers() {
    $.getJSON("manufacturers", function (data) {
        $.each(data, function (key, value) {
            $("#manufacturer")
                .append($('<option>')
                    .text(value.name)
                    .attr('value', value.name));
        });
    });
}

function formatData(value) {
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let retString = value.split("-");
    return months[parseInt(retString[1]) - 1] + " " + parseInt(retString[2]) + ", " + retString[0];
}

function openManufacturer(manufacturer) {
    document.cookie = "name=" + manufacturer;
    $.getJSON("manufacturer", function (data) {
        console.log(data.length);
        let manufacturers;

        if (data.length) {
            manufacturers = $('<table>');
            $(manufacturers)
                .attr('id', 'selected')
                .append(
                    $('<tr>').append(
                        $('<th>').text("Name"),
                        $('<th>').text("consumption"),
                        $('<th>').text("color"),
                        $('<th>').text("manufacturer"),
                        $('<th>').text("year"),
                        $('<th>').text("available"),
                        $('<th>').text("horsepower")
                    ));

            $.each(data, function (key, value) {
                let tr = $('<tr>').append(
                    $('<td>').text(value.name),
                    $('<td>').text(value.consumption),
                    $('<td>').text(value.color),
                    $('<td>').text(value.manufacturer),
                    $('<td>').text(value.year),
                    $('<td>').text(value.available),
                    $('<td>').text(value.horsepower)
                );
                $(manufacturers).append(tr);
            });
        } else {
            manufacturers = $('<p>')
                .attr('id', 'selected')
                .text("No data found for " + manufacturer + ".");
        }

        $('#selected').remove();
        $("#content").append(manufacturers);

    });
}