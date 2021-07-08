import 'package:flutter/widgets.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';

abstract class EasyLoadingManager {
  // initializes EasyLoading : call this function in the material app builder
  Widget Function(BuildContext, Widget?)? initialize({
    TransitionBuilder? builder,
  });

  //============================================================================

  // shows toast message
  void showToast(
    String message, {
    int seconds = 3,
    EasyLoadingToastPosition toastPosition = EasyLoadingToastPosition.bottom,
    EasyLoadingMaskType? maskType,
    bool dismissOnTap = true,
  });

  // shows loading indicator
  void showLoading({
    String? status,
    Widget? indicator,
    EasyLoadingMaskType? maskType,
    bool dismissOnTap = false,
  });

  // cancel all pop-up messages
  void dismiss();
}

class EasyLoadingService extends EasyLoadingManager {
  @override
  Widget Function(BuildContext, Widget?)? initialize({
    TransitionBuilder? builder,
  }) =>
      EasyLoading.init(builder: builder);

  @override
  void showToast(
    String message, {
    int seconds = 3,
    EasyLoadingToastPosition toastPosition = EasyLoadingToastPosition.bottom,
    EasyLoadingMaskType? maskType,
    bool dismissOnTap = true,
  }) =>
      EasyLoading.showToast(message,
          duration: Duration(seconds: seconds),
          toastPosition: toastPosition,
          maskType: maskType,
          dismissOnTap: dismissOnTap);

  @override
  void showLoading({
    String? status,
    Widget? indicator,
    EasyLoadingMaskType? maskType,
    bool dismissOnTap = false,
  }) =>
      EasyLoading.show(
          status: status,
          indicator: indicator,
          maskType: maskType,
          dismissOnTap: dismissOnTap);

  @override
  void dismiss() => EasyLoading.dismiss();
}
