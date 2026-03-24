"use strict";

(function () {

    window.addEventListener("load", init);
    function init() {

        let newButton = id("new-prod-btn");
        newButton.addEventListener("click", function () {
            id("form-popup").style.display = "block";
        });

        let saveButton = id("save-prod");
        saveButton.addEventListener("click", function (e) {
            e.preventDefault();
            submitForm();
        });

        let closeButton = id("cancel-btn");
        closeButton.addEventListener("click", function (e) {
            id("form-container").reset();
            id("form-popup").style.display = "none";
        });

    }

    function submitForm() {
        let params = new FormData(id("form-container")); // pass in entire form tag
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
        fetch("/products/", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .then(() => {
                window.location.href = '/products';  // Redirect to products list after creation
            })

            .catch(alert);
    }

    let deleteButtons = qsa(".delete-prod");
    for (let index = 0; index < deleteButtons.length; index++) {
        const element = deleteButtons[index];
        element.addEventListener("click", function (e) {
            let myId = e.currentTarget.getAttribute("id");
            deleteProduct(e.currentTarget.getAttribute("id"));
        });

    }

    function deleteProduct(prodId) {
        console.log("/products/" + prodId);
        fetch("/products/" + prodId, {
            method: "DELETE"
        })
            .then(() => {
                window.location.href = '/products';  // Redirect to products list after deletion
            })
            .catch(alert);
    }


    function id(idName) {
        return document.getElementById(idName);
    }

    function qsa(className) {
        return document.querySelectorAll(className);
    }

})();