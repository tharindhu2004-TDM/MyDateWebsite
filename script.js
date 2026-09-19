// ===============================
// GET BUTTONS
// ===============================

const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");

const nextDateBtn =
    document.getElementById("nextDateBtn");

const nextTimeBtn =
    document.getElementById("nextTimeBtn");

const nextChoiceBtn =
    document.getElementById("nextChoiceBtn");

const finishBtn =
    document.getElementById("finishBtn");


// ===============================
// SECTIONS
// ===============================

const welcomeSection =
    document.getElementById("welcomeSection");

const dateSection =
    document.getElementById("dateSection");

const timeSection =
    document.getElementById("timeSection");

const choiceSection =
    document.getElementById("choiceSection");

const placeSection =
    document.getElementById("placeSection");

const finalSection =
    document.getElementById("finalSection");


// ===============================
// YES BUTTON
// ===============================

yesBtn.addEventListener("click", function() {

    welcomeSection.style.display = "none";

    dateSection.style.display = "block";


    // Heart burst

    for (let i = 0; i < 15; i++) {

        setTimeout(function() {

            createHeart();

        }, i * 100);

    }

});


// ===============================
// NO BUTTON
// ===============================

noBtn.addEventListener("mouseover", function() {

    noBtn.style.position = "fixed";


    const maxX =
        window.innerWidth -
        noBtn.offsetWidth;


    const maxY =
        window.innerHeight -
        noBtn.offsetHeight;


    const randomX =
        Math.random() * maxX;


    const randomY =
        Math.random() * maxY;


    noBtn.style.left =
        randomX + "px";


    noBtn.style.top =
        randomY + "px";

});


// ===============================
// DATE → TIME
// ===============================

nextDateBtn.addEventListener("click", function() {

    const selectedDate =
        document.getElementById("dateInput").value;


    if (selectedDate === "") {

        alert("Please choose a date ❤️");

        return;

    }


    dateSection.style.display = "none";

    timeSection.style.display = "block";

});


// ===============================
// TIME → CHOICE
// ===============================

nextTimeBtn.addEventListener("click", function() {

    const selectedTime =
        document.getElementById("timeInput").value;


    if (selectedTime === "") {

        alert("Please choose a time ⏰❤️");

        return;

    }


    timeSection.style.display = "none";

    choiceSection.style.display = "block";

});


// ===============================
// ACTIVITY / FOOD
// ===============================

const choiceButtons =
    document.querySelectorAll(".choiceBtn");


choiceButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        choiceButtons.forEach(function(btn) {

            btn.classList.remove("selected");

        });


        button.classList.add("selected");

    });

});


// ===============================
// CHOICE → PLACE
// ===============================

nextChoiceBtn.addEventListener("click", function() {

    const selectedChoice =
        document.querySelector(
            ".choiceBtn.selected"
        );


    if (!selectedChoice) {

        alert(
            "Please choose something for our date ❤️"
        );

        return;

    }


    choiceSection.style.display = "none";

    placeSection.style.display = "block";

});


// ===============================
// PLACE SELECTION
// ===============================

const placeButtons =
    document.querySelectorAll(".placeBtn");


placeButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        placeButtons.forEach(function(btn) {

            btn.classList.remove("selected");

        });


        button.classList.add("selected");

    });

});


// ===============================
// FINISH
// ===============================

finishBtn.addEventListener("click", function() {

    const selectedDate =
        document.getElementById("dateInput").value;


    const selectedTime =
        document.getElementById("timeInput").value;


    const selectedChoice =
        document.querySelector(
            ".choiceBtn.selected"
        );


    const selectedPlace =
        document.querySelector(
            ".placeBtn.selected"
        );


    if (!selectedChoice) {

        alert(
            "Please choose something for our date ❤️"
        );

        return;

    }


    if (!selectedPlace) {

        alert(
            "Please choose our date place 📍❤️"
        );

        return;

    }


    // ===============================
    // SEND DATA TO BACKEND
    // ===============================

    fetch("http://localhost:3000/api/date", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            date: selectedDate,

            time: selectedTime,

            activity: selectedChoice.textContent.trim(),

            place: selectedPlace.textContent.trim()

        })

    })

    .then(function(response) {

        if (!response.ok) {

            throw new Error(
                "Failed to save date information"
            );

        }

        return response.json();

    })

    .then(function(data) {

        console.log(
            "Data saved:",
            data
        );

    })

    .catch(function(error) {

        console.error(
            "Error sending data:",
            error
        );

        alert(
            "Data save karanna bari una 😢 Backend server eka running da balanna."
        );

    });


    // ===============================
    // SHOW FINAL DATA
    // ===============================

    // Date

    document.getElementById(
        "finalDate"
    ).textContent =
        formatDate(selectedDate);


    // Time

    document.getElementById(
        "finalTime"
    ).textContent =
        formatTime(selectedTime);


    // Activity

    document.getElementById(
        "finalChoice"
    ).textContent =
        selectedChoice.textContent;


    // Place

    document.getElementById(
        "finalPlace"
    ).textContent =
        selectedPlace.textContent;


    // Hide place

    placeSection.style.display =
        "none";


    // Show final

    finalSection.style.display =
        "block";


    // Big heart burst

    for (let i = 0; i < 30; i++) {

        setTimeout(function() {

            createHeart();

        }, i * 100);

    }

});


// ===============================
// DATE FORMAT
// ===============================

function formatDate(dateValue) {

    const date =
        new Date(
            dateValue + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-US",
        {

            weekday: "long",

            year: "numeric",

            month: "long",

            day: "numeric"

        }

    );

}


// ===============================
// TIME FORMAT
// ===============================

function formatTime(timeValue) {

    const [hours, minutes] =
        timeValue.split(":");


    const date =
        new Date();


    date.setHours(hours);

    date.setMinutes(minutes);


    return date.toLocaleTimeString(
        "en-US",
        {

            hour: "numeric",

            minute: "2-digit"

        }

    );

}


// ===============================
// FLOATING HEART
// ===============================

function createHeart() {

    const heart =
        document.createElement("div");


    heart.classList.add("heart");


    heart.textContent =
        "❤️";


    // Random position

    heart.style.left =
        Math.random() * 100 + "%";


    // Random size

    heart.style.fontSize =
        (
            15 +
            Math.random() * 25
        ) + "px";


    // Random speed

    heart.style.animationDuration =
        (
            4 +
            Math.random() * 4
        ) + "s";


    document
        .getElementById("hearts")
        .appendChild(heart);


    // Remove after animation

    setTimeout(function() {

        heart.remove();

    }, 8000);

}


// ===============================
// CONTINUOUS HEARTS
// ===============================

setInterval(
    createHeart,
    700
);