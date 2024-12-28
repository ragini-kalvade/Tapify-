package com.example.tapify;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.media.MediaPlayer;
import android.os.Build;
import android.util.Log;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.LinearLayout;
import android.widget.Toast;
import android.Manifest;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;


import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private PermissionManager permissionManager;
    SongManager songManager;
    MediaPlayer mediaPlayer;

    @RequiresApi(api = Build.VERSION_CODES.TIRAMISU)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        permissionManager = new PermissionManager(this);
        boolean hasAudioPermissions = permissionManager.isPermissionAccepted(Manifest.permission.READ_MEDIA_AUDIO);
        songManager = new SongManager(this);
        mediaPlayer = new MediaPlayer();
        loadWebPage();
    }

    @SuppressLint("SetJavaScriptEnabled")
    void loadWebPage() {
        WebView webView = findViewById(R.id.webView);

        webView.getSettings().setLoadsImagesAutomatically(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.clearCache(true);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.addJavascriptInterface(this, "androidInterface");
        webView.loadUrl("file:///android_asset/index.html");
    }

    @JavascriptInterface
    public String getSongData() {return songManager.getAllSongs();}

    @JavascriptInterface
    public String getArtists() {return songManager.getArtists();}
    @JavascriptInterface
    public String getGenres() {return songManager.getAllGenres();}

    @JavascriptInterface
    public String getAlbums() {return songManager.getAllAlbums();}

    @JavascriptInterface
    public String getSongsBy(String artistName) {return songManager.getSongsBy(artistName);}

    @JavascriptInterface
    public String getSongsOnAlbum(String albumName) {return songManager.getSongsOnAlbum(albumName);}

    @JavascriptInterface
    public void playSongTitled(String songName) { playMusic(songManager.getSong(songName)); }
    @JavascriptInterface
    public String getSongsStartingWith(String prefix){ return songManager.getSongsStartingWith(prefix);}

    @JavascriptInterface
    public String getMostPlayedSongs() {return songManager.getMostPlayedSongs();}

    @JavascriptInterface
    public String getMostRecentlyPlayedSongs() {return songManager.getMostRecentlyPlayedSongs();}

    @JavascriptInterface
    public String getSongsByGenre(String genre) {
        return songManager.getSongsByGenre(genre);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        Log.d("MainActivity", "Started request permission result");
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        permissionManager.handlePermissionResult(requestCode, permissions, grantResults);
        songManager.fetchSongsFromStorage();
        Song songToPlay = songManager.songs.get(0);
    }

    private void playMusic(Song songToPlay) {
        boolean hasAudioPermissions = permissionManager.isPermissionAccepted(Manifest.permission.READ_MEDIA_AUDIO);
        if (!hasAudioPermissions) {
            Log.d("MainActivity", "No audio permissions - playMusic()");
            return;
        }

        try {
            if (mediaPlayer.isPlaying()) {mediaPlayer.stop();}
            mediaPlayer.reset();
            mediaPlayer.setDataSource(songToPlay.data);
            mediaPlayer.prepare();
            mediaPlayer.start();
            songManager.playedSongs.add(songToPlay);
        } catch (IOException e) {
            Toast.makeText(this, "Failed to play music: " + e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

}