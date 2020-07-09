var clicked = false;

$("input").change(function() {
    // console.log("input changed");
    hideAllAlerts();
});

function sendNewMessage() {
    if (clicked) return;
    clicked = true;

    console.log($('meta[name="csrf-token"]').attr("content"));

    hideAllAlerts();
    enableSendingMode();

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    jQuery.ajax({
        url: "/newMessage",
        method: "post",
        data: {
            sender: $("input[name='sender']").val(),
            contact: $("input[name='contact']").val(),
            message: $("textarea[name='message']").val()
        },
        success: function(response) {
            console.log("sucessResponse->", response);

            resetValidation();
            showSentAlert(response.sender, response.message);
            resetForm();
            disableSendingMode();
        },
        error: function(reject) {
            console.log("errorResponse->", reject);
            resetValidation();

            if (reject.status === 422) {
                $.each(reject.responseJSON.errors, function(error, message) {
                    $("#" + error + "-error").text(message);
                });
            } else {
                showFailureAlert(reject.responseJSON.message);
            }

            disableSendingMode();
        }
    });
}

function showSentAlert(title, message) {
    $("#messageSuccessSender").text(title + " محترم");
    splittedMessage = String(message).replace("\\n", "<br />");
    $("#messageSuccess").html(splittedMessage);

    $("#sent-alert").addClass("shown");
}

function showFailureAlert(message) {
    splittedMessage = String(message).replace("\\n", "<br />");
    $("#messageFailure").html(splittedMessage);
    $("#failure-alert").addClass("shown");
}

function enableSendingMode() {
    $("#sendBtnLoading").css("display", "block");
    $("#sendBtnIcon").css("display", "none");
}

function disableSendingMode() {
    clicked = false;
    $("#sendBtnLoading").css("display", "none");
    $("#sendBtnIcon").css("display", "block");
}

function resetForm() {
    $("#message-form")[0].reset();
    $("#name").focus();
}

function hideSentAlert() {
    $("#sent-alert").removeClass("shown");
    $("#failure-alert").removeClass("shown");
}

function hideAllAlerts() {
    hideSentAlert();
    // hideFailureAlert();
}

function resetValidation() {
    $("[id*='-error']").each(function() {
        $(this).text("");
    });
}
