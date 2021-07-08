import 'dart:async';

import 'package:firebase_auth/firebase_auth.dart';

abstract class AuthService {
  // gives current authenticated user
  User? get currentUser;

  //============================================================================

  // listen to auth state changes
  Stream<User?> get  authStateChanges;

  //============================================================================

  // anonymous Sign-In
  Future<UserCredential?> signInAnonymously();

  //============================================================================

  // email-password Sign-Up
  Future<UserCredential?> createUserWithEmailAndPassword(
      {required String email, required String password});

  // email-password Sign-In
  Future<UserCredential?> signInWithEmailAndPassword(
      {required String email, required String password});

  // sends email verification link
  Future<void> sendEmailVerification();

  //============================================================================

  // google Sign-In
  Future<UserCredential?> signInWithGoogle();

  //============================================================================

  // facebook Sign-In
  Future<UserCredential?> signInWithFacebook();

  //============================================================================

  // verify phone number : Android & IOS only
  Future<void> verifyPhoneNumber(String phoneNumber);

  // automatic handling of the SMS code on Android devices
  void verificationCompleted(PhoneAuthCredential credential);

  // handle failure events such as invalid phone numbers or whether the SMS quota has been exceeded
  void verificationFailed(FirebaseAuthException e);

  // handle when a code has been sent to the device from Firebase, used to prompt users to enter the code
  void codeSent(String verificationId, int? resendToken);

  // handle a timeout of when automatic SMS code handling fails
  void codeAutoRetrievalTimeout(String verificationId);

  // OTP Verification
  Future<UserCredential?> verifyOTP(String otp);

  // update code sent status
  void updateCodeSentStatus(bool status);

  // listen to code sent status
  Stream<bool?> get onCodeSentStatusChanged;

  //============================================================================

  // Sign-In with credential
  Future<UserCredential?> signInWithCredential(AuthCredential credential);

  //============================================================================

  // update latest exceptions
  void updateAuthException(FirebaseAuthException exception);

  // listen to authentication exceptions
  Stream<FirebaseAuthException?> get onException;

  //============================================================================

  // update latest error
  void updateError(Object error);

  // listen to errors
  Stream<Object?> get onError;

  //============================================================================

  // Sign-Out
  Future<void> signOut();

  //============================================================================

  // deleteAccount
  Future<void> deleteAccount();
}

