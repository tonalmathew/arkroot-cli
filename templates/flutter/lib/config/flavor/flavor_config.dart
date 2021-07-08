import 'flavor_data.dart';
import 'flavor_types.dart';

abstract class Flavor {
  bool get isProd;

  bool get isDev;

  bool get isStaging;
}

class FlavorConfig extends Flavor {
  final FlavorTypes flavor;
  final FlavorData values;
  static late FlavorConfig _instance;

  factory FlavorConfig({
    required FlavorTypes flavor,
    required FlavorData values,
  }) {
    _instance = FlavorConfig._internal(flavor, values);
    return _instance;
  }

  FlavorConfig._internal(this.flavor, this.values);

  static FlavorConfig get instance {
    return _instance;
  }

  @override
  bool get isProd => _instance.flavor == FlavorTypes.PROD;

  @override
  bool get isDev => _instance.flavor == FlavorTypes.DEV;

  @override
  bool get isStaging => _instance.flavor == FlavorTypes.STAGING;
}
