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
    'The Podman developers are generally around during CEST and Eastern Time business hours, so please be patient if you’re in another time zone!',
  links: [
    {
      text: '#podman:matrix.org',
      path: '#',
      image: {
        path: '',
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
        path: '',
        alt: 'Discord Logo',
      },
    },
    {
      text: '#CRIO on Kubernetes',
      path: '#',
      image: {
        path: '',
        alt: 'Slack Logo',
      },
    },
  ],
};

const communityMeetings = {
  title: 'Podman Community Meetings',
  subtitle:
    "Many of the maintainers for the Podman project attend both of these meetings, so it's a great chance for community members like you to ask them questions or address concerns directly. If you have a topic that you’d like to propose for either meeting, please send a note to the Mailing List.",
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
  subscribeInfo: {
    title: 'Subscribe or post to the mailing list',
    subtitle:
      'Simply visit  href="#">the Podman mailing list</a> website to browse or search previous postings to the Podman mailing list.',
    options: [
      {
        title: 'Option 1',
        subtitle: 'Send an email to  href="#">podman-join@lists.podman.io with the word "Subscribe" in the subject.',
        button: {
          text: 'Send email',
          path: '#',
        },
      },
      {
        title: 'Option 2',
        subtitle: 'Enter your email at the bottom of the mailing list sign up page, and hit the "Subscribe" button.',
        button: {
          text: 'Sign up page',
          path: '#',
        },
      },
    ],
    description:
      "Regardless of which method you use, a confirmation email will be sent to you. After you reply back to that confirmation email, you'll then be able to send mail directly to  href='#'>podman@lists.podman.io</a>. You can then also go to <a href='#'>the list's web page</a> and manage your subscription.",
  },
};

const submittingIssues = {
  title: 'Submitting Issues & Pull Requests',
  subtitle:
    'The following is a quick cheat-sheet of sorts on how to submit issues and pull requests to the Podman project. For the most up-to-date and more comprehensive information, please take a look at  href="#">CONTRIBUTING.md</a> in the Podman repo.',
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
            path: '#',
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
            path: '#',
          },
        },
      ],
    },
    {
      title: 'Submitting Pull Requets',
      description:
        "No Pull Request (PR) is too small! Typos, additional comments in the code, new test cases, bug fixes, new features, more documentation, ... it's all welcome! While bug fixes can first be identified via an \"issue\", that is not required. It's ok to just open up a PR with the fix, but make sure you include the same information you would have included in an issue - like how to reproduce it. PRs for new features should include some background on what use cases the new code is trying to address. When possible and when it makes sense, try to break-up larger PRs into smaller ones - it's easier to review smaller code changes. But only if those smaller ones make sense as stand-alone PRs. Regardless of the type of PR, all PRs should include:",
      checkList: [
        'Well-documnented code changes.',
        'Additional testcases. Ideally m they should fail w/o your code change applied.',
        'Documentation changes.',
      ],
      button: {
        text: 'More PR Submission Details',
        path: '#',
      },
    },
  ],
};

export { header, communityChat, communityMeetings, mailingList, submittingIssues };
