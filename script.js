
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

yesBtn.addEventListener("click", function () {

    welcomeSection.style.display = "none";

    dateSection.style.display = "block";

    for (let i = 0; i < 15; i++) {

        setTimeout(function () {
            createHeart();
        }, i * 100);

    }

});


// ===============================
// NO BUTTON
// ===============================

noBtn.addEventListener("mouseover", function () {

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

nextDateBtn.addEventListener("click", function () {

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

nextTimeBtn.addEventListener("click", function () {

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

choiceButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        choiceButtons.forEach(function (btn) {

            btn.classList.remove("selected");

        });

        button.classList.add("selected");

    });

});


// ===============================
// CHOICE → PLACE
// ===============================

nextChoiceBtn.addEventListener("click", function () {

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

placeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        placeButtons.forEach(function (btn) {

            btn.classList.remove("selected");

        });

        button.classList.add("selected");

    });

});


// ===============================
// FINISH
// ===============================

finishBtn.addEventListener("click", async function () {

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


    // ===============================
    // CHECK ACTIVITY
    // ===============================

    if (!selectedChoice) {

        alert(
            "Please choose something for our date ❤️"
        );

        return;

    }


    // ===============================
    // CHECK PLACE
    // ===============================

    if (!selectedPlace) {

        alert(
            "Please choose our date place 📍❤️"
        );

        return;

    }


    // ===============================
    // GET TEXT VALUES
    // ===============================

    const activity =
        selectedChoice.textContent.trim();

    const place =
        selectedPlace.textContent.trim();


    // ===============================
    // SAVE DATA TO RAILWAY
    // ===============================

    try {

        console.log("Sending data to backend...");

        const response =
            await fetch(
                "/api/date",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        date:
                            selectedDate,

                        time:
                            selectedTime,

                        activity:
                            activity,

                        place:
                            place

                    })

                }
            );


        // ===============================
        // CHECK SERVER RESPONSE
        // ===============================

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Backend error:",
                errorText
            );

            throw new Error(
                "Backend returned an error"
            );

        }


        const data =
            await response.json();


        console.log(
            "Online data saved successfully:",
            data
        );


        // ===============================
        // SHOW FINAL DATE
        // ===============================

        document.getElementById(
            "finalDate"
        ).textContent =
            formatDate(selectedDate);


        // ===============================
        // SHOW FINAL TIME
        // ===============================

        document.getElementById(
            "finalTime"
        ).textContent =
            formatTime(selectedTime);


        // ===============================
        // SHOW ACTIVITY
        // ===============================

        document.getElementById(
            "finalChoice"
        ).textContent =
            selectedChoice.textContent;


        // ===============================
        // SHOW PLACE
        // ===============================

        document.getElementById(
            "finalPlace"
        ).textContent =
            selectedPlace.textContent;


        // ===============================
        // SHOW FINAL SECTION
        // ===============================

        placeSection.style.display =
            "none";

        finalSection.style.display =
            "block";


        // ===============================
        // EXTRA HEARTS
        // ===============================

        for (let i = 0; i < 30; i++) {

            setTimeout(function () {

                createHeart();

            }, i * 100);

        }

    }


    catch (error) {

        console.error(
            "Error sending data:",
            error
        );


        alert(
            "Data save karanna bari una 😢 Please try again."
        );

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

    date.setHours(
        Number(hours)
    );

    date.setMinutes(
        Number(minutes)
    );

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

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (
            15 +
            Math.random() * 25
        ) + "px";

    heart.style.animationDuration =
        (
            4 +
            Math.random() * 4
        ) + "s";


    document
        .getElementById("hearts")
        .appendChild(heart);


    setTimeout(function () {

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

