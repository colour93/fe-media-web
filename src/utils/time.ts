import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatVideoDuration = (seconds: number) => {
  const dur = dayjs.duration(seconds, 'seconds');
  return seconds >= 3600 ? dur.format('HH:mm:ss') : dur.format('mm:ss');
}