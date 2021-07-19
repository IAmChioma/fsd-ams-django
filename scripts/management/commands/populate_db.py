import json
from django.core.management.base import BaseCommand

from account.models import Account
import init_data

class Command(BaseCommand):
    help = 'Populated DB with seed data'

    def handle(self, *args, **kwargs):
        accounts = json.loads(init_data.ACCOUNTS)
        for account in accounts:
            Account.objects.create(balance=account['balance'], status=account['status'])

        self.stdout.write(self.style.SUCCESS('Successfully populated DB with seed data'))
