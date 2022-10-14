# Earthquake Simulator

## Team Name: JSR

## Team Members 
- Ameya Sharma
- Kushagra Kharbanda
- Prerak Srivastava
- Shavak Kansal
- Shreeya Singh 

## Preview
![Alt text](/src/assets/preview.png "a title")
## Running the Code 
```
$ npm i
$ npm run dev
```

## Controls
- **Left Mouse Click**: Rotate Camera
- **Right Mouse Click**: Pan Camera
- **Mouse Scroll**: Zoom Camera
- **I**: Toggle Hitbox Information
- **Start**: Start Simulation
- **Stop**: Stop Simulation

## Earthquake Parameters
The ground moves according to a sine wave to simulate a earthquake (written in `plane.js`)
- **Amplitude**: The amount the ground moves in the x direction
- **Time Period**: The time period with which the ground moves 
- **Factor**: The movement of the ground in the Y direction is based on the movement in x direction and controlled using this factor.