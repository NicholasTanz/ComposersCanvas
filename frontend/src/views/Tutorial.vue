<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: "Tutorial",
  components: {
    Navbar,
  },
  data() {
    return {
      tutorialSteps: [
        {
          key: 'click',
          shortDesc: 'Select a note',
          longDesc: 'Clicking a note will highlight it red. This indicates that the note is selected.',
          media: '/click-note.gif',
          expanded: false,
        },
        {
          key: 'shift + click',
          shortDesc: 'Select multiple notes',
          longDesc: 'If a note is already highlighted in red, and you shift click a note further down in the music, it will select all notes between. Selected notes will be highlighted red.',
          media: '/shift-click-note.gif',
          expanded: false,
        },
        {
          key: 'a',
          shortDesc: 'Add a note',
          longDesc: 'Pressing "a" adds a default note at the current position. If no note is selected the default is the beginning of the next measure. If a note is selected the default will be next to the selected note.',
          media: '/add-note.gif',
          expanded: false,
        },
        {
          key: 'w',
          shortDesc: 'Move note up',
          longDesc: 'Moves the selected notes up by one line or space on the staff.',
          media: '/move-up.gif',
          expanded: false,
        },
        {
          key: 's',
          shortDesc: 'Move note down',
          longDesc: 'Moves the selected notes down by one line or space on the staff.',
          media: '/move-down.gif',
          expanded: false,
        },
        {
          key: 'shift + w',
          shortDesc: 'Move note half step up',
          longDesc: 'Adds the next sharp to the notes (half-step up)',
          media: '/move-half-up.gif',
          expanded: false,
        },
        {
          key: 'shift + s',
          shortDesc: 'Move note half step down',
          longDesc: 'Adds the next flat to the notes (half-step down).',
          media: '/move-half-down.gif',
          expanded: false,
        },
        {
          key: 'delete',
          shortDesc: 'Delete a note',
          longDesc: 'Deletes the currently selected notes. You can use this to remove mistakes or adjust your melody.',
          media: '/delete-note.gif',
          expanded: false,
        },
        {
          key: 'r',
          shortDesc: 'Toggle rest mode',
          longDesc: 'Toggles the mode to and from rest mode. Using "a" will add a rest in place of a note, helping you shape rhythms more precisely. Reminder you cannot start a new measure with a rest so you will have to switch back to note mode!',
          media: '/rest.gif',
          expanded: false,
        },
        {
          key: '1-6/Note bar',
          shortDesc: 'Note length select',
          longDesc: 'There are two ways to change the type of note you are adding to the canvas. The first is to use the note bar. Hovering over the note icon in the bar will open a dropdown where you can select a new note. Otherwise you can use the keys 1 through 6 to cycle through the notes. 1 corresponds to a whole note, the longest note and 6 is a sixteenth note, the shortest.',
          media: '/note-bar.gif',
          expanded: false,
        },
        {
          key: 'Score Settings',
          shortDesc: 'Breakdown of score settings',
          longDesc: 'To keep any changes press enter! Score title is simply the title of your score. Key signature can be any value in A-G, F#, C#, Bb, Eb, Ab, Db, Fb, or Cb. For time signature, your numerator can be anything but your denominator should be 1, 2, 4, 8, or 16. Finally, a higher tempo will result in a faster playback and lower in a slower playback. Generate pdf will make a pdf in a new page that you can save and save composition will save your composition to your profile page where you can access it again!',
          media: '/score-settings.gif',
          expanded: false,
        },
      ]
    };
  },
  methods: {
    toggleExpand(item) {
      item.expanded = !item.expanded;
    }
  }
};
</script>

<template>
  <div class="container">
    <Navbar />

    <h1 class="title">Interactive Tutorial</h1>
    <p class="subtitle">Click each section to learn more about specific controls and see them in action.</p>

    <div v-for="item in tutorialSteps" :key="item.key" class="tutorial-section">
      <div class="text-side">
        <button class="expand-title">
          <strong class="expand-title">{{ item.key }}</strong>: {{ item.shortDesc }}
        </button>
          <p class="detail-text">
            {{ item.longDesc }}
          </p>
      </div>
        <div class="media-side">
            <img :src="item.media" :alt="item.key + ' demo'" />
        </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background: linear-gradient(to bottom right, #d9e9f4, #98c8e0);
  color: #333;
  padding: 4rem 2rem;
  font-family: "Comic Sans MS", cursive, sans-serif;
  min-height: 100vh;
}

.title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.subtitle {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #444;
}

.tutorial-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  gap: 1rem;
}

@media (min-width: 768px) {
  .tutorial-section {
    flex-direction: row;
    align-items: flex-start;
  }
}

.text-side {
  flex: 1;
  max-width: 600px;
}

.expand-title {
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
  color: #1d4ed8;
  cursor: pointer;
  padding: 0;
  margin-bottom: 0.5rem;
}

.detail-text {
  font-size: 1rem;
  color: #333;
}

.media-side {
  flex: 1;
  display: flex;
  justify-content: center;
}

.media-side img {
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Footer */
.footer {
  text-align: center;
  margin-top: 5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding-top: 2rem;
}
.footer h2 {
  font-size: 1rem;
}
.footer p {
  font-size: 0.9rem;
}
</style>
