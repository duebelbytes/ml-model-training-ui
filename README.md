# OCR Training UI

OCR Training UI is an Optical Character Recognition (OCR) training tool designed to help users annotate and correct text extractions from scanned documents. This project aims to provide a user-friendly interface for improving the accuracy of OCR technology by allowing manual corrections and categorization of errors.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## Features
- **Zoom Control**: Adjust the zoom level of the document for better visibility.
- **Annotation Boxes**: Visualize the OCR text extraction boxes on the document.
- **Error Categorization**: Manually correct text and categorize errors.
- **Toggle Panel**: Easily toggle the annotation panel for a streamlined interface.

## Demo
A live demo of the project can be found [here](https://duebelbytes.github.io/ml-model-training-ui/).

## Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/duebelbytes/ocr-training-ui.git
    ```

2. Navigate to the project directory:

    ```bash
    cd ocr-training-ui
    ```

3. Open the `index.html` file in your preferred web browser to run the application locally.

## Usage
1. Load a document by replacing `record.jpg` with your own image in the `img` tag within `index.html`.
2. Adjust the zoom level using the slider in the control panel to get a better view of the document.
3. Click on the annotation boxes to select them and manually correct the text in the input fields provided in the right panel.
4. Categorize the errors using the dropdown menu next to each text input field.
5. Toggle the annotation panel using the button in the header to hide or show the correction form.
6. Click the `Validate` button to submit your corrections (note: this currently only logs the data to the console).

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

    ```bash
    git checkout -b feature-name
    ```

3. Make your changes and commit them:

    ```bash
    git commit -m "Description of feature or bug fix"
    ```

4. Push to the branch:

    ```bash
    git push origin feature-name
    ```

5. Open a pull request describing your changes.
