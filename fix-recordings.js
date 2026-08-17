const fs = require('fs');
const path = require('path');

const meetingsDir = path.join('c:/Users/sanke/OneDrive/Desktop/podman.io/podman.io/meetings');
const tsxFile = path.join('c:/Users/sanke/OneDrive/Desktop/podman.io/podman.io/src/pages/meetings.tsx');

let tsxContent = fs.readFileSync(tsxFile, 'utf8');

const files = fs.readdirSync(meetingsDir).filter(f => f.endsWith('.md'));

const entries = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(meetingsDir, file), 'utf8');
  
  // parse frontmatter
  const match = content.match(/---\n([\s\S]*?)\n---/);
  if (match) {
    const fm = match[1];
    const getField = (field) => {
      const m = fm.match(new RegExp(`${field}:\\s*"(.*?)"`)) || fm.match(new RegExp(`${field}:\\s*(.*?)$`, 'm'));
      return m ? m[1].replace(/^"|"$/g, '') : '';
    };

    const title = getField('title');
    const dateStr = getField('date');
    const type = getField('type');
    const recording = getField('recording');
    const slug = getField('slug');

    entries.push(`  { date: '${dateStr}', title: '${title.replace(/'/g, "\\'")}', type: '${type}', recording: '${recording}', slug: '${slug}' },`);
  }
}

// sort by date descending
entries.sort((a, b) => {
  const dateA = a.match(/date: '(.*?)'/)[1];
  const dateB = b.match(/date: '(.*?)'/)[1];
  return dateB.localeCompare(dateA);
});

const newArray = `const meetingEntries: MeetingEntry[] = [\n${entries.join('\n')}\n];`;

const newTsx = tsxContent.replace(/const meetingEntries: MeetingEntry\[\] = \[[\s\S]*?\];/, newArray);

fs.writeFileSync(tsxFile, newTsx);
console.log('Successfully updated meetings.tsx with recording links!');
