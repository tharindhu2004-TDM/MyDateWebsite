// ===============================
// LOAD DATE RESPONSES
// ===============================

const responsesContainer =
    document.getElementById("responses");

const loading =
    document.getElementById("loading");

const noData =
    document.getElementById("noData");


// ===============================
// GET DATA FROM BACKEND
// ===============================

fetch("http://localhost:3000/api/date")

    .then(function(response) {

        if (!response.ok) {

            throw new Error(
                "Failed to load responses"
            );

        }

        return response.json();

    })

    .then(function(data) {

        loading.style.display = "none";


        // No responses

        if (data.length === 0) {

            noData.style.display = "block";

            return;

        }


        // Show responses

        data.forEach(function(item, index) {

            const card =
                document.createElement("div");

            card.classList.add(
                "response-card"
            );


            card.innerHTML = `

                <h2>
                    💕 Date Response #${index + 1}
                </h2>

                <div class="info">

                    <span class="label">
                        📅 Date
                    </span>

                    <span class="value">
                        ${formatDate(item.date_value)}
                    </span>

                </div>


                <div class="info">

                    <span class="label">
                        ⏰ Time
                    </span>

                    <span class="value">
                        ${formatTime(item.time_value)}
                    </span>

                </div>


                <div class="info">

                    <span class="label">
                        ❤️ Activity
                    </span>

                    <span class="value">
                        ${item.activity}
                    </span>

                </div>


                <div class="info">

                    <span class="label">
                        📍 Place
                    </span>

                    <span class="value">
                        ${item.place}
                    </span>

                </div>


                <div class="info">

                    <span class="label">
                        🕐 Submitted
                    </span>

                    <span class="value">
                        ${formatDateTime(item.created_at)}
                    </span>

                </div>

            `;


            responsesContainer.appendChild(card);

        });

    })

    .catch(function(error) {

        loading.style.display = "none";

        noData.style.display = "block";

        noData.textContent =
            "❌ Could not load responses.";

        console.error(error);

    });


// ===============================
// DATE FORMAT
// ===============================

function formatDate(dateValue) {

    const date =
        new Date(
            dateValue
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

    if (!timeValue) {

        return "";

    }


    const parts =
        timeValue.split(":");


    const hours =
        parseInt(parts[0]);

    const minutes =
        parts[1];


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
// DATE + TIME FORMAT
// ===============================

function formatDateTime(value) {

    const date =
        new Date(value);


    return date.toLocaleString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",

            hour: "numeric",
            minute: "2-digit"
        }
    );

}