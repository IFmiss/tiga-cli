import cfonts from 'cfonts';
export default function artFont(text: string = 'TIGA-CLI') {
  console.info();
  console.info();
  cfonts.say(text, {
    font: 'block', // define the font face
    align: 'left', // define text alignment
    colors: ['system'], // define all colors
    background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1, // define letter spacing
    lineHeight: 1, // define the line height
    space: true, // define if the output text should have empty lines on top and on the bottom
    maxLength: '0', // define how many character can be on one line
    gradient: 'yellow,#55ff55', // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: true, // define if this is a transition between colors directly
    env: 'node'
  });
  console.info();
}
