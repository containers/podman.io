import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        if (
          target.tagName === 'A' &&
          target.classList.contains('table-of-contents__link') &&
          target.classList.contains('table-of-contents__link--active')
        ) {
          const container = target.closest('.theme-doc-toc-desktop');
          if (container) {
            const containerRect = container.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            if (targetRect.top < containerRect.top || targetRect.bottom > containerRect.bottom) {
              const targetCenter = targetRect.top + targetRect.height / 2;
              const containerCenter = containerRect.top + containerRect.height / 2;
              const scrollAmount = targetCenter - containerCenter;
              container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            }
          }
        }
      }
    }
  });

  const startObserving = () => {
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    startObserving();
  } else {
    document.addEventListener('DOMContentLoaded', startObserving);
  }
}
