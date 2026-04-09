$(function () {
    const totalSteps = 6;
    let currentStep = 1;

    const optionSets = {
        Wedding: [
            "Full wedding day coverage",
            "Ceremony and portraits",
            "Engagement session",
            "Elopement coverage",
            "Not sure yet"
        ],
        Family: [
            "Full family session",
            "Mini family session",
            "Newborn or milestone session",
            "Extended family session",
            "Not sure yet"
        ],
        Nature: [
            "Guided outdoor portrait session",
            "Landscape artwork and prints",
            "Seasonal themed shoot",
            "Adventure or destination shoot",
            "Not sure yet"
        ]
    };

    function sanitizeText(text) {
        return $("<div>").text(text).html();
    }

    function renderStepTwoOptions(serviceType) {
        const fallback = [
            "Full session",
            "Mini session",
            "Event coverage",
            "Prints / artwork",
            "Not sure yet"
        ];
        const items = optionSets[serviceType] || fallback;
        const $container = $("#session-options");
        $container.empty();

        $.each(items, function (_, item) {
            const safeItem = sanitizeText(item);
            const buttonHtml =
                '<button type="button" class="option-card single-choice" data-field="sessionType" data-value="' +
                safeItem +
                '">' +
                safeItem +
                "</button>";
            $container.append(buttonHtml);
        });
    }

    function updateProgress() {
        const percent = Math.round((currentStep / totalSteps) * 100);
        $("#current-step").text(currentStep);
        $("#total-steps").text(totalSteps);
        $("#progress-percent").text(percent);
        $("#progress-bar-fill").css("width", percent + "%");
        $(".progress-bar").attr("aria-valuenow", currentStep);
    }

    function showStep(stepNumber) {
        $(".form-step").removeClass("active").hide();
        $('.form-step[data-step="' + stepNumber + '"]').addClass("active").fadeIn(180);
        $("#prev-btn").prop("disabled", stepNumber === 1);

        if (stepNumber === totalSteps) {
            $("#next-btn").addClass("hidden");
            $("#submit-btn").removeClass("hidden");
        } else {
            $("#next-btn").removeClass("hidden");
            $("#submit-btn").addClass("hidden");
        }

        updateProgress();
    }

    function showError(stepNumber, message) {
        $('.form-step[data-step="' + stepNumber + '"] .error-message').text(message);
    }

    function clearError(stepNumber) {
        $('.form-step[data-step="' + stepNumber + '"] .error-message').text("");
    }

    function validateCurrentStep() {
        clearError(currentStep);

        if (currentStep === 1 && !$("#serviceType").val()) {
            showError(1, "Please choose a photography service to continue.");
            return false;
        }

        if (currentStep === 2 && !$("#sessionType").val()) {
            showError(2, "Please choose what you are looking for.");
            return false;
        }

        if (currentStep === 3 && !$("#timeline").val()) {
            showError(3, "Please choose a timeline.");
            return false;
        }

        if (currentStep === 4 && !$("#style").val()) {
            showError(4, "Please choose a preferred style.");
            return false;
        }

        if (currentStep === 6) {
            const name = $.trim($("#fullName").val());
            const email = $.trim($("#emailAddress").val());
            const phone = $.trim($("#phoneNumber").val());

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phonePattern = /^[+()\-.\s\d]{7,}$/;

            if (!name) {
                showError(6, "Please enter your full name.");
                return false;
            }
            if (!email || !emailPattern.test(email)) {
                showError(6, "Please enter a valid email address.");
                return false;
            }
            if (!phone || !phonePattern.test(phone)) {
                showError(6, "Please enter a valid phone number.");
                return false;
            }
        }

        return true;
    }

    $(document).on("click", ".single-choice", function () {
        const fieldName = $(this).data("field");
        const value = $(this).data("value");
        const $group = $(this).closest(".option-grid");

        $group.find(".single-choice").removeClass("selected").attr("aria-pressed", "false");
        $(this).addClass("selected").attr("aria-pressed", "true");
        $("#" + fieldName).val(value);
        clearError(currentStep);

        if (fieldName === "serviceType") {
            $("#sessionType").val("");
            renderStepTwoOptions(value);
        }
    });

    $("#next-btn").on("click", function () {
        if (!validateCurrentStep()) {
            return;
        }

        if (currentStep < totalSteps) {
            currentStep += 1;
            showStep(currentStep);
        }
    });

    $("#prev-btn").on("click", function () {
        if (currentStep > 1) {
            clearError(currentStep);
            currentStep -= 1;
            showStep(currentStep);
        }
    });

    $("#multi-step-contact-form").on("submit", function (event) {
        event.preventDefault();

        if (!validateCurrentStep()) {
            return;
        }

        $("#multi-step-contact-form").addClass("hidden");
        $(".progress-wrapper").addClass("hidden");
        $("#success-panel").removeClass("hidden").hide().fadeIn(240);

        // Placeholder for backend integration.
        // Example: $.post("/contact", $(this).serialize());
    });

    $("#start-over-btn").on("click", function () {
        $("#multi-step-contact-form")[0].reset();
        $("#multi-step-contact-form").removeClass("hidden");
        $(".progress-wrapper").removeClass("hidden");
        $("#success-panel").addClass("hidden");

        $(".single-choice").removeClass("selected").attr("aria-pressed", "false");
        $(".error-message").text("");
        $("#serviceType, #sessionType, #timeline, #style").val("");
        currentStep = 1;
        renderStepTwoOptions("");
        showStep(currentStep);
    });

    renderStepTwoOptions("");
    showStep(currentStep);
});
