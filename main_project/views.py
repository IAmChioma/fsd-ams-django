from django.conf import settings
from django.shortcuts import render
from django.views.generic import TemplateView

from rest_framework.permissions import AllowAny

def get_context_dict():
    return dict(
    	  host=settings.HOSTNAME
    )

# class PageView(TemplateView):
#     template_name = 'index.html'
#     permission_classes = [AllowAny]
#
#     def get(self, request, *args, **kwargs):
#         return render(request, self.template_name, context=get_context_dict())