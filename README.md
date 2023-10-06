A realtime 3D renderer with basic objects, implemented in HTML, JS, and WebGL.

### Getting started
After cloning the repository, `cd` into it, and run any basic webserver, e.g.
```
python3 -m http.server
```
Then enjoy the application at [http://127.0.0.1:8000/main.html](http://127.0.0.1:8000/main.html) :)

### Key bindings
#### Free Flight
| **Key** | **Effect** |
-- | --
**w** | Move forward (Press two times quickly for doubled speed)<br>
**a** | Move left<br>
**s** | Move backward<br>
**d** | Move right<Br>
**Space** | Move up<br>
**Shift** | Move down<br>
**ArrowUp** | Rotate up<br>
**ArrowLeft** | Rotate left<br>
**ArrowDown** | Rotate down<br>
**ArrowRight** | Rotate right

#### 3D Driver
| **Key** | **Effect** |
-- | --
**w** | Move forward (Press to times quickly for doubled speed)<br>
**a** | Move left<br>
**s** | Move backward<br>
**d** | Move right<Br>
**Space** | Move up<br>
**Shift** | Move down

#### 2D Driver
| **Key** | **Effect** |
-- | --
**i** | Move forward<br>
**j** | Move left<br>
**k** | Move backward<br>
**l** | Move right

### FreeRotor/AxisAlignedRotor
| **Key** | **Effect** |
-- | --
**x** | Rotate around x axis (pitch)<br>
**alt+x** | Rotate negative around x axis (-pitch)<br>
**y** | Rotate around y axis (yaw)<br>
**alt+y** | Rotate negative around y axis (-yaw)<br>
**c** | Rotate around z axis (roll)<br>
**alt+c** | Rotate negative around z axis (-roll)

#### Misc
| **Key** | **Effect** |
-- | --
**r** | Toggle renderer between rasterizer (default) and raytracer<br>
**p** | Pause all animations, except UserControllables (Drivers and controllable rotors)<br>
**v** | Toggle specs view (default:off)<br>
**m** | Toggle menu view (default:off)<br>
**f** | Toggle fullscreen mode (default:off)

Drop an `.obj`-file into it! Some example files can be found in `resources/meshes`. The application also supports exporting and importing (drop!) scenegraphs. Some examples can be found in `resources/scenegraphs`.
