const header = {
  title: 'Community',
  subtitle:
    'We want your feedback, issues, patches, and involvement in the development of Podman. **Chat** with us on Slack, IRC, or on our **mailing list**. Submit **issues & pull requests** (see our [CONTRIBUTING guide]() on how.) Participate in one of our twice-monthly community meetings. You are welcome in our community!',
  image: 'images/raw/podman-2-196w-172h.png',
  banner: {
    text: 'To help ensure all feel welcome in the Podman community, we expect all who participate to adhere to our [Code of Conduct](https://github.com/containers/common/blob/main/CODE-OF-CONDUCT.md)',
    icon: 'fa6-regular:handshake',
  },
};

const communityChat = {
  title: 'Chat with the Podman community',
  subtitle:
    'The Podman developers are generally around during CEST and Eastern Time business hours, so please be patient if you’re in another time zone!',
  links: [
    {
      text: '#podman:matrix.org',
      src: '#',
      image: {
        src: '/logos/raw/element-56w-59h.png',
        alt: 'Element Matrix Logo',
      },
    },
    {
      text: '#podman on libera.chat',
      src: '',
      image: {
        src: '/logos/optimized/irc-64wh.webp',
        alt: 'IRC Logo',
      },
    },
    {
      text: 'Podman Discord',
      src: '#',
      icon: 'logos:discord-icon',
    },
    {
      text: 'Slack',
      src: '#',
      icon: 'logos:slack-icon',
    },
  ],
};

const communityMeetings = {
  title: 'Podman Community Meetings',
  subtitle:
    "Many of the maintainers for the Podman project attend both of these meetings, so it's a great chance for community members like you to ask them questions or address concerns directly. If you have a topic that you’d like to propose for either meeting, please send a note to the [Mailing List]().",
  image: {
    src: '/images/optimized/community-call-554w-219h.webp',
    alt: 'An image of podman team members in a virtual meeting',
  },
  cards: [
    {
      title: 'Podman Community Meeting',
      subtitle:
        'This meeting is used to show demos for or to have general discussions about Podman or other related container technologies. It is also used to make announcements about Podman and the other projects in the Containers repository on GitHub.',
      date: '**1st Tuesday** every month',
      timeZone: '11 AM US ET /5 PM CET',
      buttons: [
        { text: 'Join Meeting', src: '#' },
        { text: 'Meeting Agenda', src: '#' },
      ],
    },
    {
      title: 'Podman Community Cabal',
      subtitle:
        'The focus of the cabal meeting is the planning and discussion of possible future changes to Podman or the related Containers projects and discussing any outstanding issues that might need solving.',
      date: '**3rd Thursday** every month',
      timeZone: '11 AM US ET /5 PM CET',
      buttons: [
        { text: 'Join Meeting', src: '#' },
        { text: 'Meeting Agenda', src: '#' },
      ],
    },
  ],
  // TODO: Past Meetings - find out where this data is stored and if it can be auto updated on the site
};

const mailingList = {
  title: 'Mailing List',
  subtitle: 'The Podman Mailing list is available for your questions, concerns or comments about Podman.',
  browseInfo: {
    title: 'Browse the mailing list',
    subtitle:
      'Simply visit the Podman mailing list website to browse or search previous postings to the Podman mailing list.',
  },
  subscribeInfo: {
    title: 'Subscribe or post to the mailing list',
    subtitle:
      'Simply visit [the Podman mailing list website]() to browse or search previous postings to the Podman mailing list.',
    description:
      "Regardless of which method you use, a confirmation email will be sent to you. After you reply back to that confirmation email, you'll then be able to send mail directly to [podman@lists.podman.io](). You can then also go to [the list's web page]() and manage your subscription.",
    options: [
      {
        title: 'Option 1',
        subtitle: 'Send an email to [podman-join@lists.podman.io]() with the word "Subscribe" in the subject.',
        button: {
          text: 'Send email',
          src: '#',
        },
      },
      {
        title: 'Option 2',
        subtitle:
          'Enter your email at the bottom of [the mailing list sign up page](), and hit the "Subscribe" button.',
        button: {
          text: 'Sign up page',
          src: '#',
        },
      },
    ],
  },
  extraInfo: {
    image: {
      src: '/images/optimized/mailing-list-screenshot-580w-376h.webp',
      alt: 'A screenshot of the Podman mailing list home screen.',
    },
    note: {
      title: 'Please note:',
      text: 'If you have a bug that you’d like to report, it’s best to report it here by creating a “New issue” rather than sending an email to the list.',
    },
  },
};

const submittingIssues = {
  title: 'Submitting Issues & Pull Requests',
  subtitle:
    'The following is a quick cheat-sheet of sorts on how to submit issues and pull requests to the Podman project. For the most up-to-date and more comprehensive information, please take a look at  [CONTRIBUTING.md]() in the Podman repo.',
  sections: [
    {
      title: 'Submitting Issues',
      subtitle: "Don't include private / sensitive info in issues!",
      sections: [
        {
          text: '**Before reporting an issue**, [check our backlog of open issues](#) to see if someone else has already reported it. If so:',
          checkList: [
            'Feel free to add your scenario, or additional information, to the discussion.',
            'Subscribe to the issue to be notified when it is updated.',
          ],
          button: {
            text: 'Check Open Issues',
            src: '#',
          },
        },
        {
          text: "**If you find a new issue**, we'd love to hear about it! The most important aspect of a bug report is that it includes enough information for us to reproduce it. So, please:",
          checkList: [
            'Include as much detail as possible',
            "Try to remove any extra stuff that doesn't really relate to the issue itself",
          ],
          button: {
            text: 'File a New Issue',
            src: '#',
          },
        },
      ],
    },
    {
      title: 'Submitting Pull Requets',
      subtitle:
        "No Pull Request (PR) is too small! Typos, additional comments in the code, new test cases, bug fixes, new features, more documentation, ... it's all welcome! ",
      description:
        'If you have a bug that you’d like to report, it’s best to report it here by creating a “New issue” rather than sending an email to the list.',
      checkList: [
        'Well-documented code changes.',
        'Additional testcases. Ideally m they should fail w/o your code change applied.',
        'Documentation changes.',
      ],
      button: {
        text: 'More PR Submission Details',
        src: '#',
      },
    },
  ],
};

export { header, communityChat, communityMeetings, mailingList, submittingIssues };
