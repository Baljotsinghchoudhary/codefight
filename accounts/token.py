from django.contrib.auth.tokens import PasswordResetTokenGenerator


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return str(user.pk)+str(timestamp)+str(user.is_confirm_email)


account_activation_token = AccountActivationTokenGenerator()
account_reset_token = PasswordResetTokenGenerator()
