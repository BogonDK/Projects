package edu.msu.Examchenkain;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GestureDetectorCompat;
import android.os.Bundle;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;


public class MainActivity extends AppCompatActivity{
    private GestureDetectorCompat gestureDetectorCompat;
    private GameView gameView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        gameView = findViewById(R.id.gameView);
        gameView.setMainActivity(this);

        gestureDetectorCompat = new GestureDetectorCompat(this, new GestureDetector.SimpleOnGestureListener() {
            @Override
            public boolean onFling(MotionEvent down, MotionEvent move, float velX, float velY) {

                float deltaY = move.getY() - down.getY();
                float deltaX = move.getX() - down.getX();

                if (Math.abs(deltaX) < Math.abs(deltaY))
                {
                    if (Math.abs(deltaY) > 50 && Math.abs(velY) > 50)
                    {
                        if (deltaY > 0)
                        {
                            gameView.getGame().swipeHandler("Down");
                        }
                        else
                        {
                            gameView.getGame().swipeHandler("Up");
                        }
                    }
                }
                else
                {
                    if (Math.abs(deltaX) > 50 && Math.abs(velX) > 50)
                    {
                        if (deltaX > 0)
                        {
                            gameView.getGame().swipeHandler("Right");
                        }
                        else
                        {
                            gameView.getGame().swipeHandler("Left");
                        }
                    }
                }
                return false;
            }
        });

    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        gestureDetectorCompat.onTouchEvent(event);
        return true;
    }

    public void onNewGame(View view)
    {
        setContentView(R.layout.activity_main);
        gameView = findViewById(R.id.gameView);
    }

}
