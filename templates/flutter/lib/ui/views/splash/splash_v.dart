import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

import 'splash_vm.dart';

class SplashScreenV extends StatelessWidget {
  const SplashScreenV({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<SplashScreenVM>.reactive(
      builder: (context, model, child) => Scaffold(
        body: Center(
          child: Text(model.title),
        ),
      ),
      viewModelBuilder: () => SplashScreenVM(),
    );
  }
}
