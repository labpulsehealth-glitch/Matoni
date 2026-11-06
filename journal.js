const JOURNAL_STORAGE_KEY = "matoni_health_journal";

const journalForm = document.getElementById("journalForm");
const journalEntries = document.getElementById("journalEntries");
const journalMessage = document.getElementById("journalMessage");
const clearJournalButton = document.getElementById("clearJournal");

const entryDate = document.getElementById("entryDate");
const entryType = document.getElementById("entryType");
const symptom = document.getElementById("symptom");
const severity = document.getElementById("severity");
const flow = document.getElementById("flow");
const notes = document.getElementById("notes");

// Set today's date as the default entry date.
const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

entryDate.value = localToday;
entryDate.max = localToday;

// Read journal entries from this browser.
function getJournalEntries() {
  try {
    const saved = localStorage.getItem(JOURNAL_STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const entries = JSON.parse(saved);

    return Array.isArray(entries) ? entries : [];
  } catch (error) {
    return null;
  }
}

// Save entries to this browser.
function saveJournalEntries(entries) {
  try {
    localStorage.setItem(
      JOURNAL_STORAGE_KEY,
      JSON.stringify(entries)
    );

    return true;
  } catch (error) {
    return false;
  }
}

// Display a date in a readable format.
function formatJournalDate(dateString) {
  const date = new Date(dateString + "T12:00:00");

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Create a text element safely.
function addTextElement(parent, tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

// Display all saved entries.
function displayJournalEntries() {
  const entries = getJournalEntries();

  journalEntries.replaceChildren();

  if (entries === null) {
    addTextElement(
      journalEntries,
      "p",
      "Your journal could not be read. Check your browser storage settings."
    );
    return;
  }

  if (entries.length === 0) {
    addTextElement(
      journalEntries,
      "p",
      "You have not saved any journal entries yet."
    );
    return;
  }

  entries.sort(function(a, b) {
    return b.createdAt - a.createdAt;
  });

  entries.forEach(function(entry) {
    const card = document.createElement("div");
    card.className = "learning-card";

    addTextElement(card, "h3", formatJournalDate(entry.date));
    addTextElement(card, "p", "Entry type: " + entry.type);

    if (entry.symptom) {
      addTextElement(card, "p", "Symptom or experience: " + entry.symptom);
    }

    if (entry.severity) {
      addTextElement(card, "p", "Intensity: " + entry.severity);
    }

    if (entry.flow) {
      addTextElement(card, "p", "Menstrual flow: " + entry.flow);
    }

    if (entry.notes) {
      addTextElement(card, "p", "Notes: " + entry.notes);
    }

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "primary-button";
    deleteButton.textContent = "Delete This Entry";

    deleteButton.addEventListener("click", function() {
      deleteJournalEntry(entry.id);
    });

    card.appendChild(deleteButton);
    journalEntries.appendChild(card);
  });
}

// Save a new entry.
journalForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const entries = getJournalEntries();

  if (entries === null) {
    journalMessage.textContent =
      "Your browser storage is unavailable. Your entry was not saved.";
    return;
  }

  if (!entryDate.value || entryDate.value > localToday) {
    journalMessage.textContent =
      "Please select a valid date that is not in the future.";
    return;
  }

  const newEntry = {
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    date: entryDate.value,
    type: entryType.value,
    symptom: symptom.value.trim(),
    severity: severity.value,
    flow: flow.value,
    notes: notes.value.trim(),
    createdAt: Date.now()
  };

  entries.push(newEntry);

  if (!saveJournalEntries(entries)) {
    journalMessage.textContent =
      "Your entry could not be saved. Your browser storage may be full or unavailable.";
    return;
  }

  journalMessage.textContent = "Your journal entry has been saved on this device.";

  journalForm.reset();
  entryDate.value = localToday;

  displayJournalEntries();
});

// Delete one entry.
function deleteJournalEntry(entryId) {
  const entries = getJournalEntries();

  if (entries === null) {
    journalMessage.textContent = "Your journal could not be accessed.";
    return;
  }

  const updatedEntries = entries.filter(function(entry) {
    return entry.id !== entryId;
  });

  if (!saveJournalEntries(updatedEntries)) {
    journalMessage.textContent = "The entry could not be deleted.";
    return;
  }

  journalMessage.textContent = "Journal entry deleted.";
  displayJournalEntries();
}

// Delete all entries.
clearJournalButton.addEventListener("click", function() {
  const entries = getJournalEntries();

  if (entries === null) {
    journalMessage.textContent = "Your journal could not be accessed.";
    return;
  }

  if (entries.length === 0) {
    journalMessage.textContent = "There are no entries to delete.";
    return;
  }

  const confirmed = window.confirm(
    "Are you sure you want to permanently delete all your journal entries from this browser?"
  );

  if (!confirmed) {
    return;
  }

  if (!saveJournalEntries([])) {
    journalMessage.textContent = "Your entries could not be deleted.";
    return;
  }

  journalMessage.textContent = "All journal entries have been deleted.";
  displayJournalEntries();
});

// Load saved entries when the page opens.
displayJournalEntries();
