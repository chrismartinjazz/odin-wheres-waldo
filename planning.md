# Where's Waldo

## Spec

- Large photograph with elements user meant to find
- Use makes selections for each element and given feedback on whether correct or not
  - User clicks a photo, targeting box around that portion of photo appears
    - [I don't understand the point of having a targetting box appear? The user knows where they clicked, and the goal is to click on the element - not to create a targetting box that includes the element. I won't add this.]
  - Box includes list of possible elements
    - [Again I don't understand this requirement. Instead, I'll make a selection box that allows user to choose the element they think they have clicked on. This means the user can't just click randomly and complete the challenge.]

## Steps

- DONE Choose an initial photo
- DONE Identify where each element is by name and pixel position
- Build front end functionality
  - DONE Home page with link to photo page
  - DONE Photo page shows image
  - DONE Click coordinates can be tested against a target location, scaling with image size
  - DONE Add functionality to click a photo, choose option
  - DONE Hard coded coordinates for elements
  - **Add error messages / success markers**
- DONE Build back end
  - DONE Add coordinates to database
  - DONE Add validation if clicked correct place
    - DONE Normalize across different screen sizes - (normalization handled in React, as front end know image location and size on screen)
- Tie back and front end together
  - DONE Front end calls back end to validate selections
  - Add time tracking on the server side from page load until all elements identified
    - DONE On page load, send a message to backend to add a "score" record, which will then have a "created_at" field.
      - DONE Store the id of the record in useState.
    - On finding all items
      - DONE Send a message to the server to update the "score" record with the completed time
      - DONE Report the score to the user
      - Modal Form allowing user to input a name for their high-score
      - When game over, show a form asking the user to enter their name or initials for their score.
        - If they don't enter a name... save as "Anonymous"
      - Then redirect to a victory page:
        - Show scores recorded against this image
        - Show all-time high score and today high score
        - Links to try same image again or return to homepage
    - Add visual elements
      - DONE Add a visible timer on the image page
      - DONE Timer stops when all items found
      - Timer matches the server time for score!
- Load more images into database
- DONE Add photo selection screen
- Add score / time tracking to photo selection screen
  - All time high score
  - Today high score

## Thinking

### General Approach

INITIAL

I'll use the basic structure shown in the rails_react_recipe tutorial. This means a Rails app where the index.html is completely taken over by React.

I think this means I have to start by making a Rails app, following the steps to get React to take over front end, and then go ahead and build it within the javascript folder.

AFTER BASICS COMPLETE

When a user completes a seek-and-find, need to add a congratulations or success message.

### Database

Image

- id
- src (url)
- title (text)
- width (in pixels - whole number)
- height (in pixels - whole number)

has_many: elements
has_many: scores

Element

- image_id
- name (object)
- x1 (whole number)
- x2 (whole number)
- y1 (whole number)
- y2 (whole number)

Score

- image_id
- date
- name (text)
- time (number of seconds)

### Back end

Images and coordinates will be preloaded (no functionality to add these in the website). Users won't have an account or login. Times can't be deleted on the website (deleted manually from back end if needed).

So no update or destroy paths required.

- Read one image
- Read all images
- Read scores
  - All scores
  - Most recent scores
  - Shortest score by image
  - Shortest score by image and date
- Create score linked to an image id

### Front end

```txt
Home
  useContext: Load all the image data on page load and store here
  useState: High scores for images
  Images      // Link to Image
    Scores    // Show High Score. Link to Scores page for that image.

Image
  SelectionBox  // SelectionBox shows elements that are not yet found. In a circle? With image of found item, rather than text? Sounds complicated but maybe. Click then drag to selection, release to make selection.
  Timer
  ProgressBar   // Shows how many of the elements have been found

Scores
  HighScores  // Show select scores
  AllScores   // Show all scores, sort by date or by score, filter by name
```

## Images

Name them as e.g. ww-1-1 (where's waldo, book 1, scene 1).

- ww-1-1.jpeg
  - [Link](https://i.imgur.com/LnzE1JH.jpeg)
  - Size 791.6kb: 2040x1260x24b jpeg
  - width: 2040
  - height: 1260
  - Elements
    - Waldo
      - x-min: 858, y-min: 925
      - x-max: 922, y-max: 1029
    - Woof
      - x-min: 1160, y-min: 388
      - x-max: 1182, y-max: 402
    - Wenda
      - x-min: 878, y-min: 746
      - x-max: 906, y-max: 793
    - Wizard Whitebeard
      - x-min: 1327, y-min: 955
      - x-max: 1376, y-max: 999
    - Odlaw
      - x-min: 1174, y-min: 1190
      - x-max: 1217, y-max: 1236
    - Key
      - x-min: 1625, y-min: 1158
      - x-max: 1646, y-max: 1170
    - Bone
      - x-min: 1073, y-min: 1071
      - x-max: 1093, y-max: 1084
    - Camera
      - x-min: 1780 , y-min: 1128
      - x-max: 1803, y-max: 1141
    - Scroll
      - x-min: 1307, y-min: 1194
      - x-max: 1329, y-max: 1211
    - Binoculars
      - x-min: 1765, y-min: 718
      - x-max: 1801, y-max: 739

Not worrying about the Waldo-Watchers, infiltrator character, postcard's riddles, the items that Waldo drops, or the list of extras at back of book.