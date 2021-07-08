abstract class CrashAnalyticsService {
  // set user to identify user in crashlytics
  Future<void> setUser(String userId);

  // disable crashlytics in debug mode
  Future<void> disableCrashlytics();

  // record errors
  Future<void> recordError(dynamic exception, StackTrace? stack,
      {dynamic reason, bool fatal = false});

  // log error messages
  Future<void> logMsg(String msg);
}
