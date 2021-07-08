import 'package:flutter/material.dart';

class AppTheme {
  // dark theme data
  static final ThemeData _darkTheme = ThemeData(
    brightness: Brightness.dark,
    backgroundColor: Colors.blue[700],
    accentColor: Colors.grey[200],
  );

  ThemeData get darkTheme => _darkTheme;

  // light theme data
  static final ThemeData _lightTheme = ThemeData(
    brightness: Brightness.light,
    backgroundColor: Colors.blue[300],
    accentColor: Colors.grey[200],
  );

  ThemeData get lightTheme => _lightTheme;
}
