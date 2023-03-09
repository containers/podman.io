const header = {
  title: 'Community',
  subtitle:
    'We want your feedback, issues, patches, and involvement in the development of Podman. **Chat** with us on Slack, IRC, or on our **mailing list**. Submit **issues & pull requests** (see our [CONTRIBUTING guide]() on how.) Participate in one of our twice-monthly community meetings. You are welcome in our community!',
  image: 'images/raw/podman-2-196w-172h.png',
  banner: {
    text: 'To help ensure all feel welcome in the Podman community, we expect all who participate to adhere to our [Code of Conduct]()',
    link: {
      text: 'Code of Conduct',
      path: 'https://github.com/containers/common/blob/main/CODE-OF-CONDUCT.md',
      icon: 'fa6-regular:handshake',
    },
  },
};

const communityChat = {
  title: 'Chat with the Podman community',
  subtitle:
    'The Podman developerss are generally around during CEST and Eastern Time business hours, so please be patient if you’re in another time zone!',
  links: [
    {
      text: '#podman:matrix.org',
      path: '#',
      image: {
        path: '#',
        alt: 'Element Matrix Logo',
      },
    },
    {
      text: '#podman on libera.chat',
      path: '#',
      image: {
        path: '',
        alt: 'IRC Logo',
      },
    },
    {
      text: 'Podman Discord',
      path: '#',
      image: {
        path: '#',
        alt: 'Discord Logo',
      },
    },
    {
      text: '#CRIO on Kubernetes',
      path: '#',
      image: {
        path: '#',
        alt: 'Slack Logo',
      },
    },
  ],
};

const communityMeetings = {
  title: 'Podman Community Meetings',
  subtitle:
    'Many of the maintainers for the Podman project attend both of these meetings, so it’s a great chance for community members like you to ask them questions or address concerns directly. If you have a topic that you’d like to propose for either meeting, please send a note to the Mailing List.',
  cards: [
    {
      title: 'Podman Community Meeting',
      subtitle:
        'This meeting is used to show demos for or to have general discussions about Podman or other related container technologies. It is also used to make announcements about Podman and the other projects in the Containers repository on GitHub.',
      date: '1st Tuesday every month',
      timeZone: '11 AM US ET /5 PM CET',
      buttons: [
        { text: 'Join Meeting', path: '#' },
        { text: 'Meeting Agenda', path: '#' },
      ],
    },
    {
      title: 'Podman Community Cabal',
      subtitle:
        'The focus of the cabal meeting is the planning and discussion of possible future changes to Podman or the related Containers projects and discussing any outstanding issues that might need solving.',
      date: '3rd Thursday every month',
      timeZone: '11 AM US ET /5 PM CET',
      buttons: [
        { text: 'Join Meeting', path: '#' },
        { text: 'Meeting Agenda', path: '#' },
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
};
