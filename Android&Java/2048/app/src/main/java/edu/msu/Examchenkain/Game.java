package edu.msu.Examchenkain;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.widget.Toast;



public class Game {
    private final static float SCALE_IN_VIEW = 0.9f;

    private int score = 0;

    private int marginX = 0;
    private int marginY = 0;
    private int gameSize;
    private final Paint fillPaint;
    private GameView gameView;

    public void setGameView(GameView gameView) {
        this.gameView = gameView;
    }

    private final Tile[][]tiles = new Tile [4][4];

    public Game() {
        fillPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        fillPaint.setColor(0xffcccccc);

        int randX1 = (int)(Math.random() * 4);
        int randY1 = (int)(Math.random() * 4);

        int randX2 = (int)(Math.random() * 4);
        int randY2 = (int)(Math.random() * 4);

        while (randX1 == randX2)
        {
            randX1 = (int)(Math.random() * 4);
        }

        while ((randY1 == randY2))
        {
            randY1 = (int)(Math.random() * 4);
        }

        for (int x = 0; x < tiles.length; x++)
        {
            for (int y = 0; y < tiles.length; y++)
            {
                if (x == randX1 && y == randY1)
                {
                    tiles[x][y] = new Tile(2, x, y);
                }
                else if (x == randX2 && y == randY2)
                {
                    tiles[x][y] = new Tile(2, x, y);
                }
                else
                {
                    tiles[x][y] = new Tile(0, x, y);
                }
            }
        }


    }

    public void draw(Canvas canvas) {

        int width = canvas.getWidth();
        int height = canvas.getHeight();

        int minDimension = width < height ? width : height;

        gameSize = (int)(minDimension * SCALE_IN_VIEW);

        marginX = (width - gameSize) / 2;
        marginY = (height - gameSize) / 2;

        canvas.drawRect(marginX, marginY, marginX + gameSize, marginY + gameSize, fillPaint);

        for (int x = 0; x < tiles.length; x++)
        {
            for (int y = 0; y < tiles.length; y++)
            {
                tiles[x][y].draw(canvas, marginX, marginY, gameSize);
            }
        }
        UpdateScore(canvas);
    }

    private void UpdateScore(Canvas canvas)
    {
        Paint paint = new Paint();
        paint.setColor(Color.DKGRAY);
        paint.setTextSize(55);

        String tempScore = Integer.toString(score);

        canvas.drawText("Score:", marginX, marginY - 30, paint);
        paint.setTextAlign(Paint.Align.RIGHT);
        canvas.drawText(tempScore, marginX + gameSize - 35, marginY - 30, paint);
    }

    public void swipeHandler(String dir)
    {
        boolean movement = false;
        switch (dir) {
            case "Right": {
                movement = rightCombine();
            }
            case "Left": {
                movement = leftCombine();
            }
            case "Up": {
                movement = upCombine();
            }
            case "Down": {
                movement = downCombine();
            }
        }
        if(movement)
        {
            addTile();
        }
        checkGameOver();
        gameView.invalidate();
    }

    private boolean rightShift(boolean movement)
    {
        for (int y = 0; y < tiles.length; y++)
        {
            for (int x = tiles.length - 1; x >=0; x--)
            {
                if (tiles[x][y].getNumVal() == 0)
                {
                    int nextTile = x - 1;
                    while (nextTile >= 0)
                    {
                        if (tiles[nextTile][y].getNumVal() != 0)
                        {
                            movement = true;
                            tiles[x][y] = new Tile(tiles[nextTile][y].getNumVal(), x, y);
                            tiles[nextTile][y] = new Tile(0,nextTile,y);
                            nextTile = 0;
                        }
                        nextTile -= 1;
                    }
                }
            }
        }

    return movement;
    }

    private boolean rightCombine()
    {
        boolean movement = false;
        movement = rightShift(movement);

        for (int y = 0; y < tiles.length; y++)
        {
            for (int x = tiles.length - 1; x >=1; x--)
            {
                Tile currTile = tiles[x][y];
                if (currTile.getNumVal() != 0)
                {
                    Tile nextTile = tiles[x - 1][y];

                    if (nextTile.getNumVal() == currTile.getNumVal())
                    {
                        movement = true;

                        int newVal = currTile.getNumVal() + nextTile.getNumVal();
                        score += newVal;
                        tiles[x][y] = new Tile(newVal, x, y);
                        tiles[x - 1][y] = new Tile(0, x - 1, y);
                    }
                }
            }
        }

        movement = rightShift(movement);
        return movement;
    }

    private boolean leftShift(boolean movement)
    {
        for (int y = 0; y < tiles.length; y++)
        {
            for (int x = 0; x < tiles.length; x++)
            {
                if (tiles[x][y].getNumVal() == 0)
                {
                    int nextTile = x + 1;
                    while (nextTile <= 3)
                    {
                        if (tiles[nextTile][y].getNumVal() != 0)
                        {
                            movement = true;
                            tiles[x][y] = new Tile(tiles[nextTile][y].getNumVal(), x, y);
                            tiles[nextTile][y] = new Tile(0,nextTile,y);
                            nextTile = 3;
                        }
                        nextTile += 1;
                    }
                }
            }
        }

    return movement;
    }

    private boolean leftCombine()
    {
        boolean movement = false;
        movement = leftShift(movement);

        for (int y = 0; y < tiles.length; y++)
        {
            for (int x = 0; x < tiles.length - 1; x++)
            {
                Tile currTile = tiles[x][y]; 
                if (currTile.getNumVal() != 0)
                {
                    Tile nextTile = tiles[x + 1][y]; 

                    if (nextTile.getNumVal() == currTile.getNumVal())
                    {
                        movement = true;

                        int newVal = currTile.getNumVal() + nextTile.getNumVal();
                        score += newVal;
                        tiles[x][y] = new Tile(newVal, x, y);
                        tiles[x + 1][y] = new Tile(0, x + 1, y);
                    }
                }

            }
        }

        movement = leftShift(movement);

        return movement;
    }

    private boolean downShift(boolean movement)
    {
        for (int x = 0; x < tiles.length; x++)
        {
            for (int y = tiles.length - 1; y >=0; y--)
            {
                if (tiles[x][y].getNumVal() == 0)
                {
                    int nextTile = y - 1;
                    while (nextTile >= 0)
                    {
                        if (tiles[x][nextTile].getNumVal() != 0)
                        {
                            movement = true;
                            tiles[x][y] = new Tile(tiles[x][nextTile].getNumVal(), x, y);
                            tiles[x][nextTile] = new Tile(0,x,nextTile);
                            nextTile = 0;
                        }
                        nextTile -= 1;
                    }
                }
            }
        }

        return movement;
    }

    private boolean downCombine()
    {
        boolean movement = false;
        movement = downShift(movement);

        for (int x = 0; x < tiles.length; x++) {
            for (int y = tiles.length - 1; y >= 1; y--)
            {
                Tile currTile = tiles[x][y]; 
                if (currTile.getNumVal() != 0) 
                {
                    Tile nextTile = tiles[x][y - 1]; 

                    if (nextTile.getNumVal() == currTile.getNumVal())
                    {
                        movement = true;

                        int newVal = currTile.getNumVal() + nextTile.getNumVal();
                        score += newVal;
                        tiles[x][y] = new Tile(newVal, x, y);
                        tiles[x][y - 1] = new Tile(0, x, y - 1);
                    }
                }
            }
        }

        movement = downShift(movement);
        return movement;
    }

    private boolean upShift(boolean movement)
    {
        for (int x = 0; x < tiles.length; x++)
        {
            for (int y = 0; y < tiles.length; y++)
            {
                if (tiles[x][y].getNumVal() == 0)
                {
                    int nextTile = y + 1;
                    while (nextTile <= 3)
                    {
                        if (tiles[x][nextTile].getNumVal() != 0)
                        {
                            movement = true;
                            tiles[x][y] = new Tile(tiles[x][nextTile].getNumVal(), x, y);
                            tiles[x][nextTile] = new Tile(0,x,nextTile);
                            nextTile = 3;
                        }
                        nextTile += 1;
                    }
                }
            }
        }

        return movement;
    }

    private boolean upCombine()
    {
        boolean movement = false;
        movement = upShift(movement);

        for (int x = 0; x < tiles.length; x++) {
            for (int y = 0; y < tiles.length - 1; y++)
            {
                Tile currTile = tiles[x][y]; 
                if (currTile.getNumVal() != 0) 
                {
                    Tile nextTile = tiles[x][y + 1]; 

                    if (nextTile.getNumVal() == currTile.getNumVal())
                    {
                        movement = true;

                        int newVal = currTile.getNumVal() + nextTile.getNumVal();
                        score += newVal;
                        tiles[x][y] = new Tile(newVal, x, y);
                        tiles[x][y+1] = new Tile(0, x, y + 1);
                    }
                }
            }
        }

        movement = upShift(movement);
        return movement;
    }

    private void addTile()
    {
        int randX = (int)(Math.random() * 4);
        int randY = (int)(Math.random() * 4);

        while (tiles[randX][randY].getNumVal() != 0)
        {
            randX = (int)(Math.random() * 4);
            randY = (int)(Math.random() * 4);
        }

        tiles[randX][randY] = new Tile(2, randX, randY);
    }

    private void checkGameOver()
    {
        boolean gameOver = true;

        for (int x = 0; x < tiles.length; x++)
        {
            for (int y = 1; y <=2; y++)
            {
                int curr = tiles[x][y].getNumVal();
                int above = tiles[x][y-1].getNumVal();
                int below = tiles[x][y+1].getNumVal();
                if (curr == above || curr == below)
                {
                    gameOver = false;
                    break;
                }
            }
        }

        for (int y = 0; y < tiles.length; y++)
        {
            for (int x = 1; x <=2; x++)
            {
                int curr = tiles[x][y].getNumVal();
                int left = tiles[x - 1][y].getNumVal();
                int right = tiles[x + 1][y].getNumVal();
                if (curr == left || curr == right)
                {
                    gameOver = false;
                    break;
                }
            }
        }

        for (int x = 0; x < tiles.length; x++)
        {
            for (int y = 0; y < tiles.length; y++)
            {
                if (tiles[x][y].getNumVal() == 0)
                {
                    gameOver = false;
                    break;
                }
            }
        }

        if (gameOver)
        {
            Toast.makeText(gameView.getMainActivity(),
                    "There are no more moves, you've lost the game!", Toast.LENGTH_LONG).show();
        }
    }
}
