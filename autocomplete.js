// autoComplete.js on typing event emitter
document
  .querySelector("#autoComplete")
  .addEventListener("autoComplete", (event) => {
    console.log(event.target);
  });
// The autoComplete.js Engine instance creator
const autoCompletejs = new autoComplete({
  data: {
    src: () => {
      // Loading placeholder text
      const data = ["Montreal", "London", "New York", "Chicago"];
      return data;
    },
    cache: false,
  },
  sort: (a, b) => {
    if (a.match < b.match) return -1;
    if (a.match > b.match) return 1;
    return 0;
  },
  placeHolder: "Food & Drinks",
  selector: "#autoComplete",
  threshold: 0,
  debounce: 0,
  searchEngine: "strict",
  highlight: true,
  maxResults: 5,
  resultsList: {
    render: true,
    container: (source) => {
      source.setAttribute("id", "autoComplete_list");
    },
    destination: document.querySelector("#autoComplete"),
    position: "afterend",
    element: "ul",
  },
  resultItem: {
    content: (data, source) => {
      source.innerHTML = data.match;
      source.setAttribute("id", "autocomplete-item");
    },
    element: "li",
  },
  noResults: () => {
    const result = document.createElement("li");
    result.setAttribute("class", "no_result");
    result.setAttribute("tabindex", "1");
    result.innerHTML = "No Results";
    document.querySelector("#autoComplete_list").appendChild(result);
  },
  onSelection: (feedback) => {
    const selection = feedback.selection.value.food;
    // Render selected choice to selection div
    document.querySelector(".selection").innerHTML = selection;
    // Clear Input
    document.querySelector("#autoComplete").value = "";
    // Change placeholder with the selected value
    document
      .querySelector("#autoComplete")
      .setAttribute("placeholder", selection);
    // Concole log autoComplete data feedback
    console.log(feedback);
  },
});
