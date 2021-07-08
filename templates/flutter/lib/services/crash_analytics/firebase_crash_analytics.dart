import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:flutter_boiler_plate/app/app.logger.dart';

import 'crash_analytics.dart';

class FirebaseCrashAnalyticsService extends CrashAnalyticsService {
  final FirebaseCrashlytics _crashlytics = FirebaseCrashlytics.instance;
  final log = getLogger('FirebaseCrashAnalyticsService"');

  @override
  Future<void> setUser(String userId) async {
    try {
      await FirebaseCrashlytics.instance.setUserIdentifier(userId);
      log.i('Successfully set Firebase-Crashlytics user');
    } catch (e, s) {
      log.e('Error', e, s);
    }
  }

  @override
  Future<void> disableCrashlytics() async {
    try {
      await _crashlytics.setCrashlyticsCollectionEnabled(false);
      log.w('Disabled Firebase-Crashlytics');
    } catch (e, s) {
      log.e('Error', e, s);
    }
  }

  @override
  Future<void> recordError(dynamic exception, StackTrace? stack,
      {dynamic reason, bool fatal = false}) async {
    try {
      await _crashlytics.recordError(exception, stack,
          reason: reason, fatal: fatal);
      log.i('Error recorded to Firebase-Crashlytics');
    } catch (e, s) {
      log.e('Error', e, s);
    }
  }

  @override
  Future<void> logMsg(String msg) async {
    try {
      await FirebaseCrashlytics.instance.log(msg);
      log.i('Message logged to Firebase-Crashlytics');
    } catch (e, s) {
      log.e('Error', e, s);
    }
  }
}
