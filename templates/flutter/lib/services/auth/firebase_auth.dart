import 'dart:async';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_boiler_plate/app/app.locator.dart';
import 'package:flutter_boiler_plate/app/app.logger.dart';
import 'package:flutter_boiler_plate/services/auth/auth.dart';
import 'package:flutter_boiler_plate/services/crash_analytics/firebase_crash_analytics.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

class FirebaseAuthService extends AuthService {
  static FirebaseAuthService? _instance;
  final FirebaseCrashAnalyticsService _crashAnalyticsService;
  final FirebaseAuth auth = FirebaseAuth.instance;
  final log = getLogger('FirebaseAuthService');

  static Future<FirebaseAuthService> getInstance() async {
    if (_instance == null) {
      // Initialise constructor with required parameters
      _instance = FirebaseAuthService(locator<FirebaseCrashAnalyticsService>());
    }
    return _instance!;
  }

  FirebaseAuthService(this._crashAnalyticsService);

  User? user;

  @override
  Stream<User?> get authStateChanges => auth.authStateChanges();

  //============================================================================

  @override
  User? get currentUser => auth.currentUser;

  //============================================================================

  @override
  Future<UserCredential?> signInAnonymously() async {
    UserCredential? userCredential;
    try {
      userCredential = await auth.signInAnonymously();
      ;
    } on FirebaseAuthException catch (e, s) {
      log.e('FirebaseAuthException', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateAuthException(e);
    } catch (e, s) {
      log.e('Error', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateError(e);
    }
    return userCredential;
  }

  //============================================================================

  @override
  Future<UserCredential?> createUserWithEmailAndPassword(
      {required String email, required String password}) async {
    UserCredential? userCredential;
    try {
      userCredential = await auth.createUserWithEmailAndPassword(
          email: email, password: password);
    } on FirebaseAuthException catch (e, s) {
      log.e('FirebaseAuthException', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateAuthException(e);
    } catch (e, s) {
      log.e('Error', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateError(e);
    }
    return userCredential;
  }

  @override
  Future<UserCredential?> signInWithEmailAndPassword(
      {required String email, required String password}) async {
    UserCredential? userCredential;
    try {
      userCredential = await auth.signInWithEmailAndPassword(
          email: email, password: password);
    } on FirebaseAuthException catch (e, s) {
      log.e('FirebaseAuthException', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateAuthException(e);
    } catch (e, s) {
      log.e('Error', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateError(e);
    }
    return userCredential;
  }

  @override
  Future<void> sendEmailVerification() async =>
      await auth.currentUser!.sendEmailVerification();

  //============================================================================

  @override
  Future<UserCredential?> signInWithGoogle() async {
    UserCredential? userCredential;
    try {
      // Trigger the authentication flow
      final GoogleSignInAccount googleUser = (await GoogleSignIn().signIn())!;

      // Obtain the auth details from the request
      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;

      // Create a new credential
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      // Once signed in, return the UserCredential
      userCredential = await signInWithCredential(credential);
    } on FirebaseAuthException catch (e, s) {
      log.e('FirebaseAuthException', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateAuthException(e);
    } catch (e, s) {
      log.e('Error', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateError(e);
    }
    return userCredential;
  }

  //============================================================================

  @override
  Future<UserCredential?> signInWithFacebook() async {
    UserCredential? userCredential;
    try {
      // Trigger the sign-in flow
      final LoginResult result = await FacebookAuth.instance.login();

      // Create a credential from the access token
      final facebookAuthCredential =
          FacebookAuthProvider.credential(result.accessToken!.token);

      // Once signed in, return the UserCredential
      userCredential = await signInWithCredential(facebookAuthCredential);
    } on FirebaseAuthException catch (e, s) {
      log.e('FirebaseAuthException', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateAuthException(e);
    } catch (e, s) {
      log.e('Error', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateError(e);
    }
    return userCredential;
  }

  //============================================================================

  String? _phoneVerificationId;

  @override
  Future<void> verifyPhoneNumber(String phoneNumber) async {
    updateCodeSentStatus(false);
    try {
      await FirebaseAuth.instance.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        verificationCompleted: this.verificationCompleted,
        verificationFailed: this.verificationFailed,
        codeSent: this.codeSent,
        codeAutoRetrievalTimeout: this.codeAutoRetrievalTimeout,
        timeout: Duration(minutes: 1),
      );
    } on FirebaseAuthException catch (e, s) {
      log.e('FirebaseAuthException', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateAuthException(e);
    } catch (e, s) {
      log.e('Error', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateError(e);
    }
  }

  @override
  void codeAutoRetrievalTimeout(String verificationId) {
    // Auto-resolution timed out...
  }

  @override
  void codeSent(String verificationId, int? resendToken) async {
    updateCodeSentStatus(true);
    this._phoneVerificationId = verificationId;
  }

  @override
  void verificationCompleted(PhoneAuthCredential credential) async {
    // ANDROID ONLY!
    // sign the user in (or link) with the auto-generated credential
    signInWithCredential(credential);
  }

  @override
  void verificationFailed(FirebaseAuthException e) {
    updateAuthException(e);
  }

  @override
  Future<UserCredential?> verifyOTP(String otp) async {
    UserCredential? userCredential;

    try {
      // create a PhoneAuthCredential with the code
      PhoneAuthCredential credential = PhoneAuthProvider.credential(
          verificationId: (this._phoneVerificationId)!, smsCode: otp);

      // sign the user in (or link) with the credential
      userCredential = await signInWithCredential(credential);
    } on FirebaseAuthException catch (e, s) {
      log.e('FirebaseAuthException', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateAuthException(e);
    } catch (e, s) {
      log.e('Error', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateError(e);
    }
    return userCredential;
  }

  StreamController<bool> _codeSentController =
      StreamController<bool>.broadcast(sync: true);

  @override
  void updateCodeSentStatus(bool status) => _codeSentController.add(status);

  @override
  Stream<bool?> get onCodeSentStatusChanged => _codeSentController.stream;

  //============================================================================

  @override
  Future<UserCredential?> signInWithCredential(
      AuthCredential credential) async {
    UserCredential? userCredential;
    try {
      userCredential = await auth.signInWithCredential(credential);
    } on FirebaseAuthException catch (e, s) {
      log.e('FirebaseAuthException', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateAuthException(e);
    } catch (e, s) {
      log.e('Error', e, s);
      _crashAnalyticsService.recordError(e, s);
      updateError(e);
    }
    return userCredential;
  }

  //============================================================================

  StreamController<FirebaseAuthException> _authExceptionController =
      StreamController<FirebaseAuthException>.broadcast(sync: true);

  @override
  void updateAuthException(FirebaseAuthException exception) =>
      _authExceptionController.add(exception);

  @override
  Stream<FirebaseAuthException?> get onException =>
      _authExceptionController.stream;

  //============================================================================

  StreamController<Object> _errorController =
      StreamController<Object>.broadcast(sync: true);

  @override
  void updateError(Object error) => _errorController.add(error);

  @override
  Stream<Object?> get onError => _errorController.stream;

  //============================================================================

  @override
  Future<void> signOut() async => await auth.signOut();

  //============================================================================

  @override
  Future<void> deleteAccount() async => await auth.currentUser!.delete();
}
