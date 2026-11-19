// MATONI shared script
// Safe on every page: each feature only runs if its elements exist.

const $ = (id) => document.getElementById(id);

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}


// MOBILE NAVIGATION

function toggleMenu() {
    const navigation = $("navigation");
    const button = document.querySelector(".menu-button");
    if (!navigation) return;

    const isOpen = navigation.classList.toggle("show");
    if (button) button.setAttribute("aria-expanded", String(isOpen));
}

document.addEventListener("DOMContentLoaded", () => {
    const navigation = $("navigation");
    const button = document.querySelector(".menu-button");

    if (button) {
        button.setAttribute("aria-controls", "navigation");
        button.setAttribute("aria-expanded", "false");
    }

    // Close the menu after a link is tapped
    if (navigation) {
        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("show");
                if (button) button.setAttribute("aria-expanded", "false");
            });
        });
    }
});


// LESSON CONTENT

const lessons = {

    periods: {
        title: "Understanding Your Period",
        intro: "Menstruation is a natural biological process. It is one way the reproductive system works.",
        sections: [
            {
                heading: "What is menstruation?",
                text: "Menstruation happens when the lining of the uterus sheds and leaves the body through the vagina as blood and tissue. This is commonly called a period."
            },
            {
                heading: "Why does it happen?",
                text: "During the menstrual cycle, hormones help prepare the uterus for a possible pregnancy. When pregnancy does not occur, the uterine lining sheds."
            },
            {
                heading: "How long does a period last?",
                text: "A menstrual period commonly lasts between 2 and 7 days. Experiences differ from person to person, and cycles can vary, especially during the first years after menstruation begins."
            },
            {
                heading: "Remember",
                text: "Menstruation is not dirty, shameful or a reason to feel inferior. It is a normal body process."
            }
        ]
    },

    body: {
        title: "Know Your Body",
        intro: "Understanding your body helps you make informed decisions about your health.",
        sections: [
            {
                heading: "The uterus",
                text: "The uterus is a muscular organ in the pelvis. Its lining changes during the menstrual cycle."
            },
            {
                heading: "The ovaries",
                text: "The ovaries produce eggs and hormones such as oestrogen and progesterone."
            },
            {
                heading: "The fallopian tubes",
                text: "These tubes connect the area around the ovaries to the uterus. They are usually where fertilisation takes place."
            },
            {
                heading: "The vagina",
                text: "The vagina is a muscular canal connecting the uterus and cervix to the outside of the body."
            }
        ]
    },

    confidence: {
        title: "Period Confidence",
        intro: "Your period is a normal part of human biology. You deserve to feel informed and respected.",
        sections: [
            {
                heading: "You are not dirty",
                text: "Menstrual blood is a natural bodily fluid. Having a period does not make anyone dirty or less worthy of respect."
            },
            {
                heading: "You deserve respect",
                text: "Nobody should mock you, expose your private experiences or bully you because you menstruate."
            },
            {
                heading: "What if someone teases you?",
                text: "You can calmly explain that menstruation is normal. You can also seek help from a trusted adult, teacher or school counsellor."
            },
            {
                heading: "Your health matters",
                text: "Severe pain, unusually heavy bleeding or symptoms that affect everyday activities deserve medical attention. You do not have to silently endure them."
            }
        ]
    },

    growing: {
        title: "Growing and Changing",
        intro: "Growing up involves physical, emotional and hormonal changes. Everyone develops at their own pace.",
        sections: [
            {
                heading: "Puberty",
                text: "Puberty is the period when a child's body gradually develops into an adult body. Changes can include breast development, body hair, growth and menstruation."
            },
            {
                heading: "Hormones",
                text: "Hormones are chemical messengers that help regulate processes such as growth, development and the menstrual cycle."
            },
            {
                heading: "Everyone is different",
                text: "People do not all develop at the same age or in exactly the same way. Comparing your body with someone else's can create unnecessary worry."
            },
            {
                heading: "Ask questions",
                text: "It is okay to ask questions about changes in your body. A trusted healthcare professional can help when you are worried."
            }
        ]
    }

};

// Only accept real lesson names (blocks keys like "constructor" or "__proto__")
function getLesson(name) {
    return Object.prototype.hasOwnProperty.call(lessons, name) ? lessons[name] : null;
}


// OPEN A LESSON (on the Learn page)

function openLesson(lessonName) {

    const lesson = getLesson(lessonName);
    const lessonArea = $("lessonArea");
    const lessonContent = $("lessonContent");

    if (!lesson || !lessonArea || !lessonContent) return;

    let content = `
        <span class="eyebrow">MATONI LEARNING</span>
        <h2>${escapeHTML(lesson.title)}</h2>
        <p>${escapeHTML(lesson.intro)}</p>
    `;

    lesson.sections.forEach((section) => {
        content += `
            <div class="lesson-section">
                <h3>${escapeHTML(section.heading)}</h3>
                <p>${escapeHTML(section.text)}</p>
            </div>
        `;
    });

    content += `
        <div class="lesson-complete">
            <p>Well done for taking time to understand your body.</p>
            <button type="button" onclick="closeLesson()">Back to learning</button>
        </div>
    `;

    lessonContent.innerHTML = content;
    lessonArea.hidden = false;

    lessonArea.scrollIntoView({ behavior: "smooth" });
}


// CLOSE A LESSON

function closeLesson() {

    const lessonArea = $("lessonArea");

    if (lessonArea) {
        lessonArea.hidden = true;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// HOME NAVIGATION

function showPage(page) {

    const lessonArea = $("lessonArea");

    if (page === "home") {
        if (lessonArea) lessonArea.hidden = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    if (page === "learn" || page === "confidence") {
        if (lessonArea) lessonArea.hidden = true;
        const target = $(page);
        if (target) target.scrollIntoView({ behavior: "smooth" });
        return;
    }

    if (page === "myths") {
        const quizArea = $("quizArea");
        if (quizArea) quizArea.scrollIntoView({ behavior: "smooth" });
        return;
    }

    if (page === "ask") {
        window.location.href = "ask.html";
    }
}


// MYTH OR FACT QUIZ
// Each item is a statement. The player decides if it is a fact or a myth.

const quizQuestions = [
    {
        statement: "Menstruation is a natural biological process.",
        isFact: true,
        explanation: "Fact. Menstruation is a normal body process."
    },
    {
        statement: "Having a period makes a girl dirty.",
        isFact: false,
        explanation: "Myth. Menstruation does not make anyone dirty or less worthy."
    },
    {
        statement: "Period length, flow and symptoms can differ from girl to girl.",
        isFact: true,
        explanation: "Fact. Every body is different, and cycles can vary."
    },
    {
        statement: "Severe period pain should always be ignored.",
        isFact: false,
        explanation: "Myth. Severe or disruptive pain deserves medical assessment."
    },
    {
        statement: "Boys can learn about menstruation too.",
        isFact: true,
        explanation: "Fact. Understanding helps create respectful and supportive environments."
    }
];

let currentQuestion = 0;
let quizScore = 0;


function startQuiz() {

    const quizArea = $("quizArea");
    if (!quizArea) return;

    currentQuestion = 0;
    quizScore = 0;

    quizArea.hidden = false;

    displayQuestion();

    quizArea.scrollIntoView({ behavior: "smooth" });
}


function displayQuestion() {

    const questionArea = $("quizContent");
    if (!questionArea) return;

    if (currentQuestion >= quizQuestions.length) {

        questionArea.innerHTML = `
            <h3>Quiz completed!</h3>
            <p>You scored ${quizScore} out of ${quizQuestions.length}.</p>
            <p>Keep learning. Every correct answer makes you more informed.</p>
            <button type="button" onclick="startQuiz()">Try again</button>
        `;

        return;
    }

    const question = quizQuestions[currentQuestion];

    questionArea.innerHTML = `
        <p class="quiz-progress">
            Question ${currentQuestion + 1} of ${quizQuestions.length}
        </p>

        <h3>${escapeHTML(question.statement)}</h3>

        <div class="quiz-options">
            <button type="button" onclick="answerQuestion(true)">Fact</button>
            <button type="button" onclick="answerQuestion(false)">Myth</button>
        </div>

        <p id="quizFeedback" role="status" aria-live="polite"></p>
    `;
}


function answerQuestion(answerIsFact) {

    const question = quizQuestions[currentQuestion];
    const feedback = $("quizFeedback");

    if (!question || !feedback) return;

    document.querySelectorAll(".quiz-options button").forEach((button) => {
        button.disabled = true;
    });

    if (answerIsFact === question.isFact) {
        quizScore++;
        feedback.textContent = "Correct! " + question.explanation;
    } else {
        feedback.textContent = "Not quite. " + question.explanation;
    }

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent =
        currentQuestion === quizQuestions.length - 1 ? "See my score" : "Next question";

    nextButton.onclick = function () {
        currentQuestion++;
        displayQuestion();
    };

    feedback.appendChild(document.createElement("br"));
    feedback.appendChild(nextButton);
    nextButton.focus();
}


// COMMUNITY - QUESTION SUBMISSION (local preview only)

const questionForm = $("questionForm");

// Blocks phone numbers and email addresses before they appear on screen
function containsPersonalDetails(text) {
    const phone = /(\+?\d[\s-]?){9,}/;
    const email = /\S+@\S+\.\S+/;
    return phone.test(text) || email.test(text);
}

if (questionForm) {

    questionForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const questionInput = $("question");
        const identityInput = $("identity");
        const categoryInput = $("category");
        const questionList = $("communityQuestions");
        const message = $("questionMessage");

        if (!questionInput || !identityInput || !categoryInput || !questionList || !message) return;

        const question = questionInput.value.trim();
        const identity = identityInput.value;
        const category = categoryInput.value;

        if (!question) {
            message.textContent = "Please enter your question.";
            return;
        }

        if (question.length > 500) {
            message.textContent = "Please keep your question under 500 characters.";
            return;
        }

        if (containsPersonalDetails(question)) {
            message.textContent =
                "Please remove phone numbers or email addresses to protect your privacy.";
            return;
        }

        const card = document.createElement("article");
        card.className = "learning-card";

        const topic = document.createElement("span");
        topic.className = "eyebrow";
        topic.textContent = String(category).toUpperCase();

        const heading = document.createElement("h3");
        heading.textContent = question;

        const author = document.createElement("p");
        author.textContent = identity === "anonymous"
            ? "Asked anonymously"
            : "Asked by a community member";

        const status = document.createElement("p");
        status.textContent =
            "This question is currently a local preview. Online responses will be enabled when the community database is connected.";

        card.appendChild(topic);
        card.appendChild(heading);
        card.appendChild(author);
        card.appendChild(status);

        questionList.prepend(card);

        questionForm.reset();

        message.textContent = "Your question has appeared in the community preview!";
    });

}


// LOAD A LESSON ON ITS OWN PAGE (lesson.html?topic=periods)

const lessonPage = $("lessonPageContent");

if (lessonPage) {

    const parameters = new URLSearchParams(window.location.search);
    const lesson = getLesson(parameters.get("topic"));

    if (lesson) {

        let content = `
            <span class="eyebrow">MATONI LEARNING</span>
            <h1>${escapeHTML(lesson.title)}</h1>
            <p>${escapeHTML(lesson.intro)}</p>
        `;

        lesson.sections.forEach((section) => {
            content += `
                <div class="lesson-section">
                    <h2>${escapeHTML(section.heading)}</h2>
                    <p>${escapeHTML(section.text)}</p>
                </div>
            `;
        });

        content += `
            <div class="lesson-complete">
                <p>Well done for taking time to understand your body. 💗</p>
                <a href="learn.html" class="primary-button">Back to Learning</a>
            </div>
        `;

        lessonPage.innerHTML = content;

        document.title = lesson.title + " | MATONI";

    } else {

        lessonPage.innerHTML = `
            <h2>Lesson not found</h2>
            <p>Please return to Learning and choose a lesson.</p>
            <a href="learn.html" class="primary-button">Back to Learning</a>
        `;
    }
}
