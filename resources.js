/* MATONI HEALTH RESOURCE LIBRARY
   Curated external educational resources.
   MATONI does not own or clinically review every external publication.
*/

const matoniResources = [
  {
    id: 1,
    title: "Menstrual Health",
    organisation: "World Health Organization (WHO)",
    topic: "menstrual",
    topics: ["menstrual", "body", "conditions"],
    description: "An overview of menstrual health, menstrual dignity, symptoms, education and access to menstrual support.",
    audience: "Girls, women, educators and health professionals",
    url: "https://www.who.int/news-room/fact-sheets/detail/menstrual-health"
  },
  {
    id: 2,
    title: "Women's Health",
    organisation: "World Health Organization (WHO)",
    topic: "research",
    topics: ["research", "body", "mental", "pregnancy", "ageing"],
    description: "An overview of women's health across the life course, including physical health, mental wellbeing and reproductive health.",
    audience: "General readers and health professionals",
    url: "https://www.who.int/health-topics/women-s-health"
  },
  {
    id: 3,
    title: "Women's Health Information",
    organisation: "MedlinePlus - U.S. National Library of Medicine",
    topic: "body",
    topics: ["body", "conditions", "pregnancy", "breast", "mental", "ageing"],
    description: "A collection of information about health conditions, prevention, tests, pregnancy, menopause and other women's health topics.",
    audience: "Patients, families and general readers",
    url: "https://medlineplus.gov/womenshealth.html"
  },
  {
    id: 4,
    title: "Health Topics A-Z",
    organisation: "MedlinePlus - U.S. National Library of Medicine",
    topic: "conditions",
    topics: ["conditions", "body", "sexual", "mental", "pregnancy", "breast", "ageing"],
    description: "A broad directory covering diseases, symptoms, reproductive health, mental health, wellness and medical information.",
    audience: "General readers",
    url: "https://medlineplus.gov/healthtopics.html"
  },
  {
    id: 5,
    title: "Reproductive Health Fact Sheets",
    organisation: "Office on Women's Health - U.S. Department of Health and Human Services",
    topic: "sexual",
    topics: ["sexual", "menstrual", "conditions", "pregnancy", "ageing"],
    description: "Downloadable fact sheets covering the menstrual cycle, endometriosis, menopause, PCOS and other reproductive health subjects.",
    audience: "Women, girls and healthcare educators",
    url: "https://womenshealth.gov/patient-materials/health-topic/reproductive-health"
  },
  {
    id: 6,
    title: "Women's Health: Information and Support",
    organisation: "National Health Service (NHS), United Kingdom",
    topic: "ageing",
    topics: ["menstrual", "sexual", "pregnancy", "conditions", "ageing", "breast", "mental"],
    description: "Health information covering periods, contraception, pregnancy, menopause, vaginal health and conditions affecting the womb and ovaries.",
    audience: "Women and girls seeking general health information",
    url: "https://www.nhs.uk/womens-health/"
  },
  {
    id: 7,
    title: "Polyendocrine Metabolic Ovarian Syndrome (PMOS)",
    organisation: "National Health Service (NHS), United Kingdom",
    topic: "conditions",
    topics: ["conditions", "body", "menstrual"],
    description: "Information about the condition previously known as polycystic ovary syndrome (PCOS), including symptoms and treatment options.",
    audience: "People seeking information about PMOS/PCOS",
    url: "https://www.nhs.uk/conditions/polyendocrine-metabolic-ovarian-syndrome-pmos/"
  },
  {
    id: 8,
    title: "Women's Health: Medical Encyclopedia",
    organisation: "MedlinePlus - U.S. National Library of Medicine",
    topic: "research",
    topics: ["research", "body", "breast", "sexual", "pregnancy", "ageing"],
    description: "An introduction to the scope of women's health, including reproductive health, pregnancy, menopause and conditions affecting women.",
    audience: "General readers and students",
    url: "https://medlineplus.gov/ency/article/007458.htm"
  }
];


/* Make text safe before inserting it into HTML. */
function matoniEscape(value) {
  return String(value).replace(/[&<>"']/g, function(character) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[character];
  });
}


/* Create a resource card. */
function matoniResourceCard(resource) {
  return `
    <article class="resource-card">
      <span class="resource-topic">
        ${matoniEscape(resource.topic)}
      </span>

      <h3>${matoniEscape(resource.title)}</h3>

      <p>${matoniEscape(resource.description)}</p>

      <span class="resource-organisation">
        Source: ${matoniEscape(resource.organisation)}
      </span>

      <a
        class="resource-link"
        href="${matoniEscape(resource.url)}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Read ${matoniEscape(resource.title)} from ${matoniEscape(resource.organisation)}"
      >
        Visit original resource ↗
      </a>
    </article>
  `;
}


/* Show selected resources on the learning page. */
function matoniLoadFeaturedResources() {
  const container = document.getElementById("featured-resources");

  if (!container) {
    return;
  }

  const featured = matoniResources.slice(0, 3);

  container.innerHTML = featured
    .map(matoniResourceCard)
    .join("");
}


/* Set up the searchable directory. */
function matoniSetupResourceDirectory() {
  const container = document.getElementById("resource-list");

  if (!container) {
    return;
  }

  const searchInput = document.getElementById("resource-search");
  const filterContainer = document.getElementById("resource-filters");
  const clearButton = document.getElementById("clear-filters");
  const count = document.getElementById("resource-count");
  const emptyMessage = document.getElementById("no-resources");

  let selectedTopic = "all";
  let searchTerm = "";

  function renderResources() {
    const filtered = matoniResources.filter(function(resource) {
      const matchesTopic =
        selectedTopic === "all" ||
        resource.topics.includes(selectedTopic);

      const searchableText = [
        resource.title,
        resource.organisation,
        resource.description,
        resource.audience,
        resource.topic
      ].join(" ").toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm);

      return matchesTopic && matchesSearch;
    });

    container.innerHTML = filtered
      .map(matoniResourceCard)
      .join("");

    count.textContent =
      filtered.length + (filtered.length === 1
        ? " resource found"
        : " resources found");

    emptyMessage.hidden = filtered.length !== 0;
  }


  /* Search as the visitor types. */
  searchInput.addEventListener("input", function(event) {
    searchTerm = event.target.value.trim().toLowerCase();
    renderResources();
  });


  /* Select a category. */
  filterContainer.addEventListener("click", function(event) {
    const button = event.target.closest("[data-topic]");

    if (!button) {
      return;
    }

    selectedTopic = button.dataset.topic;

    filterContainer.querySelectorAll(".filter-button")
      .forEach(function(filterButton) {
        const isSelected =
          filterButton.dataset.topic === selectedTopic;

        filterButton.classList.toggle("active", isSelected);

        filterButton.setAttribute(
          "aria-pressed",
          String(isSelected)
        );
      });

    renderResources();
  });


  /* Reset search and category filters. */
  clearButton.addEventListener("click", function() {
    selectedTopic = "all";
    searchTerm = "";
    searchInput.value = "";

    filterContainer.querySelectorAll(".filter-button")
      .forEach(function(button) {
        const isSelected = button.dataset.topic === "all";

        button.classList.toggle("active", isSelected);

        button.setAttribute(
          "aria-pressed",
          String(isSelected)
        );
      });

    renderResources();
  });


  /* Read a category from a learning-page link. */
  const urlParameters = new URLSearchParams(window.location.search);
  const requestedTopic = urlParameters.get("topic");

  if (requestedTopic) {
    const matchingButton = filterContainer.querySelector(
      `[data-topic="${requestedTopic}"]`
    );

    if (matchingButton) {
      selectedTopic = requestedTopic;

      filterContainer.querySelectorAll(".filter-button")
        .forEach(function(button) {
          const isSelected =
            button.dataset.topic === selectedTopic;

          button.classList.toggle("active", isSelected);

          button.setAttribute(
            "aria-pressed",
            String(isSelected)
          );
        });
    }
  }

  renderResources();
}


/* Initialise the parts of the library present on this page. */
document.addEventListener("DOMContentLoaded", function() {
  matoniLoadFeaturedResources();
  matoniSetupResourceDirectory();
});
