import React from 'react';
import { Icon } from '@iconify/react';
import Button from '@site/src/components/utilities/Button';

function MeetingThumb(props) {
  return (
    <section className="rounded-md bg-white shadow-md">
      <div className="flex flex-col items-center justify-center p-4">
        <div>
          <h3>{props.date}</h3>
          <p>{props.day}</p>
        </div>
        <div>
          <Icon icon="cil:movie" className="text-2xl text-blue-700 dark:text-blue-50" />
        </div>
        <div>
          <Button as="link" outline={true} text="Watch Recording" path={props.recording} />
          <Button as="link" outline={true} text="Meeting Minutes" path={props.minutes} />
        </div>
      </div>
    </section>
  );
}

export default MeetingThumb;
