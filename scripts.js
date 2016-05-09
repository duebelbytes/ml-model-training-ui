const img = document.getElementById("document");
const container = document.getElementById("container");
const zoomControl = document.getElementById("zoom-control");
const descriptionForm = document.getElementById("description-form");
const submitButton = document.getElementById("submit-button");
const overpanel = document.getElementById("overpanel");
const toggleButton = document.getElementById("toggle");
let currentSelectedBox = null;
let ocrDataCache = null;

const drawBoxes = (ocrData, scale) => {
  container.querySelectorAll(".box").forEach((box) => box.remove());

  ocrData.textAnnotations.forEach((item, index) => {
    const vertices = item.boundingPoly.vertices;
    const x = vertices[0].x * scale;
    const y = vertices[0].y * scale;
    const width = (vertices[1].x - vertices[0].x) * scale;
    const height = (vertices[2].y - vertices[0].y) * scale;

    const box = document.createElement("div");
    box.className = "box";
    box.style.left = `${x / 16}rem`;
    box.style.top = `${y / 16}rem`;
    box.style.width = `${width / 16}rem`;
    box.style.height = `${height / 16}rem`;
    box.dataset.index = index; // Added data-index attribute

    box.addEventListener("click", () => {
      selectBox(box, item.description, index);
    });

    container.appendChild(box);
  });
};

const buildForm = (ocrData) => {
  descriptionForm.innerHTML = "";

  ocrData.textAnnotations.forEach((item, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    const input = document.createElement("input");
    input.type = "text";
    input.value = item.description;
    input.className = "correction";
    input.dataset.index = index;
    input.dataset.originalValue = item.description;
    input.addEventListener("focus", () => {
      const box = container.querySelector(`.box[data-index="${index}"]`);
      if (box) selectBox(box, item.description, index);
    });

    const select = document.createElement("select");
    select.className = "error-category";
    select.dataset.index = index;
    select.required = true;

    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Error type";
    emptyOption.selected = true;
    emptyOption.disabled = true;
    select.appendChild(emptyOption);

    const options = ["Misread", "Incomplete", "Bad format", "Other"];
    options.forEach((optionText) => {
      const option = document.createElement("option");
      option.value = optionText;
      option.textContent = optionText;
      select.appendChild(option);
    });

    inputGroup.appendChild(input);
    inputGroup.appendChild(select);

    descriptionForm.appendChild(inputGroup);
  });
};

const selectBox = (box, description, index) => {
  if (currentSelectedBox) {
    currentSelectedBox.classList.remove("selected");
  }
  box.classList.add("selected");
  currentSelectedBox = box;

  const input = descriptionForm.querySelector(`input[data-index="${index}"]`);
  if (input) {
    input.scrollIntoView({ behavior: "smooth", block: "center" });
    input.focus();
  } else {
    console.error(`Input element with data-index="${index}" not found.`);
  }
};

const handleSubmit = () => {
  const formData = new FormData(descriptionForm);
  const data = [];

  formData.forEach((value, key) => {
    console.log(`Key: ${key}, Value: ${value}`);
  });

  const inputs = descriptionForm.querySelectorAll("input[data-index]");
  inputs.forEach((input) => {
    const index = input.dataset.index;
    const originalValue = input.dataset.originalValue;
    const value = input.value;

    const select = descriptionForm.querySelector(
      `select[data-index="${index}"]`
    );
    const errorType = select ? select.value : undefined;

    const item = {
      index: index,
      originalDescription: originalValue,
      correctedDescription: value !== originalValue ? value : undefined,
      errorType: errorType !== "" ? errorType : undefined,
    };

    console.log("Processing item:", item);
    data.push(item);
  });

  console.log("Submitted data:", JSON.stringify(data, null, 2));
};

submitButton.addEventListener("click", handleSubmit);

img.onload = () => {
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const scaleX = img.clientWidth / imgWidth;

  fetch("ocr_response.json")
    .then((response) => response.json())
    .then((ocrData) => {
      console.log("OCR data loaded:", ocrData);
      ocrDataCache = ocrData; // Cache the OCR data
      drawBoxes(ocrData, scaleX);
      buildForm(ocrData);

      zoomControl.addEventListener("input", () => {
        const zoomLevel = parseFloat(zoomControl.value);
        img.style.transform = `scale(${zoomLevel})`;
        img.style.transformOrigin = "top left";
        drawBoxes(ocrDataCache, scaleX * zoomLevel);
      });
    })
    .catch((error) => console.error("Error loading OCR data:", error));
};

toggleButton.addEventListener("click", () => {
  const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
  toggleButton.setAttribute("aria-expanded", !isExpanded);
  overpanel.setAttribute("aria-hidden", isExpanded);
  overpanel.classList.toggle("hidden");
});
