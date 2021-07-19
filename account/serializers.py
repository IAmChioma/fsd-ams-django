from rest_framework import serializers
from .models import Account
from .enums import AccountStatus
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id','status', 'balance')
        read_only_fields = ('id',)

class GetAccountStatusCountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ('id','balance', 'status')
