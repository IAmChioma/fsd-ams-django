"""main_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

# from .views import PageView
from account import views as account_views
router = DefaultRouter()
router.register(r'count', account_views.AccountViewSet, basename = 'status_count')

api_url_patterns = [
    path('accounts/', account_views.AccountList.as_view()),
]

urlpatterns = [
    url(r'api/', include(api_url_patterns)),
    path('statistics/', include(router.urls)),
    path('admin/', admin.site.urls),
    # url(r'^.*$', PageView.as_view())
]
