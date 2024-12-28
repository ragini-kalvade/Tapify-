package com.example.tapify;

import android.content.ContentUris;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class SongManager {
    private final AppCompatActivity activity;
    public List<Song> playedSongs;
    public List<Song> songs;

    SongManager(AppCompatActivity activity) {
        playedSongs = new ArrayList<>();
        songs = new ArrayList<>();
        this.activity = activity;
    }

    public String getMostPlayedSongs() {
        Map<String, Integer> songPlayCount = new HashMap<>();

        for (Song song : playedSongs) {
            songPlayCount.put(song.getData()+"\n---", songPlayCount.getOrDefault(song.title, 0) + 1);
        }

        List<Map.Entry<String, Integer>> list = new ArrayList<>(songPlayCount.entrySet());
        list.sort((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()));

        return list.stream()
                .map(Map.Entry::getKey)
                .collect(Collectors.joining(","));
    }

    public String getSongsStartingWith(String prefix) {
        StringBuilder songString = new StringBuilder();

       for(Song s : songs){
           if(s.title.toLowerCase().startsWith(prefix.toLowerCase())){
               songString.append(s.getData()).append("\n---");
           }
       }

       return songString.toString();
    }


    public String getMostRecentlyPlayedSongs() {
        StringBuilder songsString = new StringBuilder();

        for (Song s : playedSongs) {
            songsString.append(s.getData()).append("\n---");
        }

        return songsString.toString();
    }

    public String getSongsBy(String artistName) {
        StringBuilder songsString = new StringBuilder();

        for (Song s : songs) {
            if (s.artist.equals(artistName)) {
                songsString.append(s.getData()).append("\n---");
            }
        }

        return songsString.toString();
    }

    public String getAllSongs() {
        StringBuilder songsString = new StringBuilder();

        for (Song s : songs) {
            songsString.append(s.getData()).append("\n---");
        }

        return songsString.toString();
    }

    public String getAllAlbums() {
        Set<String> albumSet = new HashSet<>();

        for (Song s : songs) {
            albumSet.add(s.album);
        }

        Log.d("SongManager", String.join(",", albumSet));
        return String.join(",", albumSet);
    }

    public String getAllGenres() {
        Set<String> genreSet = new HashSet<>();

        for (Song s : songs) {
            String[] genres = s.genre.split(", ");
            genreSet.addAll(Arrays.asList(genres));
        }
        return String.join(",", genreSet);
    }

    public String getSongsByGenre(String genre) {
        StringBuilder genresString = new StringBuilder();

        for (Song s : songs) {
            String[] genres = s.genre.split(", ");
            if (Arrays.asList(genres).contains(genre)) {
                genresString.append(s.getData()).append("\n---");
            }
        }

        return genresString.toString();
    }

    public String getSongsOnAlbum(String albumName) {
        StringBuilder songsString = new StringBuilder();

        for (Song s : songs) {
            if (s.album.trim().equals(albumName.trim())) {
                songsString.append(s.getData()).append("\n---");
            }
        }

        return songsString.toString();
    }

    // TODO: each song should have a hash
    public Song getSong(String songName) {
        for (Song s : songs) {
            if (s.title.equals(songName)) {
                return s;
            }
        }
        return null;
    }

    @NonNull
    public String getArtists() {
        StringBuilder artistsString = new StringBuilder();
        Set<String> uniqueArtists = new HashSet<>();

        for (Song s : songs) {
            String artist = s.artist;

            if (!uniqueArtists.contains(artist)) {
                uniqueArtists.add(artist);
                if (artistsString.length() > 0) {
                    artistsString.append(",");
                }
                artistsString.append(artist);
            }
        }
        return artistsString.toString();
    }

    public void fetchSongsFromStorage() {
        String[] projection = {
                MediaStore.Audio.Media._ID,
                MediaStore.Audio.Media.TITLE,
                MediaStore.Audio.Media.ARTIST,
                MediaStore.Audio.Media.ALBUM,
                MediaStore.Audio.Media.DURATION,
                MediaStore.Audio.Media.DATA,
                MediaStore.Audio.Media.GENRE,
                MediaStore.Audio.Media.ALBUM_ID
        };

        String selection = MediaStore.Audio.Media.IS_MUSIC + " != 0";
        String sortOrder = MediaStore.Audio.Media.TITLE + " ASC";

        Cursor cursor = this.activity.getContentResolver().query(
                MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                projection,
                selection,
                null,
                sortOrder
        );

        if (cursor != null) {
            while (cursor.moveToNext()) {
                long id = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID));
                String title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE));
                String artist = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST));
                String album = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM));
                long duration = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION));
                String data = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA));
                String genre = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.GENRE));
                long albumId = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM_ID));
               /* Log.d("SongManager", title + "\nartist: " + artist + "\nalbum: " + album + "\ngenre: " + genre + "\nduration: " + duration + "\ndata:" + data + "\nalbum id:" + albumId);
*/
                songs.add(new Song(title, artist, album, genre, duration, data, albumId));
            }
            cursor.close();
        }
    }

    public String getAlbumCover(long albumId) {
        String albumArtUri = String.valueOf(ContentUris.withAppendedId(
                Uri.parse("content://media/external/audio/albumart"), albumId)
        );

        return albumArtUri;
    }
}
