package edu.msu.Examchenkain;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;

class Tile {

    private final int x;


    private final int y;


    private final Paint fillPaint;


    private final int numVal;


    int getNumVal() {
        return numVal;
    }

    Tile(int numVal, int x, int y) {
        this.numVal = numVal;
        this.x = x;
        this.y = y;

        fillPaint = new Paint(Paint.ANTI_ALIAS_FLAG);

        SetColor();

    }

    void draw(Canvas canvas, int marginX, int marginY, int gameSize)
    {
        if (numVal != 0)
        {
            int tileSize = gameSize / 4;
            int xLoc = marginX + tileSize * x;
            int yLoc = marginY + tileSize * y;

            Paint paint = new Paint();
            paint.setColor(Color.DKGRAY);
            paint.setTextSize(70);

            String num = Integer.toString(numVal);

            canvas.save();

            canvas.drawRect(xLoc, yLoc, xLoc + tileSize, yLoc + tileSize, fillPaint);
            paint.setTextAlign(Paint.Align.CENTER);
            canvas.drawText(num, xLoc+tileSize/2 - 10, yLoc+tileSize/2 + 20, paint);

            Paint linePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
            linePaint.setColor(Color.DKGRAY);
            linePaint.setStrokeWidth(2);


            canvas.drawLine (xLoc + tileSize, yLoc + tileSize,
                    xLoc + tileSize, yLoc, linePaint);
            canvas.drawLine (xLoc + tileSize, yLoc + tileSize, xLoc,
                    yLoc + tileSize, linePaint);
            canvas.drawLine (xLoc, yLoc, xLoc + tileSize, yLoc, linePaint);
            canvas.drawLine (xLoc, yLoc, xLoc, yLoc + tileSize, linePaint);

            canvas.restore();
        }
    }

    private void SetColor()
    {
        if (numVal == 2) {
            fillPaint.setColor(0xFFF7DDEE);
        } else if (numVal == 4) {
            fillPaint.setColor(0xFFC6E4F2);
        } else if (numVal == 8) {
            fillPaint.setColor(0xFFBDF0DF);
        } else if (numVal == 16) {
            fillPaint.setColor(0xFF9BE8AE);
        } else if (numVal == 32) {
            fillPaint.setColor(0xFFA2EAA1);
        } else if (numVal == 64) {
            fillPaint.setColor(0xFF95E281);
        } else if (numVal == 128) {
            fillPaint.setColor(0xFFC4E58D);
        } else if (numVal == 256){
            fillPaint.setColor(0xFFE5CA8B);
        } else if (numVal == 512) {
            fillPaint.setColor(0xFFE08C76);
        } else if (numVal == 1024) {
            fillPaint.setColor(0xFFD89551);
        } else if (numVal == 2048) {
            fillPaint.setColor(0xFFD64848);
        }
    }
}
