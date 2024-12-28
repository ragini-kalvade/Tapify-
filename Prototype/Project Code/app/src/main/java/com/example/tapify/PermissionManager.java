package com.example.tapify;

import android.app.AlertDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.widget.Toast;
import androidx.activity.result.ActivityResultLauncher;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.content.pm.PackageManager;
import android.Manifest;

public class PermissionManager {

    private static final int REQUEST_MEDIA_AUDIO = 1;
    private final AppCompatActivity activity;
    private final ActivityResultLauncher<Intent> settingsLauncher;

    @RequiresApi(api = Build.VERSION_CODES.TIRAMISU)
    public PermissionManager(AppCompatActivity activity) {
        this.activity = activity;

        this.settingsLauncher = activity.registerForActivityResult(
                new androidx.activity.result.contract.ActivityResultContracts.StartActivityForResult(),
                result -> {
                    int permissionLevel = ContextCompat.checkSelfPermission(activity, Manifest.permission.READ_MEDIA_AUDIO);
                    if (permissionLevel == PackageManager.PERMISSION_GRANTED) {
                        Toast.makeText(activity, "Permission granted", Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(activity, "Permission still denied", Toast.LENGTH_SHORT).show();
                    }
                }
        );
    }


    public boolean isPermissionAccepted(String permission) {
        int permissionLevel = ContextCompat.checkSelfPermission(activity, permission);
        boolean permissionDenied = permissionLevel != PackageManager.PERMISSION_GRANTED;

        if(permissionDenied){
            ActivityCompat.requestPermissions(activity, new String[]{permission}, REQUEST_MEDIA_AUDIO);
        }

        return !permissionDenied;
    }

    public void handlePermissionResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == REQUEST_MEDIA_AUDIO) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(activity, "Music permission granted", Toast.LENGTH_SHORT).show();
            } else {
                if (ActivityCompat.shouldShowRequestPermissionRationale(activity, Manifest.permission.READ_MEDIA_AUDIO)) {
                    new AlertDialog.Builder(activity)
                            .setMessage("Music permission is required to access and play music files on your device.")
                            .setPositiveButton("OK", (dialog, which) ->
                                    ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.READ_MEDIA_AUDIO}, REQUEST_MEDIA_AUDIO))
                            .setNegativeButton("Cancel", null)
                            .show();
                } else {
                    new AlertDialog.Builder(activity)
                            .setMessage("Music permission is required to play music. You can enable it in the app settings.")
                            .setPositiveButton("Go to Settings", (dialog, which) -> {
                                Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                                intent.setData(Uri.parse("package:" + activity.getPackageName()));
                                settingsLauncher.launch(intent);
                            })
                            .setNegativeButton("Cancel", null)
                            .show();
                }
            }
        }
    }
}
