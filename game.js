let score = 0;

function getSadInterval() {
  return Date.now() + 1000;
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

function getKingStatus() {
  return Math.random() > 0.9;
}

const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-0")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-1")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-2")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-3")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-4")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-5")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-6")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-7")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-8")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-9")
  }
];

function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.next = getSadInterval();
      mole.status = "leaving";
      mole.node.children[0].src = "./img/mole-leaving.png";
      mole.king
        ? (mole.node.children[0].src = "./img/king-mole-leaving.png")
        : (mole.node.children[0].src = "./img/mole-leaving.png");
      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      mole.node.children[0].classList.add("gone");
      mole.king
        ? (mole.node.children[0].src = "./img/king-mole-leaving.png")
        : (mole.node.children[0].src = "./img/mole-leaving.png");
      break;
    case "gone":
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.next = getHungryInterval();
      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      mole.king
        ? (mole.node.children[0].src = "./img/king-mole-hungry.png")
        : (mole.node.children[0].src = "./img/mole-hungry.png");
      break;
    case "hungry":
      mole.status = "sad";
      mole.next = getSadInterval();
      mole.node.children[0].classList.remove("hungry");
      mole.king
        ? (mole.node.children[0].src = "./img/king-mole-sad.png")
        : (mole.node.children[0].src = "./img/mole-sad.png");
      break;
  }
}

function feed(e) {
  if (e.target.tagName !== "IMG" || !e.target.classList.contains("hungry")) {
    return;
  }

  const mole = moles[Number(e.target.dataset.index)];

  mole.status = "fed";
  mole.next = getSadInterval();
  mole.king ? (score += 2) : score++;
  mole.king
    ? (mole.node.children[0].src = "./img/king-mole-fed.png")
    : (mole.node.children[0].src = "./img/mole-fed.png");
  mole.node.children[0].classList.remove("hungry");

  if (score >= 10) {
    win();
  }

  document.querySelector(".worm-container").style.width = `${10 * score}%`;
}

function win() {
  document.querySelector(".bg").classList.add("hide");
  document.querySelector(".win").classList.remove("hide");
}

let runAgain = Date.now() + 100;

function nextFrame() {
  const now = Date.now();
  if (runAgain <= now) {
    for (let element of moles) {
      if (element.next <= now) {
        getNextStatus(element);
      }
    }
    runAgainAt = now + 100;
  }
  requestAnimationFrame(nextFrame);
}

document.querySelector(".bg").addEventListener("click", feed);

nextFrame();
