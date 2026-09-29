document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("enrollmentForm");
    const course = document.getElementById("course");
    const major = document.getElementById("major");
    const majorGroup = document.getElementById("majorGroup");
    const tableBody = document.getElementById("studentTableBody");
    const successMessage = document.getElementById("successMessage");

    majorGroup.style.display = "none";

    course.addEventListener("change", function () {

        clearError("course");

        if (course.value === "BSIT") {
            majorGroup.style.display = "block";
        } else {
            majorGroup.style.display = "none";
            major.value = "";
            clearError("major");
        }

    });

    const fields = document.querySelectorAll("input, select");

    fields.forEach(function (field) {

        field.addEventListener("input", function () {
            clearError(field.id);
        });

        field.addEventListener("change", function () {
            clearError(field.id);
        });

    });

    function showError(id, message) {

        const error = document.getElementById(id + "Error");

        if (error) {
            error.textContent = message;
        }

    }

    function clearError(id) {

        const error = document.getElementById(id + "Error");

        if (error) {
            error.textContent = "";
        }

    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        document.querySelectorAll(".error").forEach(function (error) {
            error.textContent = "";
        });

        successMessage.style.display = "none";

        const studentId = document.getElementById("studentId").value.trim();
        const prefix = document.getElementById("prefix").value.trim();
        const firstName = document.getElementById("firstName").value.trim();
        const middleName = document.getElementById("middleName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const suffix = document.getElementById("suffix").value.trim();
        const email = document.getElementById("email").value.trim();
        const courseValue = course.value;
        const majorValue = major.value;
        const yearLevel = document.getElementById("yearLevel").value;

        let valid = true;

        if (studentId === "") {

            showError(
                "studentId",
                "Student ID is required."
            );

            valid = false;

        } else if (studentId.length < 5) {

            showError(
                "studentId",
                "Student ID must be at least 5 characters."
            );

            valid = false;

        }

        if (prefix !== "" && prefix.length < 2) {

            showError(
                "prefix",
                "Prefix must be at least 2 characters."
            );

            valid = false;

        }

        if (firstName === "") {

            showError(
                "firstName",
                "First Name is required."
            );

            valid = false;

        } else if (firstName.length < 3) {

            showError(
                "firstName",
                "First Name must be at least 3 characters."
            );

            valid = false;

        }

        if (middleName !== "" && middleName.length < 2) {

            showError(
                "middleName",
                "Middle Name must be at least 2 characters."
            );

            valid = false;

        }

        if (lastName === "") {

            showError(
                "lastName",
                "Last Name is required."
            );

            valid = false;

        } else if (lastName.length < 2) {

            showError(
                "lastName",
                "Last Name must be at least 2 characters."
            );

            valid = false;

        }

        if (suffix !== "" && suffix.length < 2) {

            showError(
                "suffix",
                "Suffix must be at least 2 characters."
            );

            valid = false;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {

            showError(
                "email",
                "Email is required."
            );

            valid = false;

        } else if (!emailPattern.test(email)) {

            showError(
                "email",
                "Please enter a valid email address."
            );

            valid = false;

        }

        if (courseValue === "") {

            showError(
                "course",
                "Please select a course."
            );

            valid = false;

        }

        if (courseValue === "BSIT" && majorValue === "") {

            showError(
                "major",
                "Please select a BSIT major."
            );

            valid = false;

        }

        if (yearLevel === "") {

            showError(
                "yearLevel",
                "Please select a year level."
            );

            valid = false;

        }

        if (!valid) {
            return;
        }

        let fullName = firstName;

        if (prefix !== "") {
            fullName = prefix + " " + fullName;
        }

        if (middleName !== "") {
            fullName += " " + middleName;
        }

        fullName += " " + lastName;

        if (suffix !== "") {
            fullName += " " + suffix;
        }

        const row = document.createElement("tr");

        const values = [
            studentId,
            fullName,
            email,
            courseValue,
            courseValue === "BSIT" ? majorValue : "N/A",
            yearLevel
        ];

        values.forEach(function (value) {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

        tableBody.appendChild(row);

        successMessage.textContent =
            "Enrollment submitted successfully!";

        successMessage.style.display = "block";

        form.reset();

        majorGroup.style.display = "none";

    });

});
