const storyForm = document.getElementById("storyForm");
const identitySelect = document.getElementById("identity");
const nicknameArea = document.getElementById("nicknameArea");
const nicknameInput = document.getElementById("nickname");
const storyText = document.getElementById("storyText");
const storyCategory = document.getElementById("storyCategory");
const storiesList = document.getElementById("storiesList");
const formMessage = document.getElementById("formMessage");

let stories = [
  {
    id: 1,
    author: "Anonymous girl",
    category: "Periods and menstruation",
    text: "Today, I almost fainted in class because of period pain. I couldn't even concentrate.",
    relates: 12,
    comments: [
      { author: "KindHeart", text: "I'm sorry you experienced that. You deserve to be taken seriously." },
      { author: "Anonymous girl", text: "This happens to me too. You're not alone." }
    ]
  },
  {
    id: 2,
    author: "Anonymous girl",
    category: "School and relationships",
    text: "A boy in my class mocked me because I stained my uniform. I felt so embarrassed.",
    relates: 18,
    comments: [
      { author: "Sunflower", text: "That was unkind of him. Menstruation is completely normal." }
    ]
  },
  {
    id: 3,
    author: "LittleSunshine",
    category: "Something positive",
    text: "I finally spoke to my mother about my painful periods, and she listened. I feel relieved.",
    relates: 9,
    comments: [
      { author: "Anonymous girl", text: "I'm happy you had someone listen to you!" }
    ]
  }
];

identitySelect.addEventListener("change", function () {
  const usingNickname = identitySelect.value === "nickname";
  nicknameArea.hidden = !usingNickname;
  nicknameInput.required = usingNickname;
});

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderStories() {
  storiesList.replaceChildren();

  stories.slice().reverse().forEach(function (story) {
    const card = createElement("article", "hv-story-card");
    const top = createElement("div", "hv-story-top");
    const author = createElement("strong", "", story.author);
    const category = createElement("span", "hv-category", story.category);
    const content = createElement("p", "hv-story-text", story.text);

    top.append(author, category);

    const actions = createElement("div", "hv-story-actions");

    const relateButton = createElement(
      "button",
      "hv-action-button",
      "♡ Relate (" + story.relates + ")"
    );
    relateButton.type = "button";
    relateButton.addEventListener("click", function () {
      story.relates++;
      renderStories();
    });

    const reportButton = createElement(
      "button",
      "hv-action-button",
      "Report"
    );
    reportButton.type = "button";
    reportButton.addEventListener("click", function () {
      alert("Thank you. In this demonstration, reports are not sent to a moderation team. A real reporting system will be added before public launch.");
    });

    actions.append(relateButton, reportButton);

    const commentsArea = createElement("div", "hv-comments");
    commentsArea.append(createElement("strong", "", "Comments"));

    story.comments.forEach(function (comment) {
      const commentBox = createElement("div", "hv-comment");
      const commentAuthor = createElement("strong", "", comment.author);
      const commentText = createElement("p", "", comment.text);
      commentBox.append(commentAuthor, commentText);
      commentsArea.append(commentBox);
    });

    const commentForm = createElement("form", "hv-comment-form");
    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.maxLength = 300;
    commentInput.placeholder = "Write a kind response...";
    commentInput.required = true;
    commentInput.setAttribute("aria-label", "Write a comment");

    const commentButton = createElement("button", "", "Comment");
    commentButton.type = "submit";

    commentForm.append(commentInput, commentButton);

    commentForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const commentValue = commentInput.value.trim();
      if (!commentValue) return;

      story.comments.push({
        author: "Anonymous girl",
        text: commentValue
      });

      renderStories();
    });

    commentsArea.append(commentForm);
    card.append(top, content, actions, commentsArea);
    storiesList.append(card);
  });
}

storyForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = storyText.value.trim();
  const usingNickname = identitySelect.value === "nickname";
  const nickname = nicknameInput.value.trim();

  if (!text) {
    formMessage.textContent = "Please write your experience first.";
    return;
  }

  if (usingNickname && !nickname) {
    formMessage.textContent = "Please choose a display name.";
    return;
  }

  const author = usingNickname ? nickname : "Anonymous girl";

  stories.push({
    id: Date.now(),
    author: author,
    category: storyCategory.value,
    text: text,
    relates: 0,
    comments: []
  });

  storyForm.reset();
  nicknameArea.hidden = true;
  formMessage.textContent = "Your story has been added to this demonstration.";
  renderStories();

  document.querySelector(".hv-stories").scrollIntoView({
    behavior: "smooth"
  });
});

renderStories();
