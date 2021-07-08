// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// StackedLocatorGenerator
// **************************************************************************

// ignore_for_file: public_member_api_docs

import 'package:stacked/stacked.dart';
import 'package:stacked/stacked_annotations.dart';
import 'package:stacked_services/stacked_services.dart';
import 'package:stacked_themes/stacked_themes.dart';

import '../services/auth/firebase_auth.dart';
import '../services/crash_analytics/firebase_crash_analytics.dart';
import '../services/local_storage/shared_prefs.dart';
import '../services/third_party/easyloading/easyloading.dart';

final locator = StackedLocator.instance;

Future setupLocator(
    {String? environment, EnvironmentFilter? environmentFilter}) async {
// Register environments
  locator.registerEnvironment(
      environment: environment, environmentFilter: environmentFilter);

// Register dependencies
  locator.registerLazySingleton(() => NavigationService());
  locator.registerLazySingleton(() => EasyLoadingService());
  locator.registerLazySingleton(() => FirebaseCrashAnalyticsService());
  locator.registerLazySingleton(() => ThemeService.getInstance());
  final sharedPrefsService = await SharedPrefsService.getInstance();
  locator.registerSingleton(sharedPrefsService);

  final firebaseAuthService = await FirebaseAuthService.getInstance();
  locator.registerSingleton(firebaseAuthService);
}
