import 'package:flutter_boiler_plate/app/app.logger.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'prefs.dart';

class SharedPrefsService extends PrefsService {
  static SharedPrefsService? _instance;

  static SharedPreferences? _preferences;

  static Future<SharedPrefsService> getInstance() async {
    if (_instance == null) {
      // Initialise the asynchronous shared preferences
      _preferences = await SharedPreferences.getInstance();
      _instance = SharedPrefsService();
    }
    return _instance!;
  }

  final log = getLogger('SharedPrefsService');

  @override
  void saveToDisk<T>(String key, T content) {
    if (content is String) {
      _preferences!.setString(key, content);
    }
    if (content is bool) {
      _preferences!.setBool(key, content);
    }
    if (content is int) {
      _preferences!.setInt(key, content);
    }
    if (content is double) {
      _preferences!.setDouble(key, content);
    }
    if (content is List<String>) {
      _preferences!.setStringList(key, content);
    }
    log.i('Saved key: $key value: $content in Shared Preferences');
  }

  @override
  dynamic getFromDisk(String key) {
    var value = _preferences!.get(key);
    log.i('Retrieved key: $key value: $value from Shared Preferences');
    return value;
  }
}
