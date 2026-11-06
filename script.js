
// MOBILE NAVIGATION

function toggleMenu() {
    const navigation = document.getElementById("navigation");
    navigation.classList.toggle("show");
}


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


// OPEN A LESSON

function openLesson(lessonName) {

    const lesson = lessons[lessonName];

    if (!lesson) return;

    const lessonArea = document.getElementById("lessonArea");
    const lessonContent = document.getElementById("lessonContent");

    let content = `
        <span class="eyebrow">YOUR BODY SCHOOL</span>
        <h2>${lesson.title}</h2>
        <p>${lesson.intro}</p>
    `;

    lesson.sections.forEach(section => {
        content += `
            <div class="lesson-section">
                <h3>${section.heading}</h3>
                <p>${section.text}</p>
            </div>
        `;
    });

    content += `
        <div class="lesson-complete">
            <p>Well done for taking time to understand your body.</p>
            <button onclick="closeLesson()">Back to learning</button>
        </div>
    `;

    lessonContent.innerHTML = content;

    lessonArea.hidden = false;

    lessonArea.scrollIntoView({
        behavior: "smooth"
    });
}


// CLOSE A LESSON

function closeLesson() {

    const lessonArea = document.getElementById("lessonArea");

    if (lessonArea) {
        lessonArea.hidden = true;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// HOME NAVIGATION

function showPage(page) {

    if (page === "home") {
        document.getElementById("lessonArea").hidden = true;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }

    const destinations = {
        learn: "learn",
        confidence: "confidence"
    };

    if (destinations[page]) {
        document.getElementById("lessonArea").hidden = true;

        document.getElementById(destinations[page])
            .scrollIntoView({
                behavior: "smooth"
            });
    }

    if (page === "myths") {
        document.getElementById("quizArea").scrollIntoView({
            behavior: "smooth"
        });
    }

    if (page === "ask") {
        alert("Our educational question centre is coming soon!");
    }
}


// MYTH OR FACT QUIZ

const quizQuestions = [
    {
        question: "Is menstruation a natural biological process?",
        answer: true,
        explanation: "Yes! Menstruation is a normal biological process."
    },
    {
        question: "Does having a period make a girl dirty?",
        answer: false,
        explanation: "No. Menstruation does not make anyone dirty or less worthy."
    },
    {
        question: "Can menstrual experiences differ between girls?",
        answer: true,
        explanation: "Yes. Period length, flow and symptoms can vary."
    },
    {
        question: "Should severe menstrual pain always be ignored?",
        answer: false,
        explanation: "No. Severe or disruptive pain deserves medical assessment."
    },
    {
        question: "Can boys learn about menstruation too?",
        answer: true,
        explanation: "Absolutely. Understanding helps create respectful and supportive environments."
    }
];

let currentQuestion = 0;
let quizScore = 0;


function startQuiz() {

    currentQuestion = 0;
    quizScore = 0;

    document.getElementById("quizArea").hidden = false;

    displayQuestion();

    document.getElementById("quizArea").scrollIntoView({
        behavior: "smooth"
    });
}


function displayQuestion() {

    const questionArea = document.getElementById("quizContent");

    if (currentQuestion >= quizQuestions.length) {

        questionArea.innerHTML = `
            <h3>Quiz completed!</h3>
            <p>You scored ${quizScore} out of ${quizQuestions.length}.</p>
            <p>Keep learning. Every correct answer makes you more informed.</p>
            <button onclick="startQuiz()">Try again</button>
        `;

        return;
    }

    const question = quizQuestions[currentQuestion];

    questionArea.innerHTML = `
        <p class="quiz-progress">
            Question ${currentQuestion + 1} of ${quizQuestions.length}
        </p>

        <h3>${question.question}</h3>

        <div class="quiz-options">
            <button onclick="answerQuestion(true)">Myth or Fact? FACT</button>
            <button onclick="answerQuestion(false)">Myth or Fact? MYTH</button>
        </div>

        <p id="quizFeedback"></p>
    `;
}


function answerQuestion(answer) {

    const question = quizQuestions[currentQuestion];

    const feedback = document.getElementById("quizFeedback");

    const buttons = document.querySelectorAll(".quiz-options button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (answer === question.answer) {

        quizScore++;

        feedback.textContent = "Correct! " + question.explanation;

    } else {

        feedback.textContent = "Not quite. " + question.explanation;

    }

    const nextButton = document.createElement("button");

    nextButton.textContent = "Next question";

    nextButton.onclick = function() {
        currentQuestion++;
        displayQuestion();
    };

    feedback.appendChild(document.createElement("br"));
    feedback.appendChild(nextButton);
}

// WOMEN'S COMMUNITY - QUESTION SUBMISSION

const questionForm = document.getElementById("questionForm");

if (questionForm) {

    questionForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const questionInput = document.getElementById("question");
        const identityInput = document.getElementById("identity");
        const categoryInput = document.getElementById("category");

        const questionList = document.getElementById("communityQuestions");
        const message = document.getElementById("questionMessage");

        const question = questionInput.value.trim();
        const identity = identityInput.value;
        const category = categoryInput.value;

        if (!question) {
            message.textContent = "Please enter your question.";
            return;
        }

        const card = document.createElement("article");
        card.className = "learning-card";

        const topic = document.createElement("span");
        topic.className = "eyebrow";
        topic.textContent = category.toUpperCase();

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

        message.textContent =
            "Your question has appeared in the community preview!";

    });

}
