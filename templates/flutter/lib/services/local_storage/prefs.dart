abstract class PrefsService {
  // saves content supported by shared preference
  void saveToDisk<T>(String key, T content);

  //============================================================================

  // retrieves content of the key
  dynamic getFromDisk(String key);
}