const path = require('path');
const { getMeetingNotes } = require('../lib/meetings');

module.exports = function meetingNotesPlugin(context) {
  return {
    name: 'meeting-notes-plugin',

    async loadContent() {
      const notesDir = path.join(context.siteDir, 'static/data/meetings/notes');
      return getMeetingNotes(notesDir);
    },

    async contentLoaded({ content, actions }) {
      const { addRoute, createData, setGlobalData } = actions;

      setGlobalData(content);

      const allNotes = [...content.community, ...content.cabal];
      await Promise.all(
        allNotes.map(async note => {
          const noteDataPath = await createData(`meeting-note-${note.slug}.json`, JSON.stringify(note));
          addRoute({
            path: `/community/meetings/${note.slug}`,
            component: '@site/src/components/pages/MeetingNotePage/index.tsx',
            modules: { note: noteDataPath },
            exact: true,
          });
        }),
      );
    },
  };
};
