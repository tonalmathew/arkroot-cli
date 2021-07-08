import 'package:flutter_boiler_plate/app/app.locator.dart';
import 'package:flutter_boiler_plate/app/app.router.dart';
import 'package:flutter_boiler_plate/constants/strings.dart';
import 'package:flutter_boiler_plate/services/third_party/easyloading/easyloading.dart';
import 'package:stacked/stacked.dart';
import 'package:stacked_services/stacked_services.dart';

class SplashScreenVM extends FutureViewModel<bool> {
  // service class locators
  final NavigationService _navigationService = locator<NavigationService>();
  final EasyLoadingService _easyLoadingService = locator<EasyLoadingService>();

  String get title => SPLASH_TITLE;

  @override
  Future<bool> futureToRun() async => await runSplashService();

  Future<bool> runSplashService() async {
    // mocking function delay
    await Future.delayed(Duration(seconds: 5));

    // mocking response
    final response = true;

    return response;
  }

  @override
  void onData(bool? data) {
    navigateHome();
    super.onData(data);
  }

  void navigateHome() => _navigationService.navigateTo(Routes.homeScreenV);

  @override
  void onError(error) {
    _easyLoadingService.showToast(ERROR_RETRY);

    // re-initializing splash service when failed
    initialise();
    super.onError(error);
  }
}
