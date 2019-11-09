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

function loadManufactuers() {
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

function openManufactuer(manufacturer) {
    document.cookie = "name=" + manufacturer;
    $.getJSON("manufacturer", function (data) {
        let table = $('<table>');


        $(table)
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
                )
            ;
            $(table).append(tr);
        });

        $('#selected').remove();
        $("#content").append(table);

    });
}