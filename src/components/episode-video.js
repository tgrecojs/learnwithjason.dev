// this is for episodes that have already happened and the videos are posted
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { getTeacher } from '../util/get-teacher.js';
import { EpisodePoster } from './episode-poster.js';

export function EpisodeVideo({ episode, count }) {
  const [playing, setPlaying] = useState(false);

  const host = getTeacher([episode.host]);
  const teacher = getTeacher(episode.guest);

  // apparently YT breaks playlists after 200 videos, so bail if we're above that limit
  const showPlaylist = count < 200;
  const url = new URL('https://www.youtube-nocookie.com/');

  url.pathname = `/embed/${episode.youtubeID}`;

  if (showPlaylist) {
    url.searchParams.set('listType', 'playlist');
    url.searchParams.set('list', 'PLz8Iz-Fnk_eTpvd49Sa77NiF8Uqq5Iykx');
  }

  url.searchParams.set('autoplay', '1');
  url.searchParams.set('rel', '0');

  return (
    <div class="episode-video">
      {playing ? (
        <div class="responsive-video-container">
          <iframe
            width="560"
            height="315"
            src={url}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      ) : (
        <button onClick={() => setPlaying(true)} aria-label="play video">
          <EpisodePoster title={episode.title} host={host} teacher={teacher} />
        </button>
      )}
    </div>
  );
}
