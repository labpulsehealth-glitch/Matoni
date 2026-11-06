/* MATONI HERBODY INTERACTIVE EDUCATION
   Educational information only.
*/

document.addEventListener("DOMContentLoaded", function() {

  /* REPRODUCTIVE ANATOMY */

  const anatomyInformation = {
    ovaries: {
      title: "Ovaries",
      description:
        "The ovaries are two small organs located on either side of the uterus. They contain egg cells and produce hormones, including oestrogen and progesterone.",
      fact:
        "Ovarian activity is involved in the menstrual cycle, hormone production and reproductive function."
    },

    fallopian: {
      title: "Fallopian tubes",
      description:
        "The fallopian tubes extend from the upper part of the uterus towards the ovaries. They help transport an egg cell towards the uterus.",
      fact:
        "Fertilisation commonly occurs in a fallopian tube, although pregnancy can sometimes develop outside the uterus, which is called an ectopic pregnancy."
    },

    uterus: {
      title: "Uterus",
      description:
        "The uterus, also called the womb, is a muscular organ in the pelvis. It is where a pregnancy can develop.",
      fact:
        "The uterus has a muscular wall and an inner lining that changes during the menstrual cycle."
    },

    endometrium: {
      title: "Endometrium",
      description:
        "The endometrium is the inner lining of the uterus. It changes in response to hormones during the menstrual cycle.",
      fact:
        "If pregnancy does not occur, the functional layer of the endometrium is shed during menstruation."
    },

    cervix: {
      title: "Cervix",
      description:
        "The cervix is the lower, narrow part of the uterus that connects the uterus to the vagina.",
      fact:
        "The cervix produces mucus and changes during different reproductive processes. Cervical screening can help identify changes that may lead to cervical cancer."
    },

    vagina: {
      title: "Vagina",
      description:
        "The vagina is an elastic muscular canal connecting the cervix to the outside of the body.",
      fact:
        "Menstrual blood passes through the vagina. It is also involved in sexual intercourse and childbirth."
    },

    vulva: {
      title: "Vulva",
      description:
        "The vulva refers to the external genital structures, including the labia, clitoris and vaginal opening.",
      fact:
        "The vulva and vagina are not the same thing. The vulva is external, while the vagina is an internal canal."
    }
  };


  const anatomyButtons = document.querySelectorAll("[data-organ]");

  anatomyButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const organ = anatomyInformation[button.dataset.organ];

      if (!organ) {
        return;
      }

      document.getElementById("organ-title").textContent = organ.title;
      document.getElementById("organ-description").textContent =
        organ.description;
      document.getElementById("organ-fact").textContent = organ.fact;

      anatomyButtons.forEach(function(item) {
        const selected = item === button;

        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    });
  });


  /* MENSTRUAL CYCLE PHASES */

  const cyclePhases = {
    menstruation: {
      number: "PHASE 01",
      title: "Menstruation",
      description:
        "Menstruation is when blood and tissue from the uterine lining leave the body through the vagina. It marks the beginning of a new menstrual cycle.",
      process:
        "The functional layer of the uterine lining is shed following changes in reproductive hormone levels.",
      guidance:
        "Bleeding patterns and duration vary. Severe pain, very heavy bleeding or symptoms affecting daily life deserve medical assessment."
    },

    follicular: {
      number: "PHASE 02",
      title: "Follicular phase",
      description:
        "The follicular phase begins on the first day of menstruation and continues until ovulation. Developing ovarian follicles respond to hormonal signals.",
      process:
        "Follicle-stimulating hormone supports follicle development. Oestrogen levels generally rise as a follicle develops.",
      guidance:
        "The length of this phase varies. This is one reason menstrual cycles do not all have the same length."
    },

    ovulation: {
      number: "PHASE 03",
      title: "Ovulation",
      description:
        "Ovulation is the release of an egg cell from an ovary. It is usually triggered by a surge in luteinising hormone.",
      process:
        "An egg cell is released and may be available for fertilisation for a limited period.",
      guidance:
        "Ovulation timing varies and cannot be reliably predicted by assuming it always occurs on day 14."
    },

    luteal: {
      number: "PHASE 04",
      title: "Luteal phase",
      description:
        "After ovulation, the structure left behind in the ovary becomes the corpus luteum and produces progesterone.",
      process:
        "Progesterone helps prepare and maintain the uterine lining. If pregnancy does not occur, hormone levels fall and menstruation follows.",
      guidance:
        "Some people experience premenstrual symptoms during this phase. Severe or disruptive symptoms should be discussed with a healthcare professional."
    }
  };


  const phaseButtons = document.querySelectorAll("[data-phase]");

  phaseButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const phase = cyclePhases[button.dataset.phase];

      if (!phase) {
        return;
      }

      document.getElementById("phase-number").textContent = phase.number;
      document.getElementById("phase-title").textContent = phase.title;
      document.getElementById("phase-description").textContent =
        phase.description;
      document.getElementById("phase-process").textContent =
        phase.process;
      document.getElementById("phase-guidance").textContent =
        phase.guidance;

      phaseButtons.forEach(function(item) {
        const selected = item === button;

        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    });
  });

});
