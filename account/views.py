from rest_framework import generics
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Account
from .serializers import AccountSerializer, GetAccountStatusCountSerializer
from rest_framework.permissions import AllowAny

class AccountList(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = AccountSerializer(queryset, many=True)
        return Response(dict(data=serializer.data))

class AccountViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Account.objects.all()
    serializer_class = GetAccountStatusCountSerializer
