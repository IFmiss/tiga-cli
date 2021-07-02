import ora from 'ora';

class Spinner {
  static sp = ora();
  static succeed = Spinner.sp.succeed;
  static fail = Spinner.sp.fail;
  static warn = Spinner.sp.warn;
  static info = Spinner.sp.info;
  static loading(text: string, color?: ora.Color) {
    color && (Spinner.sp.color = color);
    Spinner.sp.text = text;
    Spinner.sp.start();
  }
  static closeSpinner() {
    Spinner.sp.stop();
  }
}

export default Spinner;
