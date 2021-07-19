from django.db import models

from .enums import AccountStatus

    
class Account(models.Model):
    balance = models.FloatField()
    status = models.CharField(max_length=100, choices=AccountStatus.CHOICES, default=AccountStatus.PENDING)

    def __str__(self):
        return f'{self.balance}'