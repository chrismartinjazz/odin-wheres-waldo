# Where's Waldo

## Spec

- Large photograph with elements user meant to find
- Use makes selections for each element and given feedback on whether correct or not
  - User clicks a photo, targeting box around that portion of photo appears
  - Box includes list of possible elements

## Steps

- DONE Choose an initial photo
- DONE Identify where each element is by name and pixel position
- Build front end functionality
  - DONE Home page with link to photo page
  - DONE Photo page shows image
  - DONE Click coordinates can be tested against a target location, scaling with image size
  - Add functionality to click a photo, show targeting box with options, choose option, remove targeting box
  - Hard coded coordinates for elements
  - Add error messages / success markers
- Build back end
  - Add coordinates to database
  - Add validation if clicked correct place
    - Normalize across different screen sizes
- Tie back and front end together
  - State includes the coordinates for elements
  - Front end calls back end to validate selections
  - Add time tracking on the server side from page load until all elements identified
  - Add on completion of round, popup asks for name and record time
  - Deal with anonymous users
- Load more images into database
- Add photo selection screen
- Add score / time tracking to photo selection screen
  - All time high score
  - Today high score

## Thinking

### General Approach

I'll use the basic structure shown in the rails_react_recipe tutorial. This means a Rails app where the index.html is completely taken over by React.

I think this means I have to start by making a Rails app, following the steps to get React to take over front end, and then go ahead and build it within the javascript folder.

### Database

Images

- id
- src (url)
- title (text)
- elements (json/array of objects)
  - name (object)
  - x-min (whole number)
  - x-max (whole number)
  - y-min (whole number)
  - y-max (whole number)
  
Scores

- image.id
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
