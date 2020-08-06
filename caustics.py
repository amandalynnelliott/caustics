# Done
# - Draws a circle
# - Plot evenly spaced points to the circle
# - Display number of points (n)
# - Draw lines based on chosen times table.
# - Remove outer circle

# To Do
# - Slider for n
# - Slider for m 

import turtle
from turtle import *
import math
import tkinter as tkin

t = turtle.Turtle()
r = 300 # radius
n = 50 # number of points
m = 2 # multiplier
rad = (2 * math.pi) /n

# --- Setting Up
t.reset()
t.penup()
t.sety(-r)

t.pensize(2)

# --- Drawing circle and dots
t.speed(0)
turtle.delay(0)
# t.pendown()
# t.circle(r, None, None)
# t.penup()

x0 = t.xcor() # Center x
y0 = t.ycor() + r # Center y

dot_positions = []
products = []

for i in range(n):

    x = x0 - r * math.cos(2 * math.pi * i / n)
    y = y0 + r * math.sin(2 * math.pi * i / n)

    position = [i, x, y]
    dot_positions.append(position)

    product = (i * m)

    products.append(product)

    t.setposition(x, y)
    t.pendown()

    t.dot(10, "red")
    t.penup()

font_size = 16

new_r = r + (font_size + 2)

t.setposition(x0, y0 - new_r)

# t.pendown()
# t.circle(new_r, None, None)
# t.penup()

for i in range(n):

    x = x0 - (new_r) * math.cos(2 * math.pi * i / n)
    y = y0 + (new_r) * math.sin(2 * math.pi * i / n) - (font_size - 4)

    # if (2 * math.pi * i / n) < (math.pi /2) or (2 * math.pi * i / n) > (3*math.pi /2):
    #     x = x + 30
    
    # if(2 * math.pi * i / n) > (math.pi /2) or (2 * math.pi * i / n) < (3*math.pi /2):
    #     x = x - 30

    # if (2 * math.pi * i / n) > (math.pi):
    #     y = y - 24
    
    t.setposition(x, y)
    t.pendown()
    t.write(i, False, align="center", font=("Arial", font_size, "normal"))
    t.penup()


# --- Multiplication lines

t.setposition(dot_positions[0][1], dot_positions[0][2])

for i in range(n):
    t.setposition(dot_positions[i][1], dot_positions[i][2])

    j = products[i]%n
    t.pendown()
    t.setposition(dot_positions[j][1], dot_positions[j][2])
    t.penup()

done()