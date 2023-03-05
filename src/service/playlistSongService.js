import postgres from 'pg'
const { Pool } = postgres

class PlaylistSongService {
  constructor () {
    this._pool = new Pool()
  }

  async getPlaylistSongs (playlistId) {
    const query = {
      text: /* sql */ `SELECT playlists.*, users.username, songs.id as songs_id, songs.title, songs.performer FROM playlists
      LEFT JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id
      LEFT JOIN songs ON songs.id = playlist_songs.song_id
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.id = $1`,
      values: [playlistId]
    }

    const result = await this._pool.query(query)

    const songs = result.rows.map((song) => ({
      id: song.songs_id,
      title: song.title,
      performer: song.performer
    }))

    return {
      ...result.rows[0],
      songs
    }
  }
}

export default PlaylistSongService
