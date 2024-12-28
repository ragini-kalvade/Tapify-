package com.example.tapify;

import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

public class Song {
    public String title;
    public String artist;
    public String album;
    public String genre;
    public long duration;
    public String data;
    public long albumId;
    public String path;

    public Song(String title, String artist, String album, String genre, long duration, String data, long albumId) {
        this.title = title.trim();
        this.artist = artist.trim();
        this.album = album.trim();
        this.genre = genre.trim();
        this.duration = duration;
        this.data = data.trim();
        this.albumId = albumId;
    }

    public String getData(){
        String data = "\nTitle:"
                + this.title
                + "\nArtist:"  + this.artist
                + "\nPath:" + this.path
                + "\nAlbum:" + this.album
                + "\nGenre:" + this.genre
                + "\nData:" + this.data
                + "\nAlbumId:" + this.albumId
                + "\nDuration:" + this.duration;


        return data;
    }
}