import ora from 'ora';

class Spinner {
  static sp = ora({
    spinner: {
      interval: 80, // Optional
      frames: [
        '        ',
        't       ',
        'ti      ',
        'tig     ',
        'tiga    ',
        'tiga-   ',
        'tiga-c  ',
        'tiga-cl ',
        'tiga-cli',
        ' iga-cli',
        '  ga-cli',
        '   a-cli',
        '    -cli',
        '     cli',
        '      li',
        '       i'
      ]
    }
  });
  static succeed = Spinner.sp.succeed;
  static fail = Spinner.sp.fail;
  static warn = Spinner.sp.warn;
  static info = Spinner.sp.info;
  static loading(text: string, color?: ora.Color) {
    color && (Spinner.sp.color = color);
    Spinner.sp.text = text;
    Spinner.sp.start();
  }
  static close() {
    Spinner.sp.stop();
  }
}

export default Spinner;
