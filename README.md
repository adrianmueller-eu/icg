A realtime 3D renderer with basic objects, implemented in HTML, JS, and WebGL.

### Getting started
After cloning the repository, `cd` into it, and run any basic webserver, e.g.
```
python3 -m http.server
```
Then enjoy the application at [http://127.0.0.1:8000/main.html](http://127.0.0.1:8000/main.html) :)

### Key bindings
#### Free Flight
**w**&emsp;Move forward (Press two times quickly for doubled speed)<br>
**a**&emsp;Move left<br>
**s**&emsp;Move backward<br>
**d**&emsp;Move right<Br>
**Space**&emsp;Move up<br>
**Shift**&emsp;Move down<br>
**ArrowUp**&emsp;Rotate up<br>
**ArrowLeft**&emsp;Rotate left<br>
**ArrowDown**&emsp;Rotate down<br>
**ArrowRight**&emsp;Rotate right

#### 3D Driver
**w**&emsp;Move forward (Press to times quickly for doubled speed)<br>
**a**&emsp;Move left<br>
**s**&emsp;Move backward<br>
**d**&emsp;Move right<Br>
**Space**&emsp;Move up<br>
**Shift**&emsp;Move down

#### 2D Driver
**i**&emsp;Move forward<br>
**j**&emsp;Move left<br>
**k**&emsp;Move backward<br>
**l**&emsp;Move right

### FreeRotor/AxisAlignedRotor
**x**&emsp;Rotate around x axis (pitch)<br>
**alt+x**&emsp;Rotate negative around x axis (-pitch)<br>
**y**&emsp;Rotate around y axis (yaw)<br>
**alt+y**&emsp;Rotate negative around y axis (-yaw)<br>
**c**&emsp;Rotate around z axis (roll)<br>
**alt+c**&emsp;Rotate negative around z axis (-roll)

#### Misc
**r**&emsp;Toggle renderer between rasterizer (default) and raytracer<br>
**p**&emsp;Pause all animations, except UserControllables (Drivers and controllable rotors)<br>
**v**&emsp;Toggle specs view (default:off)<br>
**m**&emsp;Toggle menu view (default:off)<br>
**f**&emsp;Toggle fullscreen mode (default:off)

Drop an `.obj`-file into it! Some example files can be found in `resources/meshes`. The application also supports exporting and importing (drop!) scenegraphs. Some examples can be found in `resources/scenegraphs`.
