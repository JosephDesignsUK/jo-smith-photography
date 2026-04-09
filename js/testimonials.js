$(function () {
    let activeModalId = null;
    let previousFocus = null;

    function closeModal() {
        if (!activeModalId) {
            return;
        }

        $("#" + activeModalId).addClass("hidden");
        $("#testimonial-modal-overlay").addClass("hidden").attr("aria-hidden", "true");
        $("body").css("overflow", "");

        if (previousFocus) {
            previousFocus.focus();
        }

        activeModalId = null;
        previousFocus = null;
    }

    function openModal(modalId, triggerElement) {
        const $modal = $("#" + modalId);
        if (!$modal.length) {
            return;
        }

        previousFocus = triggerElement || null;
        activeModalId = modalId;

        $(".testimonial-modal").addClass("hidden");
        $modal.removeClass("hidden");
        $("#testimonial-modal-overlay").removeClass("hidden").attr("aria-hidden", "false");
        $("body").css("overflow", "hidden");

        $modal.find(".modal-close").trigger("focus");
    }

    $(".filter-btn").on("click", function () {
        const filter = $(this).data("filter");

        $(".filter-btn").removeClass("active").attr("aria-pressed", "false");
        $(this).addClass("active").attr("aria-pressed", "true");

        $(".testimonial-card").each(function () {
            const category = $(this).data("category");
            const showCard = filter === "all" || filter === category;
            $(this).toggleClass("hidden-card", !showCard);
        });
    });

    $(".testimonial-card").on("click", function () {
        const modalId = $(this).data("modal-target");
        openModal(modalId, this);
    });

    $(".read-story-btn").on("click", function (event) {
        event.stopPropagation();
        const modalId = $(this).closest(".testimonial-card").data("modal-target");
        openModal(modalId, this);
    });

    $(".modal-close").on("click", function () {
        closeModal();
    });

    $("#testimonial-modal-overlay").on("click", function (event) {
        if (event.target === this) {
            closeModal();
        }
    });

    $(document).on("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });
});
