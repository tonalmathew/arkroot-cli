import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_boiler_plate/config/flavor/flavor.dart';
import 'package:stacked/stacked_annotations.dart';
import 'package:stacked_themes/stacked_themes.dart';

import 'app/app.locator.dart';
import 'constants/urls.dart';
import 'main.dart';

void main() {
  runZonedGuarded<Future<void>>(() async {
    WidgetsFlutterBinding.ensureInitialized();
    FlavorConfig(
      flavor: FlavorTypes.STAGING,
      values: FlavorData(baseUrl: BASE_URL_STAGING),
    );

    // await Firebase.initializeApp();
    // Pass all uncaught errors from the framework to Crashlytics.
    // FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterError;

    await ThemeManager.initialise();
    await setupLocator(environment: Environment.test);

    runApp(MyApp());
  }, reportError);
}

void reportError(Object error, StackTrace stackTrace) async {
  // FirebaseCrashlytics.instance.recordError(error,stackTrace);
  debugPrint(
      '(ERROR) main.dart:main() error: ${error.toString()} stack-trace: ${stackTrace.toString()}');
}
