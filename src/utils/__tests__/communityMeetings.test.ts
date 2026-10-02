import { extractYouTubeId, parseTimeString, parseUrlTimestamp, formatVideoOffsetDisplay } from '../communityMeetings';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`[FAIL] ${message}: expected ${String(expected)}, got ${String(actual)}`);
  }
  console.log(`[PASS] ${message}`);
}

export function runCommunityMeetingsTests() {
  // extractYouTubeId tests
  assertEqual(
    extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
    'dQw4w9WgXcQ',
    'extracts ID from standard YouTube URL',
  );
  assertEqual(
    extractYouTubeId('https://youtu.be/dQw4w9WgXcQ'),
    'dQw4w9WgXcQ',
    'extracts ID from shortened youtu.be URL',
  );
  assertEqual(
    extractYouTubeId('https://www.youtube.com/embed/dQw4w9WgXcQ'),
    'dQw4w9WgXcQ',
    'extracts ID from embed URL',
  );
  assertEqual(
    extractYouTubeId('https://www.youtube.com/watch?feature=shared&v=dQw4w9WgXcQ&t=120s'),
    'dQw4w9WgXcQ',
    'extracts ID with extra parameters',
  );
  assertEqual(
    extractYouTubeId('https://lfx.linuxfoundation.org/meetings/12345'),
    null,
    'returns null for LFX video URL',
  );
  assertEqual(extractYouTubeId('https://cncfsandbox.com/video/67890'), null, 'returns null for CNCF video URL');
  assertEqual(extractYouTubeId('https://bluejeans.com/s/xyz123'), null, 'returns null for BlueJeans URL');
  assertEqual(extractYouTubeId(undefined), null, 'returns null for undefined URL');

  // parseTimeString tests
  assertEqual(parseTimeString('01:29'), 89, 'parses MM:SS format');
  assertEqual(parseTimeString('17:30'), 1050, 'parses 17:30 to seconds');
  assertEqual(parseTimeString('1:23:45'), 5025, 'parses HH:MM:SS format');
  assertEqual(parseTimeString('Watch Recording'), null, 'returns null when no timestamp present');

  // parseUrlTimestamp tests
  assertEqual(parseUrlTimestamp('https://youtube.com/watch?v=123&t=89s'), 89, 'parses t=89s');
  assertEqual(parseUrlTimestamp('https://youtube.com/watch?v=123&t=1m29s'), 89, 'parses t=1m29s');

  // formatVideoOffsetDisplay tests
  assertEqual(formatVideoOffsetDisplay(777), '12 min 57 sec', 'formats offset seconds to min/sec');
  assertEqual(formatVideoOffsetDisplay(0), '0 sec', 'formats 0 offset');
}
