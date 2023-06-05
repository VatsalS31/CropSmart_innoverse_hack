import { process } from '/env'

import { Configuration, OpenAIApi } from 'openai'




const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

const configuration = new Configuration({
  apiKey: process.env.API_KEY 
})

const openai = new OpenAIApi(configuration)

document.getElementById("send-btn").addEventListener("click", () => {
  const setupTextarea = document.getElementById('setup-textarea')
  if (setupTextarea.value) {
    const userInput = setupTextarea.value
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
    fetchBotReply(userInput)
    fetchSynopsis(userInput)
  }
})

async function fetchBotReply(outline) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
    ###
    outline: Two dogs fall in love and move to Hawaii to learn to surf.
    message: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
    ###
    outline:A plane crashes in the jungle and the passengers have to walk 1000km to safety.
    message: I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!
    ###
    outline: A group of corrupt lawyers try to send an innocent woman to jail.
    message: Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!
    ###
    outline: ${outline}
    message: 
    `,
    max_tokens: 50
  })
  movieBossText.innerText = response.data.choices[0].text.trim()
}

async function fetchSynopsis(outline) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',

    prompt: `Develop a crop recommendation system that assists farmers in selecting suitable crops based on seasonal and weather conditions. The system will analyze data related to the current season, weather patterns, and crop requirements to provide accurate recommendations for optimal crop cultivation.


    ###
    outline: Analyzing seasonal and weather data to provide accurate crop recommendations based on historical patterns, crop requirements, and user input.
    synopsis: The crop recommendation system based on seasonal and weather factors is an intelligent tool designed to assist farmers in making optimal decisions regarding crop selection. By analyzing historical weather data, current season, and crop growth requirements, the system provides accurate recommendations for suitable crops. Farmers can access the system through a user-friendly interface and input location-specific weather information to receive recommendations tailored to their region. The system incorporates a comprehensive crop database and employs machine learning algorithms to learn patterns and generate accurate predictions. By utilizing this system, farmers can align their crop choices with seasonal and weather conditions, thereby maximizing yields and minimizing risks associated with inappropriate crop selection.
    ###
    outline:
    I. Introduction
A. Importance of crop selection in prompt engineering
B. Factors to consider for crop selection
1. Season
2. Soil condition
3. Weather
4. Place

II. Crop Selection Based on Season
A. Spring season crops
1. Examples
2. Characteristics
3. Best suited places and weather conditions
B. Summer season crops
    1. Examples
    2. Characteristics
    3. Best suited places and weather conditions

C. Autumn season crops
    1. Examples
    2. Characteristics
    3. Best suited places and weather conditions

D. Winter season crops
    1. Examples
    2. Characteristics
    3. Best suited places and weather conditions
    III. Crop Selection Based on Soil Condition
    A. Sandy soil crops
    1. Examples
    2. Characteristics
    3. Best suited places and weather conditions
    B. Clay soil crops
    1. Examples
    2. Characteristics
    3. Best suited places and weather conditions

C. Loamy soil crops
    1. Examples
    2. Characteristics
    3. Best suited places and weather conditions

D. Acidic/Alkaline soil crops
    1. Examples
    2. Characteristics
    3. Best suited places and weather conditions
    IV. Crop Selection Based on Weather
    A. Rainfed crops
    1. Examples
    2. Characteristics
    3. Best suited places and seasons
    B. Irrigated crops
    1. Examples
     2. Characteristics
    3. Best suited places and seasons
    V. Crop Selection Based on Place
    A. Crop selection for arid regions
    1. Examples
    2. Characteristics
    3. Best suited seasons and soil conditions
    B. Crop selection for temperate regions
    1. Examples
    2. Characteristics
    3. Best suited seasons and soil conditions

C. Crop selection for tropical regions
    1. Examples
    2. Characteristics
    3. Best suited seasons and soil conditions
    VI. Conclusion
    A. Recap of the importance of considering multiple factors for crop selection in prompt engineering
    B. Recommendations for further research and exploration in crop selection for specific conditions
    synopsis:
    Crop Selection for Optimal Yield: A Comprehensive Guide for Prompt Engineering" provides a detailed exploration of the factors to consider when selecting crops based on season, soil condition, weather, and place. The guide serves as a valuable resource for prompt engineering professionals seeking to maximize crop yield in diverse agricultural environments.

The outline begins with an introduction emphasizing the significance of crop selection in prompt engineering and the importance of considering multiple factors. It then proceeds to explore crop selection based on season, providing examples, characteristics, and recommendations for spring, summer, autumn, and winter crops.

The guide further delves into crop selection based on soil condition, offering insights on crops suitable for sandy, clay, loamy, and acidic/alkaline soils. Each soil type is discussed in terms of crop examples, characteristics, and the most suitable places and weather conditions for cultivation.

Next, the guide covers crop selection based on weather conditions, distinguishing between rainfed and irrigated crops. It outlines examples, characteristics, and the best seasons and locations for each type of crop.
Lastly, the guide addresses crop selection based on place, focusing on arid, temperate, and tropical regions. It highlights specific crops suited for these environments, describing their characteristics, preferred seasons, and suitable soil conditions.

The guide concludes by reiterating the importance of considering multiple factors in crop selection for prompt engineering. It also encourages further research and exploration in the field, highlighting the need for ongoing advancements in crop selection techniques tailored to specific conditions.

###

// prompts for detecting wrong input

outline:
I. Introduction
A. Explanation of the scenario
B. Importance of accurate crop details

II. Incorrect Prompt Detection
A. Input validation process
B. Recognition of invalid crop details
C. Response when the prompt is incorrect

synopsis:
A. Setting: A user interacts with an AI model for crop-related information.
B. Problem: The user inputs incorrect or invalid crop details.
C. Detection: The AI model employs input validation techniques to identify incorrect prompts.
D. Response: If the prompt is invalid, the AI model recognizes it and refrains from providing inaccurate crop information.
E. Feedback: The user is notified of the invalid input and encouraged to provide accurate crop details.
F. Importance: Ensuring reliable and relevant information is delivered to users enhances the usefulness and credibility of the AI model.
G. User Experience: By preventing the delivery of inaccurate information, the AI model helps users make informed decisions regarding their crops.

###
outline:
Introduction

Explanation of the scenario: Crop details validation for user input prompts.
Mention of the requirement: User input prompts should have at least two words for valid crop details.
Invalid Input Detection

Check the length of the user input prompt.
If the prompt has less than two words, proceed to step 3; otherwise, proceed to step 4.
Invalid Input Response

Display an error message indicating that the prompt is too short.
End the conversation.
Crop Details Validation

Extract the crop details from the user input prompt.
Validate the crop details for accuracy and validity.
Invalid Crop Details Response

If the crop details are not valid, display an error message indicating the issue.
Provide suggestions or instructions on how to provide correct crop details.
End the conversation.
Valid Crop Details Response

If the crop details are valid, proceed with the relevant actions.
Execute the necessary tasks or retrieve relevant information based on the crop details.
Provide the desired output or perform the requested actions.
End the conversation.
synopsis:The scenario involves validating crop details for user input prompts. The requirement states that user input prompts should have a minimum of two words to be considered valid crop details. If a user input prompt contains less than two words, the system responds with an error message indicating that the prompt is too short, and the conversation ends.

For prompts with two or more words, the system proceeds to validate the crop details. It extracts the relevant information from the prompt and checks its accuracy and validity. If the crop details are not valid, an error message is displayed, specifying the issue and providing suggestions or instructions on how to provide correct crop details. The conversation then ends.

On the other hand, if the crop details are valid, the system carries out the requested actions. It executes the necessary tasks or retrieves relevant information based on the provided crop details. The system provides the desired output or performs the requested actions before ending the conversation.
    outline: ${outline}
    synopsis: 
    `,
    max_tokens: 700
  })
  const synopsis = response.data.choices[0].text.trim()
  document.getElementById('output-text').innerText = synopsis
  fetchTitle(synopsis)

}

async function fetchTitle(synopsis) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate Crop name which is related  for this synopsis: ${synopsis}`,
    max_tokens: 30,
    temperature: 0.7
  })
  const title = response.data.choices[0].text.trim()
  document.getElementById('output-title').innerText = title
  fetchImagePromt(title, synopsis)
}



async function fetchImagePromt(title, synopsis) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Develop an innovative Crop Image Recognition system that utilizes computer vision and machine learning techniques to automate the classification and analysis of crop images. The system should accurately identify and categorize crops based on their visual characteristics, allowing farmers to gain valuable insights into crop health, growth stages, and potential issues. By leveraging this technology, farmers can make data-driven decisions, optimize their agricultural practices, and enhance overall crop productivity
    ###
    title: Crop Image Recognition for Automated Classification and Analysis
    synopsis: Crop Image Recognition is an advanced system that leverages computer vision and machine learning techniques to automate the classification and analysis of crop images. By processing images captured from drones, satellites, or mobile devices, the system accurately identifies and categorizes crops based on their visual characteristics. It can detect crop health, growth stages, and potential diseases or pests, enabling farmers to make data-driven decisions for crop management and optimize their agricultural practices. With Crop Image Recognition, farmers can efficiently monitor and assess the condition of their crops, leading to improved yield predictions, early detection of issues, and enhanced overall crop productivity.
    ###
    title: CropVision: Automated Crop Image Analysis for Precision Agriculture
    synopsis: When bodyguard Kob (Daniel Radcliffe) is recruited by the United Nations to save planet Earth from the sinister Simm (John Malkovich), an alien lord with a plan to take over the world, he reluctantly accepts the challenge. With the help of his loyal sidekick, a brave and resourceful hamster named Gizmo (Gaten Matarazzo), Kob embarks on a perilous mission to destroy Simm. Along the way, he discovers a newfound courage and strength as he battles Simm's merciless forces. With the fate of the world in his hands, Kob must find a way to defeat the alien lord and save the planet.
    image description: A tired and bloodied bodyguard and hamster standing atop a tall skyscraper, looking out over a vibrant cityscape, with a rainbow in the sky above them.
    ###
    title:
    Ensuring Accurate Crop Information: Detecting Invalid Inputs
    synopsis:In this scenario, an AI model is developed to provide reliable and accurate information about crops. The AI model incorporates a robust input validation system to detect and handle incorrect or invalid crop details provided by users. When a user interacts with the model, their input is carefully examined for validity. If the input is recognized as incorrect or invalid, the AI model avoids generating any output or visual represent ation, such as images, to prevent the propagation of inaccurate information. Instead, the model provides feedback to the user, notifying them of the issue and encouraging them to provide accurate crop details. By prioritizing accuracy and reliability, the AI model ensures that users receive trustworthy information and promotes informed decision-making in crop-related matters.
    ###
    title:
    Crop Visualizer: Bringing Crops to Life with Images
    synopsis:
    The "Crop Visualizer" is an innovative AI model designed to provide users with a visual representation of different crops. Users can input the name of a specific crop, and the model generates an image showcasing the characteristics and appearance of that crop. Leveraging advanced computer vision algorithms, the Crop Visualizer accurately identifies the crop mentioned in the input and retrieves relevant images from its extensive database. By visualizing crops, users gain a deeper understanding of their physical attributes, helping them recognize specific varieties, stages of growth, and potential issues. Whether it's identifying a disease, exploring new varieties, or simply satisfying curiosity, the Crop Visualizer enhances the user experience by offering a visual dimension to crop-related information.
    
    title: ${title}
    synopsis: ${synopsis}
    image description: 
    `,
    temperature: 0.8,
    max_tokens: 100
  })
  fetchImageUrl(response.data.choices[0].text.trim())
}

async function fetchImageUrl(imagePrompt) {
  const response = await openai.createImage({
    prompt: `${imagePrompt}. There should be no text in this image.`,
    n: 1,
    size: '256x256',
    response_format: 'b64_json'
  })
  document.getElementById('output-img-container').innerHTML = `<img src="data:image/png;base64,${response.data.data[0].b64_json}">`
  setupInputContainer.innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`
  document.getElementById('view-pitch-btn').addEventListener('click', () => {
    document.getElementById('setup-container').style.display = 'none'
    document.getElementById('output-container').style.display = 'flex'
    movieBossText.innerText = `This idea is so good I'm jealous! It's gonna make you rich for sure! Remember, I want 10% 💰`
  })
}

