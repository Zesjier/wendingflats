/*
 *
 * This is the JS to implement the UI for my text based anventure game
 * "Don't Eat The Food"
 *
 * All code related to data structures comes from me asking my roomate
 * how to declare them and then attempting to apply CSE 373 concepts to
 * javascript and somehow succeeding
 */

"use strict";
(function() {
  window.addEventListener("load", init);
  let soFar = "";
  let paths = new Map();

  /**
   * Sets the page as it should appear at the start of the game,
   * sets the start button, and fills the narative map
   */
  function init() {
    setScript();
    let start = qs("#start-btn");
    start.addEventListener("click", startGame);
  }

  /**
   * Changes the view of the page from the title screen to
   * the actual game
   * @param {event} e - the event listener that causes this
   *                    function to run
   */
  function startGame() {
    let title = id("title");
    let naration = id("narative");
    title.classList.add("hidden");
    naration.classList.remove("hidden");
    buildGame(paths.get(""));
  }

  /**
   * Moves the scene down the path of the given choice, replacing
   * the current narative text and choices with new ones
   * @param {integer} num - the number coresponding to the chosen choice
   * @param {event} e - the event listener that causes this
   *                    function to run
   */
  function makeChoice(num) {
    soFar += num;
    if (paths.get(soFar)[0] === "death" || paths.get(soFar)[0] === "end") {
      buildConclusion(paths.get(soFar));
    } else {
      buildGame(paths.get(soFar));
    }
  }

  /**
   * Changes the narative text and choices on the screen to
   * different text as defined by textList
   * @param {list} textList - the list of text that should replace the current text, in the
   *                          form [<narative text>, <choice 1>, <choice 2>, ... <last chioce>]
   */
  function buildGame(textList) {
    scrubChoices();
    let description = id("description");
    description.textContent = textList[0];

    for (let i = 1; i < textList.length; i++) {
      addChoice(textList[i]);
    }
    setChoiceEvents();
  }

  /**
   * Adds a new choice to the list of choices
   * @param {string} choiceText - the text of the choice being added
   */
  function addChoice(choiceText) {
    let choices = id("choice-block");
    let choice = gen("li");
    choice.textContent = choiceText;
    choice.classList.add("choice");
    choices.appendChild(choice);
  }

  /**
   * Goes through the list of choices and makes each choice selectable
   */
  function setChoiceEvents() {
    let allChoices = qsa(".choice");
    for (let i = 0; i < allChoices.length; i++) {
      allChoices[i].addEventListener("click", () => {
        makeChoice(i + 1);
      });
    }
  }

  /**
   * Removes all choices currently in the choice list
   */
  function scrubChoices() {
    let choices = id("choice-block");
    choices.innerHTML = "";
  }

  /**
   * Moves the view to either the end screen or death screen, as indicated by textList,
   * and fills in the title of that conclusion, the number associated with that
   * conclusion, and the narative description of the conclusion - all as directed
   * by textList
   * @param {list} textList - the list of text that should fill in the conclusion text, in the
   *                          form [<conclusion type>, <title>, <conclusion number>, <naration>]
   */
  function buildConclusion(textList) {
    let section = id(textList[0]);
    section.classList.remove("hidden");
    let game = id("game");
    game.classList.add("hidden");
    let name = section.querySelector("h2");
    name.textContent = textList[1];
    let quant = section.querySelector(".quant");
    quant.textContent = textList[2];
    let text = section.querySelector("p");
    text.textContent = textList[3];
  }

  /**
   * Fills the map paths with the correct patterns of choice numbers
   * mapped to the text associated with those choice patterns
   */
  function setScript() {
    paths.set("", ["You take one wrong turn in the woods late at night," +
    " and suddenly you find yourself at the center of a grand party full" +
    " of lively music and guests who's appearance you think will be seared" +
    " into your memory forever. You realize that you have found yourself in a" +
    " gathering of the Fair Folk. One wrong move could be your last. Three diferent " +
    " fae seem to be looking at you, and you have a feeling it would be rude of you not" +
    " to talk to one of them. In a gathering such as this, rudeness would likely result " +
    " in an untimely departure from far more that just the party.",
    "Go toward the woman with the dress made of teeth",
    "Go toward the woman with transparent skin shimmering hair",
    "Go toward the woman without gravity"]);
    paths.set("1", ["She offers you a deep red plum, long past it’s season.",
    "Accept the plum", "Gesture for her to eat it.", "Politely refuse."]);
    paths.set("11", ["death", "You should have read the title", "one",
    "The first rule of the fey is not to eat or drink their food," +
    " if you ever want to see your home again. The missing person posters plaster" +
    " your little hometown for a few months before fading and eventually just washing" +
    " away."]);
    paths.set("12", ["She smiles and eats the plum herself. As she does, you are treated to" +
    " a view of the long, spindly needles that serve as her teeth. She notices you staring" +
    " and you qickly look down at her feet - noticing her blue satin shoes." +
    " She hooks one long, stone-cold finger under your chin and brings your eyes up to" +
    " the place her's should be. \"Tell me, soft one,\" she says, \"what do you think of" +
    " my dress?\"", "Tell her you find it grotesque.", "Tell her that it's pretty nice",
    "Tell her that you find it terrifying.", "Tell her you find it exceedingly fashionable.",
    "Tell her that it's nice, but doesn't quite match with her shoes"]);
    paths.set("121", ["death", "Fatal Faux Pas", "two", "The fae are a fickle bunch," +
    " and it is never a good idea to offend them. You would likely ponder this fact" +
    " further were your brain still connected to your body."]);
    paths.set("122", ["death", "Really Nothing Special", "three", "You have the misfortune" +
    " of becoming dreadfully boring to your fae companions. Those who say that the" +
    " worst thing you can do is pique a sidhe’s interest have clearly never seen what" +
    " happens when you lose it."]);
    paths.set("123", ["She smiles at you, and you could swear the smile spreads" +
    " farther than the size of her mouth should reasonably allow. \"I like you,\"" +
    " she says after a long pause, and laughs at a joke no one told.",
    "Next"]);
    paths.set("1231", ["end", "The Bone Witch", "one", "For months afterword you find" +
    " teeth and antlers of various shapes and species hidden under all the pillows" +
    " in your house – on your bed, your sofa, below the tiny decorative cushion over" +
    " your fireplace, and even pressed beneath your mattress the one time you dared" +
    " to look. You store all of them in a collection of glass jars you place on your" +
    " kitchen windowsill. The last thing you find, exactly 300 days after your night" +
    " in the woods, is the full skeleton of an English raven, it’s beak plated" +
    " with silver."]);
    paths.set("124", ["death", "No One Likes a Suck Up", "four", "Your attempts to be" +
    " polite and courteous were admirable, but ultimately came across as hollow" +
    " and disingenuous. Your body is found two days later, hung from the top of" +
    " a pine tree by your small intestine."]);
    paths.set("125", ["death", "Touched a sore spot", "five", "It wasn’t really your fault," +
    " you couldn’t have known how touchy she was about her shoes," +
    " but that doesn’t stop her from deciding that your body no longer really" +
    " needs a spleen."]);
    paths.set("13", ["death", "Fatal Faux Pas", "two", "The fae are a fickle bunch," +
    " and it is never a good idea to offend them. You would likely ponder this fact" +
    " further were your brain still connected to your body."]);
    paths.set("2", ["As you approach this fae, you notice that the shimmer in her hair" +
    " comes from little crystals covering each strand. She gives you a sweet smile, and" +
    " for a moment you cou almost forget where you are were it not for the sharp teeth visible" +
    " behind her transparent lips. \"Well don't you seem interesting,\" she says " +
    " whith just the hint of a laugh in the back of her voice. \"What is your name?\"",
    "Give her your name", "Say nothing", "Give her a fake name"]);
    paths.set("21", ["death", "True Names Have Power", "six", "You should have known it was" +
    " a trap, but she seemed so sweet. Your fate is still a mystery, as you were never" +
    " seen again."]);
    paths.set("22", ["death", "The Price of Silence", "seven", "They say the wise man knows" +
    " when to hold his tongue. Unfotunatly for you, that is the only part of you they ever" +
    " found."]);
    paths.set("23", ["\"Sparrow,\" she says, twirling the fake name you gave her between her " +
    " ever-visible teeth like a tough piece of steak. She seems to ponder it for a moment," +
    " and then extends one long hand to you.", "Shake her hand", "Embrace her",
    "Kiss her hand"]);
    paths.set("231", ["death", "Really Nothing Special", "three", "You have the misfortune" +
    " of becoming dreadfully boring to your fae companions. Those who say that the" +
    " worst thing you can do is pique a sidhe’s interest have clearly never seen what" +
    " happens when you lose it."]);
    paths.set("232", ["She stiffens for a moment, and then wraps her long arms around you." +
    " She smells like an old memory of visiting your grandmother's house by the ocean.",
    "Next"]);
    paths.set("2321", ["end", "The Salt Witch", "two", "After that night your life seems to go " +
    " back to normal. It almost feels like the party in the woods was a distant dream. It is" +
    " a few months later that you realize the antique salt shaker your grandmother left you " +
    " is perpetually full."]);
    paths.set("233", ["death", "You Should See Lot's Wife", "eight", "Her skin tastes " +
    " like cool sea water. You can feel tiny crystals begining to form on your lips." +
    " Four days later, two young girls find a large pile of salt in the middle of the" +
    " woods, with no signs as to how it got there."]);
    paths.set("3", ["It seems as though this woman's body is obeying several different" +
    " laws of physics all at once, and none can truly agree with another. She stares at you," +
    " and mouths something you can't quite make out. She holds out her hand, revealing" +
    " an ornate harmonica, carved with the image of a sailboat with the wind in it's sails.",
    "Refuse to take it", "Accept the offering"]);
    paths.set("31", ["She mouths something else, still silent and incomprehensible." +
    " It seems like she wants an answer.", "Agree", "Disagree", "Say nothing"]);
    paths.set("311", ["death", "Should Have Read The Terms And Agreements", "nine",
    "You think, as you feel the air being sucked from your lungs, that you might" +
    " have been better off not agreeing to something before you knew what it was." +
    " And then you can't think anything at all."]);
    paths.set("312", ["death", "Really Nothing Special", "three", "You have the misfortune" +
    " of becoming dreadfully boring to your fae companions. Those who say that the" +
    " worst thing you can do is pique a sidhe’s interest have clearly never seen what" +
    " happens when you lose it."]);
    paths.set("313", ["end", "The Wind Witch", "three", "She narrows her eyes at " +
    " you, and for a moment you think you have made a fatal mistake. The light breeze" +
    " picks up into a torential wind, and when it finally stops you find youself" +
    " alone in the woods."]);
    paths.set("32", ["death", "Everything Comes With A Price", "ten", "The problem with" +
    " accepting gifts from the fair folk is that they always come with a price." +
    " A fact I'm sure you are all too aware of now."]);
  }

  // The following four functions and documentation were written by the staff of CSE 154
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns an array of DOM objects that match the given selector.
   * @param {string} selector - query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();